import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ property?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const params = await searchParams
  const selectedPropertyId = params.property ?? null

  const { data: properties } = await supabase
    .from('properties')
    .select(`
      *,
      conversations(count),
      messages(count)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const propertyIds = (properties || []).map((p: { id: string }) => p.id)
  const openIssueCounts: Record<string, number> = {}

  if (propertyIds.length > 0) {
    const { data: issues } = await supabase
      .from('issue_logs')
      .select('property_id')
      .eq('status', 'open')
      .in('property_id', propertyIds)

    if (issues) {
      issues.forEach((i: { property_id: string }) => {
        openIssueCounts[i.property_id] = (openIssueCounts[i.property_id] || 0) + 1
      })
    }
  }

  const propertiesWithCounts = (properties || []).map((p: Record<string, unknown>) => ({
    ...p,
    openIssueCount: openIssueCounts[p.id as string] || 0,
  }))

  let selectedProperty = null
  let selectedConversations: unknown[] = []
  let selectedIssues: unknown[] = []

  if (selectedPropertyId) {
    const { data: propData } = await supabase
      .from('properties')
      .select('*')
      .eq('id', selectedPropertyId)
      .eq('user_id', user.id)
      .single()
    selectedProperty = propData

    if (propData) {
      const { data: convData } = await supabase
        .from('conversations')
        .select('*')
        .eq('property_id', selectedPropertyId)
        .order('started_at', { ascending: false })
        .limit(50)
      selectedConversations = convData || []

      const { data: issueData } = await supabase
        .from('issue_logs')
        .select('*')
        .eq('property_id', selectedPropertyId)
        .order('created_at', { ascending: false })
        .limit(100)
      selectedIssues = issueData || []
    }
  }

  return (
    <DashboardClient
      user={user}
      properties={propertiesWithCounts}
      selectedPropertyId={selectedPropertyId}
      selectedProperty={selectedProperty}
      selectedConversations={selectedConversations}
      selectedIssues={selectedIssues}
    />
  )
}
