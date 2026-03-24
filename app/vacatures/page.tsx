'use client'
import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { useLang } from '@/lib/language-context'

export default function Vacatures() {
  const { t } = useLang()
  const p = t.vacaturesPage
  const [filter, setFilter] = useState('all')
  const sectors = ['all', ...Array.from(new Set(p.vacancies.map(v => v.sector)))]
  const filtered = filter === 'all' ? p.vacancies : p.vacancies.filter(v => v.sector === filter)

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold font-[family-name:var(--font-bricolage)] mb-4">{p.title}</h1>
            <p className="text-white/50 text-lg">{p.sub}</p>
          </AnimatedSection>

          <AnimatedSection className="flex flex-wrap gap-2 justify-center mb-10">
            {sectors.map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-full text-sm border transition-all ${filter === s ? 'bg-[#00E676] text-[#080D1A] border-[#00E676] font-semibold' : 'border-white/20 text-white/60 hover:border-white/40'}`}>
                {s === 'all' ? p.all : s}
              </button>
            ))}
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((v, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bg-[#0F1729] border border-white/[0.06] rounded-2xl p-6 flex justify-between items-start hover:border-[#00E676]/30 transition-colors group">
                  <div>
                    <h3 className="font-bold text-lg mb-2 font-[family-name:var(--font-bricolage)] group-hover:text-[#00E676] transition-colors">{v.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs bg-[#00E676]/10 text-[#00E676] px-3 py-1 rounded-full">{v.sector}</span>
                      <span className="text-xs text-white/40 px-3 py-1 rounded-full border border-white/10">{v.location}</span>
                      <span className="text-xs text-white/40 px-3 py-1 rounded-full border border-white/10">{v.type}</span>
                    </div>
                  </div>
                  <Button href="/contact" size="sm" className="shrink-0 ml-4">{p.applyBtn}</Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
