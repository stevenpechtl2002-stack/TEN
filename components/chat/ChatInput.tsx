'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

export function ChatInput({ conversationId, senderId }: { conversationId: string; senderId: string }) {
  const [content, setContent] = useState('')
  const supabase = createClient()

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    const trimmed = content.trim()
    setContent('')
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_id: senderId,
      content: trimmed,
    })
  }

  return (
    <form onSubmit={sendMessage} className="flex gap-2 border-t p-4">
      <Input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Nachricht schreiben..."
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={!content.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
