# Exeris Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a world-class bilingual (NL/EN) marketing website for Exeris recruitment agency — dark premium aesthetic, dual-audience (workers + employers), smooth animations, contact form via Resend.

**Architecture:** Next.js 16 App Router, new marketing pages/components alongside existing dashboard/intake (do NOT touch those). Language toggled client-side via React Context + static typed dictionaries. Framer Motion for scroll animations.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, Framer Motion, Resend (already installed), Vercel

**Spec:** `docs/superpowers/specs/2026-03-23-exeris-website-design.md`

**Working directory:** `/Users/stefano/.openclaw/workspace/exeris-website`

---

## Chunk 1: Foundation — Dependencies, Fonts, Global Styles, i18n

### Task 1: Install Framer Motion

**Files:**
- Modify: `package.json`

- [ ] Install framer-motion:
```bash
cd /Users/stefano/.openclaw/workspace/exeris-website && npm install framer-motion
```
Expected: `added X packages` with no errors.

- [ ] Verify install:
```bash
node -e "require('framer-motion'); console.log('ok')"
```
Expected: `ok`

- [ ] Commit:
```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion"
```

---

### Task 2: Update Layout — Fonts & Metadata

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] Replace `app/layout.tsx` with:
```tsx
import type { Metadata } from 'next'
import { Inter, Bricolage_Grotesque, DM_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/language-context'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Exeris | Good For People',
  description: 'Exeris – 40 jaar ervaring in de flexmarkt. Logistiek, sierteelt, kassenwerk en verpakken.',
  keywords: 'uitzendbureau, logistiek, sierteelt, kassenwerk, flexwerk, Nederland',
  openGraph: {
    title: 'Exeris | Good For People',
    description: '40 jaar ervaring in de flexmarkt.',
    url: 'https://exeris.nl',
    siteName: 'Exeris',
    locale: 'nl_NL',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} ${bricolage.variable} ${dmMono.variable}`}>
      <body className="bg-[#080D1A] text-white font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
```

- [ ] Replace `app/globals.css` with:
```css
@import "tailwindcss";

:root {
  --font-inter: 'Inter', sans-serif;
  --font-bricolage: 'Bricolage Grotesque', sans-serif;
  --font-mono: 'DM Mono', monospace;
  --color-bg: #080D1A;
  --color-card: #0F1729;
  --color-green: #00E676;
  --color-green-dark: #00C853;
  --color-purple: #6C63FF;
  --color-muted: #94A3B8;
  --color-border: rgba(255, 255, 255, 0.06);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  background-color: var(--color-bg);
  color: #ffffff;
  font-family: var(--font-inter);
}

h1, h2, h3, h4 {
  font-family: var(--font-bricolage);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] Run dev server to verify no errors:
```bash
npm run dev
```
Expected: `Ready in Xms` with no TypeScript errors.

- [ ] Commit:
```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: add Bricolage Grotesque + DM Mono fonts, update globals"
```

---

### Task 3: i18n — Language Context + Translations

**Files:**
- Create: `lib/language-context.tsx`
- Create: `lib/translations/nl.ts`
- Create: `lib/translations/en.ts`
- Create: `lib/translations/index.ts`

- [ ] Create `lib/language-context.tsx`:
```tsx
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { nl } from './translations/nl'
import { en } from './translations/en'

type Lang = 'nl' | 'en'
type Translations = typeof nl

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'nl',
  setLang: () => {},
  t: nl,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('nl')

  useEffect(() => {
    const saved = localStorage.getItem('exeris-lang') as Lang | null
    if (saved === 'nl' || saved === 'en') setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('exeris-lang', l)
  }

  const t = lang === 'nl' ? nl : en

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
```

