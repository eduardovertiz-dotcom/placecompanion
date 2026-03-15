'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function AnnouncementBar() {
  const pathname = usePathname()
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
          height: '40px',
        }}
      >
        <div className="flex items-center" style={{ gap: '8px' }}>
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
          <span className="font-sans" style={{ fontSize: '13px', color: '#A8A099' }}>
            Founding Partner spots:{' '}
          </span>
          <span className="font-sans" style={{ fontSize: '13px', color: '#FAF9F5', fontWeight: 500 }}>
            4 of 10 remaining
          </span>
          <span className="font-sans" style={{ fontSize: '13px', color: '#A8A099' }}>
            {' '}— lock in 20% off for life
          </span>
          <button
            onClick={() => {
              const el = document.getElementById('founding-partners')
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
            className="font-sans hover:text-[#D4784A] transition-colors"
            style={{
              fontSize: '13px',
              color: '#C96A3A',
              fontWeight: 500,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'inherit',
            }}
          >
            Book your call →
          </button>
        </div>
        <button
          onClick={handleDismiss}
          className="absolute hover:text-[#A8A099] transition-colors"
          style={{
            right: '16px',
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
