import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

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

  return <DashboardClient user={user} properties={propertiesWithCounts} />
}