- [ ] Create `lib/translations/nl.ts`:
```ts
export const nl = {
  nav: {
    vacatures: 'Vacatures',
    sectoren: 'Sectoren',
    overOns: 'Over ons',
    contact: 'Contact',
    ikZoekWerk: 'Ik zoek werk',
  },
  hero: {
    tag: '40 jaar ervaring in de flexmarkt',
    headline1: 'Werk met',
    headline2: 'respect',
    headline3: 'voor mens en klant.',
    sub: 'Geen loze beloftes. Geen mooie verhalen. Gewoon betrokken mensen die zorgen dat het klopt — voor werkgevers én werknemers.',
    ctaWorker: 'Ik zoek werk',
    ctaEmployer: 'Ik zoek personeel',
  },
  trustBar: {
    label: 'Actief in de sectoren',
  },
  stats: [
    { number: '40+', label: 'Jaar ervaring' },
    { number: '500+', label: 'Plaatsingen per jaar' },
    { number: '6', label: 'Talen gesproken' },
    { number: '4', label: 'Sectoren' },
  ],
  sectors: {
    title: 'Onze sectoren',
    sub: 'We zijn actief in vier sectoren waar we dagelijks het verschil maken.',
    items: [
      { icon: '🚛', title: 'Logistiek', desc: 'Heftruckbestuurders, orderpickers en operators voor warehouses en distributiecentra.' },
      { icon: '🌸', title: 'Sierteelt', desc: 'Gekwalificeerd personeel voor de bloemen- en plantenteelt. Seizoenswerk en vaste plaatsingen.' },
      { icon: '🌿', title: 'Kassenwerk', desc: 'Van oogsten tot sorteren — betrouwbare krachten voor de glastuinbouw.' },
      { icon: '📦', title: 'Ompakken', desc: 'Flexibele inzet voor productie- en verpakkingslijnen. Snel op te schalen bij piekdrukte.' },
    ],
  },
  howItWorks: {
    title: 'Hoe het werkt',
    tabs: {
      worker: 'Ik zoek werk',
      employer: 'Ik zoek personeel',
    },
    workerSteps: [
      { n: '01', title: 'Meld je aan', desc: 'Vul je gegevens in en vertel ons wat je zoekt. We spreken jouw taal.' },
      { n: '02', title: 'We koppelen jou', desc: 'Wij zoeken de juiste match bij een opdrachtgever in jouw sector en omgeving.' },
      { n: '03', title: 'Start met werken', desc: 'Geplaatst, persoonlijk begeleid en eerlijk betaald. Zo simpel is het.' },
    ],
    employerSteps: [
      { n: '01', title: 'Neem contact op', desc: 'Vertel ons je behoefte: sector, aantal mensen, periode en vereisten.' },
      { n: '02', title: 'Wij zoeken voor jou', desc: 'Uit ons netwerk van gekwalificeerde en betrouwbare krachten selecteren wij de juiste match.' },
      { n: '03', title: 'Personeel geleverd', desc: 'Snel, flexibel en betrouwbaar. Met een vaste contactpersoon voor jou.' },
    ],
  },
  testimonials: {
    title: 'Wat anderen zeggen',
    items: [
      { quote: 'Binnen een week stond ik aan het werk. Exeris regelde alles voor mij.', name: 'Maria K.', role: 'Orderpicker · Logistiek' },
      { quote: 'Al 3 jaar leveren ze ons betrouwbaar personeel voor het seizoen. Altijd op tijd, altijd goed.', name: 'Jan van der Berg', role: 'Opdrachtgever · Sierteelt' },
      { quote: 'Ze spreken mijn taal en behandelen me met respect. Dat maakt het verschil.', name: 'Dimitar S.', role: 'Medewerker · Kassenwerk' },
    ],
  },
  splitCta: {
    worker: {
      title: 'Op zoek naar werk?',
      sub: 'Wij plaatsen je snel in de juiste baan. Eerlijk, betrokken en in jouw taal.',
      btn: 'Bekijk vacatures',
    },
    employer: {
      title: 'Personeel nodig?',
      sub: 'Snel en betrouwbaar flexibel personeel. Met een vaste contactpersoon voor jou.',
      btn: 'Neem contact op',
    },
  },
  contact: {
    title: 'Neem contact op',
    sub: 'Vul het formulier in en we nemen zo snel mogelijk contact met je op.',
    naam: 'Naam',
    email: 'E-mailadres',
    type: 'Ik ben een',
    typeWorker: 'Werknemer',
    typeEmployer: 'Opdrachtgever',
    bericht: 'Bericht',
    berichtPlaceholder: 'Vertel ons wat je zoekt...',
    submit: 'Verstuur bericht',
    submitting: 'Versturen...',
    success: 'Bedankt! We nemen zo snel mogelijk contact met je op.',
    error: 'Er is iets misgegaan. Probeer het opnieuw.',
  },
  footer: {
    tagline: 'Good for people.',
    kvk: 'KVK: 12345678',
    copy: '© 2026 Exeris. Alle rechten voorbehouden.',
  },
  workerPage: {
    tag: 'Voor werknemers',
    headline: 'Jouw volgende baan,',
    headline2: 'wij regelen het.',
    sub: 'Snel geplaatst, eerlijk betaald en persoonlijk begeleid — in jouw taal.',
    benefits: [
      { icon: '⚡', title: 'Snel geplaatst', desc: 'Gemiddeld binnen een week aan het werk.' },
      { icon: '💬', title: '6 talen gesproken', desc: 'Nederlands, Engels, Bulgaars, Turks, Pools en Russisch.' },
      { icon: '🤝', title: 'Persoonlijke begeleiding', desc: 'Een vaste contactpersoon die voor je klaarstaat.' },
      { icon: '💰', title: 'Eerlijk loon', desc: 'CAO-conform, altijd op tijd betaald.' },
    ],
    cta: 'Solliciteer direct',
  },
  employerPage: {
    tag: 'Voor opdrachtgevers',
    headline: 'Betrouwbaar personeel,',
    headline2: 'snel geleverd.',
    sub: 'Flexibel op- en afschalen, met een vaste contactpersoon en geen verrassingen.',
    benefits: [
      { icon: '🚀', title: 'Snelle respons', desc: 'Binnen 24 uur eerste kandidaten.' },
      { icon: '🔄', title: 'Flexibel schalen', desc: 'Op- en afschalen wanneer jij dat nodig hebt.' },
      { icon: '👤', title: 'Vaste contactpersoon', desc: 'Één aanspreekpunt, altijd bereikbaar.' },
      { icon: '✅', title: 'No-cure-no-pay', desc: 'Alleen betalen als het werkt.' },
    ],
    cta: 'Neem contact op',
  },
  vacaturesPage: {
    title: 'Openstaande vacatures',
    sub: 'Bekijk onze huidige openstaande posities.',
    filterLabel: 'Filter op sector',
    all: 'Alle sectoren',
    applyBtn: 'Solliciteer',
    vacancies: [
      { title: 'Heftruckbestuurder', sector: 'Logistiek', location: 'Amsterdam', type: 'Fulltime' },
      { title: 'Orderpicker', sector: 'Logistiek', location: 'Rotterdam', type: 'Flex' },
      { title: 'Plukker Sierteelt', sector: 'Sierteelt', location: 'Aalsmeer', type: 'Seizoen' },
      { title: 'Verpakkingsmedewerker', sector: 'Ompakken', location: 'Naaldwijk', type: 'Parttime' },
    ],
  },
  overOnsPage: {
    tag: 'Over Exeris',
    headline: '40 jaar mensen',
    headline2: 'op de juiste plek.',
    story: 'Exeris is al meer dan 40 jaar actief in de Nederlandse flexmarkt. We begonnen klein, met een simpele overtuiging: dat werk beter gaat als je mensen met respect behandelt. Die overtuiging dragen we nog steeds met ons mee.',
    story2: 'We werken dagelijks voor en met mensen uit verschillende culturen, achtergronden en talen. We spreken hun taal — letterlijk. En we zorgen dat werkgevers de mensen krijgen die ze nodig hebben, zonder gedoe.',
    values: [
      { icon: '🤝', title: 'Betrokkenheid', desc: 'We kennen onze mensen. Geen nummers, echte mensen.' },
      { icon: '💯', title: 'Eerlijkheid', desc: 'Geen mooie praatjes. We zeggen wat we doen en doen wat we zeggen.' },
      { icon: '❤️', title: 'Respect', desc: 'Voor werknemer én opdrachtgever. Dat is onze basis.' },
    ],
    teamTitle: 'Ons team',
    ctaTitle: 'Werken bij Exeris?',
    ctaSub: 'We zijn altijd op zoek naar betrokken mensen.',
    ctaBtn: 'Neem contact op',
  },
  contactPage: {
    tag: 'Contact',
    headline: 'Hoe kunnen we',
    headline2: 'je helpen?',
    address: 'Nederland',
    phone: '+31 (0)6 00 000 000',
    emailAddr: 'info@exeris.nl',
  },
}
```

