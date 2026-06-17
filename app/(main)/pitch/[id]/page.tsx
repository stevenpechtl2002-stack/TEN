import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export const dynamic = 'force-dynamic'

const stageLabels: Record<string, string> = {
  idea: 'Idee',
  mvp: 'MVP',
  growth: 'Wachstum',
  scaling: 'Skalierung',
}

export default async function PitchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: pitchId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: pitch } = await supabase
    .from('pitches')
    .select('*, author:profiles!author_id(username, full_name, avatar_url)')
    .eq('id', pitchId)
    .single()

  if (!pitch) notFound()

  const author = Array.isArray(pitch.author) ? pitch.author[0] : pitch.author

  const { data: investorProfile } = user
    ? await supabase.from('investor_profiles').select('id').eq('id', user.id).single()
    : { data: null }

  async function applyToPitch(formData: FormData) {
    'use server'
    const message = formData.get('message') as string
    const { createClient: sc } = await import('@/lib/supabase/server')
    const s = await sc()
    const { data: { user: u } } = await s.auth.getUser()
    if (!u) return
    await s.from('pitch_applications').insert({
      pitch_id: pitchId,
      investor_id: u.id,
      message: message?.trim() || null,
    })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{pitch.title}</h1>
          <Badge variant="outline">{stageLabels[pitch.stage] ?? pitch.stage}</Badge>
        </div>
        <p className="text-muted-foreground">von {author?.full_name ?? author?.username}</p>
        {pitch.funding_needed && (
          <p className="font-medium">Gesuchtes Investment: €{pitch.funding_needed.toLocaleString('de-DE')}</p>
        )}
      </div>
      <p className="whitespace-pre-wrap">{pitch.description}</p>

      {investorProfile && user?.id !== pitch.author_id && (
        <form action={applyToPitch} className="border rounded-lg p-4 space-y-3 bg-card">
          <h3 className="font-medium">Als Investor bewerben</h3>
          <Textarea name="message" rows={4} placeholder="Kurze Nachricht an den Gründer..." />
          <Button type="submit">Bewerbung senden</Button>
        </form>
      )}
    </div>
  )
}
