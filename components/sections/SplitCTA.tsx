'use client'
import { useLang } from '@/lib/language-context'
import { Button } from '@/components/ui/Button'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function SplitCTA() {
  const { t } = useLang()

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatedSection delay={0}>
            <div className="bg-[rgba(0,230,118,0.06)] border border-[#00E676]/20 rounded-2xl p-10 h-full">
              <div className="text-3xl font-bold font-[family-name:var(--font-bricolage)] mb-3">{t.splitCta.worker.title}</div>
              <p className="text-white/60 mb-8 leading-relaxed">{t.splitCta.worker.sub}</p>
              <Button href="/voor-werknemers" size="lg">{t.splitCta.worker.btn}</Button>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="bg-[rgba(108,99,255,0.06)] border border-[#6C63FF]/20 rounded-2xl p-10 h-full">
              <div className="text-3xl font-bold font-[family-name:var(--font-bricolage)] mb-3">{t.splitCta.employer.title}</div>
              <p className="text-white/60 mb-8 leading-relaxed">{t.splitCta.employer.sub}</p>
              <Button href="/voor-opdrachtgevers" size="lg" variant="purple">{t.splitCta.employer.btn}</Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
