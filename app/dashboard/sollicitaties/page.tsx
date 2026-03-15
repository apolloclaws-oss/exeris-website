import { createClient } from '@/lib/supabase/server'

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    nieuw: 'bg-blue-100 text-blue-700',
    in_behandeling: 'bg-yellow-100 text-yellow-700',
    gesprek: 'bg-purple-100 text-purple-700',
    afgewezen: 'bg-red-100 text-red-700',
    aangenomen: 'bg-green-100 text-green-700',
  }
  const labels: Record<string, string> = {
    nieuw: 'Nieuw',
    in_behandeling: 'In behandeling',
    gesprek: 'Gesprek',
    afgewezen: 'Afgewezen',
    aangenomen: 'Aangenomen',
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
    month: 'long',
    year: 'numeric',
  })
}

export default async function SollicitiatiesPage() {
  const supabase = await createClient()
  const { data: sollicitaties } = await supabase
    .from('sollicitaties')
    .select('*, kandidaten(voornaam, achternaam), vacatures(titel)')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sollicitaties</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {!sollicitaties || sollicitaties.length === 0 ? (
          <div className="px-6 py-16 text-center text-gray-400 text-sm">
            Nog geen sollicitaties ontvangen.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Kandidaat</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Vacature</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Ingediend op</th>
              </tr>
            </thead>
            <tbody>
              {sollicitaties.map((s) => {
                const kandidaat = s.kandidaten as { voornaam: string; achternaam: string } | null
                const vacature = s.vacatures as { titel: string } | null
                return (
                  <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {kandidaat ? `${kandidaat.voornaam} ${kandidaat.achternaam}` : '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{vacature?.titel ?? '—'}</td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={s.status ?? 'nieuw'} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatDate(s.created_at)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
