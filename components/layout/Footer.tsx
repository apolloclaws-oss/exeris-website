'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/lib/language-context'

export function Footer() {
  const { t } = useLang()
  const links = [
    { href: '/vacatures', label: t.nav.vacatures },
    { href: '/voor-werknemers', label: 'Voor werknemers' },
    { href: '/voor-opdrachtgevers', label: 'Voor opdrachtgevers' },
    { href: '/over-ons', label: t.nav.overOns },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <footer className="border-t border-white/5 bg-[#080D1A] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Image src="/logo.svg" alt="Exeris" width={110} height={28} className="mb-2" />
            <div className="text-[#00E676] text-sm">{t.footer.tagline}</div>
          </div>
          <div>
            <div className="text-white/40 text-xs uppercase tracking-widest mb-4">Links</div>
            <div className="flex flex-col gap-2">
              {links.map(l => (
                <Link key={l.href} href={l.href} className="text-white/60 hover:text-white text-sm transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-white/40 text-xs uppercase tracking-widest mb-4">Contact</div>
            <div className="text-white/60 text-sm flex flex-col gap-1">
              <a href="mailto:info@exeris.nl" className="hover:text-white transition-colors">info@exeris.nl</a>
              <span>+31 (0)6 00 000 000</span>
              <span>Nederland</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-white/30 text-xs">
          <span>{t.footer.copy}</span>
          <span>{t.footer.kvk}</span>
        </div>
      </div>
    </footer>
  )
}
