'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

type Message = {
  id: string
  content: string
  sender_id: string
  created_at: string
}

export function ChatWindow({
  conversationId,
  currentUserId,
  initialMessages,
}: {
  conversationId: string
  currentUserId: string
  initialMessages: Message[]
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel(`chat:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [conversationId, supabase])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
      {messages.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-8">Noch keine Nachrichten. Schreib etwas!</p>
      )}
      {messages.map(msg => (
        <div
          key={msg.id}
          className={cn('flex', msg.sender_id === currentUserId ? 'justify-end' : 'justify-start')}
        >
          <div
            className={cn(
              'max-w-xs rounded-lg px-3 py-2 text-sm break-words',
              msg.sender_id === currentUserId
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground'
            )}
          >
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
