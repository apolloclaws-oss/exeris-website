'use client'
import { useState } from 'react'
import { useLang } from '@/lib/language-context'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function HowItWorks() {
  const { t } = useLang()
  const [tab, setTab] = useState<'worker' | 'employer'>('worker')
  const steps = tab === 'worker' ? t.howItWorks.workerSteps : t.howItWorks.employerSteps

  return (
    <section className="py-20 bg-[#0A1020]">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-bricolage)] mb-8">{t.howItWorks.title}</h2>
          <div className="inline-flex bg-[#0F1729] border border-white/10 rounded-full p-1 gap-1">
            {(['worker', 'employer'] as const).map(key => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  tab === key ? 'bg-[#00E676] text-[#080D1A]' : 'text-white/60 hover:text-white'
                }`}
              >
                {key === 'worker' ? t.howItWorks.tabs.worker : t.howItWorks.tabs.employer}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <AnimatedSection key={`${tab}-${i}`} delay={i * 0.1}>
              <div className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-[#00E676]/20 z-0" style={{ width: 'calc(100% - 2rem)' }} />
                )}
                <div className="relative z-10">
                  <div className="text-5xl font-bold font-[family-name:var(--font-mono)] text-[#00E676]/20 mb-4">{step.n}</div>
                  <h3 className="text-lg font-bold mb-2 font-[family-name:var(--font-bricolage)]">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
