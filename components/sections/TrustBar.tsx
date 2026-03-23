'use client'
import { useLang } from '@/lib/language-context'

const items = [
  '🚛 Logistiek', '🌸 Sierteelt', '🌿 Kassenwerk', '📦 Ompakken',
  '🇳🇱 Nederlands', '🇬🇧 English', '🇧🇬 Bulgaars', '🇹🇷 Turks', '🇵🇱 Pools', '🇷🇺 Russisch',
]

export function TrustBar() {
  const { t } = useLang()
  const doubled = [...items, ...items]

  return (
    <div className="py-10 border-y border-white/5 overflow-hidden">
      <p className="text-center text-white/30 text-xs uppercase tracking-widest mb-6">{t.trustBar.label}</p>
      <div className="relative flex">
        <div
          className="flex gap-10 whitespace-nowrap"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="text-white/40 text-sm font-medium shrink-0">{item}</span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  )
}
