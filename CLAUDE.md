# Exeris Website - Claude Code Instructions

## Project
Recruitment agency website for Exeris (exeris.nl) — Dutch staffing agency, 40 years in the flex market.

## Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Deployed on Vercel

## Design System
- Background: #0a0f1e (deep navy)
- Accent: #00e676 (electric green)
- Text: white / white/60 for secondary
- Border radius: rounded-xl / rounded-2xl
- All components are in /components/

## Languages
- Bilingual: Dutch (nl) + English (en)
- Language prop `lang: "nl" | "en"` is passed to every component
- All copy lives in `const t = { nl: {...}, en: {...} }` at top of each component

## Components
- Navbar, Hero, Stats, Services, About, Testimonials, Contact, Footer, Chatbot
- All in /components/*.tsx
- Page: app/page.tsx (client component, holds lang state)

## Rules
- Never hardcode Dutch-only text — always add English translation
- Keep components self-contained (translations inside the component)
- Mobile-first
- No external UI libraries — Tailwind only
- Forms: use Resend API via /api/contact route
- Environment variables go in .env.local (never commit)

## Current Tasks
See task specs passed by Apollo.
