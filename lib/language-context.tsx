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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
