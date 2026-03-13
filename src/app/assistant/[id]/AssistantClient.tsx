'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/lib/i18n/LanguageContext'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  property: any
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export default function AssistantClient({ property }: Props) {
  const { lang } = useLang()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const sessionId = useRef(Math.random().toString(36).slice(2))

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session)
    })
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  async function handleSend() {
    if (!inputValue.trim() || isStreaming) return

    const userMessage: ChatMessage = { role: 'user', content: inputValue.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputValue('')
    setIsStreaming(true)
    setStreamingText('')

    try {
      const res = await fetch(`/api/assistant/${property.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, sessionId: sessionId.current })
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8" style={{ background: '#1C1917' }}>
      {/* Back to dashboard — only for logged-in hotel owners */}
      {isLoggedIn && (
        <div className="w-full" style={{ maxWidth: '512px', marginBottom: '12px' }}>
          <Link
            href="/dashboard"
            className="font-sans transition-colors"
            style={{ fontSize: '13px', color: '#6B6560', textDecoration: 'none' }}
          >
            {lang === 'es' ? '← Volver al panel' : '← Back to dashboard'}
          </Link>
        </div>
      )}
      {/* Card */}
      <div
        className="w-full mx-auto rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{
          maxWidth: '512px',
          minHeight: '600px',
          maxHeight: '90vh',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Header */}
        <header
          className="flex justify-between items-center px-5 py-4"
          style={{ background: '#0F0D0B', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div>
            <p className="font-sans font-medium" style={{ fontSize: '16px', color: '#E8E3DC' }}>
              {property.hotel_name}
            </p>
            <p className="font-sans mt-0.5" style={{ fontSize: '11px', color: '#6B6560' }}>
              Powered by Place Companion
            </p>
          </div>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#2D9E6B' }} />
        </header>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
          style={{ background: '#0F0D0B' }}
        >
          {/* Initial greeting */}
          <div style={{ maxWidth: '85%' }}>
            <div
              className="font-sans"
              style={{
                background: '#242019',
                borderRadius: '16px 16px 16px 4px',
                padding: '12px 16px',
                fontSize: '15px',
                color: '#E8E3DC',
                lineHeight: 1.6,
              }}
            >
              Hello! I&apos;m your AI assistant for {property.hotel_name}. Ask me anything about the property, local area, or your stay.
            </div>
          </div>

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="font-sans rounded-2xl"
                style={{
                  background: m.role === 'user' ? '#0F0D0B' : '#242019',
                  color: '#E8E3DC',
                  padding: '12px 16px',
                  maxWidth: '80%',
                  fontSize: '15px',
                  lineHeight: 1.6,
                  marginLeft: m.role === 'user' ? 'auto' : undefined,
                  marginRight: m.role === 'assistant' ? 'auto' : undefined,
                }}
              >
                {m.content}
              </div>
            </div>
          ))}

          {streamingText && (
            <div className="flex justify-start">
              <div
                className="font-sans rounded-2xl"
                style={{
                  background: '#242019',
                  padding: '12px 16px',
                  maxWidth: '80%',
                  fontSize: '15px',
                  color: '#E8E3DC',
                  lineHeight: 1.6,
                  marginRight: 'auto',
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
          className="flex gap-3 items-center px-4 py-3"
          style={{ background: '#161310', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
            placeholder="Ask anything..."
            disabled={isStreaming}
            className="flex-1 font-sans focus:outline-none transition-colors"
            style={{
              background: '#242019',
              borderRadius: '999px',
              padding: '12px 20px',
              fontSize: '15px',
              color: '#E8E3DC',
              border: '1px solid transparent',
            }}
            onFocus={e => { e.target.style.borderColor = 'rgba(250,249,245,0.2)' }}
            onBlur={e => { e.target.style.borderColor = 'transparent' }}
          />
          <button
            onClick={handleSend}
            disabled={isStreaming || !inputValue.trim()}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: isStreaming || !inputValue.trim() ? 'rgba(201,106,58,0.35)' : '#C96A3A',
              opacity: 1,
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

      {/* Below card */}
      <p className="font-sans mt-4" style={{ fontSize: '13px', color: '#6B6560' }}>
        Powered by{' '}
        <Link href="/" className="transition-colors" style={{ color: '#6B6560' }}
          onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = '#A8A099' }}
          onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = '#6B6560' }}
        >
          Place Companion
        </Link>
      </p>
    </div>
  )
}
