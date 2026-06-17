'use client'

import { useState } from 'react'
import Link from 'next/link'
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

  const initials = (post.author.full_name ?? post.author.username).slice(0, 2).toUpperCase()

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
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.25rem',
      transition: 'border-color 0.2s',
    }} className="post-card">
      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
        <Link href={`/profile/${post.author.username}`}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: post.author.avatar_url ? 'transparent' : 'linear-gradient(135deg, var(--accent), var(--gold))',
            border: '1px solid var(--border-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', flexShrink: 0,
            color: '#fff', fontSize: '0.72rem', fontWeight: 700,
            fontFamily: 'var(--font-display)',
          }}>
            {post.author.avatar_url
              ? <img src={post.author.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : initials
            }
          </div>
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link href={`/profile/${post.author.username}`} style={{
            fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)',
            fontFamily: 'var(--font-display)',
          }}>
            {post.author.full_name ?? post.author.username}
          </Link>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '1px' }}>
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: de })}
          </div>
        </div>
      </div>

      {/* Content */}
      <p style={{
        fontSize: '0.925rem', lineHeight: 1.7, color: 'var(--text)',
        whiteSpace: 'pre-wrap', marginBottom: '1rem',
      }}>{post.content}</p>

      {/* Actions */}
      <div style={{
        display: 'flex', gap: '0.25rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border)',
      }}>
        <button onClick={toggleLike} style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.4rem 0.75rem', borderRadius: '6px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: liked ? 'var(--accent)' : 'var(--muted)',
          fontSize: '0.82rem', fontWeight: 500,
          transition: 'background 0.15s, color 0.15s',
        }} className="action-btn">
          <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
          {likesCount > 0 && likesCount}
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.4rem 0.75rem', borderRadius: '6px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 500,
          transition: 'background 0.15s',
        }} className="action-btn">
          <MessageCircle size={14} />
          {post.comments_count > 0 && post.comments_count}
        </button>
      </div>

      <style>{`.post-card:hover { border-color: var(--border-2) !important; } .action-btn:hover { background: var(--surface-2) !important; color: var(--text) !important; }`}</style>
    </div>
  )
}
