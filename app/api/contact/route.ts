import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { naam, email, type, bericht, website } = body

  // Honeypot check
  if (website) return NextResponse.json({ ok: true })

  // Validation
  const errors: string[] = []
  if (!naam?.trim()) errors.push('naam is required')
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('valid email is required')
  if (!['werknemer', 'opdrachtgever'].includes(type)) errors.push('type must be werknemer or opdrachtgever')
  if (!bericht?.trim() || bericht.trim().length < 10) errors.push('bericht must be at least 10 characters')
  if (errors.length) return NextResponse.json({ error: errors.join(', ') }, { status: 400 })

  try {
    await resend.emails.send({
      from: 'Exeris Website <noreply@exeris.nl>',
      to: process.env.CONTACT_EMAIL_TO || 'info@exeris.nl',
      subject: `Nieuw bericht via exeris.nl — ${type}`,
      text: `Nieuw bericht via exeris.nl\n\nType: ${type}\nNaam: ${naam}\nE-mail: ${email}\n\nBericht:\n${bericht}`,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Kon bericht niet verzenden.' }, { status: 500 })
  }
}
