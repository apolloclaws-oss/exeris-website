import { createClient } from '@/lib/supabase/server'

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    actief: 'bg-green-100 text-green-700',
    afgerond: 'bg-blue-100 text-blue-700',
    geannuleerd: 'bg-red-100 text-red-700',
    gepland: 'bg-yellow-100 text-yellow-700',
  }
  const labels: Record<string, string> = {
    actief: 'Actief',
    afgerond: 'Afgerond',
    geannuleerd: 'Geannuleerd',
    gepland: 'Gepland',
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

export default async function PlaatsingenPage() {
  const supabase = await createClient()
  const { data: plaatsingen } = await supabase
    .from('plaatsingen')
    .select('*, kandidaten(voornaam, achternaam), opdrachtgevers(naam), vacatures(titel)')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Plaatsingen</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {!plaatsingen || plaatsingen.length === 0 ? (
          <div className="px-6 py-16 text-center text-gray-400 text-sm">
            Nog geen plaatsingen geregistreerd.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Kandidaat</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Opdrachtgever</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Vacature</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Startdatum</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Einddatum</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Uren/week</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {plaatsingen.map((p) => {
                const kandidaat = p.kandidaten as { voornaam: string; achternaam: string } | null
                const opdrachtgever = p.opdrachtgevers as { naam: string } | null
                const vacature = p.vacatures as { titel: string } | null
                return (
                  <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {kandidaat ? `${kandidaat.voornaam} ${kandidaat.achternaam}` : '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{opdrachtgever?.naam ?? '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{vacature?.titel ?? '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatDate(p.startdatum)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatDate(p.einddatum)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {p.uren_per_week != null ? `${p.uren_per_week} uur` : '—'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={p.status ?? 'gepland'} />
                    </td>
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
