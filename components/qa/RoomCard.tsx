import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

type Room = {
  name: string
  slug: string
  description: string | null
  question_count: number
}

export function RoomCard({ room }: { room: Room }) {
  return (
    <Link href={`/qa/${room.slug}`}>
      <Card className="hover:bg-accent cursor-pointer transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{room.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {room.description && <p className="text-sm text-muted-foreground mb-2">{room.description}</p>}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MessageSquare className="h-3 w-3" />
            {room.question_count} Fragen
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
