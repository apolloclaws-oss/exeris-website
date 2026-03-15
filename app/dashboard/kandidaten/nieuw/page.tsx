'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function NieuwKandidaatPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    voornaam: '',
    achternaam: '',
    email: '',
    telefoon: '',
    woonplaats: '',
    postcode: '',
    opleidingsniveau: 'MBO',
    beschikbaarheid: '',
    uren_per_week: '',
    notities: '',
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
    const { error: insertError } = await supabase.from('kandidaten').insert({
      voornaam: form.voornaam,
      achternaam: form.achternaam,
      email: form.email,
      telefoon: form.telefoon || null,
      woonplaats: form.woonplaats || null,
      postcode: form.postcode || null,
      opleidingsniveau: form.opleidingsniveau,
      beschikbaarheid: form.beschikbaarheid || null,
      uren_per_week: form.uren_per_week ? parseInt(form.uren_per_week) : null,
      notities: form.notities || null,
      status: 'actief',
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/kandidaten')
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kandidaat toevoegen</h1>
        <Link
          href="/dashboard/kandidaten"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Terug
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Voornaam *</label>
              <input
                name="voornaam"
                required
                value={form.voornaam}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Achternaam *</label>
              <input
                name="achternaam"
                required
                value={form.achternaam}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>E-mailadres *</label>
            <input
              name="email"
              type="email"
              required
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Woonplaats</label>
              <input
                name="woonplaats"
                value={form.woonplaats}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Postcode</label>
              <input
                name="postcode"
                value={form.postcode}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Opleidingsniveau</label>
            <select
              name="opleidingsniveau"
              value={form.opleidingsniveau}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="MBO">MBO</option>
              <option value="HBO">HBO</option>
              <option value="WO">WO</option>
              <option value="Anders">Anders</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Beschikbaarheid</label>
            <input
              name="beschikbaarheid"
              placeholder="bijv. per direct, vanaf 1 april"
              value={form.beschikbaarheid}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Uren per week</label>
            <input
              name="uren_per_week"
              type="number"
              min={0}
              max={80}
              value={form.uren_per_week}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Notities</label>
            <textarea
              name="notities"
              rows={4}
              value={form.notities}
              onChange={handleChange}
              className={inputClass}
            />
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
              {loading ? 'Opslaan...' : 'Kandidaat opslaan'}
            </button>
            <Link
              href="/dashboard/kandidaten"
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
