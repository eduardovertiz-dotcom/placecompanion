'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: any[]
}

export default function DashboardClient({ user, properties }: Props) {
  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen" style={{ background: '#1C1917' }}>
      {/* Nav */}
      <header className="px-8 py-5 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="font-serif text-xl" style={{ color: '#E8E3DC' }}>
          Place Companion
        </Link>
        <div className="flex items-center gap-4">
          <span className="font-sans" style={{ fontSize: '14px', color: '#A8A099' }}>
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
            Sign Out
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="flex justify-between items-start">
          <h1 className="font-serif font-normal" style={{ fontSize: '56px', color: '#E8E3DC' }}>
            Your properties.
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
            Add Property
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif" style={{ fontSize: '32px', color: '#A8A099' }}>
              No properties yet.
            </p>
            <p className="font-sans mt-4" style={{ fontSize: '18px', color: '#6B6560' }}>
              Configure your first hotel assistant to get started.
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
              Configure Your First Hotel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {properties.map((property) => {
              const trialEnds = new Date(property.trial_ends_at)
              const daysLeft = Math.max(0, Math.floor((trialEnds.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
              const trialActive = daysLeft > 0

              return (
                <div
                  key={property.id}
                  className="transition-all cursor-pointer"
                  style={{
                    background: '#1F1E1D',
                    borderRadius: '16px',
                    padding: '32px',
                    border: '1px solid rgba(250,249,245,0.08)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(250,249,245,0.16)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(250,249,245,0.08)' }}
                >
                  <div className="flex justify-between items-start">
                    <p className="font-serif" style={{ fontSize: '24px', color: '#FAF9F5' }}>
                      {property.hotel_name}
                    </p>
                    {trialActive && (
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
                        TRIAL
                      </span>
                    )}
                  </div>

                  {property.location && (
                    <p className="font-sans mt-1" style={{ fontSize: '14px', color: '#9C9A93' }}>
                      {property.location}
                    </p>
                  )}

                  <p className="font-sans mt-4" style={{ fontSize: '13px', color: '#9C9A93' }}>
                    Trial ends {trialEnds.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>

                  <div className="flex gap-6 mt-6 pt-6" style={{ borderTop: '1px solid rgba(250,249,245,0.08)' }}>
                    {[
                      { label: 'CONVERSATIONS', value: String(property.conversations?.[0]?.count ?? 0) },
                      { label: 'QUESTIONS', value: String(property.messages?.[0]?.count ?? 0) },
                      { label: 'DAYS LEFT', value: String(daysLeft) },
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
                      View Assistant →
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
                      Manage
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
