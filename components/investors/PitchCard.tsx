import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const stageLabels: Record<string, string> = {
  idea: 'Idee',
  mvp: 'MVP',
  growth: 'Wachstum',
  scaling: 'Skalierung',
}

type Pitch = {
  id: string
  title: string
  description: string
  stage: string
  funding_needed: number | null
  author: { username: string; full_name: string | null }
}

export function PitchCard({ pitch }: { pitch: Pitch }) {
  return (
    <Link href={`/pitch/${pitch.id}`}>
      <Card className="hover:bg-accent cursor-pointer transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{pitch.title}</CardTitle>
            <Badge variant="outline">{stageLabels[pitch.stage] ?? pitch.stage}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-2">{pitch.description}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{pitch.author.full_name ?? pitch.author.username}</span>
            {pitch.funding_needed && <span>€{pitch.funding_needed.toLocaleString('de-DE')} gesucht</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
