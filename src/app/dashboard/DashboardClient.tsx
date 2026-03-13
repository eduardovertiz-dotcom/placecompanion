'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/lib/i18n/LanguageContext'
import UpgradeModal from '@/components/UpgradeModal'

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

export default function DashboardClient({ user, properties }: Props) {
  const { t } = useLang()
  const [upgradeTarget, setUpgradeTarget] = useState<UpgradeTarget | null>(null)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen" style={{ background: '#1C1917' }}>
      {/* Nav */}
      <header className="px-4 md:px-8 py-5 flex flex-wrap justify-between items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="font-serif text-xl" style={{ color: '#E8E3DC' }}>
          Place Companion
        </Link>
        <div className="flex items-center gap-4">
          <span className="font-sans hidden sm:inline" style={{ fontSize: '14px', color: '#A8A099' }}>
            {user.email}
          </span>
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
              background: '#FAF9F5',
              color: '#141413',
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
                background: '#FAF9F5',
                color: '#141413',
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
                    background: '#1F1E1D',
                    borderRadius: '16px',
                    padding: '32px',
                    border: '1px solid rgba(250,249,245,0.08)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(250,249,245,0.16)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(250,249,245,0.08)' }}
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
                          background: 'rgba(45,158,107,0.2)',
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
                          background: 'rgba(45,158,107,0.2)',
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
                    <p className="font-sans mt-1" style={{ fontSize: '14px', color: '#9C9A93' }}>
                      {property.location}
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
                    <p className="font-sans mt-4" style={{ fontSize: '13px', color: '#9C9A93' }}>
                      {t.dashboard.trialEnds} {trialEnds.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex gap-6 mt-6 pt-6" style={{ borderTop: '1px solid rgba(250,249,245,0.08)' }}>
                    {[
                      { label: t.dashboard.conversations, value: String(property.conversations?.[0]?.count ?? 0) },
                      { label: t.dashboard.questions, value: String(property.messages?.[0]?.count ?? 0) },
                      { label: t.dashboard.daysLeft, value: isActive ? '∞' : String(daysLeft) },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="font-sans tracking-widest" style={{ fontSize: '11px', color: '#9C9A93' }}>
                          {label}
                        </p>
                        <p className="font-serif mt-1" style={{ fontSize: '28px', color: '#FAF9F5' }}>
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
                        color: '#9C9A93',
                        border: '1px solid rgba(250,249,245,0.08)',
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
                        color: '#141413',
                        background: '#FAF9F5',
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
                        color: '#FAF9F5',
                        background: '#E8823A',
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
      </div>

      {/* Upgrade modal */}
      {upgradeTarget && (
        <UpgradeModal
          propertyId={upgradeTarget.propertyId}
          userId={upgradeTarget.userId}
          onClose={() => setUpgradeTarget(null)}
        />
      )}
    </div>
  )
}
