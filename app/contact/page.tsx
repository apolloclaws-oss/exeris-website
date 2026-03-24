'use client'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from '@/components/sections/ContactForm'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { useLang } from '@/lib/language-context'

export default function Contact() {
  const { t } = useLang()
  const p = t.contactPage

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <Badge>{p.tag}</Badge>
            <h1 className="text-5xl md:text-6xl font-bold font-[family-name:var(--font-bricolage)] mt-6 mb-4">
              {p.headline}<br /><span className="text-[#00E676]">{p.headline2}</span>
            </h1>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <AnimatedSection className="lg:col-span-2">
              <ContactForm />
            </AnimatedSection>
            <AnimatedSection delay={0.1} className="flex flex-col gap-4">
              {[
                { icon: '📍', label: 'Adres', value: p.address },
                { icon: '📞', label: 'Telefoon', value: p.phone },
                { icon: '✉️', label: 'E-mail', value: p.emailAddr },
              ].map((item, i) => (
                <div key={i} className="bg-[#0F1729] border border-white/[0.06] rounded-xl p-5">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="text-white">{item.value}</div>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
