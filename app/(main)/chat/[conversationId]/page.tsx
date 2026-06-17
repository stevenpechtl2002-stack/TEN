import { createClient } from '@/lib/supabase/server'
import { ChatWindow } from '@/components/chat/ChatWindow'
import { ChatInput } from '@/components/chat/ChatInput'
import { notFound, redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const dynamic = 'force-dynamic'

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>
}) {
  const { conversationId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: conv } = await supabase
    .from('conversations')
    .select(`
      id,
      participant_1_id,
      participant_2_id,
      p1:profiles!participant_1_id(username, full_name, avatar_url),
      p2:profiles!participant_2_id(username, full_name, avatar_url)
    `)
    .eq('id', conversationId)
    .single()

  if (!conv) notFound()

  const other = conv.participant_1_id === user.id
    ? (Array.isArray(conv.p2) ? conv.p2[0] : conv.p2)
    : (Array.isArray(conv.p1) ? conv.p1[0] : conv.p1)

  const otherProfile = other as { username?: string; full_name?: string | null; avatar_url?: string | null }

  const { data: messages } = await supabase
    .from('messages')
    .select('id, content, sender_id, created_at')
    .eq('conversation_id', conversationId)
    .order('created_at')

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] border rounded-lg overflow-hidden">
      <div className="flex items-center gap-3 p-4 border-b bg-card">
        <Avatar className="h-8 w-8">
          <AvatarImage src={otherProfile?.avatar_url ?? undefined} />
          <AvatarFallback>{(otherProfile?.full_name ?? otherProfile?.username ?? '?')[0]}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{otherProfile?.full_name ?? otherProfile?.username}</span>
      </div>
      <ChatWindow
        conversationId={conversationId}
        currentUserId={user.id}
        initialMessages={messages ?? []}
      />
      <ChatInput conversationId={conversationId} senderId={user.id} />
    </div>
  )
}
