import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    actief: 'bg-green-100 text-green-700',
    inactief: 'bg-gray-100 text-gray-600',
    geplaatst: 'bg-blue-100 text-blue-700',
  }
  const labels: Record<string, string> = {
    actief: 'Actief',
    inactief: 'Inactief',
    geplaatst: 'Geplaatst',
  }
  const cls = styles[status] ?? 'bg-gray-100 text-gray-600'
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {labels[status] ?? status}
    </span>
  )
}

export default async function KandidatenPage() {
  const supabase = await createClient()
  const { data: kandidaten } = await supabase
    .from('kandidaten')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kandidaten</h1>
        <Link
          href="/dashboard/kandidaten/nieuw"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Kandidaat toevoegen
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {!kandidaten || kandidaten.length === 0 ? (
          <div className="px-6 py-16 text-center text-gray-400 text-sm">
            Nog geen kandidaten toegevoegd.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Naam</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Email</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Woonplaats</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Beschikbaarheid</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Acties</th>
              </tr>
            </thead>
            <tbody>
              {kandidaten.map((k) => (
                <tr key={k.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {k.voornaam} {k.achternaam}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{k.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{k.woonplaats ?? '—'}</td>
                  <td className="px-6 py-4 text-sm">
                    <StatusBadge status={k.status ?? 'inactief'} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{k.beschikbaarheid ?? '—'}</td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      href={`/dashboard/kandidaten/${k.id}/bewerken`}
                      className="text-emerald-600 hover:text-emerald-800 font-medium"
                    >
                      Bewerken
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
