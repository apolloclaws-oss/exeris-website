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
