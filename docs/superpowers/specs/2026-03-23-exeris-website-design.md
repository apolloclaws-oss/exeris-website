# Exeris Website — Design Spec
**Date:** 2026-03-23
**Status:** Approved
**Owner:** Stefano + Claude Code

---

## Overview
Marketing website for Exeris, Dutch recruitment agency specialising in logistics, floriculture, greenhouse work, and packing. Dual-audience (workers + employers). No intake/dashboard this phase. Pure marketing, maximum design quality.

---

## Goals
- Convert both workers and employers
- Look world-class — premium dark aesthetic, smooth animations
- Bilingual: Dutch (default) and English
- Fast, lightweight — no database, no auth
- Deploy to Vercel, contact form via Resend
- Lighthouse ≥ 90 (performance, accessibility, SEO)

---

## Tech Stack
| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion (client-only, SSR fallback) |
| i18n | React Context + static JSON dictionaries |
| Contact form | Resend API |
| Deployment | Vercel |
| Fonts | Bricolage Grotesque + Inter + DM Mono (via `next/font`) |

---

## i18n Approach
- Language toggle (NL/EN) in navbar, persisted to `localStorage`
- Default language: `nl`
- Implementation: a `LanguageContext` (React Context) wraps the entire app
- All copy lives in `/lib/translations/nl.ts` and `/lib/translations/en.ts` — typed dictionaries
- **No URL-based routing** (no `/nl/` prefix) — single URL, language toggled client-side
- URL slugs stay Dutch (`/voor-werknemers`, `/voor-opdrachtgevers`) regardless of language
- Framer Motion animations disabled when `prefers-reduced-motion: reduce` is set

---

## Visual Identity
- **Background:** `#080D1A`
- **Accent green:** `#00E676` (workers, primary CTAs)
- **Accent purple:** `#6C63FF` (employers)
- **Card bg:** `#0F1729` with `rgba(255,255,255,0.06)` border
- **Text primary:** `#FFFFFF`
- **Text muted:** `#94A3B8`

---

## Environment Variables
```
RESEND_API_KEY=re_...          # From resend.com
CONTACT_EMAIL_TO=info@exeris.nl  # Where contact form emails are sent
NEXT_PUBLIC_SITE_URL=https://exeris.nl
```

---

## Folder Structure
```
/app
  /page.tsx                  ← Homepage
  /voor-werknemers/page.tsx
  /voor-opdrachtgevers/page.tsx
  /vacatures/page.tsx
  /over-ons/page.tsx
  /contact/page.tsx
  /api/contact/route.ts
/components
  /ui/                       ← Reusable primitives (Button, Card, Badge)
  /sections/                 ← Homepage sections (Hero, Stats, Sectors, etc.)
  /layout/                   ← Navbar, Footer
/lib
  /translations/
    nl.ts
    en.ts
  /resend.ts
/public
  /fonts/
  /images/
```

---

## Pages & Routes

### `/` — Homepage
10 sections (see detail below).

### `/voor-werknemers`
- Hero: "Jouw volgende baan, wij regelen het." — direct, worker tone
- Benefits: snel geplaatst, eerlijk loon, persoonlijke begeleiding, 6 talen gesproken
- Sectors grid (same 4 cards)
- Worker testimonials (2)
- CTA: "Solliciteer nu" → `/contact`

### `/voor-opdrachtgevers`
- Hero: "Betrouwbaar personeel, snel geleverd."
- Benefits: snelle respons, flexibel op- en afschalen, vaste begeleider, no-cure-no-pay
- How it works (employer flow, 3 steps)
- Employer testimonials (2)
- CTA: "Neem contact op" → `/contact`

### `/vacatures`
- Static hardcoded list of 4 open positions (placeholder, no DB)
- Each vacancy: title, sector badge, location (NL), type (Fulltime/Parttime/Flex), "Solliciteer" button → `/contact`
- Example vacancies:
  1. Heftruckbestuurder — Logistiek — Amsterdam — Fulltime
  2. Orderpicker — Logistiek — Rotterdam — Flex
  3. Plukker Sierteelt — Sierteelt — Aalsmeer — Seizoen
  4. Verpakkingsmedewerker — Ompakken — Naaldwijk — Parttime

### `/over-ons`
- Company story: 40 jaar in de flexmarkt, opgericht in [jaar], gevestigd in Nederland
- Values: Eerlijkheid, Betrokkenheid, Respect
- Team section: 2–3 placeholder cards (photo placeholder, name, role)
- CTA to contact

### `/contact`
- Full contact form (same fields as homepage contact section — see below)
- Address, phone, email displayed
- No Google Maps (keep it clean)

---

## Homepage Sections (detail)

### 1. Navbar
- Logo (text "Exeris" or SVG) left
- Nav links center: Vacatures, Sectoren, Over ons, Contact
- Right: language toggle (NL | EN) + "Ik zoek werk" pill button (green)
- Transparent on top → `backdrop-blur` dark on scroll
- Mobile: hamburger → full-screen overlay with all links + both CTAs

### 2. Hero
- Full-screen (100vh)
- Background: `#080D1A` with animated radial gradient glow (green, shifts slowly)
- Tag: "40 jaar ervaring in de flexmarkt" (small pill, green border)
- Headline: `Werk met <green>respect</green>` / `voor mens en klant.`
- Sub: "Geen loze beloftes. Gewoon betrokken mensen die zorgen dat het klopt."
- Two CTAs: "Ik zoek werk" (green filled) + "Ik zoek personeel" (outline white)
- Scroll arrow (bouncing, bottom center)

