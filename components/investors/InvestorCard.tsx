import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Investor = {
  id: string
  sectors: string[]
  investment_min: number | null
  investment_max: number | null
  bio: string | null
  profile: { username: string; full_name: string | null; avatar_url: string | null }
}

export function InvestorCard({ investor }: { investor: Investor }) {
  return (
    <Link href={`/investors/${investor.id}`}>
      <Card className="hover:bg-accent cursor-pointer transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={investor.profile.avatar_url ?? undefined} />
              <AvatarFallback>{(investor.profile.full_name ?? investor.profile.username)[0]}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-base">{investor.profile.full_name ?? investor.profile.username}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {investor.bio && <p className="text-sm text-muted-foreground line-clamp-2">{investor.bio}</p>}
          <div className="flex flex-wrap gap-1">
            {investor.sectors.map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
          </div>
          {(investor.investment_min || investor.investment_max) && (
            <p className="text-xs text-muted-foreground">
              {investor.investment_min ? `€${investor.investment_min.toLocaleString('de-DE')}` : ''}
              {investor.investment_min && investor.investment_max ? ' – ' : ''}
              {investor.investment_max ? `€${investor.investment_max.toLocaleString('de-DE')}` : ''}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
