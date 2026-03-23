'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ChatInterface } from "@/components/chat-interface";
import { FaqSection } from "@/components/faq-section";
import { marazulChatConfig } from "@/lib/marazul-config";
import { useLang } from "@/lib/i18n/LanguageContext";
import CalendlyModal from "@/components/CalendlyModal"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export default function HomePage() {
  const { t, lang } = useLang();
  const [showBar, setShowBar] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)
  const [activeConvo, setActiveConvo] = useState<0|1|2|3>(0)
  const [dashVisible, setDashVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBar(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setDashVisible(false)
    const el = document.getElementById('dashboard-teaser')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDashVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const heroChatConfig = {
    ...marazulChatConfig,
    suggestionChips: [
      marazulChatConfig.suggestionChips![0],
      marazulChatConfig.suggestionChips![1],
      marazulChatConfig.suggestionChips![4],
    ],
  };

  const howItWorksSteps = [
    { num: "01", title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
    { num: "02", title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
    { num: "03", title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc },
  ];

  const teaserDays = Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      questions: Math.round(18 + Math.sin(i * 0.4) * 12 + i * 1.2 + (d.getDay() === 0 || d.getDay() === 6 ? 15 : 0)),
    }
  })

  const teaserCategories = [
    { name: lang === 'es' ? 'Alimentos y bebidas' : 'Food & Beverage', pct: 28 },
    { name: lang === 'es' ? 'Actividades' : 'Local Activities', pct: 22 },
    { name: lang === 'es' ? 'Spa' : 'Spa & Wellness', pct: 18 },
    { name: lang === 'es' ? 'Habitaciones' : 'Room Services', pct: 14 },
    { name: lang === 'es' ? 'Transporte' : 'Transportation', pct: 10 },
    { name: lang === 'es' ? 'Check-in/out' : 'Check-in / Out', pct: 5 },
    { name: lang === 'es' ? 'Otro' : 'Other', pct: 3 },
  ]

  const teaserTotal = teaserDays.reduce((sum, d) => sum + d.questions, 0)

  return (
    <div className="min-h-screen overflow-x-hidden pb-20 md:pb-0" style={{ background: "#080706" }}>
      <SiteNav />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="py-12 md:py-20 flex items-center" style={{ background: "#080706" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <div>
              <h1 className="heading-hero font-serif font-normal text-[#FFFFFF] text-balance">
                {t.hero.headline}
              </h1>
              <p className="font-sans font-light mt-6 md:mt-8" style={{ fontSize: "18px", lineHeight: 1.7, color: "#9C9A93" }}>
                {t.hero.subhead}
              </p>
              <div className="mt-8 md:mt-12">
                <Link
                  href="/onboarding"
                  className="font-sans text-[14px] font-medium text-[#FAF9F5] bg-[#C96A3A] hover:bg-[#D4784A] h-11 px-6 rounded-md transition-colors inline-flex items-center"
                >
                  {t.hero.primaryCta}
                </Link>
                <p className="font-sans mt-3" style={{ fontSize: '14px', color: '#A8A099' }}>
                  {t.hero.trust}
                </p>

              </div>
            </div>

            {/* Frame wrapper — absolute-inset gradient border */}
            <div
              className="hidden md:block h-[420px] md:h-[580px]"
              style={{
                position: 'relative',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(232,227,220,0.35) 0%, rgba(232,227,220,0.08) 50%, rgba(232,227,220,0.28) 100%)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              }}
            >
              <div style={{ position: 'absolute', top: '1.5px', right: '1.5px', bottom: '1.5px', left: '1.5px', borderRadius: '18.5px', background: '#0F0D0B', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="flex-shrink-0 px-6 py-5" style={{ borderBottom: "1px solid rgba(250,249,245,0.08)" }}>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-[18px] md:text-[20px] font-semibold text-[#FAF9F5]">
                      MarAzul Riviera Maya
                    </span>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FAF9F5" }} />
                  </div>
                  <p className="font-sans text-[13px] font-normal text-[#9C9A93] mt-1">Part of the MarAzul Collection</p>
                  <p className="font-sans text-[15px] font-light text-[#9C9A93] mt-1">Your 24/7 AI Guest Companion</p>
                </div>
                <ChatInterface config={heroChatConfig} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── REAL QUESTIONS STRIP ─────────────────────────── */}
      <section className="py-20 overflow-hidden" style={{ background: '#1A1715' }}>
        <div className="text-center mb-10">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#2D9E6B',
                flexShrink: 0,
                animation: 'pc-dot-pulse 1.5s ease-in-out infinite',
              }}
            />
            <p className="font-sans uppercase tracking-widest" style={{ fontSize: '16px', color: '#A8A099', lineHeight: 1.4 }}>
              {lang === 'es' ? 'Los huéspedes preguntan.' : 'Guests are asking.'}
            </p>
          </div>
          <p className="font-sans uppercase tracking-widest" style={{ fontSize: '16px', lineHeight: 1.4 }}>
            <span style={{ color: '#C96A3A' }}>{lang === 'es' ? 'Ahora mismo.' : 'Right now.'}</span>
          </p>
        </div>

        {/* Row 1 — scrolls left */}
        <div
          className="overflow-hidden mb-4"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div className="marquee-row animate-scroll-left">
            {[...t.realQuestions.row1, ...t.realQuestions.row1].map((q, i) => (
              <span
                key={i}
                className="font-sans flex-shrink-0 rounded-full marquee-chip"
                style={{
                  background: '#242019',
                  border: '1px solid rgba(232,227,220,0.10)',
                  padding: '12px 28px',
                  fontSize: '20px',
                  fontWeight: 400,
                  color: '#C4BDB6',
                  whiteSpace: 'nowrap',
                }}
              >
                {q}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div
          className="overflow-hidden pb-8"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div className="marquee-row animate-scroll-right">
            {[...t.realQuestions.row2, ...t.realQuestions.row2].map((q, i) => (
              <span
                key={i}
                className="font-sans flex-shrink-0 rounded-full marquee-chip"
                style={{
                  background: '#242019',
                  border: '1px solid rgba(232,227,220,0.10)',
                  padding: '12px 28px',
                  fontSize: '20px',
                  fontWeight: 400,
                  color: '#C4BDB6',
                  whiteSpace: 'nowrap',
                }}
              >
                {q}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────── */}
      <section style={{ background: '#141210', borderTop: '1px solid rgba(232,227,220,0.04)', borderBottom: '1px solid rgba(232,227,220,0.04)' }}>
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-32 text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <p className="font-serif font-light" style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)', color: '#FFFFFF', lineHeight: 1 }}>
            $47B
          </p>
          <p className="font-sans mt-6" style={{ fontSize: '18px', color: '#A8A099', lineHeight: 1.6 }}>
            {lang === 'es'
              ? 'perdidos anualmente por hoteles en fricción evitable con huéspedes.'
              : 'lost annually by hotels to avoidable guest friction.'}
          </p>
          <p className="font-sans mt-4" style={{ fontSize: '11px', color: '#6B6560', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Medallia, 2024
          </p>
        </div>
      </section>

      {/* ── REVENUE ──────────────────────────────────────── */}
      <section className="py-20 md:py-32" style={{ background: "#141210" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-12 lg:gap-20 items-start">

            {/* Left */}
            <div>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-8">
                <circle cx="24" cy="24" r="23" stroke="#FAF9F5" strokeWidth="1.5"/>
                <path d="M24 13v22M29 17.5C29 14.9 26.8 13.5 24 13.5s-5 1.4-5 4c0 5.5 10 4.5 10 10 0 3-2.2 5-5 5s-5-2-5-5" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <h2 className="heading-section font-serif font-normal text-[#FFFFFF]">
                {t.revenue.headline}
              </h2>
              <p className="font-sans font-light text-[#9C9A93] mt-5" style={{ fontSize: "18px", lineHeight: 1.75 }}>
                {t.revenue.body}
              </p>
            </div>

            {/* Right — tabbed conversations */}
            <div>
              {/* Tab selector */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {[
                  lang === 'es' ? 'Upgrade suite' : 'Suite upgrade',
                  lang === 'es' ? 'Reserva spa' : 'Spa booking',
                  lang === 'es' ? 'Late checkout' : 'Late checkout',
                  lang === 'es' ? 'Mantenimiento' : 'Maintenance',
                ].map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveConvo(i as 0|1|2|3)}
                    className="font-sans transition-all"
                    style={{
                      fontSize: '13px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      border: activeConvo === i ? '1px solid #C96A3A' : '1px solid rgba(232,227,220,0.15)',
                      background: activeConvo === i ? '#2C1810' : 'transparent',
                      color: activeConvo === i ? '#FFFFFF' : '#A8A099',
                      cursor: 'pointer',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Conversations */}
              {activeConvo === 0 && (
                <div className="rounded-2xl p-6 md:p-8" style={{ background: "#1F1E1D", border: "1px solid rgba(250,249,245,0.06)" }}>
                  <p className="font-sans mb-4" style={{ fontSize: "12px", color: "#8A8480" }}>{t.revenue.timestamp}</p>
                  <div className="flex flex-col gap-3">
                    {t.revenue.conversation.map((msg: {role: string; text: string}, i: number) => (
                      <div key={i} className={`flex ${msg.role === 'guest' ? 'justify-end' : 'justify-start'}`}>
                        <div className="font-sans rounded-2xl" style={{ background: msg.role === 'guest' ? "#0F0D0B" : "#3A3835", color: "#E8E3DC", padding: "12px 16px", fontSize: "16px", lineHeight: 1.6, maxWidth: "80%" }}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-sans text-center" style={{ fontSize: '18px', color: '#A8A099', marginTop: '32px' }}>
                    {lang === 'es' ? <>Un upgrade.<br />Inversión: <span style={{ color: '#FFFFFF', fontWeight: 600 }}>cubierta.</span></> : <>One upgrade.<br />Investment: <span style={{ color: '#FFFFFF', fontWeight: 600 }}>covered.</span></>}
                  </p>
                </div>
              )}

              {activeConvo === 1 && (
                <div className="rounded-2xl p-6 md:p-8" style={{ background: "#1F1E1D", border: "1px solid rgba(250,249,245,0.06)" }}>
                  <p className="font-sans mb-4" style={{ fontSize: "12px", color: "#8A8480" }}>2:32 PM</p>
                  <div className="flex flex-col gap-3">
                    {[
                      { role: 'guest', text: lang === 'es' ? '¿Tienen masajes en pareja disponibles esta noche?' : 'Do you have couples massages available this evening?' },
                      { role: 'ai', text: lang === 'es' ? '¡Sí! El spa tiene disponibilidad a las 6 PM y 7:30 PM. Nuestro Ritual de Pareja Riviera dura 90 minutos — $180/pareja. Puedes agregar una bienvenida con champán por $220 total. ¿Reservo un horario?' : 'Yes! The spa has availability at 6 PM and 7:30 PM. Our Riviera Couples Ritual is 90 minutes — $180/couple. Add a champagne welcome for $220 total. Shall I reserve a time?' },
                      { role: 'guest', text: lang === 'es' ? 'Las 7:30 con el champán, por favor.' : '7:30 with the champagne, please.' },
                      { role: 'ai', text: lang === 'es' ? '¡Listo! Confirmado para las 7:30 PM. El equipo tendrá todo preparado. Que disfruten su velada.' : 'Done! Confirmed for 7:30 PM. The team will have everything ready. Enjoy your evening.' },
                    ].map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'guest' ? 'justify-end' : 'justify-start'}`}>
                        <div className="font-sans rounded-2xl" style={{ background: msg.role === 'guest' ? "#0F0D0B" : "#3A3835", color: "#E8E3DC", padding: "12px 16px", fontSize: "16px", lineHeight: 1.6, maxWidth: "80%" }}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-sans text-center" style={{ fontSize: '18px', color: '#A8A099', marginTop: '32px' }}>
                    {lang === 'es' ? 'Reserva de spa + upsell capturado' : 'Spa booking + upsell captured'}<br />
                    <span style={{ color: '#C96A3A', fontWeight: 600 }}>+$220</span>
                  </p>
                </div>
              )}

              {activeConvo === 2 && (
                <div className="rounded-2xl p-6 md:p-8" style={{ background: "#1F1E1D", border: "1px solid rgba(250,249,245,0.06)" }}>
                  <p className="font-sans mb-4" style={{ fontSize: "12px", color: "#8A8480" }}>8:45 AM</p>
                  <div className="flex flex-col gap-3">
                    {[
                      { role: 'guest', text: lang === 'es' ? 'Nuestro vuelo es a las 4pm — ¿podríamos hacer el checkout a las 2pm en lugar de las 12?' : 'Our flight is at 4pm — any chance we can check out at 2pm instead of 12?' },
                      { role: 'ai', text: lang === 'es' ? 'Buenas noticias — el checkout tardío a las 2 PM está disponible. Hay un cargo de $45 que se añade a tu cuenta. ¿Lo confirmo?' : 'Good news — 2 PM late checkout is available. There is a $45 fee added to your final bill. Want me to confirm?' },
                      { role: 'guest', text: lang === 'es' ? 'Sí, perfecto, gracias.' : 'Yes, perfect, thank you.' },
                      { role: 'ai', text: lang === 'es' ? 'Confirmado. Checkout actualizado a las 2 PM. Buen viaje — esperamos verte pronto en MarAzul.' : 'Confirmed! Checkout updated to 2 PM. Safe travels — hope to see you at MarAzul again soon.' },
                    ].map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'guest' ? 'justify-end' : 'justify-start'}`}>
                        <div className="font-sans rounded-2xl" style={{ background: msg.role === 'guest' ? "#0F0D0B" : "#3A3835", color: "#E8E3DC", padding: "12px 16px", fontSize: "16px", lineHeight: 1.6, maxWidth: "80%" }}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-sans text-center" style={{ fontSize: '18px', color: '#A8A099', marginTop: '32px' }}>
                    {lang === 'es' ? 'Cargo de late checkout capturado' : 'Late checkout fee captured'}<br />
                    <span style={{ color: '#C96A3A', fontWeight: 600 }}>+$45</span>
                  </p>
                </div>
              )}

              {activeConvo === 3 && (
                <div className="rounded-2xl p-6 md:p-8" style={{ background: "#1F1E1D", border: "1px solid rgba(250,249,245,0.06)" }}>
                  <p className="font-sans mb-4" style={{ fontSize: "12px", color: "#8A8480" }}>11:52 PM</p>
                  <div className="flex flex-col gap-3">
                    {[
                      { role: 'guest', text: lang === 'es' ? 'El aire acondicionado de nuestra habitación no enfría — hace bastante calor.' : 'The AC in our room is not cooling — it is quite warm in here.' },
                      { role: 'ai', text: lang === 'es' ? 'Lo siento mucho. ¿Puedes confirmarme el número de habitación para alertar al equipo de mantenimiento de inmediato?' : 'I am sorry about that. Can you confirm your room number so I can alert maintenance right away?' },
                      { role: 'guest', text: lang === 'es' ? 'Habitación 221.' : 'Room 221.' },
                      { role: 'ai', text: lang === 'es' ? 'Mantenimiento ha sido alertado y está en camino. También he solicitado un ventilador portátil como respaldo. Lo resolveremos en breve.' : 'Maintenance has been alerted and is on the way. I have also requested a portable fan as backup. We will have this sorted shortly.' },
                    ].map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'guest' ? 'justify-end' : 'justify-start'}`}>
                        <div className="font-sans rounded-2xl" style={{ background: msg.role === 'guest' ? "#0F0D0B" : "#3A3835", color: "#E8E3DC", padding: "12px 16px", fontSize: "16px", lineHeight: 1.6, maxWidth: "80%" }}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-sans text-center" style={{ fontSize: '18px', color: '#A8A099', marginTop: '32px' }}>
                    {lang === 'es' ? 'Problema resuelto antes de una mala reseña' : 'Issue resolved before a bad review'}<br />
                    <span style={{ color: '#2D9E6B', fontWeight: 600 }}>0 complaints</span>
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ── INTELLIGENCE ─────────────────────────────────── */}
      <section className="py-20 md:py-32 text-center overflow-hidden" style={{ background: "#1A1715" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <rect x="10" y="20" width="36" height="28" rx="1" stroke="#FAF9F5" strokeWidth="1.5" />
            <path d="M18 20V15a10 10 0 0120 0v5" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="23" y="28" width="10" height="8" rx="1" stroke="#FAF9F5" strokeWidth="1.5" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FFFFFF]">
            {t.intelligence.headline}
          </h2>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-0 max-w-3xl mx-auto mt-12 md:mt-16 text-left">
            <div>
              <p className="font-sans text-[13px] font-semibold text-[#FAF9F5] tracking-[0.18em] uppercase mb-5">
                {t.intelligence.hotelLabel}
              </p>
              <div className="space-y-3">
                {t.intelligence.hotelItems.map((item) => (
                  <p key={item} className="font-sans font-light text-[#9C9A93]" style={{ fontSize: "16px" }}>{item}</p>
                ))}
              </div>
            </div>

            <div className="hidden md:block self-stretch mx-8" style={{ width: "1px", background: "rgba(250,249,245,0.08)" }} />

            <div className="mt-8 md:mt-0">
              <p className="font-sans text-[13px] font-semibold text-[#FAF9F5] tracking-[0.18em] uppercase mb-5">
                {t.intelligence.destinationLabel}
              </p>
              <div className="space-y-3">
                {t.intelligence.destinationItems.map((item) => (
                  <p key={item} className="font-sans font-light text-[#9C9A93]" style={{ fontSize: "16px" }}>{item}</p>
                ))}
              </div>
            </div>
          </div>

          <p
            className="font-serif font-semibold text-[#FFFFFF] text-center w-full"
            style={{
              paddingTop: '40px',
              marginTop: '40px',
              borderTop: '1px solid rgba(232,227,220,0.08)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            {t.intelligence.closing}
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section id="how-it-works" className="py-20 md:py-32 text-center overflow-hidden" style={{ background: "#1F1C19" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <circle cx="12" cy="28" r="6" stroke="#FAF9F5" strokeWidth="1.5" />
            <circle cx="44" cy="28" r="6" stroke="#FAF9F5" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="6" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="18" y1="28" x2="22" y2="28" stroke="#FAF9F5" strokeWidth="1.5" />
            <line x1="34" y1="28" x2="38" y2="28" stroke="#FAF9F5" strokeWidth="1.5" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FFFFFF]">
            {t.howItWorks.headline}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto mt-16">
            {howItWorksSteps.map((step, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(4.5rem, 9vw, 7.5rem)', fontWeight: 300, color: 'rgba(232,227,220,0.15)', lineHeight: 1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
                  {step.num}
                </p>
                <div style={{ width: '32px', height: '1px', background: 'rgba(232,227,220,0.15)', margin: '0 auto 20px' }} />
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '19px', fontWeight: 500, color: '#FAF9F5', lineHeight: 1.3, marginBottom: '12px' }}>
                  {step.title}
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 300, color: '#9C9A93', lineHeight: 1.75 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD TEASER ─────────────────────────────── */}
      <section
        id="dashboard-teaser"
        className="py-20 md:py-32 overflow-hidden"
        style={{ background: '#0F0D0B' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Section header */}
          <div
            className="text-center mb-16"
            style={{
              opacity: dashVisible ? 1 : 0,
              transform: dashVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <p className="font-sans uppercase tracking-widest" style={{ fontSize: '11px', color: '#2D9E6B', marginBottom: '16px' }}>
              {lang === 'es' ? 'Panel de control' : 'Your command center'}
            </p>
            <h2 className="heading-section font-serif font-normal text-[#FFFFFF] max-w-2xl mx-auto">
              {lang === 'es'
                ? 'Cada pregunta respondida. Cada oportunidad registrada.'
                : 'Every question answered. Every opportunity tracked.'}
            </h2>
            <p className="font-sans font-light mt-5 max-w-xl mx-auto" style={{ fontSize: '18px', color: '#9C9A93', lineHeight: 1.7 }}>
              {lang === 'es'
                ? 'Tu panel muestra en tiempo real lo que tus huéspedes necesitan — y lo que tu equipo nunca tiene que atender.'
                : 'Your dashboard shows in real time what your guests need — and what your team never has to handle.'}
            </p>
          </div>

          {/* Browser frame mockup */}
          <div
            style={{
              opacity: dashVisible ? 1 : 0,
              transform: dashVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
              transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
              borderRadius: '16px',
              border: '1px solid rgba(232,227,220,0.10)',
              overflow: 'hidden',
              background: '#161310',
            }}
          >

            {/* Browser chrome bar */}
            <div
              style={{
                background: '#161310',
                borderBottom: '1px solid rgba(232,227,220,0.06)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(232,227,220,0.12)' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(232,227,220,0.12)' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(232,227,220,0.12)' }} />
              <div
                style={{
                  marginLeft: '8px',
                  flex: 1,
                  maxWidth: '320px',
                  background: 'rgba(232,227,220,0.04)',
                  border: '1px solid rgba(232,227,220,0.06)',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  fontSize: '12px',
                  color: '#4A4540',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                app.placecompanion.com/dashboard
              </div>
            </div>

            {/* Dashboard shell — desktop */}
            <div className="hidden md:flex" style={{ height: '520px' }}>

              {/* Left sidebar */}
              <div
                style={{
                  width: '200px',
                  flexShrink: 0,
                  background: '#0F0D0B',
                  borderRight: '1px solid rgba(232,227,220,0.06)',
                  padding: '20px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: dashVisible ? 1 : 0,
                  transform: dashVisible ? 'translateX(0)' : 'translateX(-16px)',
                  transition: 'opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s',
                }}
              >
                <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4A4540', padding: '0 16px', marginBottom: '10px' }}>
                  {lang === 'es' ? 'Tus hoteles' : 'Your Hotels'}
                </p>
                {[
                  { name: 'MarAzul Riviera Maya', active: true, issues: 2 },
                  { name: 'Casa Sol Tulum', active: false, issues: 0 },
                  { name: 'Villa del Mar', active: false, issues: 1 },
                ].map((prop, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 16px',
                      background: prop.active ? '#1A1715' : 'transparent',
                      borderTop: 'none',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderLeft: prop.active ? '2px solid #C96A3A' : '2px solid transparent',
                    }}
                  >
                    <span
                      className="font-sans"
                      style={{
                        fontSize: '12px',
                        color: prop.active ? '#FAF9F5' : '#6B6560',
                        fontWeight: prop.active ? 500 : 400,
                        background: prop.active ? '#2C1810' : '#1A1715',
                        border: `1px solid ${prop.active ? '#C96A3A' : 'rgba(232,227,220,0.08)'}`,
                        borderRadius: '999px',
                        padding: '3px 10px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: prop.issues > 0 ? '120px' : '150px',
                        display: 'inline-block',
                      }}
                    >
                      {prop.name}
                    </span>
                    {prop.issues > 0 && (
                      <span style={{ background: '#C96A3A', color: '#FFFFFF', fontSize: '10px', fontWeight: 600, borderRadius: '999px', padding: '1px 6px', flexShrink: 0 }}>
                        {prop.issues}
                      </span>
                    )}
                  </div>
                ))}
                <div style={{ marginTop: 'auto', padding: '16px', borderTop: '1px solid rgba(232,227,220,0.06)' }}>
                  <span className="font-sans" style={{ fontSize: '12px', color: '#4A4540' }}>+ {lang === 'es' ? 'Agregar hotel' : 'Add hotel'}</span>
                </div>
              </div>

              {/* Main content */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: '#0F0D0B' }}>

                {/* Property header */}
                <div
                  style={{
                    marginBottom: '20px',
                    opacity: dashVisible ? 1 : 0,
                    transition: 'opacity 0.6s ease 0.5s',
                  }}
                >
                  <p className="font-serif" style={{ fontSize: '22px', color: '#FFFFFF', fontWeight: 400 }}>MarAzul Riviera Maya</p>
                  <p className="font-sans" style={{ fontSize: '13px', color: '#A8A099', marginTop: '2px' }}>Riviera Maya, Mexico</p>
                </div>

                {/* Tab bar */}
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    borderBottom: '1px solid rgba(232,227,220,0.06)',
                    marginBottom: '24px',
                    opacity: dashVisible ? 1 : 0,
                    transition: 'opacity 0.6s ease 0.55s',
                  }}
                >
                  {[
                    lang === 'es' ? 'Analytics' : 'Analytics',
                    lang === 'es' ? 'Incidencias 🔴' : 'Issues 🔴',
                    lang === 'es' ? 'Despliegue' : 'Deploy',
                    lang === 'es' ? 'Ajustes' : 'Settings',
                  ].map((tab, i) => (
                    <div
                      key={i}
                      className="font-sans"
                      style={{
                        fontSize: '13px',
                        color: i === 0 ? '#FAF9F5' : '#6B6560',
                        padding: '8px 16px',
                        borderBottom: i === 0 ? '2px solid #C96A3A' : '2px solid transparent',
                        marginBottom: '-1px',
                      }}
                    >
                      {tab}
                    </div>
                  ))}
                </div>

                {/* Charts grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>

                  {/* Chart 1 — Line chart */}
                  <div
                    style={{
                      background: '#1A1715',
                      border: '1px solid rgba(232,227,220,0.06)',
                      borderRadius: '12px',
                      padding: '18px',
                      opacity: dashVisible ? 1 : 0,
                      transform: dashVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div>
                        <p className="font-sans" style={{ fontSize: '11px', color: '#A8A099', marginBottom: '3px' }}>
                          {lang === 'es' ? 'Preguntas este mes' : 'Guest questions this month'}
                        </p>
                        <p className="font-serif" style={{ fontSize: '26px', color: '#FFFFFF', fontWeight: 600, lineHeight: 1 }}>
                          {dashVisible ? teaserTotal.toLocaleString() : '0'}
                        </p>
                      </div>
                      <span className="font-sans" style={{ fontSize: '10px', color: '#2D9E6B', background: '#242019', padding: '2px 8px', borderRadius: '999px' }}>
                        {lang === 'es' ? 'Últimos 30 días' : 'Last 30 days'}
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={100}>
                      <LineChart data={teaserDays} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
                        <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#4A4540', fontFamily: 'var(--font-sans)' }} tickLine={false} axisLine={false} interval={9} />
                        <YAxis tick={{ fontSize: 9, fill: '#4A4540', fontFamily: 'var(--font-sans)' }} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{ background: '#1F1C19', border: '1px solid rgba(232,227,220,0.08)', borderRadius: '8px', fontSize: '11px', color: '#FAF9F5', fontFamily: 'var(--font-sans)' }}
                          labelStyle={{ color: '#A8A099' }}
                          cursor={{ stroke: 'rgba(232,227,220,0.06)' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="questions"
                          stroke="#C96A3A"
                          strokeWidth={dashVisible ? 2 : 0}
                          dot={false}
                          activeDot={{ r: 3, fill: '#C96A3A', stroke: '#0F0D0B', strokeWidth: 2 }}
                          style={{ transition: 'stroke-width 1s ease 0.8s' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Chart 2 — Bar chart */}
                  <div
                    style={{
                      background: '#1A1715',
                      border: '1px solid rgba(232,227,220,0.06)',
                      borderRadius: '12px',
                      padding: '18px',
                      opacity: dashVisible ? 1 : 0,
                      transform: dashVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.7s ease 0.75s, transform 0.7s ease 0.75s',
                    }}
                  >
                    <p className="font-sans" style={{ fontSize: '11px', color: '#A8A099', marginBottom: '14px' }}>
                      {lang === 'es' ? 'Lo que preguntan los huéspedes' : 'What guests are asking about'}
                    </p>
                    <ResponsiveContainer width="100%" height={130}>
                      <BarChart data={teaserCategories} layout="vertical" margin={{ top: 0, right: 28, left: 0, bottom: 0 }}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#6B6560', fontFamily: 'var(--font-sans)' }} tickLine={false} axisLine={false} width={90} />
                        <Tooltip
                          contentStyle={{ background: '#1F1C19', border: '1px solid rgba(232,227,220,0.08)', borderRadius: '8px', fontSize: '11px', color: '#FAF9F5', fontFamily: 'var(--font-sans)' }}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          formatter={(value: any) => [`${value}%`, lang === 'es' ? 'Participación' : 'Share'] as [string, string]}
                          cursor={{ fill: 'rgba(232,227,220,0.02)' }}
                        />
                        <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                          {teaserCategories.map((_, index) => (
                            <Cell key={index} fill={index === 0 ? '#C96A3A' : `rgba(201,106,58,${0.6 - index * 0.07})`} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 3 — Resolution rate */}
                <div
                  style={{
                    background: '#1A1715',
                    border: '1px solid rgba(232,227,220,0.06)',
                    borderRadius: '12px',
                    padding: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    opacity: dashVisible ? 1 : 0,
                    transform: dashVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.7s ease 0.85s, transform 0.7s ease 0.85s',
                  }}
                >
                  <div style={{ flexShrink: 0, width: '80px', height: '80px' }}>
                    <svg viewBox="0 0 80 80" width="80" height="80">
                      <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(232,227,220,0.06)" strokeWidth="8" />
                      <circle
                        cx="40" cy="40" r="32" fill="none"
                        stroke="#2D9E6B" strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 32 * 0.91} ${2 * Math.PI * 32 * 0.09}`}
                        strokeDashoffset={2 * Math.PI * 32 * 0.25}
                        strokeLinecap="round"
                        transform="rotate(-90 40 40)"
                        style={{
                          strokeDasharray: dashVisible
                            ? `${2 * Math.PI * 32 * 0.91} ${2 * Math.PI * 32 * 0.09}`
                            : `0 ${2 * Math.PI * 32}`,
                          transition: 'stroke-dasharray 1.2s ease 1s',
                        }}
                      />
                      <text x="40" y="36" textAnchor="middle" style={{ fontSize: '14px', fontWeight: 600, fill: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>91%</text>
                      <text x="40" y="50" textAnchor="middle" style={{ fontSize: '8px', fill: '#6B6560', fontFamily: 'var(--font-sans)' }}>resolved</text>
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans" style={{ fontSize: '11px', color: '#A8A099', marginBottom: '4px' }}>
                      {lang === 'es' ? 'Tasa de resolución por IA' : 'AI resolution rate'}
                    </p>
                    <p className="font-serif" style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: 600, lineHeight: 1, marginBottom: '4px' }}>
                      {lang === 'es' ? '91% resuelto por IA' : '91% resolved by AI'}
                    </p>
                    <p className="font-sans" style={{ fontSize: '12px', color: '#6B6560', lineHeight: 1.5 }}>
                      {lang === 'es'
                        ? '9% escalado a tu equipo — solo lo que realmente necesita un humano.'
                        : '9% escalated to your team — only what genuinely needs a human.'}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Dashboard shell — mobile */}
            <div className="md:hidden" style={{ background: '#0F0D0B', padding: '20px' }}>
              {/* Property pill row */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
                {[
                  { name: 'MarAzul', active: true, issues: 2 },
                  { name: 'Casa Sol', active: false, issues: 0 },
                  { name: 'Villa del Mar', active: false, issues: 1 },
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    <span
                      className="font-sans"
                      style={{
                        fontSize: '11px',
                        color: p.active ? '#FAF9F5' : '#6B6560',
                        background: p.active ? '#2C1810' : '#1A1715',
                        border: `1px solid ${p.active ? '#C96A3A' : 'rgba(232,227,220,0.08)'}`,
                        borderRadius: '999px',
                        padding: '4px 10px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {p.name}
                    </span>
                    {p.issues > 0 && (
                      <span style={{ background: '#C96A3A', color: '#FFFFFF', fontSize: '10px', fontWeight: 600, borderRadius: '999px', padding: '1px 5px' }}>
                        {p.issues}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Stat row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '10px', padding: '14px' }}>
                  <p className="font-sans" style={{ fontSize: '10px', color: '#A8A099', marginBottom: '4px' }}>
                    {lang === 'es' ? 'Preguntas este mes' : 'Questions this month'}
                  </p>
                  <p className="font-serif" style={{ fontSize: '22px', color: '#FFFFFF', fontWeight: 600, lineHeight: 1 }}>
                    {teaserTotal.toLocaleString()}
                  </p>
                </div>
                <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '10px', padding: '14px' }}>
                  <p className="font-sans" style={{ fontSize: '10px', color: '#A8A099', marginBottom: '4px' }}>
                    {lang === 'es' ? 'Resuelto por IA' : 'Resolved by AI'}
                  </p>
                  <p className="font-serif" style={{ fontSize: '22px', color: '#2D9E6B', fontWeight: 600, lineHeight: 1 }}>91%</p>
                </div>
              </div>

              {/* Mini line chart */}
              <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '10px', padding: '14px' }}>
                <p className="font-sans" style={{ fontSize: '10px', color: '#A8A099', marginBottom: '10px' }}>
                  {lang === 'es' ? 'Actividad de huéspedes — 30 días' : 'Guest activity — 30 days'}
                </p>
                <ResponsiveContainer width="100%" height={80}>
                  <LineChart data={teaserDays} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
                    <XAxis dataKey="date" tick={{ fontSize: 8, fill: '#4A4540', fontFamily: 'var(--font-sans)' }} tickLine={false} axisLine={false} interval={9} />
                    <YAxis tick={{ fontSize: 8, fill: '#4A4540', fontFamily: 'var(--font-sans)' }} tickLine={false} axisLine={false} />
                    <Line type="monotone" dataKey="questions" stroke="#C96A3A" strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Caption below mockup */}
          <div
            className="text-center mt-10"
            style={{
              opacity: dashVisible ? 1 : 0,
              transition: 'opacity 0.7s ease 1s',
            }}
          >
            <Link
              href="/onboarding"
              className="font-sans font-medium inline-flex items-center transition-colors"
              style={{
                height: '48px',
                padding: '0 28px',
                background: '#C96A3A',
                color: '#FAF9F5',
                borderRadius: '8px',
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              {lang === 'es' ? 'Ver tu panel en vivo →' : 'See your dashboard live →'}
            </Link>
            <p className="font-sans mt-3" style={{ fontSize: '13px', color: '#6B6560' }}>
              {lang === 'es' ? 'En vivo en menos de 30 minutos.' : 'Live in under 30 minutes.'}
            </p>
          </div>

        </div>
      </section>

      {/* ── FOUNDING PARTNERS ────────────────────────────── */}
      <section id="founding-partners" className="py-20 md:py-32 text-center" style={{ background: "#16131F" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <path d="M28 6l5.5 11 12 1.75-8.75 8.5 2 12L28 34l-10.75 5.25 2-12L10.5 18.75l12-1.75L28 6z" stroke="#FAF9F5" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FFFFFF]">
            {t.founding.headline}
          </h2>
          <p className="font-sans text-[#9C9A93] mt-5" style={{ fontSize: "18px" }}>{t.founding.body}</p>

          <button
            onClick={() => setShowCalendly(true)}
            className="font-sans text-[14px] font-medium text-[#141413] bg-[#FAF9F5] hover:bg-white h-11 px-8 rounded-md transition-colors mt-8 inline-flex items-center"
            style={{ border: 'none', cursor: 'pointer' }}
          >
            {t.founding.cta}
          </button>

          <p className="font-sans text-[14px] text-[#FAF9F5]/60 mt-4">{t.founding.spots}</p>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section id="pricing" className="py-20 md:py-32 text-center" style={{ background: "#1C1917" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="font-sans uppercase tracking-widest" style={{ fontSize: "11px", color: "#9C9A93" }}>
            {t.pricing.label}
          </p>
          <h2 className="heading-section font-serif font-normal text-[#FFFFFF] max-w-2xl mx-auto mt-4">
            {t.pricing.headline}
          </h2>
          <p className="font-sans font-light text-[#9C9A93] mt-4" style={{ fontSize: "18px" }}>
            {t.pricing.subhead}
          </p>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <div
              style={{
                display: 'inline-block',
                border: '1px solid rgba(201,106,58,0.4)',
                borderRadius: '999px',
                padding: '14px 32px',
                textAlign: 'center',
                maxWidth: '580px',
                width: '100%',
              }}
            >
              <p className="font-sans" style={{ fontSize: '15px', color: '#FAF9F5', fontWeight: 500, lineHeight: 1.6 }}>
                {lang === 'es'
                  ? 'Una reserva de spa cubre tu semana. A $349/mes — menos de $10/día — una oportunidad de upsell cubre tu mes entero.'
                  : 'One spa booking covers your week. At $349/mo — less than $10/day — one captured upsell covers your entire month.'}
              </p>
            </div>
          </div>

          {/* 3-card row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">

            {/* COMPANION */}
            <div className="rounded-2xl p-8 flex flex-col text-left" style={{ background: "#0F0D0B", border: "1px solid rgba(232,227,220,0.08)" }}>
              <p className="font-sans text-[11px] font-semibold tracking-widest text-[#9C9A93] uppercase">{t.pricing.boutique}</p>
              <p className="font-sans text-[#9C9A93] mt-1" style={{ fontSize: '13px' }}>
                {lang === 'es' ? 'Para hoteles independientes de hasta 40 habitaciones.' : 'For COMPANION PRO hotels up to 40 rooms.'}
              </p>
              <div className="flex items-baseline gap-1 mt-4 mb-2">
                <span className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>$349</span>
                <span className="font-sans text-[#9C9A93]" style={{ fontSize: "20px" }}>{t.pricing.perMonth}</span>
              </div>
              <p className="font-sans text-[#6B6560] mt-3" style={{ fontSize: '12px' }}>
                {lang === 'es' ? 'o $279/mes con compromiso anual' : 'or $279/mo with annual commitment'}
              </p>
              <div className="my-5" style={{ borderTop: "1px solid rgba(250,249,245,0.08)" }} />
              <ul className="flex-1 space-y-3">
                {t.pricing.features.boutique.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-sans text-[#9C9A93]" style={{ fontSize: "14px" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 bg-white/30" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/onboarding" className="font-sans text-[14px] font-semibold h-11 rounded-lg w-full transition-colors mt-6 flex items-center justify-center" style={{ backgroundColor: '#C96A3A', color: 'white' }}>
                {t.pricing.startTrial}
              </Link>
              <p className="font-sans text-[#53525D] text-center mt-2" style={{ fontSize: "12px" }}>{t.pricing.trial}</p>
            </div>

            {/* COMPANION PRO — highlighted */}
            <div className="rounded-2xl p-8 flex flex-col text-left relative" style={{ background: "#0F0D0B", border: "1px solid rgba(232,227,220,0.20)", borderTop: "2px solid rgba(232,227,220,0.35)" }}>
              <p className="font-sans text-[11px] font-semibold tracking-widest text-[#FAF9F5]/70 uppercase">{t.pricing.independent}</p>
              <p className="font-sans text-[#9C9A93] mt-1" style={{ fontSize: '13px' }}>
                {lang === 'es' ? 'Para hoteles de 41 a 200 habitaciones.' : 'For hotels from 41 to 200 rooms.'}
              </p>
              <div className="flex items-baseline gap-1 mt-4 mb-2">
                <span className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>$599</span>
                <span className="font-sans text-[#9C9A93]" style={{ fontSize: "20px" }}>{t.pricing.perMonth}</span>
              </div>
              <p className="font-sans text-[#6B6560] mt-3" style={{ fontSize: '12px' }}>
                {lang === 'es' ? 'o $479/mes con compromiso anual' : 'or $479/mo with annual commitment'}
              </p>
              <div className="my-5" style={{ borderTop: "1px solid rgba(250,249,245,0.08)" }} />
              <ul className="flex-1 space-y-3">
                {t.pricing.features.independent.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-sans text-[#FAF9F5]" style={{ fontSize: "14px" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 bg-[#C96A3A]" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/onboarding" className="font-sans text-[14px] font-semibold h-11 rounded-lg w-full transition-colors mt-6 flex items-center justify-center" style={{ backgroundColor: '#C96A3A', color: 'white' }}>
                {t.pricing.startTrial}
              </Link>
              <p className="font-sans text-[#53525D] text-center mt-2" style={{ fontSize: "12px" }}>{t.pricing.trial}</p>
            </div>

            {/* Portfolio */}
            <div className="rounded-2xl p-8 flex flex-col text-left" style={{ background: "#141210", border: "1px solid rgba(232,227,220,0.12)" }}>
              <p className="font-sans text-[11px] font-semibold tracking-widest text-[#9C9A93] uppercase">{t.pricing.portfolio}</p>
              <p className="font-sans text-[#9C9A93] mt-1" style={{ fontSize: '13px' }}>
                {lang === 'es' ? 'Para grupos hoteleros.' : 'For portfolio groups.'}
              </p>
              <div className="flex items-baseline gap-1 mt-4 mb-2">
                <span className="font-serif font-light text-[#FAF9F5]" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}>{t.pricing.portfolioPrice}</span>
              </div>
              <p className="font-sans text-[#6B6560] mt-3" style={{ fontSize: '12px' }}>
                {lang === 'es' ? '2+ propiedades. Precio para tu grupo.' : '2+ properties. Priced for your portfolio.'}
              </p>
              <div className="my-5" style={{ borderTop: "1px solid rgba(250,249,245,0.08)" }} />
              <ul className="flex-1 space-y-3">
                {t.pricing.features.portfolio.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-sans text-[#9C9A93]" style={{ fontSize: "14px" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 bg-white/30" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowCalendly(true)}
                className="font-sans text-[14px] font-semibold h-11 rounded-lg w-full transition-colors mt-6 flex items-center justify-center"
                style={{ backgroundColor: 'transparent', color: '#FFFFFF', border: '1px solid rgba(232,227,220,0.25)', cursor: 'pointer' }}
              >
                {lang === 'es' ? 'Agenda una Llamada →' : 'Book a Call →'}
              </button>
              <p className="font-sans text-[#6B6560] text-center mt-2" style={{ fontSize: "12px" }}>
                {lang === 'es' ? 'Respuesta en menos de 24 horas.' : 'Response within 24 hours.'}
              </p>
            </div>

          </div>

          {/* Enterprise bar */}
          <div style={{
            marginTop: '32px', padding: '24px 32px',
            background: '#0D1218', border: '1px solid rgba(45,100,160,0.2)',
            borderRadius: '12px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
            maxWidth: '64rem', margin: '32px auto 0'
          }}>
            <div style={{ textAlign: 'left' }}>
              <p className="font-sans" style={{ fontSize: '15px', fontWeight: 500, color: '#FFFFFF', marginBottom: '4px' }}>
                {lang === 'es' ? 'Grupos hoteleros y grandes operadores' : 'Hotel groups and large-scale operators'}
              </p>
              <p className="font-sans" style={{ fontSize: '13px', color: '#6B6560' }}>
                {lang === 'es'
                  ? '4+ propiedades o 200+ habitaciones. Construimos alrededor de tu escala, tu estructura y tu marca.'
                  : '4+ properties or 200+ rooms. We build around your scale, your structure, and your brand.'}
              </p>
            </div>
            <button onClick={() => setShowCalendly(true)} className="font-sans text-sm"
              style={{ border: '1px solid rgba(232,227,220,0.25)', color: '#E8E3DC', padding: '10px 20px', borderRadius: '6px', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {lang === 'es' ? 'Hablemos →' : "Let's talk →"}
            </button>
          </div>

          {/* Destination / resort communities bar */}
          <div style={{
            marginTop: '16px', padding: '24px 32px',
            background: '#0D1218', border: '1px solid rgba(45,100,160,0.2)',
            borderRadius: '12px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
            maxWidth: '64rem', margin: '16px auto 0'
          }}>
            <div style={{ textAlign: 'left' }}>
              <p className="font-sans" style={{ fontSize: '15px', fontWeight: 500, color: '#FFFFFF', marginBottom: '4px' }}>
                {lang === 'es' ? 'Comunidades turísticas y desarrolladores' : 'Resort communities and master developers'}
              </p>
              <p className="font-sans" style={{ fontSize: '13px', color: '#6B6560' }}>
                {lang === 'es'
                  ? 'Una inteligencia compartida del destino. Overlays por propiedad. Experiencia consistente en toda tu comunidad.'
                  : 'One shared destination brain. Individual property overlays. Consistent guest experience across your entire community.'}
              </p>
            </div>
            <button onClick={() => setShowCalendly(true)} className="font-sans text-sm"
              style={{ border: '1px solid rgba(232,227,220,0.25)', color: '#E8E3DC', padding: '10px 20px', borderRadius: '6px', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {lang === 'es' ? 'Construyamos juntos →' : "Let's build together →"}
            </button>
          </div>

          <p className="font-sans text-[15px] mt-8">
            <span className="text-[#53525D]">{t.pricing.foundingNote} </span>
            <button onClick={() => setShowCalendly(true)} className="text-[#FAF9F5] hover:text-white transition-colors duration-200" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}>
              {t.pricing.foundingApply}
            </button>
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="py-20 md:py-32 text-center" style={{ background: "#141413" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <circle cx="28" cy="28" r="20" stroke="#FAF9F5" strokeWidth="1.5" />
            <path d="M22 22c0-3.3 2.7-6 6-6s6 2.7 6 6c0 3-2.2 5.2-5.2 6.7V30" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="28" cy="37" r="1.25" fill="#FAF9F5" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FFFFFF]">
            {t.faq.headline}
          </h2>

          <FaqSection />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="py-20 md:py-32 text-center" style={{ background: "#2A2725" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-6">
            <path d="M10 28a18 18 0 0136 0" stroke="#E8E3DC" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="28" cy="28" r="6" stroke="#E8E3DC" strokeWidth="1.5" />
            <path d="M28 34v10M24 40l4 4 4-4" stroke="#E8E3DC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <h2 className="heading-section font-serif font-normal text-[#FFFFFF]">
            {t.finalCta.headline}
          </h2>
          <p className="font-sans text-[#A8A099] max-w-xl mx-auto mt-5 break-words" style={{ fontSize: "18px", lineHeight: 1.75 }}>
            {t.finalCta.body}
          </p>
          <Link
            href="/onboarding"
            className="font-sans text-[15px] font-medium text-[#FAF9F5] bg-[#C96A3A] hover:bg-[#D4784A] h-12 px-10 rounded-md transition-colors mt-8 inline-flex items-center"
          >
            {t.finalCta.button}
          </Link>
        </div>
      </section>

      <SiteFooter />

      {showBar && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
          style={{
            background: '#0F0D0B',
            borderTop: '1px solid rgba(232,227,220,0.08)',
            padding: '12px 16px',
            paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          }}
        >
          <div className="flex gap-3">
            <Link
              href="/demo"
              className="flex-1 flex items-center justify-center rounded-md h-11 font-sans text-sm"
              style={{ border: '1px solid rgba(232,227,220,0.25)', color: '#E8E3DC' }}
            >
              {lang === 'es' ? 'Ver Demo' : 'View Live Demo'}
            </Link>
            <Link
              href="/onboarding"
              className="flex-1 flex items-center justify-center rounded-md h-11 font-sans text-sm font-medium"
              style={{ background: '#C96A3A', color: '#FAF9F5' }}
            >
              {lang === 'es' ? 'Crear Asistente' : 'Create Assistant'}
            </Link>
          </div>
        </div>
      )}

      {showCalendly && <CalendlyModal onClose={() => setShowCalendly(false)} />}
    </div>
  );
}
