import { createClient } from '@/lib/supabase/server'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { PostCard } from '@/components/feed/PostCard'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, full_name, avatar_url, bio, role')
    .eq('username', username)
    .single()

  if (!profile) notFound()

  const isOwnProfile = user?.id === profile.id

  let conversationId: string | null = null
  if (user && !isOwnProfile) {
    const { data: conv } = await supabase
      .from('conversations')
      .select('id')
      .or(
        `and(participant_1_id.eq.${user.id},participant_2_id.eq.${profile.id}),and(participant_1_id.eq.${profile.id},participant_2_id.eq.${user.id})`
      )
      .maybeSingle()
    conversationId = conv?.id ?? null
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('id, content, created_at, post_likes(user_id), post_comments(id)')
    .eq('author_id', profile.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const enrichedPosts = (posts ?? []).map(post => ({
    ...post,
    author: {
      username: profile.username,
      avatar_url: profile.avatar_url,
      full_name: profile.full_name,
    },
    likes_count: post.post_likes?.length ?? 0,
    comments_count: post.post_comments?.length ?? 0,
    user_has_liked:
      post.post_likes?.some((l: { user_id: string }) => l.user_id === user?.id) ?? false,
  }))

  return (
    <div className="space-y-6">
      <ProfileHeader
        profile={profile}
        isOwnProfile={isOwnProfile}
        conversationId={conversationId}
      />
      <div className="space-y-3">
        <h2 className="font-semibold">Beiträge</h2>
        {enrichedPosts.map(post => (
          <PostCard key={post.id} post={post} currentUserId={user?.id ?? null} />
        ))}
        {enrichedPosts.length === 0 && (
          <p className="text-muted-foreground text-sm">Noch keine Beiträge.</p>
        )}
      </div>
    </div>
  )
}
