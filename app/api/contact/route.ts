import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, message, type, lang } = await req.json();

  const isNl = lang === "nl";
  const typeLabel = isNl
    ? type === "employer" ? "Werkgever" : "Werkzoekende"
    : type === "employer" ? "Employer" : "Job seeker";

  const subject = isNl
    ? `Nieuw bericht van ${name} (${typeLabel})`
    : `New message from ${name} (${typeLabel})`;

  const html = isNl
    ? `<p><strong>Naam:</strong> ${name}</p>
       <p><strong>E-mail:</strong> ${email}</p>
       <p><strong>Type:</strong> ${typeLabel}</p>
       <p><strong>Bericht:</strong></p>
       <p>${message.replace(/\n/g, "<br>")}</p>`
    : `<p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Type:</strong> ${typeLabel}</p>
       <p><strong>Message:</strong></p>
       <p>${message.replace(/\n/g, "<br>")}</p>`;

  const { error } = await resend.emails.send({
    from: "Exeris Website <onboarding@resend.dev>",
    to: "info@exeris.nl",
    replyTo: email,
    subject,
    html,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
