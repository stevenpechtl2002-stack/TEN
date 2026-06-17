import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LogOut, Settings, User } from 'lucide-react'

async function signOut() {
  'use server'
  const { createClient: createServerClient } = await import('@/lib/supabase/server')
  const supabase = await createServerClient()
  await supabase.auth.signOut()
}

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = user
    ? await supabase.from('profiles').select('username, avatar_url, full_name').eq('id', user.id).single()
    : { data: null }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background z-50 flex items-center px-4 justify-between">
      <Link href="/feed" className="font-bold text-xl">TEN</Link>
      {profile && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile.avatar_url ?? undefined} />
                <AvatarFallback>{profile.full_name?.[0] ?? profile.username[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/profile/${profile.username}`} className="flex items-center w-full">
                <User className="mr-2 h-4 w-4" />Profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings" className="flex items-center w-full">
                <Settings className="mr-2 h-4 w-4" />Einstellungen
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form action={signOut} className="w-full">
                <button type="submit" className="flex items-center w-full">
                  <LogOut className="mr-2 h-4 w-4" />Abmelden
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  )
}
