import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

function ActiefBadge({ actief }: { actief: boolean | null }) {
  if (actief === false) {
    return (
      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        Inactief
      </span>
    )
  }
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
      Actief
    </span>
  )
}

export default async function OpdrachtgeversPage() {
  const supabase = await createClient()
  const { data: opdrachtgevers } = await supabase
    .from('opdrachtgevers')
    .select('*')
    .order('naam')

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Opdrachtgevers</h1>
        <Link
          href="/dashboard/opdrachtgevers/nieuw"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Opdrachtgever toevoegen
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {!opdrachtgevers || opdrachtgevers.length === 0 ? (
          <div className="px-6 py-16 text-center text-gray-400 text-sm">
            Nog geen opdrachtgevers toegevoegd.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Naam</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">KvK nummer</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Sector</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Contactpersoon</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Stad</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-4">Actief</th>
              </tr>
            </thead>
            <tbody>
              {opdrachtgevers.map((o) => (
                <tr key={o.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{o.naam}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{o.kvk_nummer ?? '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{o.sector ?? '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{o.contactpersoon ?? '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{o.stad ?? '—'}</td>
                  <td className="px-6 py-4 text-sm">
                    <ActiefBadge actief={o.actief} />
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