- [ ] Create `lib/translations/en.ts` (English version — same structure, English copy):
```ts
export const en = {
  nav: {
    vacatures: 'Jobs',
    sectoren: 'Sectors',
    overOns: 'About',
    contact: 'Contact',
    ikZoekWerk: 'Find a job',
  },
  hero: {
    tag: '40 years in the flex market',
    headline1: 'Work with',
    headline2: 'respect',
    headline3: 'for people and clients.',
    sub: 'No empty promises. No pretty stories. Just committed people making sure it works — for employers and workers alike.',
    ctaWorker: 'Find a job',
    ctaEmployer: 'Hire staff',
  },
  trustBar: {
    label: 'Active in sectors',
  },
  stats: [
    { number: '40+', label: 'Years experience' },
    { number: '500+', label: 'Placements per year' },
    { number: '6', label: 'Languages spoken' },
    { number: '4', label: 'Sectors' },
  ],
  sectors: {
    title: 'Our sectors',
    sub: 'We operate in four sectors where we make a real difference every day.',
    items: [
      { icon: '🚛', title: 'Logistics', desc: 'Forklift operators, order pickers and production staff for warehouses.' },
      { icon: '🌸', title: 'Floriculture', desc: 'Qualified staff for flower and plant cultivation. Seasonal and permanent.' },
      { icon: '🌿', title: 'Greenhouse', desc: 'From harvesting to sorting — reliable workers for greenhouse horticulture.' },
      { icon: '📦', title: 'Packing', desc: 'Flexible deployment for production and packing lines. Scalable fast.' },
    ],
  },
  howItWorks: {
    title: 'How it works',
    tabs: {
      worker: 'Find a job',
      employer: 'Hire staff',
    },
    workerSteps: [
      { n: '01', title: 'Apply', desc: 'Fill in your details and tell us what you are looking for. We speak your language.' },
      { n: '02', title: 'We match you', desc: 'We find the right match at a client in your sector and area.' },
      { n: '03', title: 'Start working', desc: 'Placed, personally guided and fairly paid. That simple.' },
    ],
    employerSteps: [
      { n: '01', title: 'Get in touch', desc: 'Tell us your need: sector, number of people, period and requirements.' },
      { n: '02', title: 'We find for you', desc: 'From our network of qualified and reliable workers we select the right match.' },
      { n: '03', title: 'Staff delivered', desc: 'Fast, flexible and reliable. With a dedicated contact person for you.' },
    ],
  },
  testimonials: {
    title: 'What others say',
    items: [
      { quote: 'Within a week I was working. Exeris arranged everything for me.', name: 'Maria K.', role: 'Order Picker · Logistics' },
      { quote: 'For 3 years they reliably supply us with seasonal staff. Always on time, always good.', name: 'Jan van der Berg', role: 'Client · Floriculture' },
      { quote: 'They speak my language and treat me with respect. That makes the difference.', name: 'Dimitar S.', role: 'Worker · Greenhouse' },
    ],
  },
  splitCta: {
    worker: {
      title: 'Looking for work?',
      sub: 'We place you quickly in the right job. Fair, personal and in your language.',
      btn: 'View jobs',
    },
    employer: {
      title: 'Need staff?',
      sub: 'Fast and reliable flexible staff. With a dedicated contact person for you.',
      btn: 'Get in touch',
    },
  },
  contact: {
    title: 'Get in touch',
    sub: 'Fill in the form and we will contact you as soon as possible.',
    naam: 'Name',
    email: 'Email address',
    type: 'I am a',
    typeWorker: 'Worker',
    typeEmployer: 'Employer',
    bericht: 'Message',
    berichtPlaceholder: 'Tell us what you are looking for...',
    submit: 'Send message',
    submitting: 'Sending...',
    success: 'Thank you! We will contact you as soon as possible.',
    error: 'Something went wrong. Please try again.',
  },
  footer: {
    tagline: 'Good for people.',
    kvk: 'KVK: 12345678',
    copy: '© 2026 Exeris. All rights reserved.',
  },
  workerPage: {
    tag: 'For workers',
    headline: 'Your next job,',
    headline2: 'we arrange it.',
    sub: 'Placed fast, paid fairly and personally guided — in your language.',
    benefits: [
      { icon: '⚡', title: 'Placed fast', desc: 'On average working within a week.' },
      { icon: '💬', title: '6 languages', desc: 'Dutch, English, Bulgarian, Turkish, Polish and Russian.' },
      { icon: '🤝', title: 'Personal guidance', desc: 'A dedicated contact person ready for you.' },
      { icon: '💰', title: 'Fair pay', desc: 'CAO-compliant, always paid on time.' },
    ],
    cta: 'Apply now',
  },
  employerPage: {
    tag: 'For employers',
    headline: 'Reliable staff,',
    headline2: 'delivered fast.',
    sub: 'Scale up and down flexibly, with a dedicated contact and no surprises.',
    benefits: [
      { icon: '🚀', title: 'Fast response', desc: 'First candidates within 24 hours.' },
      { icon: '🔄', title: 'Scale flexibly', desc: 'Scale up and down whenever you need.' },
      { icon: '👤', title: 'Dedicated contact', desc: 'One point of contact, always reachable.' },
      { icon: '✅', title: 'No-cure-no-pay', desc: 'Only pay when it works.' },
    ],
    cta: 'Get in touch',
  },
  vacaturesPage: {
    title: 'Open positions',
    sub: 'View our current open positions.',
    filterLabel: 'Filter by sector',
    all: 'All sectors',
    applyBtn: 'Apply',
    vacancies: [
      { title: 'Forklift Operator', sector: 'Logistics', location: 'Amsterdam', type: 'Full-time' },
      { title: 'Order Picker', sector: 'Logistics', location: 'Rotterdam', type: 'Flex' },
      { title: 'Floriculture Picker', sector: 'Floriculture', location: 'Aalsmeer', type: 'Seasonal' },
      { title: 'Packing Employee', sector: 'Packing', location: 'Naaldwijk', type: 'Part-time' },
    ],
  },
  overOnsPage: {
    tag: 'About Exeris',
    headline: '40 years placing',
    headline2: 'people right.',
    story: 'Exeris has been active in the Dutch flex market for over 40 years. We started small, with a simple conviction: that work goes better when you treat people with respect. We still carry that conviction with us today.',
    story2: 'Every day we work for and with people from different cultures, backgrounds and languages. We speak their language — literally. And we make sure employers get the people they need, without hassle.',
    values: [
      { icon: '🤝', title: 'Commitment', desc: 'We know our people. No numbers, real people.' },
      { icon: '💯', title: 'Honesty', desc: 'No pretty talk. We say what we do and do what we say.' },
      { icon: '❤️', title: 'Respect', desc: 'For worker and employer alike. That is our foundation.' },
    ],
    teamTitle: 'Our team',
    ctaTitle: 'Work at Exeris?',
    ctaSub: 'We are always looking for committed people.',
    ctaBtn: 'Get in touch',
  },
  contactPage: {
    tag: 'Contact',
    headline: 'How can we',
    headline2: 'help you?',
    address: 'Netherlands',
    phone: '+31 (0)6 00 000 000',
    emailAddr: 'info@exeris.nl',
  },
}
```

