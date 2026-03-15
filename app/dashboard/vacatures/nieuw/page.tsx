'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface Opdrachtgever {
  id: string
  naam: string
}

export default function NieuweVacaturePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [opdrachtgevers, setOpdrachtgevers] = useState<Opdrachtgever[]>([])

  const [form, setForm] = useState({
    titel: '',
    omschrijving: '',
    stad: '',
    sector: '',
    uren_per_week: '',
    salaris_min: '',
    salaris_max: '',
    contract_type: 'tijdelijk',
    opleidingsniveau: 'MBO',
    sluitingsdatum: '',
    opdrachtgever_id: '',
  })

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('opdrachtgevers')
      .select('id, naam')
      .order('naam')
      .then(({ data }) => {
        if (data) setOpdrachtgevers(data)
      })
  }, [])

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
    const { error: insertError } = await supabase.from('vacatures').insert({
      titel: form.titel,
      omschrijving: form.omschrijving || null,
      stad: form.stad || null,
      sector: form.sector || null,
      uren_per_week: form.uren_per_week ? parseInt(form.uren_per_week) : null,
      salaris_min: form.salaris_min ? parseInt(form.salaris_min) : null,
      salaris_max: form.salaris_max ? parseInt(form.salaris_max) : null,
      contract_type: form.contract_type,
      opleidingsniveau: form.opleidingsniveau,
      sluitingsdatum: form.sluitingsdatum || null,
      opdrachtgever_id: form.opdrachtgever_id || null,
      status: 'open',
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/vacatures')
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Vacature toevoegen</h1>
        <Link href="/dashboard/vacatures" className="text-sm text-gray-500 hover:text-gray-700">
          ← Terug
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Functietitel *</label>
            <input
              name="titel"
              required
              value={form.titel}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Omschrijving</label>
            <textarea
              name="omschrijving"
              rows={4}
              value={form.omschrijving}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Opdrachtgever</label>
            <select
              name="opdrachtgever_id"
              value={form.opdrachtgever_id}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">— Selecteer opdrachtgever —</option>
              {opdrachtgevers.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.naam}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Stad</label>
              <input
                name="stad"
                value={form.stad}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Salaris min (€)</label>
              <input
                name="salaris_min"
                type="number"
                min={0}
                value={form.salaris_min}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Salaris max (€)</label>
              <input
                name="salaris_max"
                type="number"
                min={0}
                value={form.salaris_max}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Contract type</label>
            <select
              name="contract_type"
              value={form.contract_type}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="tijdelijk">Tijdelijk</option>
              <option value="vast">Vast</option>
              <option value="zzp">ZZP</option>
              <option value="uitzend">Uitzend</option>
            </select>
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
            <label className={labelClass}>Sluitingsdatum</label>
            <input
              name="sluitingsdatum"
              type="date"
              value={form.sluitingsdatum}
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
              {loading ? 'Opslaan...' : 'Vacature opslaan'}
            </button>
            <Link
              href="/dashboard/vacatures"
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
