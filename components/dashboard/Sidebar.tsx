'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navigatie = [
  { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { label: 'Kandidaten', href: '/dashboard/kandidaten', icon: '👤' },
  { label: 'Vacatures', href: '/dashboard/vacatures', icon: '💼' },
  { label: 'Opdrachtgevers', href: '/dashboard/opdrachtgevers', icon: '🏢' },
  { label: 'Sollicitaties', href: '/dashboard/sollicitaties', icon: '📋' },
  { label: 'Plaatsingen', href: '/dashboard/plaatsingen', icon: '✅' },
]

export default function DashboardSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleUitloggen() {
    await supabase.auth.signOut()
    router.push('/dashboard/login')
    router.refresh()
  }

  return (
    <aside
      className="w-64 flex flex-col h-full"
      style={{ backgroundColor: '#0a1628' }}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">Exeris</h1>
        <p className="text-xs text-gray-500 mt-0.5">Uitzendbureau Dashboard</p>
      </div>

      {/* Navigatie */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigatie.map((item) => {
          const actief = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                actief
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Gebruiker + uitloggen */}
      <div className="px-4 py-4 border-t border-white/10">
        <p className="text-xs text-gray-500 truncate px-2 mb-2">{userEmail}</p>
        <button
          onClick={handleUitloggen}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <span>🚪</span>
          Uitloggen
        </button>
      </div>
    </aside>
  )
}
