'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/lib/i18n/LanguageContext'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  property: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conversations: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  issues: any[]
}

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

export default function PropertyClient({ property, conversations, issues: initialIssues }: Props) {
  const { t } = useLang()
  const [activeTab, setActiveTab] = useState<'overview' | 'issues'>('overview')
  const [issues, setIssues] = useState(initialIssues)
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedEmbed, setCopiedEmbed] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [revenueSignals, setRevenueSignals] = useState<Record<string, number>>({})
  const [selectedStyle, setSelectedStyle] = useState<string>(property.conversational_style || 'warm_local')
  const [isSavingStyle, setIsSavingStyle] = useState(false)
  const [styleSaved, setStyleSaved] = useState(false)
  const [alertEmail, setAlertEmail] = useState<string>(property.alert_email || '')
  const [isSavingAlert, setIsSavingAlert] = useState(false)
  const [alertSaved, setAlertSaved] = useState(false)

  useEffect(() => {
    async function fetchSignals() {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data } = await supabase
        .from('messages')
        .select('revenue_signal')
        .eq('property_id', property.id)
        .eq('role', 'user')
        .not('revenue_signal', 'is', null)

      if (data) {
        const tally: Record<string, number> = {}
        data.forEach(m => {
          if (m.revenue_signal) tally[m.revenue_signal] = (tally[m.revenue_signal] || 0) + 1
        })
        setRevenueSignals(tally)
      }
    }
    fetchSignals()
  }, [property.id])

  const publicUrl = `https://placecompanion.com/assistant/${property.id}`
  const embedCode = `<script src="https://placecompanion.com/widget.js" data-property="${property.id}"></script>`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(publicUrl)}`

  const trialEnds = new Date(property.trial_ends_at)
  const daysLeft = Math.max(0, Math.floor((trialEnds.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

  const totalConversations = conversations.length
  const totalMessages = conversations.reduce((acc: number, c: { message_count?: number }) => acc + (c.message_count || 0), 0)
  const uniqueLangs = new Set(conversations.map((c: { language_detected?: string }) => c.language_detected).filter(Boolean)).size

  const openIssueCount = issues.filter(i => i.status === 'open').length

  async function copyToClipboard(text: string, setter: (v: boolean) => void) {
    await navigator.clipboard.writeText(text)
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  async function handleDownloadQR() {
    const response = await fetch(qrUrl)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${property.hotel_name}-qr-code.png`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleStyleSave(newStyle: string) {
    setSelectedStyle(newStyle)
    setIsSavingStyle(true)
    const supabase = createClient()
    await supabase
      .from('properties')
      .update({ conversational_style: newStyle })
      .eq('id', property.id)
    setIsSavingStyle(false)
    setStyleSaved(true)
    setTimeout(() => setStyleSaved(false), 2000)
  }

  async function handleAlertEmailSave() {
    setIsSavingAlert(true)
    const supabase = createClient()
    await supabase
      .from('properties')
      .update({ alert_email: alertEmail || null })
      .eq('id', property.id)
    setIsSavingAlert(false)
    setAlertSaved(true)
    setTimeout(() => setAlertSaved(false), 2000)
  }

  async function handleDelete() {
    if (!confirm(`Delete ${property.hotel_name}? This cannot be undone.`)) return
    setIsDeleting(true)
    const supabase = createClient()
    await supabase.from('properties').delete().eq('id', property.id)
    window.location.href = '/dashboard'
  }

  async function handleMarkResolved(issueId: string) {
    const supabase = createClient()
    await supabase
      .from('issue_logs')
      .update({ status: 'resolved', resolved_at: new Date().toISOString() })
      .eq('id', issueId)
    setIssues(prev => prev.map(i => i.id === issueId ? { ...i, status: 'resolved', resolved_at: new Date().toISOString() } : i))
  }

  const ghostBtn: React.CSSProperties = {
    fontSize: '13px',
    color: '#A8A099',
    background: 'transparent',
    border: '1px solid rgba(232,227,220,0.15)',
    borderRadius: '8px',
    padding: '8px 14px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  }

  return (
    <div className="min-h-screen" style={{ background: '#0F0D0B' }}>
      {/* Nav */}
      <header className="px-4 md:px-8 py-5 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="font-serif text-xl" style={{ color: '#FFFFFF' }}>
          Place Companion
        </Link>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <Link
          href="/dashboard"
          className="font-sans transition-colors"
          style={{ fontSize: '14px', color: '#A8A099', textDecoration: 'none' }}
        >
          {t.property.backDashboard}
        </Link>

        <div className="mt-8">
          <h1 className="heading-page font-serif font-normal" style={{ color: '#FFFFFF' }}>
            {property.hotel_name}
          </h1>
          {property.location && (
            <p className="font-sans mt-2" style={{ fontSize: '18px', color: '#A8A099' }}>
              {property.location}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: t.property.totalConversations, value: String(totalConversations) },
            { label: t.property.totalQuestions, value: String(totalMessages) },
            { label: t.property.daysRemaining, value: String(daysLeft) },
            { label: t.property.languages, value: String(uniqueLangs || 0) },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: '#1F1C19',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid rgba(232,227,220,0.06)',
              }}
            >
              <p className="font-sans tracking-widest" style={{ fontSize: '11px', color: '#A8A099' }}>
                {label}
              </p>
              <p className="font-serif mt-2" style={{ fontSize: '40px', color: '#FFFFFF' }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mt-12" style={{ borderBottom: '1px solid rgba(232,227,220,0.06)' }}>
          {(['overview', 'issues'] as const).map(tab => {
            const label = tab === 'overview' ? t.property.overviewTab : t.property.issuesTab
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="font-sans relative flex items-center gap-2"
                style={{
                  fontSize: '14px',
                  color: isActive ? '#FAF9F5' : '#6B6560',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '12px 20px',
                  borderBottom: isActive ? '2px solid #C96A3A' : '2px solid transparent',
                  marginBottom: '-1px',
                  fontFamily: 'inherit',
                }}
              >
                {label}
                {tab === 'issues' && openIssueCount > 0 && (
                  <span style={{
                    background: '#C96A3A',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: '999px',
                    padding: '1px 7px',
                    lineHeight: 1.6,
                  }}>
                    {openIssueCount}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* ── OVERVIEW TAB ─────────────────────────────────── */}
        {activeTab === 'overview' && (
          <>
            {/* Deploy */}
            <div className="mt-12">
              <h2 className="font-serif font-normal" style={{ fontSize: '32px', color: '#FFFFFF' }}>
                {t.property.deployHeadline}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {/* Public URL */}
                <div style={{ background: '#141210', borderRadius: '12px', padding: '24px', border: '1px solid rgba(232,227,220,0.06)' }}>
                  <p className="font-sans tracking-widest" style={{ fontSize: '11px', color: '#2D9E6B' }}>
                    {t.property.publicUrl}
                  </p>
                  <p className="font-sans mt-2 break-all" style={{ fontSize: '14px', color: '#A8A099' }}>
                    {publicUrl}
                  </p>
                  <button
                    style={{ ...ghostBtn, marginTop: '16px' }}
                    onClick={() => copyToClipboard(publicUrl, setCopiedLink)}
                  >
                    {copiedLink ? t.property.copied : t.property.copyLink}
                  </button>
                </div>

                {/* Embed Widget */}
                <div style={{ background: '#141210', borderRadius: '12px', padding: '24px', border: '1px solid rgba(232,227,220,0.06)' }}>
                  <p className="font-sans tracking-widest" style={{ fontSize: '11px', color: '#2D9E6B' }}>
                    {t.property.embedWidget}
                  </p>
                  <div style={{ background: '#0F0D0B', borderRadius: '8px', padding: '16px', marginTop: '8px' }}>
                    <code className="font-mono break-all" style={{ fontSize: '12px', color: '#A8A099' }}>
                      {embedCode}
                    </code>
                  </div>
                  <button
                    style={{ ...ghostBtn, marginTop: '16px' }}
                    onClick={() => copyToClipboard(embedCode, setCopiedEmbed)}
                  >
                    {copiedEmbed ? t.property.copied : t.property.copyCode}
                  </button>
                </div>

                {/* QR Code */}
                <div style={{ background: '#141210', borderRadius: '12px', padding: '24px', border: '1px solid rgba(232,227,220,0.06)' }}>
                  <p className="font-sans tracking-widest" style={{ fontSize: '11px', color: '#2D9E6B' }}>
                    {t.property.qrCode}
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrUrl} alt="QR Code" width={150} height={150} className="mt-2" />
                  <button
                    style={{ ...ghostBtn, marginTop: '16px' }}
                    onClick={handleDownloadQR}
                  >
                    {t.property.downloadQr}
                  </button>
                </div>
              </div>
            </div>

            {/* Conversations */}
            <div className="mt-12">
              <h2 className="font-serif font-normal" style={{ fontSize: '32px', color: '#FFFFFF' }}>
                {t.property.conversationsHeadline}
              </h2>
              {conversations.length === 0 ? (
                <p className="font-sans mt-4" style={{ fontSize: '16px', color: '#6B6560' }}>
                  {t.property.noConversations}
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                      style={{
                        background: '#1A1715',
                        borderRadius: '12px',
                        padding: '16px 24px',
                        border: '1px solid rgba(232,227,220,0.06)',
                      }}
                    >
                      <span className="font-sans" style={{ fontSize: '14px', color: '#A8A099' }}>
                        {formatDate(conv.started_at)}
                      </span>
                      <span
                        className="font-sans"
                        style={{
                          fontSize: '11px',
                          background: '#242019',
                          color: '#2D9E6B',
                          padding: '2px 8px',
                          borderRadius: '999px',
                        }}
                      >
                        {conv.language_detected || 'en'}
                      </span>
                      <span className="font-sans" style={{ fontSize: '14px', color: '#6B6560' }}>
                        {conv.message_count || 0} {t.property.messages}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Revenue Signals */}
            <div className="mt-16">
              <h2 className="font-serif font-normal" style={{ fontSize: '32px', color: '#FFFFFF' }}>
                {t.property.revenueHeadline}
              </h2>
              {Object.keys(revenueSignals).length === 0 ? (
                <p className="font-sans mt-4" style={{ fontSize: '16px', color: '#6B6560' }}>
                  {t.property.noRevenue}
                </p>
              ) : (
                <div className="flex flex-wrap gap-4 mt-6">
                  {Object.entries(revenueSignals).map(([signal, count]) => {
                    const labels: Record<string, string> = t.property.signals
                    return (
                      <div
                        key={signal}
                        className="inline-flex flex-col"
                        style={{
                          background: '#1A1715',
                          borderRadius: '12px',
                          padding: '24px',
                          border: '1px solid rgba(232,227,220,0.06)',
                          minWidth: '140px',
                        }}
                      >
                        <p className="font-sans tracking-widest" style={{ fontSize: '11px', color: '#2D9E6B' }}>
                          {labels[signal] ?? signal.toUpperCase()}
                        </p>
                        <p className="font-serif mt-2" style={{ fontSize: '40px', color: '#FFFFFF' }}>
                          {count}
                        </p>
                        <p className="font-sans mt-1" style={{ fontSize: '13px', color: '#6B6560' }}>
                          {t.property.inquiries}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Settings / Danger */}
            <div className="mt-16">
              <h2 className="font-serif font-normal" style={{ fontSize: '32px', color: '#FFFFFF' }}>
                {t.property.settingsHeadline}
              </h2>

              {/* Personality selector */}
              <div className="mt-6 max-w-sm">
                <label className="font-sans block mb-2" style={{ fontSize: '13px', color: '#A8A099', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {t.property.assistantPersonality}
                </label>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedStyle}
                    onChange={e => handleStyleSave(e.target.value)}
                    className="font-sans"
                    style={{
                      background: '#1F1C19',
                      border: '1px solid rgba(232,227,220,0.08)',
                      borderRadius: '8px',
                      padding: '10px 16px',
                      fontSize: '14px',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      appearance: 'auto',
                    }}
                  >
                    {(Object.keys(t.onboarding.styles) as Array<keyof typeof t.onboarding.styles>).map(key => (
                      <option key={key} value={key}>
                        {t.onboarding.styles[key].name}
                      </option>
                    ))}
                  </select>
                  {isSavingStyle && (
                    <span className="font-sans" style={{ fontSize: '12px', color: '#6B6560' }}>{t.property.saving}</span>
                  )}
                  {styleSaved && (
                    <span className="font-sans" style={{ fontSize: '12px', color: '#2D9E6B' }}>{t.property.saved}</span>
                  )}
                </div>
              </div>

              {/* Alert Email */}
              <div className="mt-8 max-w-sm">
                <label className="font-sans block mb-1" style={{ fontSize: '13px', color: '#A8A099', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Staff Alert Email
                </label>
                <p className="font-sans mb-3" style={{ fontSize: '13px', color: '#6B6560', lineHeight: 1.5 }}>
                  Receive instant email alerts when guests report issues or maintenance problems.
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="email"
                    value={alertEmail}
                    onChange={e => setAlertEmail(e.target.value)}
                    placeholder="manager@yourhotel.com"
                    className="font-sans flex-1"
                    style={{
                      background: '#1F1C19',
                      border: '1px solid rgba(232,227,220,0.08)',
                      borderRadius: '8px',
                      padding: '10px 16px',
                      fontSize: '14px',
                      color: '#FFFFFF',
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={handleAlertEmailSave}
                    disabled={isSavingAlert}
                    className="font-sans"
                    style={{
                      ...ghostBtn,
                      opacity: isSavingAlert ? 0.6 : 1,
                      cursor: isSavingAlert ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isSavingAlert ? 'Saving…' : 'Save'}
                  </button>
                  {alertSaved && (
                    <span className="font-sans" style={{ fontSize: '12px', color: '#2D9E6B' }}>Saved</span>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="font-sans transition-colors"
                  style={{
                    height: '48px',
                    padding: '0 24px',
                    border: '1px solid rgba(220,50,50,0.3)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#E05555',
                    background: 'transparent',
                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                    opacity: isDeleting ? 0.6 : 1,
                  }}
                >
                  {isDeleting ? t.property.deleting : t.property.deleteProperty}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── ISSUES TAB ───────────────────────────────────── */}
        {activeTab === 'issues' && (
          <div className="mt-8">
            {issues.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-sans" style={{ fontSize: '16px', color: '#6B6560', lineHeight: 1.7 }}>
                  {t.property.issuesEmpty}
                </p>
              </div>
            ) : (
              <div style={{ background: '#1A1715', border: '1px solid rgba(232,227,220,0.06)', borderRadius: '12px', overflow: 'hidden' }}>
                {/* Header */}
                <div
                  className="grid font-sans uppercase tracking-widest"
                  style={{
                    gridTemplateColumns: '160px 1fr 80px 100px 130px',
                    background: '#141210',
                    padding: '12px 16px',
                    fontSize: '11px',
                    color: '#6B6560',
                    gap: '16px',
                  }}
                >
                  <span>Date / Time</span>
                  <span>Guest Message</span>
                  <span>Room</span>
                  <span>Status</span>
                  <span></span>
                </div>

                {/* Rows */}
                {issues.map((issue, idx) => (
                  <div
                    key={issue.id}
                    className="grid items-center"
                    style={{
                      gridTemplateColumns: '160px 1fr 80px 100px 130px',
                      padding: '16px',
                      gap: '16px',
                      background: idx % 2 === 0 ? '#1A1715' : '#1F1C19',
                      borderTop: idx === 0 ? 'none' : '1px solid rgba(232,227,220,0.04)',
                    }}
                  >
                    <span className="font-sans" style={{ fontSize: '13px', color: '#6B6560' }}>
                      {formatIssueDate(issue.created_at)}
                    </span>
                    <span className="font-sans" style={{ fontSize: '14px', color: '#A8A099' }}>
                      {truncate(issue.guest_message, 80)}
                    </span>
                    <span className="font-sans" style={{ fontSize: '14px', color: '#E8E3DC', fontWeight: 500 }}>
                      {issue.room_number || '—'}
                    </span>
                    <span>
                      {issue.status === 'open' ? (
                        <span className="font-sans" style={{ fontSize: '12px', fontWeight: 500, background: 'rgba(201,106,58,0.15)', color: '#C96A3A', borderRadius: '999px', padding: '4px 12px' }}>
                          {t.property.issueOpen}
                        </span>
                      ) : (
                        <span className="font-sans" style={{ fontSize: '12px', fontWeight: 500, background: 'rgba(45,158,107,0.15)', color: '#2D9E6B', borderRadius: '999px', padding: '4px 12px' }}>
                          {t.property.issueResolved}
                        </span>
                      )}
                    </span>
                    <span>
                      {issue.status === 'open' && (
                        <button
                          onClick={() => handleMarkResolved(issue.id)}
                          className="font-sans"
                          style={{
                            fontSize: '12px',
                            color: '#A8A099',
                            border: '1px solid rgba(232,227,220,0.15)',
                            borderRadius: '6px',
                            padding: '4px 12px',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                          }}
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
      </div>
    </div>
  )
}
