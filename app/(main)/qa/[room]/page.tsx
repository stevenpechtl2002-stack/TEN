import { createClient } from '@/lib/supabase/server'
import { QuestionCard } from '@/components/qa/QuestionCard'
import { QuestionForm } from '@/components/qa/QuestionForm'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function QARoomPage({ params }: { params: Promise<{ room: string }> }) {
  const { room: roomSlug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: room } = await supabase
    .from('qa_rooms')
    .select('id, name, description')
    .eq('slug', roomSlug)
    .single()

  if (!room) notFound()

  const { data: questions } = await supabase
    .from('qa_questions')
    .select('id, title, content, created_at, author:profiles!author_id(username, avatar_url, full_name), qa_answers(count)')
    .eq('room_id', room.id)
    .order('created_at', { ascending: false })

  const enriched = (questions ?? []).map(q => ({
    id: q.id,
    title: q.title,
    content: q.content,
    created_at: q.created_at,
    author: Array.isArray(q.author) ? q.author[0] : q.author,
    answer_count: (q.qa_answers as unknown as { count: number }[])[0]?.count ?? 0,
    room_slug: roomSlug,
  }))

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{room.name}</h1>
        {room.description && <p className="text-muted-foreground">{room.description}</p>}
      </div>
      {user && <QuestionForm roomId={room.id} />}
      <div className="space-y-3">
        {enriched.map(q => <QuestionCard key={q.id} question={q} />)}
        {enriched.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-8">Noch keine Fragen. Stelle die erste!</p>
        )}
      </div>
    </div>
  )
}
