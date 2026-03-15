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
  const supabase = createClient()

  async function handleInloggen(e: React.FormEvent) {
    e.preventDefault()
    setLaden(true)
    setFout('')

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
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a1628' }}>
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Exeris
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Intern Dashboard</p>
        </div>

        {/* Login kaart */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-6">Inloggen</h2>

          <form onSubmit={handleInloggen} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                E-mailadres
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                placeholder="naam@exeris.nl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Wachtwoord
              </label>
              <input
                type="password"
                value={wachtwoord}
                onChange={(e) => setWachtwoord(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                placeholder="••••••••"
              />
            </div>

            {fout && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                <p className="text-red-400 text-sm">{fout}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={laden}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all"
              style={{ backgroundColor: laden ? '#065f46' : '#059669' }}
            >
              {laden ? 'Bezig met inloggen...' : 'Inloggen'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} Exeris Uitzendbureau
        </p>
      </div>
    </div>
  )
}
