'use client'
import { useRef, useState, useEffect } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { useLang } from '@/lib/language-context'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

function AnimatedCounter({ target, suffix = '' }: { target: number, suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isInView || shouldReduce) { setCount(target); return }
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, shouldReduce])

  return <span ref={ref}>{count}{suffix}</span>
}

export function Stats() {
  const { t } = useLang()

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((stat, i) => {
            const num = parseInt(stat.number)
            const suffix = stat.number.includes('+') ? '+' : ''
            return (
              <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                <div className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-mono)] text-[#00E676] mb-2">
                  <AnimatedCounter target={num} suffix={suffix} />
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
