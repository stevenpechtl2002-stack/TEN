import { createClient } from '@/lib/supabase/server'
import { CommunityCard } from '@/components/communities/CommunityCard'
import { CommunityForm } from '@/components/communities/CommunityForm'

export const dynamic = 'force-dynamic'

export default async function CommunitiesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: communities } = await supabase
    .from('communities')
    .select('id, name, slug, description, community_members(count)')
    .order('created_at', { ascending: false })

  const enriched = (communities ?? []).map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    member_count: (c.community_members as unknown as { count: number }[])[0]?.count ?? 0,
  }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Communities</h1>
        {user && <CommunityForm />}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {enriched.map(c => <CommunityCard key={c.id} community={c} />)}
        {enriched.length === 0 && (
          <p className="text-muted-foreground text-sm col-span-2 text-center py-8">
            Noch keine Communities. Erstelle die erste!
          </p>
        )}
      </div>
    </div>
  )
}
