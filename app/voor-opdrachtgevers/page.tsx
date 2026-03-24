'use client'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from '@/components/sections/ContactForm'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useLang } from '@/lib/language-context'

export default function VoorOpdrachtgevers() {
  const { t } = useLang()
  const p = t.employerPage

  return (
    <main>
      <Navbar />
      <section className="min-h-[70vh] flex items-center pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_50%,rgba(108,99,255,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <Badge color="purple">{p.tag}</Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-bricolage)] leading-tight mt-6 mb-6">
              {p.headline}<br /><span className="text-[#6C63FF]">{p.headline2}</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mb-10">{p.sub}</p>
            <Button href="/contact" size="lg" variant="purple">{p.cta}</Button>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {p.benefits.map((b, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-[#0F1729] border border-white/[0.06] rounded-2xl p-6 hover:border-[#6C63FF]/30 transition-colors">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-lg mb-2 font-[family-name:var(--font-bricolage)]">{b.title}</h3>
                <p className="text-white/50 text-sm">{b.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#0A1020]">
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm title={t.contact.title} sub={t.contact.sub} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
