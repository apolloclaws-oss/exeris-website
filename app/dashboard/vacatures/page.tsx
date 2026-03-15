import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    open: 'bg-green-100 text-green-700',
    gesloten: 'bg-gray-100 text-gray-600',
    ingevuld: 'bg-blue-100 text-blue-700',
    concept: 'bg-yellow-100 text-yellow-700',
  }
  const labels: Record<string, string> = {
    open: 'Open',
    gesloten: 'Gesloten',
    ingevuld: 'Ingevuld',
    concept: 'Concept',
  }
  const cls = styles[status] ?? 'bg-gray-100 text-gray-600'
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {labels[status] ?? status}
    </span>
  )
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function VacaturesPage() {
  const supabase = await createClient()
  const { data: vacatures } = await supabase
    .from('vacatures')
    .select('*, opdrachtgevers(naam)')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Vacatures</h1>
        <Link
          href="/dashboard/vacatures/nieuw"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Vacature toevoegen
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {!vacatures || vacatures.length === 0 ? (
          <div className="px-6 py-16 text-center text-gray-400 text-sm">
            Nog geen vacatures toegevoegd.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Titel</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Opdrachtgever</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Stad</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Contract type</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Sluitingsdatum</th>
              </tr>
            </thead>
            <tbody>
              {vacatures.map((v) => (
                <tr key={v.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{v.titel}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {(v.opdrachtgevers as { naam: string } | null)?.naam ?? '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{v.stad ?? '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 capitalize">{v.contract_type ?? '—'}</td>
                  <td className="px-6 py-4 text-sm">
                    <StatusBadge status={v.status ?? 'open'} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatDate(v.sluitingsdatum)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
