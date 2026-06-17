import { createClient } from '@/lib/supabase/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ChatPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: conversations } = await supabase
    .from('conversations')
    .select(`
      id,
      participant_1_id,
      participant_2_id,
      p1:profiles!participant_1_id(username, full_name, avatar_url),
      p2:profiles!participant_2_id(username, full_name, avatar_url)
    `)
    .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Nachrichten</h1>
      <div className="border rounded-lg divide-y">
        {(conversations ?? []).map(conv => {
          const other = conv.participant_1_id === user.id
            ? (Array.isArray(conv.p2) ? conv.p2[0] : conv.p2)
            : (Array.isArray(conv.p1) ? conv.p1[0] : conv.p1)
          return (
            <Link
              key={conv.id}
              href={`/chat/${conv.id}`}
              className="flex items-center gap-3 p-4 hover:bg-accent transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={(other as { avatar_url?: string | null })?.avatar_url ?? undefined} />
                <AvatarFallback>
                  {((other as { full_name?: string | null; username?: string })?.full_name ?? (other as { username?: string })?.username ?? '?')[0]}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">
                {(other as { full_name?: string | null; username?: string })?.full_name ?? (other as { username?: string })?.username}
              </span>
            </Link>
          )
        })}
        {(conversations ?? []).length === 0 && (
          <p className="text-muted-foreground text-sm p-6 text-center">
            Noch keine Gespräche. Besuche ein Profil um eine Konversation zu starten.
          </p>
        )}
      </div>
    </div>
  )
}
