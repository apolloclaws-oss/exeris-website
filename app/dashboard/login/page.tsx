'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [wachtwoord, setWachtwoord] = useState('')
  const [fout, setFout] = useState('')
  const [laden, setLaden] = useState(false)
  const router = useRouter()

  async function handleInloggen(e: React.FormEvent) {
    e.preventDefault()
    setLaden(true)
    setFout('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: wachtwoord,
    })

    if (error) {
      setFout('Ongeldig e-mailadres of wachtwoord.')
      setLaden(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a1628',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '0 20px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.5px' }}>
            Exeris
          </h1>
          <p style={{ color: '#6b7280', marginTop: '6px', fontSize: '14px' }}>Intern Dashboard</p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '32px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '24px' }}>
            Inloggen
          </h2>

          <form onSubmit={handleInloggen}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#d1d5db', marginBottom: '6px' }}>
                E-mailadres
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="naam@exeris.nl"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#d1d5db', marginBottom: '6px' }}>
                Wachtwoord
              </label>
              <input
                type="password"
                value={wachtwoord}
                onChange={(e) => setWachtwoord(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {fout && (
              <div style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '8px',
                padding: '10px 14px',
                marginBottom: '16px'
              }}>
                <p style={{ color: '#f87171', fontSize: '13px', margin: 0 }}>{fout}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={laden}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '8px',
                background: laden ? '#065f46' : '#059669',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '14px',
                border: 'none',
                cursor: laden ? 'not-allowed' : 'pointer'
              }}
            >
              {laden ? 'Bezig...' : 'Inloggen'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#374151', fontSize: '12px', marginTop: '24px' }}>
          © {new Date().getFullYear()} Exeris Uitzendbureau
        </p>
      </div>
    </div>
  )
}
