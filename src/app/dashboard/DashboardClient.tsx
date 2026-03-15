'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/lib/i18n/LanguageContext'
import UpgradeModal from '@/components/UpgradeModal'
import CalendlyModal from '@/components/CalendlyModal'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: any[]
}

interface UpgradeTarget {
  propertyId: string
  userId: string
}

const last30Days = Array.from({ length: 30 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() - (29 - i))
  return {
    date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    questions: Math.round(15 + Math.random() * 55 + (i * 0.8) + (d.getDay() === 0 || d.getDay() === 6 ? 12 : 0)),
  }
})

const categoryData = [
  { name: 'Food & Beverage', pct: 28 },
  { name: 'Local Activities', pct: 22 },
  { name: 'Spa & Wellness', pct: 18 },
  { name: 'Room Services', pct: 14 },
  { name: 'Transportation', pct: 10 },
  { name: 'Check-in / Out', pct: 5 },
  { name: 'Other', pct: 3 },
]

const totalQuestions = last30Days.reduce((sum, d) => sum + d.questions, 0)

export default function DashboardClient({ user, properties }: Props) {
  const { t } = useLang()
  const [upgradeTarget, setUpgradeTarget] = useState<UpgradeTarget | null>(null)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen" style={{ background: '#0F0D0B' }}>
      {/* Nav */}
      <header className="px-4 md:px-8 py-5 flex flex-wrap justify-between items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="font-serif text-xl" style={{ color: '#E8E3DC' }}>
          Place Companion
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-sans hidden sm:inline" style={{ fontSize: '14px', color: '#A8A099' }}>
            {user.email}
          </span>
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="font-sans transition-colors"
            style={{
              fontSize: '14px',
              color: '#A8A099',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            {t.dashboard.getInvoice}
          </button>
          <button
            onClick={handleSignOut}
            className="font-sans transition-colors"
            style={{
              fontSize: '14px',
              color: '#A8A099',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            {t.dashboard.signOut}
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <h1 className="heading-section font-serif font-normal" style={{ color: '#E8E3DC' }}>
            {t.dashboard.yourProperties}
          </h1>
          <Link
            href="/onboarding"
            className="font-sans font-medium inline-flex items-center transition-colors"
            style={{
              height: '48px',
              padding: '0 24px',
              background: '#C96A3A',
              color: 'white',
              borderRadius: '8px',
              fontSize: '15px',
              textDecoration: 'none',
            }}
          >
            {t.dashboard.addProperty}
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif" style={{ fontSize: '32px', color: '#A8A099' }}>
              {t.dashboard.noProperties}
            </p>
            <p className="font-sans mt-4" style={{ fontSize: '18px', color: '#6B6560' }}>
              {t.dashboard.noPropertiesSubhead}
            </p>
            <Link
              href="/onboarding"
              className="font-sans font-medium inline-flex items-center transition-colors mt-8"
              style={{
                height: '48px',
                padding: '0 24px',
                background: '#C96A3A',
                color: 'white',
                borderRadius: '8px',
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              {t.dashboard.configureFirst}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {properties.map((property) => {
              const trialEnds = new Date(property.trial_ends_at)
              const daysLeft = Math.max(0, Math.floor((trialEnds.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
              const status: string = property.subscription_status ?? 'trial'
              const isActive = status === 'active'
              const isTrial = status === 'trial'
              const isPastDue = status === 'past_due'
              const isCanceled = status === 'canceled'
              const showUpgrade = isTrial || isCanceled || isPastDue

              return (
                <div
                  key={property.id}
                  className="transition-all"
                  style={{
                    background: '#1A1715',
                    borderRadius: '16px',
                    padding: '32px',
                    border: '1px solid rgba(232,227,220,0.06)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,227,220,0.12)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,227,220,0.06)' }}
                >
                  {/* Name + status badge */}
                  <div className="flex justify-between items-start">
                    <p className="font-serif" style={{ fontSize: '24px', color: '#FAF9F5' }}>
                      {property.hotel_name}
                    </p>
                    {isActive && (
                      <span
                        className="font-sans tracking-widest"
                        style={{
                          fontSize: '10px',
                          background: '#242019',
                          color: '#2D9E6B',
                          padding: '4px 10px',
                          borderRadius: '999px',
                        }}
                      >
                        ACTIVE
                      </span>
                    )}
                    {isTrial && daysLeft > 3 && (
                      <span
                        className="font-sans tracking-widest"
                        style={{
                          fontSize: '10px',
                          background: '#242019',
                          color: '#2D9E6B',
                          padding: '4px 10px',
                          borderRadius: '999px',
                        }}
                      >
                        {t.dashboard.trial}
                      </span>
                    )}
                  </div>

                  {property.location && (
                    <p className="font-sans mt-1" style={{ fontSize: '14px', color: '#A8A099' }}>
                      {property.location}
                    </p>
                  )}

                  {property.openIssueCount > 0 && (
                    <p className="font-sans mt-1" style={{ fontSize: '12px', color: '#C96A3A' }}>
                      ● {property.openIssueCount} open issue{property.openIssueCount === 1 ? '' : 's'}
                    </p>
                  )}

                  {/* Trial warning banners */}
                  {isTrial && daysLeft <= 3 && daysLeft > 0 && (
                    <div
                      className="font-sans rounded-lg mt-4 px-4 py-3"
                      style={{ background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.3)', fontSize: '13px', color: '#FCD34D' }}
                    >
                      Trial ends in {daysLeft} day{daysLeft === 1 ? '' : 's'} — upgrade to keep your assistant live.
                    </div>
                  )}
                  {isTrial && daysLeft === 0 && (
                    <div
                      className="font-sans rounded-lg mt-4 px-4 py-3"
                      style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', fontSize: '13px', color: '#F87171' }}
                    >
                      Trial expired — upgrade to continue.
                    </div>
                  )}
                  {isCanceled && (
                    <div
                      className="font-sans rounded-lg mt-4 px-4 py-3"
                      style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', fontSize: '13px', color: '#F87171' }}
                    >
                      Subscription canceled — upgrade to reactivate.
                    </div>
                  )}
                  {isPastDue && (
                    <div
                      className="font-sans rounded-lg mt-4 px-4 py-3"
                      style={{ background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.3)', fontSize: '13px', color: '#FCD34D' }}
                    >
                      Payment failed — update your billing to continue.
                    </div>
                  )}

                  {isTrial && (
                    <p className="font-sans mt-4" style={{ fontSize: '13px', color: '#A8A099' }}>
                      {t.dashboard.trialEnds} {trialEnds.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex gap-6 mt-6 pt-6" style={{ borderTop: '1px solid rgba(232,227,220,0.06)' }}>
                    {[
                      { label: t.dashboard.conversations, value: String(property.conversations?.[0]?.count ?? 0) },
                      { label: t.dashboard.questions, value: String(property.messages?.[0]?.count ?? 0) },
                      { label: t.dashboard.daysLeft, value: isActive ? '∞' : String(daysLeft) },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="font-sans tracking-widest" style={{ fontSize: '11px', color: '#A8A099' }}>
                          {label}
                        </p>
                        <p className="font-serif mt-1" style={{ fontSize: '28px', color: '#FFFFFF', fontWeight: 600 }}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <Link
                      href={`/assistant/${property.id}`}
                      className="font-sans transition-colors"
                      style={{
                        fontSize: '14px',
                        color: '#A8A099',
                        border: '1px solid rgba(232,227,220,0.15)',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        textDecoration: 'none',
                      }}
                    >
                      {t.dashboard.viewAssistant}
                    </Link>
                    <Link
                      href={`/dashboard/properties/${property.id}`}
                      className="font-sans font-medium transition-colors"
                      style={{
                        fontSize: '14px',
                        color: '#A8A099',
                        background: 'transparent',
                        border: '1px solid rgba(232,227,220,0.15)',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        textDecoration: 'none',
                      }}
                    >
                      {t.dashboard.manage}
                    </Link>
                  </div>
                  {showUpgrade && (
                    <button
                      onClick={() => setUpgradeTarget({ propertyId: property.id, userId: user.id })}
                      className="font-sans font-medium w-full transition-colors mt-3"
                      style={{
                        fontSize: '14px',
                        color: '#A8A099',
                        background: 'transparent',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Upgrade
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* ── Analytics ── */}
        <div className="mt-16">
          <h2 className="font-serif font-normal mb-8" style={{ fontSize: '28px', color: '#E8E3DC' }}>
            Analytics <span className="font-sans" style={{ fontSize: '13px', color: '#6B6560', marginLeft: '8px' }}>Last 30 days</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

            {/* Line chart — questions over time */}
            <div className="rounded-2xl p-6" style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)' }}>
              <div className="flex justify-between items-baseline mb-6">
                <p className="font-sans" style={{ fontSize: '13px', color: '#A8A099', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Guest questions</p>
                <p className="font-serif" style={{ fontSize: '32px', color: '#FFFFFF', fontWeight: 600 }}>{totalQuestions.toLocaleString()}</p>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={last30Days} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                  <XAxis
                    dataKey="date"
                    tick={{ fill: '#6B6560', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    interval={6}
                  />
                  <YAxis
                    tick={{ fill: '#6B6560', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{ background: '#0F0D0B', border: '1px solid rgba(232,227,220,0.1)', borderRadius: '8px', fontSize: '13px', color: '#E8E3DC' }}
                    itemStyle={{ color: '#C96A3A' }}
                    cursor={{ stroke: 'rgba(232,227,220,0.08)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="questions"
                    stroke="#C96A3A"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#C96A3A', strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar chart — category breakdown */}
            <div className="rounded-2xl p-6" style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)' }}>
              <p className="font-sans mb-6" style={{ fontSize: '13px', color: '#A8A099', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Top categories</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: '#6B6560', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={110}
                  />
                  <Tooltip
                    contentStyle={{ background: '#0F0D0B', border: '1px solid rgba(232,227,220,0.1)', borderRadius: '8px', fontSize: '13px', color: '#E8E3DC' }}
                    formatter={(v) => [`${v}%`, 'Share']}
                    cursor={{ fill: 'rgba(232,227,220,0.04)' }}
                  />
                  <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? '#C96A3A' : `rgba(201,106,58,${0.55 - i * 0.07})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>

      {/* Team access note */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-8 flex items-center gap-3 flex-wrap">
        <p className="font-sans" style={{ fontSize: '13px', color: '#53525D' }}>
          {t.dashboard.teamAccessNote}
        </p>
        <button
          onClick={() => setShowCalendly(true)}
          className="font-sans transition-colors"
          style={{ fontSize: '13px', color: '#A8A099', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
        >
          {t.dashboard.teamAccessCta}
        </button>
      </div>

      {/* Invoice modal */}
      {showInvoiceModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setShowInvoiceModal(false)}
        >
          <div
            className="relative w-full max-w-md"
            style={{ background: '#0F0D0B', border: '1px solid rgba(232,227,220,0.08)', borderRadius: '16px', padding: '40px' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowInvoiceModal(false)}
              style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: 'none', color: '#6B6560', cursor: 'pointer', fontSize: '22px', lineHeight: 1 }}
            >×</button>
            <h2 className="font-serif font-normal" style={{ fontSize: '28px', color: '#FFFFFF' }}>
              {t.dashboard.invoiceTitle}
            </h2>
            <p className="font-sans mt-2" style={{ fontSize: '14px', color: '#6B6560' }}>
              {t.dashboard.invoiceDesc}
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <a
                href="https://forms.gle/CsYAreNSpr2nHCq87"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowInvoiceModal(false)}
                className="flex items-center justify-between"
                style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '12px', padding: '20px 24px', textDecoration: 'none' }}
              >
                <div>
                  <p className="font-sans" style={{ fontSize: '15px', fontWeight: 500, color: '#FFFFFF', marginBottom: '4px' }}>
                    {t.dashboard.invoiceMx}
                  </p>
                  <p className="font-sans" style={{ fontSize: '13px', color: '#6B6560' }}>
                    {t.dashboard.invoiceMxDesc}
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '16px', flexShrink: 0 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#6B6560" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="https://forms.gle/gv8vDE62ABG7otH9A"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowInvoiceModal(false)}
                className="flex items-center justify-between"
                style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '12px', padding: '20px 24px', textDecoration: 'none' }}
              >
                <div>
                  <p className="font-sans" style={{ fontSize: '15px', fontWeight: 500, color: '#FFFFFF', marginBottom: '4px' }}>
                    {t.dashboard.invoiceIntl}
                  </p>
                  <p className="font-sans" style={{ fontSize: '13px', color: '#6B6560' }}>
                    {t.dashboard.invoiceIntlDesc}
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '16px', flexShrink: 0 }}>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#6B6560" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            <p className="font-sans text-center mt-6" style={{ fontSize: '12px', color: '#4A4540' }}>
              {t.dashboard.invoiceClose}
            </p>
          </div>
        </div>
      )}

      {/* Upgrade modal */}
      {upgradeTarget && (
        <UpgradeModal
          propertyId={upgradeTarget.propertyId}
          userId={upgradeTarget.userId}
          onClose={() => setUpgradeTarget(null)}
        />
      )}

      {/* Calendly modal */}
      {showCalendly && <CalendlyModal onClose={() => setShowCalendly(false)} />}
    </div>
  )
}
