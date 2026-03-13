'use client'
import { useLang } from '@/lib/i18n/LanguageContext'

export default function LanguageToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="inline-flex items-center gap-1 font-sans" style={{ fontSize: '13px' }}>
      <button
        onClick={() => setLang('en')}
        style={{
          color: lang === 'en' ? '#E8E3DC' : '#6B6560',
          fontWeight: lang === 'en' ? 500 : 400,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '2px 4px',
          transition: 'color 0.2s',
        }}
      >
        EN
      </button>
      <span style={{ color: '#6B6560' }}>·</span>
      <button
        onClick={() => setLang('es')}
        style={{
          color: lang === 'es' ? '#E8E3DC' : '#6B6560',
          fontWeight: lang === 'es' ? 500 : 400,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '2px 4px',
          transition: 'color 0.2s',
        }}
      >
        ES
      </button>
    </div>
  )
}
