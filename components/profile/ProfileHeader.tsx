import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const roleLabels: Record<string, string> = {
  member: 'Mitglied',
  experienced: 'Erfahrener Unternehmer',
  investor: 'Investor',
  admin: 'Admin',
}

type Profile = {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  role: string
}

export function ProfileHeader({
  profile,
  isOwnProfile,
  conversationId,
}: {
  profile: Profile
  isOwnProfile: boolean
  conversationId: string | null
}) {
  return (
    <div className="flex items-start gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={profile.avatar_url ?? undefined} />
        <AvatarFallback className="text-2xl">
          {(profile.full_name ?? profile.username)[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-xl font-bold">{profile.full_name ?? profile.username}</h1>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
          </div>
          {!isOwnProfile && (
            <Button variant="outline">
              <Link href={conversationId ? `/chat/${conversationId}` : `/chat/new?user=${profile.username}`}>
                Nachricht schreiben
              </Link>
            </Button>
          )}
          {isOwnProfile && (
            <Button variant="outline">
              <Link href="/settings">Profil bearbeiten</Link>
            </Button>
          )}
        </div>
        <Badge variant="secondary">{roleLabels[profile.role] ?? profile.role}</Badge>
        {profile.bio && <p className="text-sm">{profile.bio}</p>}
      </div>
    </div>
  )
}
