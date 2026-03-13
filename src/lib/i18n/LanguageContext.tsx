'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, translations, TranslationKey } from './translations'

interface LanguageContextType {
  lang: Language
  t: TranslationKey
  setLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  t: translations.en,
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('pc_lang') as Language | null
    if (saved === 'en' || saved === 'es') {
      setLangState(saved)
      return
    }
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('es')) {
      setLangState('es')
    } else {
      setLangState('en')
    }
  }, [])

  function setLang(newLang: Language) {
    setLangState(newLang)
    localStorage.setItem('pc_lang', newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