- [ ] Create `lib/translations/index.ts`:
```ts
export { nl } from './nl'
export { en } from './en'
```

- [ ] Verify layout wraps correctly — check dev server still runs:
```bash
npm run dev
```
Expected: no TypeScript errors.

- [ ] Commit:
```bash
git add lib/ app/layout.tsx app/globals.css
git commit -m "feat: i18n context + NL/EN translations"
```

---

## Chunk 2: UI Primitives + Layout Components (Navbar, Footer)

### Task 4: UI Primitives

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/AnimatedSection.tsx`

- [ ] Create `components/ui/Button.tsx`:
```tsx
'use client'
import Link from 'next/link'

type ButtonProps = {
  href?: string
  onClick?: () => void
  variant?: 'green' | 'outline' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({ href, onClick, variant = 'green', size = 'md', children, className = '', type = 'button', disabled }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#080D1A]'
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
  const variants = {
    green: 'bg-[#00E676] text-[#080D1A] hover:bg-[#00C853] focus:ring-[#00E676]',
    outline: 'border border-white/30 text-white hover:border-white/60 focus:ring-white',
    purple: 'bg-[#6C63FF] text-white hover:bg-[#5B53EE] focus:ring-[#6C63FF]',
  }
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button type={type} onClick={onClick} className={cls} disabled={disabled}>{children}</button>
}
```

- [ ] Create `components/ui/Badge.tsx`:
```tsx
export function Badge({ children, color = 'green' }: { children: React.ReactNode, color?: 'green' | 'purple' | 'muted' }) {
  const colors = {
    green: 'border-[#00E676]/30 text-[#00E676]',
    purple: 'border-[#6C63FF]/30 text-[#6C63FF]',
    muted: 'border-white/20 text-white/60',
  }
  return (
    <span className={`inline-block text-xs font-medium tracking-widest uppercase border rounded-full px-4 py-1.5 ${colors[color]}`}>
      {children}
    </span>
  )
}
```

- [ ] Create `components/ui/AnimatedSection.tsx`:
```tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function AnimatedSection({ children, className = '', delay = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] Commit:
```bash
git add components/ui/
git commit -m "feat: Button, Badge, AnimatedSection UI primitives"
```

---

### Task 5: Navbar

**Files:**
- Create: `components/layout/Navbar.tsx`
- Delete old: `components/Navbar.tsx` (will be replaced — keep dashboard/intake untouched)

- [ ] Create `components/layout/Navbar.tsx`:
```tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/lib/language-context'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/vacatures', label: t.nav.vacatures },
    { href: '/#sectoren', label: t.nav.sectoren },
    { href: '/over-ons', label: t.nav.overOns },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#080D1A]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Exeris home">
          <Image src="/logo.svg" alt="Exeris" width={120} height={30} priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-white/70 hover:text-white text-sm transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right: lang toggle + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')}
            className="text-sm text-white/60 hover:text-white transition-colors font-mono"
            aria-label="Toggle language"
          >
            {lang === 'nl' ? 'EN' : 'NL'}
          </button>
          <Button href="/voor-werknemers" size="sm">{t.nav.ikZoekWerk}</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="block w-5 h-0.5 bg-white mb-1 transition-all" style={menuOpen ? { transform: 'rotate(45deg) translate(2px, 6px)' } : {}} />
          <span className="block w-5 h-0.5 bg-white mb-1 transition-all" style={menuOpen ? { opacity: 0 } : {}} />
          <span className="block w-5 h-0.5 bg-white transition-all" style={menuOpen ? { transform: 'rotate(-45deg) translate(2px, -6px)' } : {}} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F1729] border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-white/80 hover:text-white text-lg" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-4 mt-2">
            <Button href="/voor-werknemers" size="sm" onClick={() => setMenuOpen(false)}>{t.nav.ikZoekWerk}</Button>
            <Button href="/voor-opdrachtgevers" size="sm" variant="outline" onClick={() => setMenuOpen(false)}>{t.hero.ctaEmployer}</Button>
          </div>
          <button onClick={() => { setLang(lang === 'nl' ? 'en' : 'nl'); setMenuOpen(false) }} className="text-white/50 text-sm text-left mt-2">
            Switch to {lang === 'nl' ? 'English' : 'Nederlands'}
          </button>
        </div>
      )}
    </header>
  )
}
```

- [ ] Commit:
```bash
git add components/layout/Navbar.tsx
git commit -m "feat: Navbar with scroll effect, lang toggle, mobile menu"
```

---

### Task 6: Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] Create `components/layout/Footer.tsx`:
```tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLang } from '@/lib/language-context'

export function Footer() {
  const { t } = useLang()
  const links = [
    { href: '/vacatures', label: t.nav.vacatures },
    { href: '/voor-werknemers', label: 'Voor werknemers' },
    { href: '/voor-opdrachtgevers', label: 'Voor opdrachtgevers' },
    { href: '/over-ons', label: t.nav.overOns },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <footer className="border-t border-white/5 bg-[#080D1A] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Image src="/logo.svg" alt="Exeris" width={110} height={28} className="mb-2" />
            <div className="text-[#00E676] text-sm">{t.footer.tagline}</div>
          </div>
          <div>
            <div className="text-white/40 text-xs uppercase tracking-widest mb-4">Links</div>
            <div className="flex flex-col gap-2">
              {links.map(l => (
                <Link key={l.href} href={l.href} className="text-white/60 hover:text-white text-sm transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-white/40 text-xs uppercase tracking-widest mb-4">Contact</div>
            <div className="text-white/60 text-sm flex flex-col gap-1">
              <a href="mailto:info@exeris.nl" className="hover:text-white transition-colors">info@exeris.nl</a>
              <span>+31 (0)6 00 000 000</span>
              <span>Nederland</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-white/30 text-xs">
          <span>{t.footer.copy}</span>
          <span>{t.footer.kvk}</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] Commit:
```bash
git add components/layout/Footer.tsx
git commit -m "feat: Footer with links, contact, copyright"
```

---

## Chunk 3: Homepage Sections

### Task 7: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] Create `components/sections/Hero.tsx`:
```tsx
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
```

- [ ] Commit:
```bash
git add components/sections/Hero.tsx
git commit -m "feat: Hero section with animated glow + dual CTAs"
```

---

### Task 8: Trust Bar + Stats

**Files:**
- Create: `components/sections/TrustBar.tsx`
- Create: `components/sections/Stats.tsx`

- [ ] Create `components/sections/TrustBar.tsx`:
```tsx
'use client'
import { useLang } from '@/lib/language-context'

const items = [
  '🚛 Logistiek', '🌸 Sierteelt', '🌿 Kassenwerk', '📦 Ompakken',
  '🇳🇱 Nederlands', '🇬🇧 English', '🇧🇬 Bulgaars', '🇹🇷 Turks', '🇵🇱 Pools', '🇷🇺 Russisch',
]

export function TrustBar() {
  const { t } = useLang()
  const doubled = [...items, ...items]

  return (
    <div className="py-10 border-y border-white/5 overflow-hidden">
      <p className="text-center text-white/30 text-xs uppercase tracking-widest mb-6">{t.trustBar.label}</p>
      <div className="relative flex">
        <div
          className="flex gap-10 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="text-white/40 text-sm font-medium shrink-0">{item}</span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
```

- [ ] Create `components/sections/Stats.tsx`:
```tsx
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
```

- [ ] Commit:
```bash
git add components/sections/TrustBar.tsx components/sections/Stats.tsx
git commit -m "feat: TrustBar marquee + Stats animated counters"
```

---

### Task 9: Sectors + How It Works

**Files:**
- Create: `components/sections/Sectors.tsx`
- Create: `components/sections/HowItWorks.tsx`

- [ ] Create `components/sections/Sectors.tsx`:
```tsx
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
```

- [ ] Create `components/sections/HowItWorks.tsx`:
```tsx
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
```

- [ ] Commit:
```bash
git add components/sections/Sectors.tsx components/sections/HowItWorks.tsx
git commit -m "feat: Sectors grid + HowItWorks tabbed section"
```

---

### Task 10: Testimonials + Split CTA

**Files:**
- Create: `components/sections/Testimonials.tsx`
- Create: `components/sections/SplitCTA.tsx`

- [ ] Create `components/sections/Testimonials.tsx`:
```tsx
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
```

- [ ] Create `components/sections/SplitCTA.tsx`:
```tsx
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
```

- [ ] Commit:
```bash
git add components/sections/Testimonials.tsx components/sections/SplitCTA.tsx
git commit -m "feat: Testimonials carousel + Split CTA section"
```

---

## Chunk 4: Contact Form + API Route

### Task 11: ContactForm Component

**Files:**
- Create: `components/sections/ContactForm.tsx`

- [ ] Create `components/sections/ContactForm.tsx`:
```tsx
'use client'
import { useState } from 'react'
import { useLang } from '@/lib/language-context'
import { Button } from '@/components/ui/Button'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function ContactForm({ title, sub }: { title?: string, sub?: string }) {
  const { t } = useLang()
  const [form, setForm] = useState({ naam: '', email: '', type: 'werknemer', bericht: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ naam: '', email: '', type: 'werknemer', bericht: '', website: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputCls = 'w-full bg-[#0F1729] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E676]/50 transition-colors'

  return (
    <AnimatedSection>
      <div className="max-w-2xl mx-auto">
        {title && <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-bricolage)] mb-2 text-center">{title}</h2>}
        {sub && <p className="text-white/50 text-center mb-8">{sub}</p>}

        {status === 'success' ? (
          <div className="bg-[#00E676]/10 border border-[#00E676]/20 rounded-2xl p-8 text-center">
            <div className="text-2xl mb-2">✓</div>
            <p className="text-[#00E676] font-semibold">{t.contact.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/50 mb-2">{t.contact.naam} *</label>
                <input type="text" required className={inputCls} placeholder={t.contact.naam}
                  value={form.naam} onChange={e => setForm(f => ({ ...f, naam: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">{t.contact.email} *</label>
                <input type="email" required className={inputCls} placeholder={t.contact.email}
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">{t.contact.type} *</label>
              <div className="flex gap-3">
                {(['werknemer', 'opdrachtgever'] as const).map(type => (
                  <button key={type} type="button" onClick={() => setForm(f => ({ ...f, type }))}
                    className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                      form.type === type ? 'bg-[#00E676]/10 border-[#00E676]/40 text-[#00E676]' : 'border-white/10 text-white/50 hover:border-white/20'
                    }`}>
                    {type === 'werknemer' ? t.contact.typeWorker : t.contact.typeEmployer}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">{t.contact.bericht} *</label>
              <textarea required rows={5} className={inputCls} placeholder={t.contact.berichtPlaceholder}
                value={form.bericht} onChange={e => setForm(f => ({ ...f, bericht: e.target.value }))} />
            </div>
            {status === 'error' && (
              <p className="text-red-400 text-sm">{t.contact.error}</p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
              {status === 'loading' ? t.contact.submitting : t.contact.submit}
            </Button>
          </form>
        )}
      </div>
    </AnimatedSection>
  )
}
```

- [ ] Commit:
```bash
git add components/sections/ContactForm.tsx
git commit -m "feat: ContactForm with honeypot, type selector, success state"
```

---

### Task 12: /api/contact Route

**Files:**
- Modify: `app/api/contact/route.ts`

- [ ] Replace `app/api/contact/route.ts` with:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { naam, email, type, bericht, website } = body

  // Honeypot check
  if (website) return NextResponse.json({ ok: true })

  // Validation
  const errors: string[] = []
  if (!naam?.trim()) errors.push('naam is required')
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('valid email is required')
  if (!['werknemer', 'opdrachtgever'].includes(type)) errors.push('type must be werknemer or opdrachtgever')
  if (!bericht?.trim() || bericht.trim().length < 10) errors.push('bericht must be at least 10 characters')
  if (errors.length) return NextResponse.json({ error: errors.join(', ') }, { status: 400 })

  try {
    await resend.emails.send({
      from: 'Exeris Website <noreply@exeris.nl>',
      to: process.env.CONTACT_EMAIL_TO || 'info@exeris.nl',
      subject: `Nieuw bericht via exeris.nl — ${type}`,
      text: `Nieuw bericht via exeris.nl\n\nType: ${type}\nNaam: ${naam}\nE-mail: ${email}\n\nBericht:\n${bericht}`,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Kon bericht niet verzenden.' }, { status: 500 })
  }
}
```

- [ ] Update `.env.local.example`:
```
RESEND_API_KEY=re_...
CONTACT_EMAIL_TO=info@exeris.nl
NEXT_PUBLIC_SITE_URL=https://exeris.nl
```

- [ ] Commit:
```bash
git add app/api/contact/route.ts .env.local.example
git commit -m "feat: /api/contact with Resend, validation, honeypot"
```

---

## Chunk 5: Homepage Assembly + Inner Pages

### Task 13: Homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] Replace `app/page.tsx` with:
```tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { TrustBar } from '@/components/sections/TrustBar'
import { Stats } from '@/components/sections/Stats'
import { Sectors } from '@/components/sections/Sectors'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Testimonials } from '@/components/sections/Testimonials'
import { SplitCTA } from '@/components/sections/SplitCTA'
import { ContactForm } from '@/components/sections/ContactForm'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Stats />
      <Sectors />
      <HowItWorks />
      <Testimonials />
      <SplitCTA />
      <section className="py-20 bg-[#0A1020]">
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
```

- [ ] Start dev server and visually verify homepage renders correctly end-to-end:
```bash
npm run dev
# Open http://localhost:3000
```

- [ ] Commit:
```bash
git add app/page.tsx
git commit -m "feat: assemble homepage with all 10 sections"
```

---

### Task 14: Inner Pages

**Files:**
- Create: `app/voor-werknemers/page.tsx`
- Create: `app/voor-opdrachtgevers/page.tsx`
- Create: `app/vacatures/page.tsx`
- Create: `app/over-ons/page.tsx`
- Create: `app/contact/page.tsx`

- [ ] Create `app/voor-werknemers/page.tsx`:
```tsx
'use client'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Sectors } from '@/components/sections/Sectors'
import { ContactForm } from '@/components/sections/ContactForm'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useLang } from '@/lib/language-context'

export default function VoorWerknemers() {
  const { t } = useLang()
  const p = t.workerPage

  return (
    <main>
      <Navbar />
      <section className="min-h-[70vh] flex items-center pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(0,230,118,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <Badge color="green">{p.tag}</Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-bricolage)] leading-tight mt-6 mb-6">
              {p.headline}<br /><span className="text-[#00E676]">{p.headline2}</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mb-10">{p.sub}</p>
            <Button href="/contact" size="lg">{p.cta}</Button>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {p.benefits.map((b, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-[#0F1729] border border-white/[0.06] rounded-2xl p-6">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-lg mb-2 font-[family-name:var(--font-bricolage)]">{b.title}</h3>
                <p className="text-white/50 text-sm">{b.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <Sectors />

      <section className="py-20 bg-[#0A1020]">
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm title={t.contact.title} sub={t.contact.sub} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
```

- [ ] Create `app/voor-opdrachtgevers/page.tsx` (same structure, uses `t.employerPage`, purple accent):
```tsx
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
```

- [ ] Create `app/vacatures/page.tsx`:
```tsx
'use client'
import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Badge } from '@/components/ui/Badge'
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
```

- [ ] Create `app/over-ons/page.tsx`:
```tsx
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
```

- [ ] Create `app/contact/page.tsx`:
```tsx
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
```

- [ ] Commit:
```bash
git add app/voor-werknemers/ app/voor-opdrachtgevers/ app/vacatures/ app/over-ons/ app/contact/
git commit -m "feat: all 5 inner pages"
```

---

## Chunk 6: Final Polish + Build Check

### Task 15: Build Verification

- [ ] Run production build:
```bash
npm run build
```
Expected: `✓ Compiled successfully` with no TypeScript errors. Check for warnings.

- [ ] Run lint:
```bash
npm run lint
```
Expected: no errors.

- [ ] Check all routes load in dev:
```bash
npm run dev
```
Visit: `/`, `/voor-werknemers`, `/voor-opdrachtgevers`, `/vacatures`, `/over-ons`, `/contact`

- [ ] Verify dashboard still works (must not be broken):
```
Visit: /dashboard
```
Expected: dashboard login page renders normally.

- [ ] Commit:
```bash
git add -A
git commit -m "feat: complete Exeris marketing website"
```

---

### Task 16: Deploy to Vercel

- [ ] Set environment variables in Vercel dashboard:
  - `RESEND_API_KEY` — from resend.com
  - `CONTACT_EMAIL_TO` — `info@exeris.nl`
  - `NEXT_PUBLIC_SITE_URL` — `https://exeris.nl`

- [ ] Deploy:
```bash
vercel --prod
```
Expected: `✓ Production deployment complete`

- [ ] Verify live site at `exeris.nl` — check all pages and contact form submission.

- [ ] Final commit:
```bash
git add -A
git commit -m "chore: production deployment verified"
```

---

**Total tasks: 16 | Estimated time: 3–4 hours**
