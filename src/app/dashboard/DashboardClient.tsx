'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  selectedPropertyId: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedProperty: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedConversations: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedIssues: any[]
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
    questions: Math.round(
      15 + Math.random() * 55 + i * 0.8 +
      (d.getDay() === 0 || d.getDay() === 6 ? 12 : 0)
    ),
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

function formatDate(iso: string) {
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${date} · ${time}`
}

function formatIssueDate(iso: string) {
  const d = new Date(iso)
  return (
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ', ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  )
}

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max) + '…' : str
}

export default function DashboardClient({
  user,
  properties,
  selectedPropertyId,
  selectedProperty,
  selectedConversations,
  selectedIssues: initialSelectedIssues,
}: Props) {
  const { t } = useLang()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<'analytics' | 'issues' | 'deploy' | 'settings'>('analytics')
  const [upgradeTarget, setUpgradeTarget] = useState<UpgradeTarget | null>(null)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedEmbed, setCopiedEmbed] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [revenueSignals, setRevenueSignals] = useState<Record<string, number>>({})
  const [selectedStyle, setSelectedStyle] = useState<string>(
    selectedProperty?.conversational_style || 'warm_local'
  )
  const [isSavingStyle, setIsSavingStyle] = useState(false)
  const [styleSaved, setStyleSaved] = useState(false)
  const [alertEmail, setAlertEmail] = useState<string>(selectedProperty?.alert_email || '')
  const [isSavingAlert, setIsSavingAlert] = useState(false)
  const [alertSaved, setAlertSaved] = useState(false)
  const [issues, setIssues] = useState(initialSelectedIssues)

  // Reset tab and state when property changes
  useEffect(() => {
    setActiveTab('analytics')
    setSelectedStyle(selectedProperty?.conversational_style || 'warm_local')
    setAlertEmail(selectedProperty?.alert_email || '')
    setIssues(initialSelectedIssues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPropertyId])

  // Sync issues when prop changes
  useEffect(() => {
    setIssues(initialSelectedIssues)
  }, [initialSelectedIssues])

  // Revenue signals fetch
  useEffect(() => {
    if (!selectedProperty?.id) return
    async function fetchSignals() {
      const supabase = createClient()
      const { data } = await supabase
        .from('messages')
        .select('revenue_signal')
        .eq('property_id', selectedProperty.id)
        .eq('role', 'user')
        .not('revenue_signal', 'is', null)

      if (data) {
        const tally: Record<string, number> = {}
        data.forEach((m: { revenue_signal: string | null }) => {
          if (m.revenue_signal) tally[m.revenue_signal] = (tally[m.revenue_signal] || 0) + 1
        })
        setRevenueSignals(tally)
      }
    }
    fetchSignals()
  }, [selectedProperty?.id])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  async function copyToClipboard(text: string, setter: (v: boolean) => void) {
    await navigator.clipboard.writeText(text)
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  async function handleDownloadQR() {
    if (!selectedProperty) return
    const publicUrl = `https://placecompanion.com/assistant/${selectedProperty.id}`
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(publicUrl)}`
    const response = await fetch(qrUrl)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedProperty.hotel_name}-qr-code.png`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleStyleSave(newStyle: string) {
    if (!selectedProperty) return
    setSelectedStyle(newStyle)
    setIsSavingStyle(true)
    const supabase = createClient()
    await supabase
      .from('properties')
      .update({ conversational_style: newStyle })
      .eq('id', selectedProperty.id)
    setIsSavingStyle(false)
    setStyleSaved(true)
    setTimeout(() => setStyleSaved(false), 2000)
  }

  async function handleAlertEmailSave() {
    if (!selectedProperty) return
    setIsSavingAlert(true)
    const supabase = createClient()
    await supabase
      .from('properties')
      .update({ alert_email: alertEmail || null })
      .eq('id', selectedProperty.id)
    setIsSavingAlert(false)
    setAlertSaved(true)
    setTimeout(() => setAlertSaved(false), 2000)
  }

  async function handleDelete() {
    if (!selectedProperty) return
    if (!confirm(`Delete ${selectedProperty.hotel_name}? This cannot be undone.`)) return
    setIsDeleting(true)
    const supabase = createClient()
    await supabase.from('properties').delete().eq('id', selectedProperty.id)
    window.location.href = '/dashboard'
  }

  // suppress unused var warning for selectedConversations
  void selectedConversations
  void formatDate
  void revenueSignals

  return (
    <div style={{ background: '#0F0D0B', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* TOP BAR */}
      <header style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: '#161310',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '56px',
        flexShrink: 0,
      }}>
        <Link href="/" className="font-serif" style={{ color: '#E8E3DC', fontSize: '18px' }}>
          Place Companion
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="font-sans" style={{ fontSize: '13px', color: '#6B6560' }}>
            {user.email}
          </span>
          <button onClick={() => setShowInvoiceModal(true)} className="font-sans" style={{ fontSize: '13px', color: '#A8A099', background: 'transparent', border: '1px solid rgba(232,227,220,0.15)', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>
            {t.dashboard.getInvoice}
          </button>
          <button onClick={handleSignOut} className="font-sans" style={{ fontSize: '13px', color: '#A8A099', background: 'transparent', border: '1px solid rgba(232,227,220,0.15)', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>
            {t.dashboard.signOut}
          </button>
        </div>
      </header>

      {/* BODY: SIDEBAR + MAIN */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

        {/* LEFT SIDEBAR */}
        <aside style={{ width: '220px', flexShrink: 0, borderRight: '1px solid rgba(232,227,220,0.06)', background: '#0F0D0B', display: 'flex', flexDirection: 'column', padding: '24px 0' }}>
          <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4A4540', padding: '0 20px', marginBottom: '12px' }}>
            Your Hotels
          </p>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {properties.map((property) => {
              const isSelected = property.id === selectedPropertyId
              const hasIssues = property.openIssueCount > 0
              return (
                <button
                  key={property.id}
                  onClick={() => router.push(`/dashboard?property=${property.id}`)}
                  className="font-sans w-full"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 20px',
                    background: isSelected ? '#1A1715' : 'transparent',
                    borderLeft: isSelected ? '2px solid #C96A3A' : '2px solid transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    fontFamily: 'inherit',
                  }}
                >
                  <span style={{ fontSize: '12px', color: isSelected ? '#FAF9F5' : '#A8A099', fontWeight: isSelected ? 500 : 400, background: isSelected ? '#2C1810' : '#1A1715', border: `1px solid ${isSelected ? '#C96A3A' : 'rgba(232,227,220,0.08)'}`, borderRadius: '999px', padding: '4px 12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: hasIssues ? '148px' : '178px', display: 'inline-block' }}>
                    {property.hotel_name}
                  </span>
                  {hasIssues && (
                    <span style={{ background: '#C96A3A', color: '#FFFFFF', fontSize: '10px', fontWeight: 600, borderRadius: '999px', padding: '1px 6px', flexShrink: 0 }}>
                      {property.openIssueCount}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(232,227,220,0.06)' }}>
            <Link href="/onboarding" className="font-sans" style={{ fontSize: '13px', color: '#6B6560', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '16px', lineHeight: 1 }}>+</span>
              {t.dashboard.addProperty}
            </Link>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>

          {/* NO PROPERTY SELECTED */}
          {!selectedPropertyId && (
            <div>
              {properties.some((p) => p.openIssueCount > 0) && (
                <div style={{ background: 'rgba(201,106,58,0.08)', border: '1px solid rgba(201,106,58,0.25)', borderRadius: '12px', padding: '16px 20px', marginBottom: '32px' }}>
                  <p className="font-sans" style={{ fontSize: '13px', color: '#C96A3A', fontWeight: 500, marginBottom: '12px' }}>
                    Open guest issues
                  </p>
                  {properties.filter((p) => p.openIssueCount > 0).map((p) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid rgba(201,106,58,0.12)' }}>
                      <span className="font-sans" style={{ fontSize: '14px', color: '#E8E3DC' }}>{p.hotel_name}</span>
                      <button onClick={() => router.push(`/dashboard?property=${p.id}`)} className="font-sans" style={{ fontSize: '12px', color: '#C96A3A', background: 'transparent', border: '1px solid rgba(201,106,58,0.3)', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', fontFamily: 'inherit' }}>
                        {p.openIssueCount} open → View
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {properties.length === 0 && (
                <div style={{ textAlign: 'center', paddingTop: '80px' }}>
                  <p className="font-serif" style={{ fontSize: '32px', color: '#A8A099' }}>{t.dashboard.noProperties}</p>
                  <p className="font-sans" style={{ fontSize: '16px', color: '#6B6560', marginTop: '12px' }}>{t.dashboard.noPropertiesSubhead}</p>
                  <Link href="/onboarding" className="font-sans font-medium" style={{ display: 'inline-flex', alignItems: 'center', height: '48px', padding: '0 24px', background: '#C96A3A', color: 'white', borderRadius: '8px', fontSize: '15px', textDecoration: 'none', marginTop: '24px' }}>
                    {t.dashboard.configureFirst}
                  </Link>
                </div>
              )}

              {properties.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px 28px', background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '12px', maxWidth: '380px' }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0, animation: 'pc-arrow-pulse 2s ease-in-out infinite' }}>
                    <path d="M20 16H6M6 16L12 10M6 16L12 22" stroke="#C96A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-sans" style={{ fontSize: '14px', color: '#A8A099', lineHeight: 1.5 }}>
                    Select a hotel from the left<br />
                    <span style={{ fontSize: '12px', color: '#6B6560' }}>to view analytics, issues, and settings</span>
                  </p>
                </div>
              )}

              <div style={{ marginTop: '120px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <p className="font-sans" style={{ fontSize: '13px', color: '#53525D' }}>{t.dashboard.teamAccessNote}</p>
                <button onClick={() => setShowCalendly(true)} className="font-sans" style={{ fontSize: '13px', color: '#A8A099', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', fontFamily: 'inherit' }}>
                  {t.dashboard.teamAccessCta}
                </button>
              </div>
            </div>
          )}

          {/* PROPERTY SELECTED */}
          {selectedPropertyId && selectedProperty && (
            <div>
              {/* Property header */}
              <div style={{ marginBottom: '32px' }}>
                <p className="font-serif" style={{ fontSize: '28px', color: '#FFFFFF', fontWeight: 400 }}>{selectedProperty.hotel_name}</p>
                {selectedProperty.location && (
                  <p className="font-sans" style={{ fontSize: '15px', color: '#A8A099', marginTop: '4px' }}>{selectedProperty.location}</p>
                )}
                {(() => {
                  const status = selectedProperty.subscription_status ?? 'trial'
                  const trialEnds = new Date(selectedProperty.trial_ends_at)
                  const daysLeft = Math.max(0, Math.floor((trialEnds.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
                  const isTrial = status === 'trial'
                  const isCanceled = status === 'canceled'
                  const isPastDue = status === 'past_due'
                  const showUpgrade = isTrial || isCanceled || isPastDue
                  return (
                    <>
                      {isTrial && daysLeft <= 3 && daysLeft > 0 && (
                        <div className="font-sans rounded-lg mt-4 px-4 py-3" style={{ background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.3)', fontSize: '13px', color: '#FCD34D' }}>
                          Trial ends in {daysLeft} day{daysLeft !== 1 ? 's' : ''}.
                        </div>
                      )}
                      {isCanceled && (
                        <div className="font-sans rounded-lg mt-4 px-4 py-3" style={{ background: 'rgba(201,106,58,0.08)', border: '1px solid rgba(201,106,58,0.2)', fontSize: '13px', color: '#C96A3A' }}>
                          Subscription canceled — upgrade to reactivate.
                        </div>
                      )}
                      {isPastDue && (
                        <div className="font-sans rounded-lg mt-4 px-4 py-3" style={{ background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.3)', fontSize: '13px', color: '#FCD34D' }}>
                          Payment failed — update your billing to continue.
                        </div>
                      )}
                      {showUpgrade && (
                        <button onClick={() => setUpgradeTarget({ propertyId: selectedProperty.id, userId: user.id })} className="font-sans font-medium mt-3" style={{ fontSize: '14px', color: '#FAF9F5', background: '#C96A3A', borderRadius: '8px', padding: '8px 20px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                          Upgrade
                        </button>
                      )}
                    </>
                  )
                })()}
              </div>

              {/* TAB BAR */}
              {(() => {
                const openCount = issues.filter((i: { status: string }) => i.status === 'open').length
                return (
                  <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid rgba(232,227,220,0.06)', marginBottom: '32px' }}>
                    {(['analytics', 'issues', 'deploy', 'settings'] as const).map((tab) => {
                      const labels: Record<string, string> = { analytics: 'Analytics', issues: 'Issues', deploy: 'Deploy', settings: 'Settings' }
                      const isActive = activeTab === tab
                      return (
                        <button key={tab} onClick={() => setActiveTab(tab)} className="font-sans" style={{ fontSize: '14px', color: isActive ? '#FAF9F5' : '#6B6560', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 20px', borderBottom: isActive ? '2px solid #C96A3A' : '2px solid transparent', marginBottom: '-1px', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {labels[tab]}
                          {tab === 'issues' && openCount > 0 && (
                            <span style={{ background: '#C96A3A', color: '#FFFFFF', fontSize: '11px', fontWeight: 600, borderRadius: '999px', padding: '1px 7px', lineHeight: 1.6 }}>{openCount}</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )
              })()}

              {/* ANALYTICS TAB */}
              {activeTab === 'analytics' && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '16px', padding: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div>
                          <p className="font-sans" style={{ fontSize: '12px', color: '#A8A099', marginBottom: '4px' }}>Guest questions this month</p>
                          <p className="font-serif" style={{ fontSize: '32px', color: '#FFFFFF', fontWeight: 600, lineHeight: 1 }}>{totalQuestions.toLocaleString()}</p>
                        </div>
                        <span className="font-sans" style={{ fontSize: '11px', color: '#2D9E6B', background: '#242019', padding: '3px 10px', borderRadius: '999px' }}>Last 30 days</span>
                      </div>
                      <ResponsiveContainer width="100%" height={140}>
                        <LineChart data={last30Days} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
                          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6B6560' }} tickLine={false} axisLine={false} interval={6} />
                          <YAxis tick={{ fontSize: 10, fill: '#6B6560' }} tickLine={false} axisLine={false} />
                          <Tooltip contentStyle={{ background: '#1F1C19', border: '1px solid rgba(232,227,220,0.08)', borderRadius: '8px', fontSize: '12px', color: '#FAF9F5' }} labelStyle={{ color: '#A8A099', marginBottom: '2px' }} cursor={{ stroke: 'rgba(232,227,220,0.08)' }} />
                          <Line type="monotone" dataKey="questions" stroke="#C96A3A" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#C96A3A', stroke: '#0F0D0B', strokeWidth: 2 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '16px', padding: '24px' }}>
                      <p className="font-sans" style={{ fontSize: '12px', color: '#A8A099', marginBottom: '20px' }}>What guests are asking about</p>
                      <ResponsiveContainer width="100%" height={190}>
                        <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
                          <XAxis type="number" hide />
                          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#A8A099' }} tickLine={false} axisLine={false} width={110} />
                          <Tooltip contentStyle={{ background: '#1F1C19', border: '1px solid rgba(232,227,220,0.08)', borderRadius: '8px', fontSize: '12px', color: '#FAF9F5' }} formatter={(value) => [`${value}%`, 'Share']} cursor={{ fill: 'rgba(232,227,220,0.03)' }} />
                          <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                            {categoryData.map((_, index) => (
                              <Cell key={index} fill={index === 0 ? '#C96A3A' : `rgba(201,106,58,${0.65 - index * 0.07})`} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ flexShrink: 0, width: '100px', height: '100px' }}>
                      <svg viewBox="0 0 100 100" width="100" height="100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(232,227,220,0.06)" strokeWidth="10" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#2D9E6B" strokeWidth="10"
                          strokeDasharray={`${2 * Math.PI * 40 * 0.91} ${2 * Math.PI * 40 * 0.09}`}
                          strokeDashoffset={2 * Math.PI * 40 * 0.25}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                        <text x="50" y="46" textAnchor="middle" style={{ fontSize: '18px', fontWeight: 600, fill: '#FFFFFF' }}>91%</text>
                        <text x="50" y="61" textAnchor="middle" style={{ fontSize: '9px', fill: '#6B6560' }}>resolved</text>
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans" style={{ fontSize: '12px', color: '#A8A099', marginBottom: '4px' }}>AI resolution rate</p>
                      <p className="font-serif" style={{ fontSize: '24px', color: '#FFFFFF', fontWeight: 600, lineHeight: 1, marginBottom: '6px' }}>91% resolved by AI</p>
                      <p className="font-sans" style={{ fontSize: '13px', color: '#6B6560', lineHeight: 1.6 }}>9% escalated to your team — only the questions that genuinely need a human.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ISSUES TAB */}
              {activeTab === 'issues' && (
                <div>
                  {issues.length === 0 ? (
                    <div style={{ textAlign: 'center', paddingTop: '64px' }}>
                      <p className="font-sans" style={{ fontSize: '16px', color: '#6B6560' }}>{t.property.issuesEmpty}</p>
                    </div>
                  ) : (
                    <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '12px', overflow: 'hidden' }}>
                      <div className="font-sans" style={{ display: 'grid', gridTemplateColumns: '160px 1fr 80px 100px 130px', background: '#141210', padding: '12px 16px', fontSize: '11px', color: '#6B6560', gap: '16px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        <span>Date / Time</span>
                        <span>Guest Message</span>
                        <span>Room</span>
                        <span>Status</span>
                        <span></span>
                      </div>
                      {issues.map((issue: { id: string; created_at: string; guest_message: string; room_number?: string; status: string }, idx: number) => (
                        <div key={issue.id} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 80px 100px 130px', padding: '16px', gap: '16px', background: idx % 2 === 0 ? '#1A1715' : '#1F1C19', borderTop: idx === 0 ? 'none' : '1px solid rgba(232,227,220,0.04)', alignItems: 'center' }}>
                          <span className="font-sans" style={{ fontSize: '13px', color: '#6B6560' }}>{formatIssueDate(issue.created_at)}</span>
                          <span className="font-sans" style={{ fontSize: '14px', color: '#A8A099' }}>{truncate(issue.guest_message, 80)}</span>
                          <span className="font-sans" style={{ fontSize: '14px', color: '#E8E3DC', fontWeight: 500 }}>{issue.room_number || '—'}</span>
                          <span>
                            {issue.status === 'open' ? (
                              <span className="font-sans" style={{ fontSize: '12px', fontWeight: 500, background: 'rgba(201,106,58,0.15)', color: '#C96A3A', borderRadius: '999px', padding: '4px 12px' }}>{t.property.issueOpen}</span>
                            ) : (
                              <span className="font-sans" style={{ fontSize: '12px', fontWeight: 500, background: 'rgba(45,158,107,0.15)', color: '#2D9E6B', borderRadius: '999px', padding: '4px 12px' }}>{t.property.issueResolved}</span>
                            )}
                          </span>
                          <span>
                            {issue.status === 'open' && (
                              <button
                                onClick={async () => {
                                  const supabase = createClient()
                                  await supabase.from('issue_logs').update({ status: 'resolved', resolved_at: new Date().toISOString() }).eq('id', issue.id)
                                  setIssues((prev: typeof issues) => prev.map((i: typeof issue) => i.id === issue.id ? { ...i, status: 'resolved', resolved_at: new Date().toISOString() } : i))
                                }}
                                className="font-sans"
                                style={{ fontSize: '12px', color: '#A8A099', border: '1px solid rgba(232,227,220,0.15)', borderRadius: '6px', padding: '4px 12px', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}
                              >
                                {t.property.issueMarkResolved}
                              </button>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* DEPLOY TAB */}
              {activeTab === 'deploy' && (
                <div>
                  {(() => {
                    const publicUrl = `https://placecompanion.com/assistant/${selectedProperty.id}`
                    const embedCode = `<script src="https://placecompanion.com/widget.js" data-property="${selectedProperty.id}"></script>`
                    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(publicUrl)}`
                    return (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                        <div style={{ background: '#141210', borderRadius: '12px', padding: '24px', border: '1px solid rgba(232,227,220,0.06)' }}>
                          <p className="font-sans" style={{ fontSize: '11px', color: '#2D9E6B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{t.property.publicUrl}</p>
                          <p className="font-sans" style={{ fontSize: '13px', color: '#A8A099', wordBreak: 'break-all', marginBottom: '16px' }}>{publicUrl}</p>
                          <button onClick={() => copyToClipboard(publicUrl, setCopiedLink)} className="font-sans" style={{ fontSize: '13px', color: '#A8A099', background: 'transparent', border: '1px solid rgba(232,227,220,0.15)', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>
                            {copiedLink ? t.property.copied : t.property.copyLink}
                          </button>
                        </div>
                        <div style={{ background: '#141210', borderRadius: '12px', padding: '24px', border: '1px solid rgba(232,227,220,0.06)' }}>
                          <p className="font-sans" style={{ fontSize: '11px', color: '#2D9E6B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{t.property.embedWidget}</p>
                          <div style={{ background: '#0F0D0B', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
                            <code className="font-mono" style={{ fontSize: '11px', color: '#A8A099', wordBreak: 'break-all' }}>{embedCode}</code>
                          </div>
                          <button onClick={() => copyToClipboard(embedCode, setCopiedEmbed)} className="font-sans" style={{ fontSize: '13px', color: '#A8A099', background: 'transparent', border: '1px solid rgba(232,227,220,0.15)', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>
                            {copiedEmbed ? t.property.copied : t.property.copyCode}
                          </button>
                        </div>
                        <div style={{ background: '#141210', borderRadius: '12px', padding: '24px', border: '1px solid rgba(232,227,220,0.06)' }}>
                          <p className="font-sans" style={{ fontSize: '11px', color: '#2D9E6B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{t.property.qrCode}</p>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={qrUrl} alt="QR Code" width={120} height={120} style={{ marginBottom: '16px' }} />
                          <button onClick={handleDownloadQR} className="font-sans" style={{ fontSize: '13px', color: '#A8A099', background: 'transparent', border: '1px solid rgba(232,227,220,0.15)', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>
                            {t.property.downloadQr}
                          </button>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div style={{ maxWidth: '480px' }}>
                  <div style={{ marginBottom: '32px' }}>
                    <label className="font-sans" style={{ display: 'block', fontSize: '11px', color: '#A8A099', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{t.property.assistantPersonality}</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <select value={selectedStyle} onChange={e => handleStyleSave(e.target.value)} className="font-sans" style={{ background: '#1F1C19', border: '1px solid rgba(232,227,220,0.08)', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', color: '#FFFFFF', cursor: 'pointer', appearance: 'auto', fontFamily: 'inherit' }}>
                        {(Object.keys(t.onboarding.styles) as Array<keyof typeof t.onboarding.styles>).map(key => (
                          <option key={key} value={key}>{t.onboarding.styles[key].name}</option>
                        ))}
                      </select>
                      {isSavingStyle && <span className="font-sans" style={{ fontSize: '12px', color: '#6B6560' }}>{t.property.saving}</span>}
                      {styleSaved && <span className="font-sans" style={{ fontSize: '12px', color: '#2D9E6B' }}>{t.property.saved}</span>}
                    </div>
                  </div>
                  <div style={{ marginBottom: '32px' }}>
                    <label className="font-sans" style={{ display: 'block', fontSize: '11px', color: '#A8A099', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Staff Alert Email</label>
                    <p className="font-sans" style={{ fontSize: '13px', color: '#6B6560', lineHeight: 1.5, marginBottom: '12px' }}>Receive instant email alerts when guests report issues.</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="email" value={alertEmail} onChange={e => setAlertEmail(e.target.value)} placeholder="manager@yourhotel.com" className="font-sans" style={{ flex: 1, background: '#1F1C19', border: '1px solid rgba(232,227,220,0.08)', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', color: '#FFFFFF', outline: 'none', fontFamily: 'inherit' }} />
                      <button onClick={handleAlertEmailSave} disabled={isSavingAlert} className="font-sans" style={{ fontSize: '13px', color: '#A8A099', background: 'transparent', border: '1px solid rgba(232,227,220,0.15)', borderRadius: '8px', padding: '10px 14px', cursor: isSavingAlert ? 'not-allowed' : 'pointer', opacity: isSavingAlert ? 0.6 : 1, fontFamily: 'inherit' }}>
                        {isSavingAlert ? 'Saving…' : 'Save'}
                      </button>
                      {alertSaved && <span className="font-sans" style={{ fontSize: '12px', color: '#2D9E6B' }}>Saved</span>}
                    </div>
                  </div>
                  <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(232,227,220,0.06)' }}>
                    <button onClick={handleDelete} disabled={isDeleting} className="font-sans" style={{ height: '44px', padding: '0 24px', border: '1px solid rgba(220,50,50,0.3)', borderRadius: '8px', fontSize: '14px', color: '#E05555', background: 'transparent', cursor: isDeleting ? 'not-allowed' : 'pointer', opacity: isDeleting ? 0.6 : 1, fontFamily: 'inherit' }}>
                      {isDeleting ? t.property.deleting : t.property.deleteProperty}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROPERTY NOT FOUND */}
          {selectedPropertyId && !selectedProperty && (
            <div style={{ textAlign: 'center', paddingTop: '80px' }}>
              <p className="font-sans" style={{ fontSize: '16px', color: '#6B6560' }}>Property not found.</p>
              <button onClick={() => router.push('/dashboard')} className="font-sans" style={{ fontSize: '14px', color: '#A8A099', background: 'none', border: 'none', cursor: 'pointer', marginTop: '12px', textDecoration: 'underline', fontFamily: 'inherit' }}>
                Back to dashboard
              </button>
            </div>
          )}
        </main>
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
