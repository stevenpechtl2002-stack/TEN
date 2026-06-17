import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'

type Community = {
  id: string
  name: string
  slug: string
  description: string | null
  member_count: number
}

export function CommunityCard({ community }: { community: Community }) {
  return (
    <Link href={`/communities/${community.slug}`}>
      <Card className="hover:bg-accent transition-colors cursor-pointer">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{community.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {community.description && (
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{community.description}</p>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            {community.member_count} Mitglieder
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
