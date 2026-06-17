'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'

export function PitchForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [stage, setStage] = useState('')
  const [fundingNeeded, setFundingNeeded] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stage) return
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data, error } = await supabase.from('pitches').insert({
      title,
      description,
      stage,
      funding_needed: fundingNeeded ? parseInt(fundingNeeded) : null,
      author_id: user.id,
    }).select('id').single()

    if (!error && data) {
      router.push(`/pitch/${data.id}`)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <Label>Titel des Projekts</Label>
        <Input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label>Beschreibung</Label>
        <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={6} required />
      </div>
      <div>
        <Label>Phase</Label>
        <Select onValueChange={(value: string | null) => setStage(value ?? '')}>
          <SelectTrigger>
            <SelectValue placeholder="Phase auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="idea">Idee</SelectItem>
            <SelectItem value="mvp">MVP</SelectItem>
            <SelectItem value="growth">Wachstum</SelectItem>
            <SelectItem value="scaling">Skalierung</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Gesuchtes Investment (€)</Label>
        <Input type="number" value={fundingNeeded} onChange={e => setFundingNeeded(e.target.value)} placeholder="z.B. 50000" />
      </div>
      <Button type="submit" disabled={loading || !stage}>
        {loading ? 'Wird eingereicht...' : 'Pitch einreichen'}
      </Button>
    </form>
  )
}
