import { createClient } from '@/lib/supabase/server'
import { AnswerCard } from '@/components/qa/AnswerCard'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export const dynamic = 'force-dynamic'

export default async function QuestionDetailPage({
  params,
}: {
  params: Promise<{ questionId: string; room: string }>
}) {
  const { questionId, room: roomSlug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: question } = await supabase
    .from('qa_questions')
    .select('id, title, content, created_at, author:profiles!author_id(username, avatar_url, full_name)')
    .eq('id', questionId)
    .single()

  if (!question) notFound()

  const { data: answers } = await supabase
    .from('qa_answers')
    .select('id, content, created_at, is_accepted, author:profiles!author_id(username, avatar_url, full_name, role)')
    .eq('question_id', question.id)
    .order('is_accepted', { ascending: false })
    .order('upvotes', { ascending: false })

  const enrichedAnswers = (answers ?? []).map(a => ({
    ...a,
    author: Array.isArray(a.author) ? a.author[0] : a.author,
  }))

  async function submitAnswer(formData: FormData) {
    'use server'
    const content = formData.get('content') as string
    if (!content?.trim()) return
    const { createClient: sc } = await import('@/lib/supabase/server')
    const s = await sc()
    const { data: { user: u } } = await s.auth.getUser()
    if (!u) return
    await s.from('qa_answers').insert({ question_id: questionId, author_id: u.id, content: content.trim() })
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 bg-card space-y-2">
        <h1 className="text-xl font-bold">{question.title}</h1>
        <p className="text-sm whitespace-pre-wrap">{question.content}</p>
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold">{enrichedAnswers.length} {enrichedAnswers.length === 1 ? 'Antwort' : 'Antworten'}</h2>
        {enrichedAnswers.map(a => <AnswerCard key={a.id} answer={a} />)}
        {enrichedAnswers.length === 0 && (
          <p className="text-muted-foreground text-sm">Noch keine Antworten. Sei der Erste!</p>
        )}
      </div>

      {user && (
        <form action={submitAnswer} className="space-y-3 border rounded-lg p-4 bg-card">
          <h3 className="font-medium">Deine Antwort</h3>
          <Textarea name="content" placeholder="Schreibe deine Antwort..." rows={5} required />
          <Button type="submit">Antwort senden</Button>
        </form>
      )}
    </div>
  )
}
