'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export function QuestionForm({ roomId }: { roomId: string }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }
    await supabase.from('qa_questions').insert({ room_id: roomId, author_id: user.id, title, content })
    setTitle('')
    setContent('')
    setLoading(false)
    setOpen(false)
    router.refresh()
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>Frage stellen</Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 space-y-3 bg-card">
      <h3 className="font-medium">Frage stellen</h3>
      <div>
        <Label>Titel</Label>
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Kurze, klare Frage" required />
      </div>
      <div>
        <Label>Details</Label>
        <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Mehr Details zu deiner Frage..." rows={4} required />
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>{loading ? 'Sendet...' : 'Frage stellen'}</Button>
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
      </div>
    </form>
  )
}
