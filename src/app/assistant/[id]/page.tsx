import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import AssistantClient from './AssistantClient'

export default async function AssistantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: property } = await supabase
    .from('properties')
    .select('id, hotel_name, location, extracted_data, system_prompt, is_active')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (!property) notFound()

  return <AssistantClient property={property} />
}
