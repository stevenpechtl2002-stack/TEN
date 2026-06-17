import { createClient } from '@/lib/supabase/server'
import { RoomCard } from '@/components/qa/RoomCard'

export const dynamic = 'force-dynamic'

export default async function QAPage() {
  const supabase = await createClient()

  const { data: rooms } = await supabase
    .from('qa_rooms')
    .select('id, name, slug, description, qa_questions(count)')
    .order('name')

  const enriched = (rooms ?? []).map(r => ({
    name: r.name,
    slug: r.slug,
    description: r.description,
    question_count: (r.qa_questions as unknown as { count: number }[])[0]?.count ?? 0,
  }))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Fragen & Antworten</h1>
      <p className="text-muted-foreground">Stell Fragen als Neuling und lerne von erfahrenen Unternehmern.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {enriched.map(r => <RoomCard key={r.slug} room={r} />)}
      </div>
    </div>
  )
}
