'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/lib/language-context'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export function Hero() {
  const { t } = useLang()
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={shouldReduce ? {} : {
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,230,118,0.07) 0%, transparent 70%)',
            'radial-gradient(ellipse 80% 60% at 55% 35%, rgba(0,230,118,0.10) 0%, transparent 70%)',
            'radial-gradient(ellipse 80% 60% at 45% 45%, rgba(0,230,118,0.07) 0%, transparent 70%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Badge color="green">{t.hero.tag}</Badge>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-bricolage)] leading-tight mt-8 mb-6"
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t.hero.headline1}{' '}
          <span className="text-[#00E676]">{t.hero.headline2}</span>
          <br />
          {t.hero.headline3}
        </motion.h1>

        <motion.p
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button href="/voor-werknemers" size="lg">{t.hero.ctaWorker}</Button>
          <Button href="/voor-opdrachtgevers" size="lg" variant="outline">{t.hero.ctaEmployer}</Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-sm flex flex-col items-center gap-2"
        animate={shouldReduce ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <span>↓</span>
      </motion.div>
    </section>
  )
}
