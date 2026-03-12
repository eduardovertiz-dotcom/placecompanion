'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    setIsLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#1C1917' }}>
      {/* Top bar */}
      <header className="px-8 py-5 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="font-serif text-xl" style={{ color: '#E8E3DC' }}>
          Place Companion
        </Link>
      </header>

      <div className="max-w-md mx-auto px-6 py-24">
        <h1 className="font-serif font-normal text-center" style={{ fontSize: '56px', lineHeight: 1.05, color: '#E8E3DC' }}>
          Welcome back.
        </h1>
        <p className="font-sans text-center mt-3" style={{ fontSize: '18px', color: '#A8A099' }}>
          Sign in to your Place Companion account.
        </p>

        <div className="mt-10 space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleLogin() }}
            placeholder="your@email.com"
            className="w-full font-sans focus:outline-none transition-colors"
            style={{
              height: '56px',
              background: '#242019',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '0 20px',
              fontSize: '16px',
              color: '#E8E3DC',
            }}
            onFocus={e => { e.target.style.borderColor = '#2D9E6B' }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleLogin() }}
            placeholder="Password"
            className="w-full font-sans focus:outline-none transition-colors"
            style={{
              height: '56px',
              background: '#242019',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '0 20px',
              fontSize: '16px',
              color: '#E8E3DC',
            }}
            onFocus={e => { e.target.style.borderColor = '#2D9E6B' }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
          />
          {error && (
            <p className="font-sans text-center" style={{ fontSize: '14px', color: '#F87171' }}>
              {error}
            </p>
          )}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full font-sans font-medium transition-colors mt-2"
            style={{
              height: '56px',
              borderRadius: '12px',
              fontSize: '16px',
              background: '#2D9E6B',
              color: '#E8E3DC',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>

        <p className="font-sans text-center mt-6" style={{ fontSize: '14px', color: '#A8A099' }}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" style={{ color: '#2D9E6B' }}>
            Create one →
          </Link>
        </p>
      </div>
    </div>
  )
}
