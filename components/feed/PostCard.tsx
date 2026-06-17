'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'

export type Post = {
  id: string
  content: string
  created_at: string
  author: { username: string; avatar_url: string | null; full_name: string | null }
  likes_count: number
  comments_count: number
  user_has_liked: boolean
}

export function PostCard({ post, currentUserId }: { post: Post; currentUserId: string | null }) {
  const [liked, setLiked] = useState(post.user_has_liked)
  const [likesCount, setLikesCount] = useState(post.likes_count)
  const supabase = createClient()

  async function toggleLike() {
    if (!currentUserId) return
    if (liked) {
      await supabase.from('post_likes').delete().eq('post_id', post.id).eq('user_id', currentUserId)
      setLikesCount(c => c - 1)
    } else {
      await supabase.from('post_likes').insert({ post_id: post.id, user_id: currentUserId })
      setLikesCount(c => c + 1)
    }
    setLiked(l => !l)
  }

  return (
    <div className="border rounded-lg p-4 bg-card space-y-3">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${post.author.username}`}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={post.author.avatar_url ?? undefined} />
            <AvatarFallback>{(post.author.full_name ?? post.author.username)[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href={`/profile/${post.author.username}`} className="font-medium text-sm hover:underline">
            {post.author.full_name ?? post.author.username}
          </Link>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: de })}
          </p>
        </div>
      </div>
      <p className="text-sm whitespace-pre-wrap">{post.content}</p>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={toggleLike} className={liked ? 'text-red-500' : ''}>
          <Heart className="h-4 w-4 mr-1" fill={liked ? 'currentColor' : 'none'} />
          {likesCount}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="h-4 w-4 mr-1" />
          {post.comments_count}
        </Button>
      </div>
    </div>
  )
}
