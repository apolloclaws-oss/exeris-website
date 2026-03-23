'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/lib/language-context'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/vacatures', label: t.nav.vacatures },
    { href: '/#sectoren', label: t.nav.sectoren },
    { href: '/over-ons', label: t.nav.overOns },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#080D1A]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Exeris home">
          <Image src="/logo.svg" alt="Exeris" width={120} height={30} priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-white/70 hover:text-white text-sm transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right: lang toggle + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')}
            className="text-sm text-white/60 hover:text-white transition-colors font-mono"
            aria-label="Toggle language"
          >
            {lang === 'nl' ? 'EN' : 'NL'}
          </button>
          <Button href="/voor-werknemers" size="sm">{t.nav.ikZoekWerk}</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="block w-5 h-0.5 bg-white mb-1 transition-all" style={menuOpen ? { transform: 'rotate(45deg) translate(2px, 6px)' } : {}} />
          <span className="block w-5 h-0.5 bg-white mb-1 transition-all" style={menuOpen ? { opacity: 0 } : {}} />
          <span className="block w-5 h-0.5 bg-white transition-all" style={menuOpen ? { transform: 'rotate(-45deg) translate(2px, -6px)' } : {}} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F1729] border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-white/80 hover:text-white text-lg" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-4 mt-2">
            <Button href="/voor-werknemers" size="sm" onClick={() => setMenuOpen(false)}>{t.nav.ikZoekWerk}</Button>
            <Button href="/voor-opdrachtgevers" size="sm" variant="outline" onClick={() => setMenuOpen(false)}>{t.hero.ctaEmployer}</Button>
          </div>
          <button onClick={() => { setLang(lang === 'nl' ? 'en' : 'nl'); setMenuOpen(false) }} className="text-white/50 text-sm text-left mt-2">
            Switch to {lang === 'nl' ? 'English' : 'Nederlands'}
          </button>
        </div>
      )}
    </header>
  )
}
