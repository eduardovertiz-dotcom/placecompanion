'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  property: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conversations: any[]
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${date} · ${time}`
}

export default function PropertyClient({ property, conversations }: Props) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedEmbed, setCopiedEmbed] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [revenueSignals, setRevenueSignals] = useState<Record<string, number>>({})

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

  async function handleDelete() {
    if (!confirm(`Delete ${property.hotel_name}? This cannot be undone.`)) return
    setIsDeleting(true)
    const supabase = createClient()
    await supabase.from('properties').delete().eq('id', property.id)
    window.location.href = '/dashboard'
  }

  const ghostBtn: React.CSSProperties = {
    fontSize: '13px',
    color: '#A8A099',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    padding: '8px 14px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  }

  return (
    <div className="min-h-screen" style={{ background: '#1C1917' }}>
      {/* Nav */}
      <header className="px-8 py-5 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="font-serif text-xl" style={{ color: '#E8E3DC' }}>
          Place Companion
        </Link>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-16">
        <Link
          href="/dashboard"
          className="font-sans transition-colors"
          style={{ fontSize: '14px', color: '#A8A099', textDecoration: 'none' }}
        >
          ← Dashboard
        </Link>

        <div className="mt-8">
          <h1 className="font-serif font-normal" style={{ fontSize: '64px', color: '#E8E3DC', lineHeight: 1.05 }}>
            {property.hotel_name}
          </h1>
          {property.location && (
            <p className="font-sans mt-2" style={{ fontSize: '18px', color: '#A8A099' }}>
              {property.location}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-12">
          {[
            { label: 'TOTAL CONVERSATIONS', value: String(totalConversations) },
            { label: 'TOTAL QUESTIONS', value: String(totalMessages) },
            { label: 'DAYS REMAINING', value: String(daysLeft) },
            { label: 'LANGUAGES DETECTED', value: String(uniqueLangs || 0) },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: '#242019',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p className="font-sans tracking-widest" style={{ fontSize: '11px', color: '#6B6560' }}>
                {label}
              </p>
              <p className="font-serif mt-2" style={{ fontSize: '40px', color: '#E8E3DC' }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Deploy */}
        <div className="mt-12">
          <h2 className="font-serif font-normal" style={{ fontSize: '32px', color: '#E8E3DC' }}>
            Deploy your assistant.
          </h2>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {/* Public URL */}
            <div style={{ background: '#242019', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-sans tracking-widest" style={{ fontSize: '11px', color: '#2D9E6B' }}>
                PUBLIC URL
              </p>
              <p className="font-sans mt-2 break-all" style={{ fontSize: '14px', color: '#A8A099' }}>
                {publicUrl}
              </p>
              <button
                style={{ ...ghostBtn, marginTop: '16px' }}
                onClick={() => copyToClipboard(publicUrl, setCopiedLink)}
              >
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
            </div>

            {/* Embed Widget */}
            <div style={{ background: '#242019', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-sans tracking-widest" style={{ fontSize: '11px', color: '#2D9E6B' }}>
                EMBED WIDGET
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
                {copiedEmbed ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            {/* QR Code */}
            <div style={{ background: '#242019', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-sans tracking-widest" style={{ fontSize: '11px', color: '#2D9E6B' }}>
                QR CODE
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="QR Code" width={150} height={150} className="mt-2" />
              <button
                style={{ ...ghostBtn, marginTop: '16px' }}
                onClick={handleDownloadQR}
              >
                Download QR
              </button>
            </div>
          </div>
        </div>

        {/* Conversations */}
        <div className="mt-12">
          <h2 className="font-serif font-normal" style={{ fontSize: '32px', color: '#E8E3DC' }}>
            Recent conversations.
          </h2>
          {conversations.length === 0 ? (
            <p className="font-sans mt-4" style={{ fontSize: '16px', color: '#6B6560' }}>
              No conversations yet. Share your assistant link to get started.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-center justify-between"
                  style={{
                    background: '#242019',
                    borderRadius: '12px',
                    padding: '16px 24px',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span className="font-sans" style={{ fontSize: '14px', color: '#A8A099' }}>
                    {formatDate(conv.started_at)}
                  </span>
                  <span
                    className="font-sans"
                    style={{
                      fontSize: '11px',
                      background: 'rgba(45,158,107,0.2)',
                      color: '#2D9E6B',
                      padding: '2px 8px',
                      borderRadius: '999px',
                    }}
                  >
                    {conv.language_detected || 'en'}
                  </span>
                  <span className="font-sans" style={{ fontSize: '14px', color: '#6B6560' }}>
                    {conv.message_count || 0} messages
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Revenue Signals */}
        <div className="mt-16">
          <h2 className="font-serif font-normal" style={{ fontSize: '32px', color: '#E8E3DC' }}>
            Revenue signals.
          </h2>
          {Object.keys(revenueSignals).length === 0 ? (
            <p className="font-sans mt-4" style={{ fontSize: '16px', color: '#6B6560' }}>
              No revenue signals yet. Share your assistant link to start tracking guest intent.
            </p>
          ) : (
            <div className="flex flex-wrap gap-4 mt-6">
              {Object.entries(revenueSignals).map(([signal, count]) => {
                const labels: Record<string, string> = {
                  spa: 'SPA & WELLNESS',
                  restaurant: 'DINING',
                  activity: 'ACTIVITIES',
                  transport: 'TRANSPORT',
                  late_checkout: 'LATE CHECKOUT',
                  room_upgrade: 'ROOM UPGRADE',
                }
                return (
                  <div
                    key={signal}
                    className="inline-flex flex-col"
                    style={{
                      background: '#242019',
                      borderRadius: '12px',
                      padding: '24px',
                      border: '1px solid rgba(255,255,255,0.06)',
                      minWidth: '140px',
                    }}
                  >
                    <p className="font-sans tracking-widest" style={{ fontSize: '11px', color: '#2D9E6B' }}>
                      {labels[signal] ?? signal.toUpperCase()}
                    </p>
                    <p className="font-serif mt-2" style={{ fontSize: '40px', color: '#E8E3DC' }}>
                      {count}
                    </p>
                    <p className="font-sans mt-1" style={{ fontSize: '13px', color: '#6B6560' }}>
                      guest inquiries
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Settings / Danger */}
        <div className="mt-16">
          <h2 className="font-serif font-normal" style={{ fontSize: '32px', color: '#E8E3DC' }}>
            Settings.
          </h2>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="font-sans transition-colors"
              style={{
                height: '48px',
                padding: '0 24px',
                border: '1px solid rgba(239,68,68,0.5)',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#F87171',
                background: 'transparent',
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                opacity: isDeleting ? 0.6 : 1,
              }}
            >
              {isDeleting ? 'Deleting...' : 'Delete Property'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
