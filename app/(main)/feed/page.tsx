import { createClient } from '@/lib/supabase/server'
import { PostForm } from '@/components/feed/PostForm'
import { PostCard } from '@/components/feed/PostCard'

export const dynamic = 'force-dynamic'

export default async function FeedPage() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: posts } = await supabase
      .from('posts')
      .select(`
        id, content, created_at,
        author:profiles!author_id(username, avatar_url, full_name),
        post_likes(user_id),
        post_comments(id)
      `)
      .is('community_id', null)
      .order('created_at', { ascending: false })
      .limit(50)

    const enrichedPosts = (posts ?? []).map(post => ({
      ...post,
      author: Array.isArray(post.author) ? post.author[0] : post.author,
      likes_count: post.post_likes?.length ?? 0,
      comments_count: post.post_comments?.length ?? 0,
      user_has_liked: post.post_likes?.some((l: { user_id: string }) => l.user_id === user?.id) ?? false,
    }))

    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Feed</h1>
        {user && <PostForm />}
        <div className="space-y-3">
          {enrichedPosts.map(post => (
            <PostCard key={post.id} post={post} currentUserId={user?.id ?? null} />
          ))}
          {enrichedPosts.length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-8">Noch keine Beiträge. Sei der Erste!</p>
          )}
        </div>
      </div>
    )
  } catch (e) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Feed</h1>
        <p className="text-muted-foreground text-sm text-center py-8">Feed konnte nicht geladen werden.</p>
      </div>
    )
  }
}
