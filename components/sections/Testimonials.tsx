'use client'
import { useState, useEffect } from 'react'
import { useLang } from '@/lib/language-context'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function Testimonials() {
  const { t } = useLang()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive(a => (a + 1) % t.testimonials.items.length), 4000)
    return () => clearInterval(timer)
  }, [t.testimonials.items.length])

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-bricolage)]">{t.testimonials.title}</h2>
        </AnimatedSection>

        <div className="relative min-h-[180px]">
          {t.testimonials.items.map((item, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-500 ${
                i === active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="bg-[#0F1729] border border-white/[0.06] rounded-2xl p-8 md:p-10 text-center">
                <div className="text-5xl text-[#00E676]/20 font-[family-name:var(--font-bricolage)] mb-4">"</div>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-6 max-w-3xl mx-auto">
                  {item.quote}
                </p>
                <div>
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-[#00E676]/70 text-sm mt-1">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {t.testimonials.items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${i === active ? 'bg-[#00E676] w-6' : 'bg-white/20'}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
