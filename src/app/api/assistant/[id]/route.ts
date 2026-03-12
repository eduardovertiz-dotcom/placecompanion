import { streamText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function detectRevenueSignal(message: string): string | null {
  const lower = message.toLowerCase()
  if (lower.includes('spa') || lower.includes('massage') || lower.includes('treatment')) return 'spa'
  if (lower.includes('restaurant') || lower.includes('dinner') || lower.includes('breakfast') || lower.includes('lunch') || lower.includes('food')) return 'restaurant'
  if (lower.includes('tour') || lower.includes('activity') || lower.includes('excursion')) return 'activity'
  if (lower.includes('transport') || lower.includes('taxi') || lower.includes('airport') || lower.includes('transfer')) return 'transport'
  if (lower.includes('checkout') || lower.includes('check out') || lower.includes('late')) return 'late_checkout'
  if (lower.includes('upgrade') || lower.includes('room')) return 'room_upgrade'
  return null
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { messages, sessionId } = await req.json()
  const supabase = await createClient()

  // Fetch property
  const { data: property } = await supabase
    .from('properties')
    .select('system_prompt, hotel_name, is_active')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (!property) {
    return new Response('Property not found', { status: 404 })
  }

  // Find or create conversation
  let conversationId: string | null = null
  const { data: existingConv } = await supabase
    .from('conversations')
    .select('id')
    .eq('property_id', id)
    .eq('guest_session_id', sessionId)
    .single()

  if (existingConv) {
    await supabase
      .from('conversations')
      .update({ last_message_at: new Date().toISOString(), message_count: messages.length })
      .eq('id', existingConv.id)
    conversationId = existingConv.id
  } else {
    const { data: newConv } = await supabase
      .from('conversations')
      .insert({ property_id: id, guest_session_id: sessionId, message_count: messages.length })
      .select('id')
      .single()
    conversationId = newConv?.id ?? null
  }

  // Save user message
  const lastUserMessage = messages[messages.length - 1]
  if (lastUserMessage?.role === 'user' && conversationId) {
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      property_id: id,
      role: 'user',
      content: lastUserMessage.content,
      revenue_signal: detectRevenueSignal(lastUserMessage.content)
    })
  }

  // Normalize messages
  const normalized = (messages as Array<{ role: string; content: string }>)
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    system: property.system_prompt,
    messages: normalized,
    maxOutputTokens: 1024,
    onFinish: async ({ text }) => {
      if (conversationId) {
        await supabase.from('messages').insert({
          conversation_id: conversationId,
          property_id: id,
          role: 'assistant',
          content: text
        })
      }
    }
  })

  return result.toTextStreamResponse()
}
