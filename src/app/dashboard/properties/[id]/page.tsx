import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import PropertyClient from './PropertyClient'

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!property) notFound()

  const { data: conversations } = await supabase
    .from('conversations')
    .select('*')
    .eq('property_id', id)
    .order('started_at', { ascending: false })
    .limit(50)

  const { data: issues } = await supabase
    .from('issue_logs')
    .select('*')
    .eq('property_id', id)
    .order('created_at', { ascending: false })
    .limit(100)

  return <PropertyClient property={property} conversations={conversations || []} issues={issues || []} />
}
