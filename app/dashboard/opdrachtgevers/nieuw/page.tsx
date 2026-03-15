'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function NieuweOpdrachtgeverPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    naam: '',
    kvk_nummer: '',
    sector: '',
    contactpersoon: '',
    email: '',
    telefoon: '',
    adres: '',
    postcode: '',
    stad: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: insertError } = await supabase.from('opdrachtgevers').insert({
      naam: form.naam,
      kvk_nummer: form.kvk_nummer || null,
      sector: form.sector || null,
      contactpersoon: form.contactpersoon || null,
      email: form.email || null,
      telefoon: form.telefoon || null,
      adres: form.adres || null,
      postcode: form.postcode || null,
      stad: form.stad || null,
      actief: true,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/opdrachtgevers')
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Opdrachtgever toevoegen</h1>
        <Link href="/dashboard/opdrachtgevers" className="text-sm text-gray-500 hover:text-gray-700">
          ← Terug
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Bedrijfsnaam *</label>
            <input
              name="naam"
              required
              value={form.naam}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>KvK nummer</label>
            <input
              name="kvk_nummer"
              value={form.kvk_nummer}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Sector</label>
            <input
              name="sector"
              value={form.sector}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Contactpersoon</label>
            <input
              name="contactpersoon"
              value={form.contactpersoon}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>E-mailadres</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Telefoonnummer</label>
              <input
                name="telefoon"
                type="tel"
                value={form.telefoon}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Adres</label>
            <input
              name="adres"
              value={form.adres}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Postcode</label>
              <input
                name="postcode"
                value={form.postcode}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Stad</label>
              <input
                name="stad"
                value={form.stad}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              {loading ? 'Opslaan...' : 'Opdrachtgever opslaan'}
            </button>
            <Link
              href="/dashboard/opdrachtgevers"
              className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
            >
              Annuleren
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
