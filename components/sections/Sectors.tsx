'use client'
import { useLang } from '@/lib/language-context'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function Sectors() {
  const { t } = useLang()

  return (
    <section id="sectoren" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-bricolage)] mb-4">{t.sectors.title}</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">{t.sectors.sub}</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {t.sectors.items.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="group bg-[#0F1729] border border-white/[0.06] rounded-2xl p-8 hover:border-[#00E676]/40 hover:bg-[#0F1729]/80 hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#00E676] transition-colors font-[family-name:var(--font-bricolage)]">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
