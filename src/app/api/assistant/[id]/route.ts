import { streamText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const HALLUCINATION_GUARDRAIL = `Only recommend specific restaurants, businesses, attractions or services if they are explicitly mentioned in the hotel's knowledge base. For general destination questions, provide helpful guidance about the area but never invent or assume specific business names, addresses, hours, or prices that are not in your knowledge base.`

const FALLBACK_BEHAVIOR = `When a guest asks something not covered in your knowledge base, do not say you don't know or that information is unavailable. Instead respond helpfully using your general knowledge about the destination, travel, and hospitality. Be warm, resourceful, and genuinely helpful. Never leave a guest without a useful answer. If you truly cannot help, offer to connect them with the front desk.`

const STYLE_INSTRUCTIONS: Record<string, string> = {
  warm_local: 'Speak like a warm, genuine local friend. Personal, conversational, use the guest\'s name when known.',
  refined_concierge: 'Speak with the polish of a five-star concierge. Precise, professional, impeccable.',
  barefoot_luxury: 'Relaxed and warm but never casual to a fault. Think luxury beach resort — effortlessly refined.',
  playful_explorer: 'Fun, enthusiastic, and adventurous. Use occasional emojis. Make guests excited to explore.',
  zen_mindful: 'Calm, unhurried, thoughtful. Every response feels considered and serene.',
}

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
    .select('system_prompt, hotel_name, is_active, conversational_style')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (!property) {
    return new Response('Property not found', { status: 404 })
  }

  const styleKey = (property.conversational_style as string) || 'warm_local'
  const styleInstruction = STYLE_INSTRUCTIONS[styleKey] ?? STYLE_INSTRUCTIONS.warm_local
  const composedPrompt = `${property.system_prompt}\n\nCOMMUNICATION STYLE: ${styleInstruction}\n\nGUARANTEED ACCURACY: ${HALLUCINATION_GUARDRAIL}\n\nFALLBACK BEHAVIOR: ${FALLBACK_BEHAVIOR}`

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
    system: composedPrompt,
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
