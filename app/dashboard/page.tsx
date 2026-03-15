import { createClient } from '@/lib/supabase/server'

const statistieken = [
  { label: 'Kandidaten', waarde: '—', kleur: '#3b82f6', icon: '👤' },
  { label: 'Open Vacatures', waarde: '—', kleur: '#059669', icon: '💼' },
  { label: 'Opdrachtgevers', waarde: '—', kleur: '#8b5cf6', icon: '🏢' },
  { label: 'Actieve Plaatsingen', waarde: '—', kleur: '#f59e0b', icon: '✅' },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const voornaam = user?.email?.split('@')[0] ?? 'gebruiker'

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welkom terug, {voornaam} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Hier is een overzicht van het uitzendbureau.
        </p>
      </div>

      {/* Statistieken */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statistieken.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span
                className="text-xs font-medium px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: stat.kleur }}
              >
                Actief
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.waarde}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Snelle acties */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Snelle acties</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Kandidaat toevoegen', href: '/dashboard/kandidaten/nieuw', icon: '➕' },
            { label: 'Vacature plaatsen', href: '/dashboard/vacatures/nieuw', icon: '📝' },
            { label: 'Opdrachtgever toevoegen', href: '/dashboard/opdrachtgevers/nieuw', icon: '🏢' },
            { label: 'Plaatsing registreren', href: '/dashboard/plaatsingen/nieuw', icon: '✅' },
          ].map((actie) => (
            <a
              key={actie.href}
              href={actie.href}
              className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all text-sm font-medium text-gray-700 hover:text-emerald-700"
            >
              <span>{actie.icon}</span>
              {actie.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
