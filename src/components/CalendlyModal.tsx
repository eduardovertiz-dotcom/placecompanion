'use client'
import { useLang } from '@/lib/i18n/LanguageContext'

interface CalendlyModalProps {
  onClose: () => void
}

export default function CalendlyModal({ onClose }: CalendlyModalProps) {
  const { lang } = useLang()

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 60,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#0F0D0B',
          border: '1px solid rgba(232,227,220,0.08)',
          borderRadius: '16px',
          padding: '40px',
          maxWidth: '440px',
          width: '100%',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: 'none', color: '#6B6560', cursor: 'pointer', fontSize: '22px', lineHeight: 1 }}>×</button>

        <h2 className="font-serif font-normal" style={{ fontSize: '26px', color: '#FFFFFF', marginBottom: '8px' }}>
          {lang === 'es' ? 'Elige un horario' : 'Choose a time'}
        </h2>
        <p className="font-sans" style={{ fontSize: '14px', color: '#6B6560', marginBottom: '28px' }}>
          {lang === 'es' ? 'Selecciona el tipo de llamada que prefieras.' : 'Select the type of call that works best for you.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="https://calendly.com/placecompanion/15-minute-discovery-call"
            target="_blank" rel="noopener noreferrer" onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '12px', padding: '20px 24px', textDecoration: 'none' }}>
            <div>
              <span className="font-sans" style={{ fontSize: '11px', color: '#2D9E6B', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>15 min</span>
              <p className="font-sans" style={{ fontSize: '15px', fontWeight: 500, color: '#FFFFFF', marginBottom: '4px' }}>
                {lang === 'es' ? 'Llamada de Descubrimiento' : 'Quick Discovery Call'}
              </p>
              <p className="font-sans" style={{ fontSize: '13px', color: '#6B6560' }}>
                {lang === 'es' ? 'Perfecto si estás explorando opciones' : "Perfect if you're exploring your options"}
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#6B6560" strokeWidth="1.25" strokeLinecap="round"/></svg>
          </a>

          <a href="https://calendly.com/placecompanion/30min"
            target="_blank" rel="noopener noreferrer" onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '12px', padding: '20px 24px', textDecoration: 'none' }}>
            <div>
              <span className="font-sans" style={{ fontSize: '11px', color: '#C96A3A', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>30 min</span>
              <p className="font-sans" style={{ fontSize: '15px', fontWeight: 500, color: '#FFFFFF', marginBottom: '4px' }}>
                {lang === 'es' ? 'Demo Completa' : 'Full Demo & Walkthrough'}
              </p>
              <p className="font-sans" style={{ fontSize: '13px', color: '#6B6560' }}>
                {lang === 'es' ? 'Ve todo lo que Place Companion puede hacer' : 'See everything Place Companion can do'}
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#6B6560" strokeWidth="1.25" strokeLinecap="round"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}
