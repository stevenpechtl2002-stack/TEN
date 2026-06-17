import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, full_name, bio, avatar_url')
    .eq('id', user.id)
    .single()

  async function updateProfile(formData: FormData) {
    'use server'
    const full_name = formData.get('full_name') as string
    const bio = formData.get('bio') as string
    const { createClient: sc } = await import('@/lib/supabase/server')
    const s = await sc()
    const { data: { user: u } } = await s.auth.getUser()
    if (!u) return
    const { data: p } = await s.from('profiles').select('username').eq('id', u.id).single()
    await s.from('profiles').update({ full_name: full_name || null, bio: bio || null }).eq('id', u.id)
    redirect(`/profile/${p?.username}`)
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold">Einstellungen</h1>
      <form action={updateProfile} className="space-y-4">
        <div>
          <Label htmlFor="full_name">Name</Label>
          <Input
            id="full_name"
            name="full_name"
            defaultValue={profile?.full_name ?? ''}
            placeholder="Dein vollständiger Name"
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            defaultValue={profile?.bio ?? ''}
            rows={4}
            placeholder="Erzähl etwas über dich..."
          />
        </div>
        <Button type="submit">Speichern</Button>
      </form>
    </div>
  )
}
