'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLang } from '@/lib/i18n/LanguageContext'

export default function AnnouncementBar() {
  const pathname = usePathname()
  const { lang } = useLang()
  const [visible, setVisible] = useState<boolean | null>(null)

  useEffect(() => {
    const dismissed = localStorage.getItem('pc_announcement_dismissed')
    setVisible(dismissed !== 'true')
  }, [])

  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/assistant') ||
    pathname.startsWith('/auth')
  ) {
    return null
  }

  if (visible === null || !visible) return null

  function handleDismiss() {
    localStorage.setItem('pc_announcement_dismissed', 'true')
    setVisible(false)
  }

  return (
    <>
      <style>{`
        @keyframes pc-dot-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
      <div
        className="relative flex items-center justify-center"
        style={{
          background: '#161310',
          borderBottom: '1px solid rgba(232,227,220,0.06)',
          minHeight: '40px',
          paddingTop: '8px',
          paddingBottom: '8px',
        }}
      >
        <div style={{ padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '7px',
              height: '7px',
              borderRadius: '9999px',
              background: '#2D9E6B',
              flexShrink: 0,
              animation: 'pc-dot-pulse 2s ease-in-out infinite',
            }}
          />
          <span className="flex items-center gap-2 font-sans" style={{ fontSize: '13px', color: '#A8A099' }}>
            <span className="hidden md:inline">
              {lang === 'es' ? (
                <>
                  <span style={{ color: '#6B6560' }}>Programa de Socios Fundadores · </span>
                  <span style={{ color: '#E8E3DC' }}>3 lugares disponibles — tarifas de por vida con 20% de descuento.</span>
                </>
              ) : (
                <>
                  <span style={{ color: '#6B6560' }}>Founding Partner Program · </span>
                  <span style={{ color: '#E8E3DC' }}>3 spots remaining — lock in 20% off for life.</span>
                </>
              )}
            </span>
            <span className="md:hidden" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '60vw' }}>
              {lang === 'es'
                ? '3 lugares — 20% de por vida.'
                : '3 spots left — 20% off.'}
            </span>
            <button
              onClick={() => {
                const el = document.getElementById('founding-partners')
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                } else {
                  window.location.href = '/#founding-partners'
                }
              }}
              className="font-sans hover:text-[#D4784A] transition-colors"
              style={{ fontSize: '13px', color: '#C96A3A', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', whiteSpace: 'nowrap' }}
            >
              {lang === 'es' ? 'Agenda tu llamada →' : 'Book your call →'}
            </button>
          </span>
        </div>
        <button
          onClick={handleDismiss}
          className="absolute hover:text-[#A8A099] transition-colors"
          style={{
            right: '16px',
            top: '8px',
            background: 'none',
            border: 'none',
            color: '#6B6560',
            fontSize: '18px',
            cursor: 'pointer',
            lineHeight: 1,
            padding: 0,
          }}
          aria-label="Dismiss announcement"
        >
          ×
        </button>
      </div>
    </>
  )
}
