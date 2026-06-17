'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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
    <form onSubmit={handleSubmit} className="space-y-3 border rounded-lg p-4 bg-card">
      <Textarea
        placeholder="Was denkst du gerade?"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={3}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={loading || !content.trim()}>
          {loading ? 'Lädt...' : 'Posten'}
        </Button>
      </div>
    </form>
  )
}
