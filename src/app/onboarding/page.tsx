'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Extracted = Record<string, any> | null

interface ChatMessage {
  role: string
  content: string
}

export default function OnboardingPage() {
  const [step, setStep] = useState<1|2|3|4>(1)
  const [inputMode, setInputMode] = useState<'text'|'url'>('text')
  const [hotelText, setHotelText] = useState('')
  const [hotelUrl, setHotelUrl] = useState('')
  const [isExtracting, setIsExtracting] = useState(false)
  const [extracted, setExtracted] = useState<Extracted>(null)
  const [extractError, setExtractError] = useState('')
  const [animatedItems, setAnimatedItems] = useState<string[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  const progressWidth = { 1: '25%', 2: '50%', 3: '75%', 4: '100%' }[step]

  async function animateIntelligence(data: Extracted) {
    const items: string[] = []
    if (data?.hotelName) items.push('hotelName')
    if (data?.restaurant?.found) items.push('restaurant')
    if (data?.spa?.found) items.push('spa')
    if (data?.amenities?.found) items.push('amenities')
    if (data?.policies?.found) items.push('policies')
    if (data?.nearby?.found) items.push('nearby')

    setAnimatedItems([])
    for (const item of items) {
      await new Promise(r => setTimeout(r, 600))
      setAnimatedItems(prev => [...prev, item])
    }
    await new Promise(r => setTimeout(r, 1000))
    setStep(3)
  }

  async function handleExtract() {
    setIsExtracting(true)
    setExtractError('')
    setStep(2)

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          inputMode === 'text'
            ? { text: hotelText }
            : { url: hotelUrl }
        )
      })
      const data = await res.json()
      if (data.error) {
        setExtractError(data.error)
        setStep(1)
      } else {
        setExtracted(data.extracted)
        animateIntelligence(data.extracted)
      }
    } catch {
      setExtractError('Something went wrong. Please try again.')
      setStep(1)
    } finally {
      setIsExtracting(false)
    }
  }

  async function handleSend() {
    if (!inputValue.trim() || isStreaming) return

    const userMessage: ChatMessage = { role: 'user', content: inputValue.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputValue('')
    setIsStreaming(true)
    setStreamingText('')

    try {
      const res = await fetch('/api/preview-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, extracted })
      })

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        fullText += chunk
        setStreamingText(fullText)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: fullText }])
      setStreamingText('')
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setIsStreaming(false)
    }
  }

  async function handleEmailSubmit() {
    localStorage.setItem('pc_lead', JSON.stringify({
      email,
      hotelName: extracted?.hotelName,
      extracted,
      timestamp: new Date().toISOString()
    }))
    setIsSubmitted(true)
  }

  const itemLabels: Record<string, string> = {
    hotelName: 'Hotel profile detected',
    restaurant: 'Restaurant & dining found',
    spa: 'Spa & wellness found',
    amenities: 'Amenities & facilities found',
    policies: 'Policies & hours found',
    nearby: 'Nearby experiences found',
  }

  const isStep1Disabled =
    (inputMode === 'text' && hotelText.trim().length < 50) ||
    (inputMode === 'url' && !hotelUrl.includes('http'))

  return (
    <div className="onboarding-page min-h-screen" style={{ backgroundColor: '#F7F4EE' }}>
      {/* Top bar */}
      <header className="px-8 py-5 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Link href="/" className="font-serif text-xl" style={{ color: '#0A0806' }}>
          Place Companion
        </Link>
        <Link href="/" className="font-sans text-sm transition-colors" style={{ color: '#5C5650' }}>
          ← Back to home
        </Link>
      </header>

      {/* Progress bar */}
      <div style={{ height: '4px', background: '#EDEBE6' }}>
        <div
          style={{
            height: '100%',
            background: '#2D9E6B',
            width: progressWidth,
            transition: 'width 0.5s ease',
          }}
        />
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="max-w-2xl mx-auto px-6 pt-24">
          <h1
            className="font-serif font-normal"
            style={{ fontSize: '64px', lineHeight: 1.05, color: '#0A0806' }}
          >
            Let&apos;s build your hotel assistant.
          </h1>
          <p
            className="font-sans font-light mt-4"
            style={{ fontSize: '18px', color: '#5C5650', lineHeight: 1.7 }}
          >
            Share your hotel&apos;s information. Our AI will read it and configure your assistant automatically.
          </p>

          {/* Tab switcher */}
          <div className="mt-8 inline-flex p-1 rounded-lg" style={{ background: '#EDEBE6' }}>
            <button
              onClick={() => setInputMode('text')}
              className="font-sans transition-all"
              style={{
                fontSize: '14px',
                fontWeight: inputMode === 'text' ? 500 : 400,
                padding: '8px 20px',
                borderRadius: '6px',
                background: inputMode === 'text' ? 'white' : 'transparent',
                color: inputMode === 'text' ? '#0A0806' : '#9A9590',
                boxShadow: inputMode === 'text' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Paste text
            </button>
            <button
              onClick={() => setInputMode('url')}
              className="font-sans transition-all"
              style={{
                fontSize: '14px',
                fontWeight: inputMode === 'url' ? 500 : 400,
                padding: '8px 20px',
                borderRadius: '6px',
                background: inputMode === 'url' ? 'white' : 'transparent',
                color: inputMode === 'url' ? '#0A0806' : '#9A9590',
                boxShadow: inputMode === 'url' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Enter URL
            </button>
          </div>

          {inputMode === 'text' ? (
            <textarea
              value={hotelText}
              onChange={e => setHotelText(e.target.value)}
              placeholder="Paste your hotel guide, services document, room information, restaurant hours, spa menu... The more detail you share, the smarter your assistant becomes."
              className="w-full mt-4 font-sans resize-none focus:outline-none transition-colors"
              style={{
                minHeight: '240px',
                background: 'white',
                border: '1px solid rgba(10,8,6,0.15)',
                borderRadius: '12px',
                padding: '20px',
                fontSize: '16px',
                color: '#0A0806',
              }}
              onFocus={e => { e.target.style.borderColor = '#2D9E6B' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(10,8,6,0.15)' }}
            />
          ) : (
            <input
              type="url"
              value={hotelUrl}
              onChange={e => setHotelUrl(e.target.value)}
              placeholder="https://yourhotel.com"
              className="w-full mt-4 font-sans focus:outline-none transition-colors"
              style={{
                height: '56px',
                background: 'white',
                border: '1px solid rgba(10,8,6,0.15)',
                borderRadius: '12px',
                padding: '0 20px',
                fontSize: '16px',
                color: '#0A0806',
              }}
              onFocus={e => { e.target.style.borderColor = '#2D9E6B' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(10,8,6,0.15)' }}
            />
          )}

          <button
            onClick={handleExtract}
            disabled={isStep1Disabled}
            className="w-full mt-6 font-sans font-medium transition-colors"
            style={{
              height: '48px',
              borderRadius: '6px',
              fontSize: '16px',
              background: isStep1Disabled ? '#9A9590' : '#2D9E6B',
              color: 'white',
              border: 'none',
              cursor: isStep1Disabled ? 'not-allowed' : 'pointer',
            }}
          >
            Analyze My Hotel →
          </button>

          <p className="font-sans text-center mt-3" style={{ fontSize: '13px', color: '#9A9590' }}>
            Takes about 30 seconds
          </p>

          {extractError && (
            <p className="font-sans text-center mt-3 text-red-500" style={{ fontSize: '14px' }}>
              {extractError}
            </p>
          )}
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="max-w-2xl mx-auto px-6 pt-24 text-center">
          <p
            className="font-sans uppercase tracking-widest"
            style={{ fontSize: '11px', color: '#2D9E6B' }}
          >
            ANALYZING YOUR HOTEL
          </p>
          <h1
            className="font-serif font-normal mt-4"
            style={{ fontSize: '56px', lineHeight: 1.05, color: '#0A0806' }}
          >
            Your assistant is learning.
          </h1>
          <p className="font-sans mt-3" style={{ fontSize: '18px', color: '#5C5650' }}>
            Reading your hotel&apos;s information...
          </p>

          <div className="max-w-sm mx-auto mt-12 space-y-4">
            {(['hotelName', 'restaurant', 'spa', 'amenities', 'policies', 'nearby'] as const).map(key => {
              const visible = animatedItems.includes(key)
              return visible ? (
                <div key={key} className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#2D9E6B',
                      transform: 'scale(1)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-sans" style={{ fontSize: '16px', color: '#0A0806' }}>
                    {itemLabels[key]}
                  </span>
                </div>
              ) : null
            })}
          </div>

          {animatedItems.length > 0 && (
            <p className="font-sans mt-8" style={{ fontSize: '14px', color: '#5C5650' }}>
              Building your assistant...
            </p>
          )}
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="max-w-3xl mx-auto px-6 pt-16">
          <p className="font-sans uppercase tracking-widest text-center" style={{ fontSize: '11px', color: '#2D9E6B' }}>
            YOUR ASSISTANT IS READY
          </p>
          <h1
            className="font-serif font-normal text-center mt-4"
            style={{ fontSize: '56px', lineHeight: 1.05, color: '#0A0806' }}
          >
            {extracted?.hotelName
              ? `Meet your ${extracted.hotelName} assistant.`
              : 'Meet your hotel assistant.'}
          </h1>
          <p className="font-sans text-center mt-3" style={{ fontSize: '18px', color: '#5C5650' }}>
            Ask it anything a guest would ask. This is your real assistant, trained on your hotel.
          </p>

          {/* Chat window */}
          <div
            className="mt-10 overflow-hidden"
            style={{
              background: 'white',
              borderRadius: '16px',
              border: '1px solid rgba(10,8,6,0.08)',
              boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
            }}
          >
            {/* Chat header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(10,8,6,0.06)' }}
            >
              <div>
                <p className="font-sans font-medium" style={{ fontSize: '16px', color: '#0A0806' }}>
                  {extracted?.hotelName || 'Your Hotel'}
                </p>
                <p className="font-sans mt-0.5" style={{ fontSize: '12px', color: '#9A9590' }}>
                  AI Guest Companion
                </p>
              </div>
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#2D9E6B' }}
              />
            </div>

            {/* Messages */}
            <div
              className="p-6 space-y-4 overflow-y-auto"
              style={{ minHeight: '320px', maxHeight: '400px' }}
            >
              {/* Initial greeting */}
              {messages.length === 0 && !streamingText && (
                <div>
                  <div
                    className="font-sans inline-block"
                    style={{
                      background: '#F7F4EE',
                      borderRadius: '12px 12px 12px 3px',
                      padding: '12px 16px',
                      maxWidth: '80%',
                      fontSize: '15px',
                      color: '#0A0806',
                      lineHeight: 1.6,
                    }}
                  >
                    Hello! I&apos;m your AI Guest Companion for {extracted?.hotelName || 'your hotel'}. I&apos;ve been trained on your property&apos;s information. Ask me anything your guests would want to know.
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : ''}>
                  <div
                    className="font-sans inline-block"
                    style={{
                      background: m.role === 'user' ? '#2D9E6B' : '#F7F4EE',
                      color: m.role === 'user' ? 'white' : '#0A0806',
                      borderRadius: m.role === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                      padding: '12px 16px',
                      maxWidth: '80%',
                      fontSize: '15px',
                      lineHeight: 1.6,
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {streamingText && (
                <div>
                  <div
                    className="font-sans inline-block"
                    style={{
                      background: '#F7F4EE',
                      borderRadius: '12px 12px 12px 3px',
                      padding: '12px 16px',
                      maxWidth: '80%',
                      fontSize: '15px',
                      color: '#0A0806',
                      lineHeight: 1.6,
                    }}
                  >
                    {streamingText}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 flex gap-3"
              style={{ borderTop: '1px solid rgba(10,8,6,0.06)' }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
                placeholder="Ask anything about your hotel..."
                disabled={isStreaming}
                className="flex-1 font-sans focus:outline-none transition-colors"
                style={{
                  background: '#F7F4EE',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '15px',
                  color: '#0A0806',
                  border: '1px solid transparent',
                }}
                onFocus={e => { e.target.style.borderColor = '#2D9E6B' }}
                onBlur={e => { e.target.style.borderColor = 'transparent' }}
              />
              <button
                onClick={handleSend}
                disabled={isStreaming || !inputValue.trim()}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: isStreaming || !inputValue.trim() ? 'rgba(45,158,107,0.35)' : '#2D9E6B',
                  border: 'none',
                  cursor: isStreaming || !inputValue.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 2L7 9M14 2L10 14L7 9M14 2L2 6L7 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Below chat CTA */}
          <div className="mt-8 text-center pb-16">
            <p className="font-sans" style={{ fontSize: '16px', color: '#5C5650' }}>
              Impressed? Save your assistant before it disappears.
            </p>
            <button
              onClick={() => setStep(4)}
              className="font-sans font-medium mt-4 inline-block transition-colors"
              style={{
                height: '48px',
                padding: '0 24px',
                borderRadius: '6px',
                fontSize: '16px',
                background: '#2D9E6B',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Save My Assistant →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="max-w-lg mx-auto px-6 pt-24 text-center pb-16">
          {!isSubmitted ? (
            <>
              <p className="font-sans uppercase tracking-widest" style={{ fontSize: '11px', color: '#2D9E6B' }}>
                ONE LAST STEP
              </p>
              <h1
                className="font-serif font-normal mt-4"
                style={{ fontSize: '64px', lineHeight: 1.05, color: '#0A0806' }}
              >
                Save your assistant.
              </h1>
              <p
                className="font-sans font-light mt-4 max-w-md mx-auto"
                style={{ fontSize: '18px', color: '#5C5650', lineHeight: 1.7 }}
              >
                Enter your email and we&apos;ll hold your assistant configuration. Your 14-day free trial starts when you&apos;re ready.
              </p>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full mt-8 font-sans focus:outline-none transition-colors"
                style={{
                  height: '56px',
                  background: 'white',
                  border: '1px solid rgba(10,8,6,0.15)',
                  borderRadius: '12px',
                  padding: '0 20px',
                  fontSize: '16px',
                  color: '#0A0806',
                }}
                onFocus={e => { e.target.style.borderColor = '#2D9E6B' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(10,8,6,0.15)' }}
              />
              <button
                onClick={handleEmailSubmit}
                disabled={!email.includes('@')}
                className="w-full mt-4 font-sans font-medium transition-colors"
                style={{
                  height: '48px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  background: !email.includes('@') ? '#9A9590' : '#2D9E6B',
                  color: 'white',
                  border: 'none',
                  cursor: !email.includes('@') ? 'not-allowed' : 'pointer',
                }}
              >
                Start My Free Trial →
              </button>
              <p className="font-sans mt-3" style={{ fontSize: '12px', color: '#9A9590' }}>
                14-day free trial · No credit card required · Cancel anytime
              </p>
            </>
          ) : (
            <>
              <div
                className="mx-auto flex items-center justify-center"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#2D9E6B',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M4 14L10.5 20.5L24 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1
                className="font-serif font-normal mt-8"
                style={{ fontSize: '56px', lineHeight: 1.05, color: '#0A0806' }}
              >
                You&apos;re on the list.
              </h1>
              <p className="font-sans mt-4" style={{ fontSize: '18px', color: '#5C5650' }}>
                We&apos;ll be in touch within 24 hours to get your assistant live.
              </p>
              <Link
                href="/"
                className="font-sans mt-8 inline-block"
                style={{ fontSize: '14px', color: '#9A9590' }}
              >
                ← Back to homepage
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}
