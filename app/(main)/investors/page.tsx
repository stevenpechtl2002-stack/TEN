import { createClient } from '@/lib/supabase/server'
import { InvestorCard } from '@/components/investors/InvestorCard'
import { PitchCard } from '@/components/investors/PitchCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function InvestorsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: investors } = await supabase
    .from('investor_profiles')
    .select('id, sectors, investment_min, investment_max, bio, profile:profiles!id(username, full_name, avatar_url)')

  const { data: pitches } = await supabase
    .from('pitches')
    .select('id, title, description, stage, funding_needed, author:profiles!author_id(username, full_name)')
    .order('created_at', { ascending: false })
    .limit(20)

  const enrichedInvestors = (investors ?? []).map(i => ({
    ...i,
    profile: Array.isArray(i.profile) ? i.profile[0] : i.profile,
  }))

  const enrichedPitches = (pitches ?? []).map(p => ({
    ...p,
    author: Array.isArray(p.author) ? p.author[0] : p.author,
  }))

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Investor-Bereich</h1>
        {user && (
          <Button>
            <Link href="/pitch/new">Projekt einreichen</Link>
          </Button>
        )}
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Investoren</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {enrichedInvestors.map(i => <InvestorCard key={i.id} investor={i} />)}
          {enrichedInvestors.length === 0 && (
            <p className="text-muted-foreground text-sm col-span-2">Noch keine Investoren registriert.</p>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Projekt-Pitches</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {enrichedPitches.map(p => <PitchCard key={p.id} pitch={p} />)}
          {enrichedPitches.length === 0 && (
            <p className="text-muted-foreground text-sm col-span-2">Noch keine Pitches eingereicht.</p>
          )}
        </div>
      </section>
    </div>
  )
}
