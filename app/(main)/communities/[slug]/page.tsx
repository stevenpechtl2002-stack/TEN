import { createClient } from '@/lib/supabase/server'
import { PostForm } from '@/components/feed/PostForm'
import { PostCard } from '@/components/feed/PostCard'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function CommunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: community } = await supabase
    .from('communities')
    .select('id, name, description, community_members(user_id, role)')
    .eq('slug', slug)
    .single()

  if (!community) notFound()

  const isMember = community.community_members?.some(
    (m: { user_id: string }) => m.user_id === user?.id
  ) ?? false

  const communityId = community.id

  const { data: posts } = await supabase
    .from('posts')
    .select(`
      id, content, created_at,
      author:profiles!author_id(username, avatar_url, full_name),
      post_likes(user_id),
      post_comments(id)
    `)
    .eq('community_id', communityId)
    .order('created_at', { ascending: false })

  const enrichedPosts = (posts ?? []).map(post => ({
    ...post,
    author: Array.isArray(post.author) ? post.author[0] : post.author,
    likes_count: post.post_likes?.length ?? 0,
    comments_count: post.post_comments?.length ?? 0,
    user_has_liked: post.post_likes?.some((l: { user_id: string }) => l.user_id === user?.id) ?? false,
  }))

  async function joinCommunity() {
    'use server'
    const { createClient: sc } = await import('@/lib/supabase/server')
    const s = await sc()
    const { data: { user: u } } = await s.auth.getUser()
    if (u) {
      await s.from('community_members').insert({ community_id: communityId, user_id: u.id })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{community.name}</h1>
          {community.description && <p className="text-muted-foreground">{community.description}</p>}
        </div>
        {user && !isMember && (
          <form action={joinCommunity}>
            <Button type="submit">Beitreten</Button>
          </form>
        )}
      </div>
      {isMember && <PostForm communityId={communityId} />}
      <div className="space-y-3">
        {enrichedPosts.map(post => (
          <PostCard key={post.id} post={post} currentUserId={user?.id ?? null} />
        ))}
        {enrichedPosts.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-8">Noch keine Beiträge in dieser Community.</p>
        )}
      </div>
    </div>
  )
}
