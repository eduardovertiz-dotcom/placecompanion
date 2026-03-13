'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/lib/i18n/LanguageContext'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Extracted = Record<string, any> | null

type StyleKey = 'warm_local' | 'refined_concierge' | 'barefoot_luxury' | 'playful_explorer' | 'zen_mindful'

const STYLES: { key: StyleKey; emoji: string }[] = [
  { key: 'warm_local', emoji: '🤝' },
  { key: 'refined_concierge', emoji: '🎩' },
  { key: 'barefoot_luxury', emoji: '🌴' },
  { key: 'playful_explorer', emoji: '🧭' },
  { key: 'zen_mindful', emoji: '🧘' },
]

interface ChatMessage {
  role: string
  content: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildSystemPromptFromExtracted(extracted: any): string {
  if (!extracted) return ''
  let prompt = `You are an AI Guest Companion for ${extracted.hotelName || 'this hotel'}.`
  if (extracted.location) prompt += ` Located in ${extracted.location}.`
  if (extracted.roomCount) prompt += ` The hotel has ${extracted.roomCount} rooms.`
  prompt += '\n\nPROPERTY KNOWLEDGE:\n'
  if (extracted.restaurant?.found) prompt += `- ${extracted.restaurant.name || 'Restaurant'}: ${extracted.restaurant.hours || ''} ${extracted.restaurant.cuisine || ''}\n`
  if (extracted.spa?.found) prompt += `- ${extracted.spa.name || 'Spa'}: ${extracted.spa.hours || ''}. Treatments: ${extracted.spa.treatments?.join(', ') || ''}\n`
  if (extracted.amenities?.found) prompt += `- Amenities: ${extracted.amenities.items?.join(', ') || ''}\n`
  if (extracted.policies?.found) prompt += `- Check-in: ${extracted.policies.checkin || 'not specified'}. Check-out: ${extracted.policies.checkout || 'not specified'}\n`
  if (extracted.nearby?.found) prompt += `- Nearby: ${extracted.nearby.items?.join(', ') || ''}\n`
  prompt += '\nRULES: Warm concierge tone. Respond in the guest\'s language. Recommend hotel services first. Be concise but complete.'
  return prompt
}

export default function OnboardingPage() {
  const { t } = useLang()
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
  const [password, setPassword] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [conversationalStyle, setConversationalStyle] = useState<StyleKey>('warm_local')
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
    console.log('[onboarding] handleExtract called, inputMode:', inputMode, 'textLen:', hotelText.trim().length)
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
      console.log('[onboarding] extract status:', res.status)
      const data = await res.json()
      console.log('[onboarding] extract data:', data)
      if (!res.ok || data.error) {
        setExtractError(data.error || `Request failed (${res.status})`)
      } else {
        setExtracted(data.extracted)
        animateIntelligence(data.extracted)
      }
    } catch (err) {
      console.error('[onboarding] extract fetch error:', err)
      setExtractError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
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
        body: JSON.stringify({ messages: newMessages, extracted, conversationalStyle })
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

  async function handleCreateAccount() {
    if (!email.includes('@')) { setSaveError('Please enter a valid email'); return }
    if (password.length < 8) { setSaveError('Password must be at least 8 characters'); return }

    setIsSaving(true)
    setSaveError('')

    const supabase = createClient()

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { hotel_name: extracted?.hotelName } }
    })

    if (authError) {
      setSaveError(authError.message)
      setIsSaving(false)
      return
    }

    const systemPrompt = buildSystemPromptFromExtracted(extracted)

    const { error: propertyError } = await supabase
      .from('properties')
      .insert({
        user_id: authData.user!.id,
        hotel_name: extracted?.hotelName || 'My Hotel',
        location: extracted?.location || null,
        room_count: extracted?.roomCount || null,
        extracted_data: extracted,
        system_prompt: systemPrompt,
        conversational_style: conversationalStyle,
        is_active: true
      })
      .select()
      .single()

    if (propertyError) {
      setSaveError('Account created but could not save hotel. Please contact support.')
      setIsSaving(false)
      return
    }

    localStorage.removeItem('pc_lead')
    window.location.href = '/dashboard'
  }

  // Keep for legacy reference (no longer called in Step 4)
  async function handleEmailSubmit() {
    localStorage.setItem('pc_lead', JSON.stringify({
      email,
      hotelName: extracted?.hotelName,
      extracted,
      timestamp: new Date().toISOString()
    }))
    setIsSubmitted(true)
  }

  const itemLabels: Record<string, string> = t.onboarding.items

  const isStep1Disabled =
    (inputMode === 'text' && hotelText.trim().length < 50) ||
    (inputMode === 'url' && !hotelUrl.includes('http'))

  return (
    <div className="onboarding-page min-h-screen" style={{ backgroundColor: '#1C1917' }}>
      {/* Top bar */}
      <header className="px-4 md:px-8 py-5 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#1C1917' }}>
        <Link href="/" className="font-serif text-xl" style={{ color: '#E8E3DC' }}>
          Place Companion
        </Link>
        <Link href="/" className="font-sans text-sm transition-colors" style={{ color: '#A8A099' }}>
          {t.auth.backHome}
        </Link>
      </header>

      {/* Progress bar */}
      <div style={{ height: '4px', background: '#242019' }}>
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
        <div className="max-w-2xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-16">
          <h1 className="heading-page font-serif font-normal" style={{ color: '#E8E3DC' }}>
            {t.onboarding.step1Headline}
          </h1>
          <p
            className="font-sans font-light mt-4"
            style={{ fontSize: '18px', color: '#A8A099', lineHeight: 1.7 }}
          >
            {t.onboarding.step1Subhead}
          </p>

          {/* Tab switcher */}
          <div className="mt-8 inline-flex p-1 rounded-lg" style={{ background: '#242019' }}>
            <button
              onClick={() => setInputMode('text')}
              className="font-sans transition-all"
              style={{
                fontSize: '14px',
                fontWeight: inputMode === 'text' ? 500 : 400,
                padding: '8px 20px',
                borderRadius: '6px',
                background: inputMode === 'text' ? '#2C2720' : 'transparent',
                color: inputMode === 'text' ? '#E8E3DC' : '#6B6560',
                boxShadow: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {t.onboarding.pasteText}
            </button>
            <button
              onClick={() => setInputMode('url')}
              className="font-sans transition-all"
              style={{
                fontSize: '14px',
                fontWeight: inputMode === 'url' ? 500 : 400,
                padding: '8px 20px',
                borderRadius: '6px',
                background: inputMode === 'url' ? '#2C2720' : 'transparent',
                color: inputMode === 'url' ? '#E8E3DC' : '#6B6560',
                boxShadow: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {t.onboarding.enterUrl}
            </button>
          </div>

          {inputMode === 'text' ? (
            <textarea
              value={hotelText}
              onChange={e => setHotelText(e.target.value)}
              placeholder={t.onboarding.textPlaceholder}
              className="w-full mt-4 font-sans resize-none focus:outline-none transition-colors placeholder-[#6B6560]"
              style={{
                minHeight: '240px',
                background: '#242019',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '20px',
                fontSize: '16px',
                color: '#E8E3DC',
              }}
              onFocus={e => { e.target.style.borderColor = '#2D9E6B' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
            />
          ) : (
            <input
              type="url"
              value={hotelUrl}
              onChange={e => setHotelUrl(e.target.value)}
              placeholder={t.onboarding.urlPlaceholder}
              className="w-full mt-4 font-sans focus:outline-none transition-colors placeholder-[#6B6560]"
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
          )}

          {/* Style selector */}
          <div className="mt-8">
            <p className="font-sans font-medium" style={{ fontSize: '14px', color: '#E8E3DC' }}>
              {t.onboarding.chooseStyle}
            </p>
            <p className="font-sans mt-1" style={{ fontSize: '13px', color: '#6B6560' }}>
              {t.onboarding.styleSubhead}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {STYLES.map(({ key }) => {
                const styleData = t.onboarding.styles[key]
                const isSelected = conversationalStyle === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setConversationalStyle(key)}
                    className="text-left transition-all"
                    style={{
                      background: isSelected ? '#2C2720' : '#242019',
                      border: `1px solid ${isSelected ? '#2D9E6B' : 'rgba(232,227,220,0.06)'}`,
                      borderRadius: '10px',
                      padding: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    <p className="font-sans font-medium" style={{ fontSize: '14px', color: '#E8E3DC' }}>
                      {styleData.name}
                    </p>
                    <p className="font-sans mt-0.5" style={{ fontSize: '12px', color: '#6B6560', lineHeight: 1.4 }}>
                      {styleData.tagline}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          <button
            onClick={handleExtract}
            disabled={isStep1Disabled}
            className="w-full mt-6 font-sans font-medium transition-colors"
            style={{
              height: '48px',
              borderRadius: '6px',
              fontSize: '16px',
              background: isStep1Disabled ? '#6B6560' : '#2D9E6B',
              color: 'white',
              border: 'none',
              cursor: isStep1Disabled ? 'not-allowed' : 'pointer',
            }}
          >
            {t.onboarding.analyzeBtn}
          </button>

          <p className="font-sans text-center mt-3" style={{ fontSize: '13px', color: '#6B6560' }}>
            {t.onboarding.analyzing}
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
        <div className="max-w-2xl mx-auto px-4 md:px-6 pt-16 md:pt-24 text-center">
          <p
            className="font-sans uppercase tracking-widest"
            style={{ fontSize: '11px', color: '#2D9E6B' }}
          >
            {t.onboarding.step2Label}
          </p>
          <h1 className="heading-section font-serif font-normal mt-4" style={{ color: '#E8E3DC' }}>
            {t.onboarding.step2Headline}
          </h1>
          <p className="font-sans mt-3" style={{ fontSize: '18px', color: '#A8A099' }}>
            {t.onboarding.step2Subhead}
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
                  <span className="font-sans" style={{ fontSize: '16px', color: '#E8E3DC' }}>
                    {itemLabels[key]}
                  </span>
                </div>
              ) : null
            })}
          </div>

          {animatedItems.length > 0 && !extractError && (
            <p className="font-sans mt-8" style={{ fontSize: '14px', color: '#A8A099' }}>
              {t.onboarding.building}
            </p>
          )}

          {extractError && (
            <div className="mt-10 text-center">
              <p className="font-sans" style={{ fontSize: '15px', color: '#F87171' }}>
                {extractError}
              </p>
              <button
                onClick={() => { setExtractError(''); setStep(1); }}
                className="font-sans font-medium mt-4 inline-block transition-colors"
                style={{
                  height: '44px',
                  padding: '0 24px',
                  borderRadius: '6px',
                  fontSize: '15px',
                  background: '#2D9E6B',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {t.onboarding.tryAgain}
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="max-w-3xl mx-auto px-4 md:px-6 pt-12 md:pt-16">
          <p className="font-sans uppercase tracking-widest text-center" style={{ fontSize: '11px', color: '#2D9E6B' }}>
            {t.onboarding.step3Label}
          </p>
          <h1 className="heading-section font-serif font-normal text-center mt-4" style={{ color: '#E8E3DC' }}>
            {extracted?.hotelName
              ? t.onboarding.step3HeadlineWith.replace('{hotelName}', extracted.hotelName)
              : t.onboarding.step3HeadlineDefault}
          </h1>
          <p className="font-sans text-center mt-3" style={{ fontSize: '18px', color: '#A8A099' }}>
            {t.onboarding.step3Subhead}
          </p>

          {/* Chat window */}
          <div
            className="mt-10 overflow-hidden"
            style={{
              background: '#0F0D0B',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Chat header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ background: '#0F0D0B', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div>
                <p className="font-sans font-medium" style={{ fontSize: '16px', color: '#E8E3DC' }}>
                  {extracted?.hotelName || 'Your Hotel'}
                </p>
                <p className="font-sans mt-0.5" style={{ fontSize: '12px', color: '#6B6560' }}>
                  {t.onboarding.aiCompanionLabel}
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
              style={{ minHeight: '320px', maxHeight: 'min(400px, 50vh)', background: '#0F0D0B' }}
            >
              {messages.length === 0 && !streamingText && (
                <div>
                  <div
                    className="font-sans inline-block"
                    style={{
                      background: '#242019',
                      borderRadius: '12px 12px 12px 3px',
                      padding: '12px 16px',
                      maxWidth: '80%',
                      fontSize: '15px',
                      color: '#E8E3DC',
                      lineHeight: 1.6,
                    }}
                  >
                    {t.onboarding.step3Greeting.replace('{hotelName}', extracted?.hotelName || 'your hotel')}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : ''}>
                  <div
                    className="font-sans inline-block"
                    style={{
                      background: m.role === 'user' ? '#2D9E6B' : '#242019',
                      color: m.role === 'user' ? 'white' : '#E8E3DC',
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
                      background: '#242019',
                      borderRadius: '12px 12px 12px 3px',
                      padding: '12px 16px',
                      maxWidth: '80%',
                      fontSize: '15px',
                      color: '#E8E3DC',
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
              style={{ background: '#161310', borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
                placeholder={t.onboarding.chatPlaceholder}
                disabled={isStreaming}
                className="flex-1 font-sans focus:outline-none transition-colors placeholder-[#6B6560]"
                style={{
                  background: '#242019',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '15px',
                  color: '#E8E3DC',
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
                  background: '#2D9E6B',
                  opacity: isStreaming || !inputValue.trim() ? 0.4 : 1,
                  border: 'none',
                  cursor: isStreaming || !inputValue.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'opacity 0.2s',
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
            <p className="font-sans" style={{ fontSize: '16px', color: '#A8A099' }}>
              {t.onboarding.saveCta}
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
              {t.onboarding.saveBtn}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="max-w-lg mx-auto px-4 md:px-6 pt-16 md:pt-24 text-center pb-16">
          <p className="font-sans uppercase tracking-widest" style={{ fontSize: '11px', color: '#2D9E6B' }}>
            {t.onboarding.step4Label}
          </p>
          <h1 className="heading-page font-serif font-normal mt-4" style={{ color: '#E8E3DC' }}>
            {t.onboarding.step4Headline}
          </h1>
          <p
            className="font-sans font-light mt-4 max-w-md mx-auto"
            style={{ fontSize: '18px', color: '#A8A099', lineHeight: 1.7 }}
          >
            {t.onboarding.step4Body}
          </p>

          <div className="mt-8 space-y-4 text-left">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t.onboarding.emailPlaceholder}
              className="w-full font-sans focus:outline-none transition-colors placeholder-[#6B6560]"
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
              placeholder={t.onboarding.passwordPlaceholder}
              className="w-full font-sans focus:outline-none transition-colors placeholder-[#6B6560]"
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
            {saveError && (
              <p className="font-sans" style={{ fontSize: '14px', color: '#EF4444' }}>
                {saveError}
              </p>
            )}
            <button
              onClick={handleCreateAccount}
              disabled={isSaving}
              className="w-full font-sans font-medium transition-colors"
              style={{
                height: '56px',
                borderRadius: '12px',
                fontSize: '16px',
                background: isSaving ? '#6B6560' : '#2D9E6B',
                color: 'white',
                border: 'none',
                cursor: isSaving ? 'not-allowed' : 'pointer',
              }}
            >
              {isSaving ? t.onboarding.creating : t.onboarding.createBtn}
            </button>
          </div>
          <p className="font-sans text-center mt-3" style={{ fontSize: '12px', color: '#6B6560' }}>
            {t.onboarding.trialNote}
          </p>
        </div>
      )}
    </div>
  )
}