### 3. Trust Bar
- Label: "Actief in de sectoren" (small, muted)
- Auto-scrolling marquee (left, looped, pauses on hover):
  `🚛 Logistiek  ·  🌸 Sierteelt  ·  🌿 Kassenwerk  ·  📦 Ompakken  ·  🇳🇱 Nederlands  ·  🇬🇧 English  ·  🇧🇬 Bulgaars  ·  🇹🇷 Turks  ·  🇵🇱 Pools  ·  🇷🇺 Russisch`

### 4. Stats
Animated counters (Framer Motion, triggered by `useInView`, disabled if `prefers-reduced-motion`):
| Number | Label |
|--------|-------|
| 40+ | Jaar ervaring |
| 500+ | Plaatsingen per jaar |
| 6 | Talen gesproken |
| 4 | Sectoren |

### 5. Sectors
2×2 grid of cards:
| Icon | Title | Description |
|------|-------|-------------|
| 🚛 | Logistiek | Heftruckbestuurders, orderpickers en operators voor warehouses. |
| 🌸 | Sierteelt | Gekwalificeerd personeel voor de bloemen- en plantenteelt. |
| 🌿 | Kassenwerk | Van oogsten tot sorteren — krachten voor de glastuinbouw. |
| 📦 | Ompakken | Flexibele inzet voor productie- en verpakkingslijnen. |

Cards: dark bg, hover → lift + green glow border.

### 6. How It Works (tabbed)
Two tabs: **Werknemer** / **Opdrachtgever**

**Werknemer tab:**
1. 📋 "Meld je aan" — Vul je gegevens in, vertel wat je zoekt
2. 🤝 "We koppelen jou" — Wij zoeken de juiste match bij een opdrachtgever
3. 🚀 "Start met werken" — Geplaatst, begeleid, eerlijk betaald

**Opdrachtgever tab:**
1. 📞 "Neem contact op" — Vertel ons je behoefte: sector, aantal, periode
2. 🔍 "Wij zoeken voor jou" — Uit ons netwerk van gekwalificeerde krachten
3. ✅ "Personeel geleverd" — Snel, flexibel en betrouwbaar

### 7. Testimonials
Auto-rotating carousel (3s interval, manual dots navigation):

| Quote | Name | Role |
|-------|------|------|
| "Binnen een week stond ik aan het werk. Exeris regelde alles." | Maria K. | Orderpicker, Logistiek |
| "Al 3 jaar leveren ze ons betrouwbaar personeel voor het seizoen." | Jan van der Berg | Opdrachtgever, Sierteelt |
| "Ze spreken mijn taal en behandelen me met respect." | Dimitar S. | Kassenwerk |

Card design: dark bg, large quote mark, quote text, name + sector badge.

### 8. Split CTA
Side-by-side (50/50 on desktop, stacked on mobile):
- **Left** (green tint `rgba(0,230,118,0.08)`): "Op zoek naar werk?" / "Wij plaatsen je snel in de juiste baan." / Button: "Bekijk vacatures" → `/voor-werknemers`
- **Right** (purple tint `rgba(108,99,255,0.08)`): "Personeel nodig?" / "Snel en betrouwbaar flexibel personeel." / Button: "Neem contact op" → `/voor-opdrachtgevers`

### 9. Contact Section
Embedded on homepage AND full `/contact` page (same component, `<ContactForm />`).

**Fields:**
- Naam (required, text)
- E-mailadres (required, email)
- Ik ben een (required, radio: Werknemer / Opdrachtgever)
- Bericht (required, textarea)
- Honeypot: hidden `website` field (if filled → reject silently)

**On submit:** POST to `/api/contact`, show inline success ("Bedankt! We nemen contact op.") or error message.

### 10. Footer
- Logo + tagline: "Good for people."
- Links: Vacatures, Voor werknemers, Voor opdrachtgevers, Over ons, Contact
- Socials: LinkedIn, Instagram (placeholder hrefs)
- KVK: [nummer]
- Copyright: © 2026 Exeris

---

## `/api/contact` Route

**Request (POST):**
```json
{
  "naam": "string (required)",
  "email": "string (required, valid email)",
  "type": "werknemer | opdrachtgever (required)",
  "bericht": "string (required, min 10 chars)",
  "website": "string (honeypot, must be empty)"
}
```

**Validation:** server-side, return 400 with field errors if invalid.
**Honeypot:** if `website` is non-empty, return 200 silently (don't send email).
**On success:** send email via Resend to `CONTACT_EMAIL_TO`, return 200.
**On failure:** return 500 with `{ error: "Kon bericht niet verzenden." }`

**Email template (plain text):**
```
Nieuw bericht via exeris.nl

Type: [werknemer/opdrachtgever]
Naam: [naam]
E-mail: [email]

Bericht:
[bericht]
```

---

## Performance & Accessibility

- All Framer Motion animations: client-only (`'use client'`), SSR fallback shows static state
- `prefers-reduced-motion`: all animations disabled if set
- `next/font` for zero layout shift on fonts
- Images: `next/image` with explicit width/height
- All interactive elements: keyboard navigable, ARIA labels
- Color contrast: all text meets WCAG AA minimum

---

## Out of Scope (Phase 2)
- Intake form (`/intake`)
- Supabase / database
- Dashboard & auth
- Dynamic job listings
- Blog / nieuws
