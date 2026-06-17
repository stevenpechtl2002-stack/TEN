'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function PostForm({ communityId }: { communityId?: string }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('posts').insert({
      content: content.trim(),
      author_id: user.id,
      community_id: communityId ?? null,
    })

    setContent('')
    setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.125rem',
      marginBottom: '0.5rem',
    }}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Teile etwas mit der Community..."
        rows={3}
        style={{
          width: '100%', background: 'none', border: 'none', outline: 'none',
          color: 'var(--text)', fontSize: '0.925rem', lineHeight: 1.7,
          resize: 'none', fontFamily: 'var(--font-body)',
          '::placeholder': { color: 'var(--muted)' },
        } as React.CSSProperties}
      />
      <div style={{
        display: 'flex', justifyContent: 'flex-end',
        paddingTop: '0.75rem', borderTop: '1px solid var(--border)',
        marginTop: '0.5rem',
      }}>
        <button type="submit" disabled={loading || !content.trim()} style={{
          padding: '0.5rem 1.25rem',
          background: content.trim() ? 'var(--accent)' : 'var(--surface-2)',
          color: content.trim() ? '#fff' : 'var(--faint)',
          border: 'none', borderRadius: '7px',
          fontWeight: 600, fontSize: '0.875rem',
          cursor: content.trim() ? 'pointer' : 'not-allowed',
          transition: 'background 0.2s, color 0.2s',
          fontFamily: 'var(--font-body)',
        }}>
          {loading ? 'Postet...' : 'Posten'}
        </button>
      </div>
    </form>
  )
}
