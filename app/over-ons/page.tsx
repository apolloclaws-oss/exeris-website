'use client'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useLang } from '@/lib/language-context'

export default function OverOns() {
  const { t } = useLang()
  const p = t.overOnsPage

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <Badge>{p.tag}</Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-bricolage)] mt-6 mb-8 leading-tight">
              {p.headline}<br /><span className="text-[#00E676]">{p.headline2}</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto mb-4">{p.story}</p>
            <p className="text-white/60 text-lg leading-relaxed max-w-3xl mx-auto">{p.story2}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
            {p.values.map((v, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-[#0F1729] border border-white/[0.06] rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-3">{v.icon}</div>
                  <h3 className="font-bold text-lg mb-2 font-[family-name:var(--font-bricolage)]">{v.title}</h3>
                  <p className="text-white/50 text-sm">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="bg-[#0F1729] border border-white/[0.06] rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-bricolage)] mb-3">{p.ctaTitle}</h2>
            <p className="text-white/50 mb-6">{p.ctaSub}</p>
            <Button href="/contact" size="lg">{p.ctaBtn}</Button>
          </AnimatedSection>
        </div>
      </section>
      <Footer />
    </main>
  )
}
