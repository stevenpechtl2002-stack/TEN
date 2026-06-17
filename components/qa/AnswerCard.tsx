import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'

export type Answer = {
  id: string
  content: string
  created_at: string
  is_accepted: boolean
  author: { username: string; avatar_url: string | null; full_name: string | null; role: string }
}

export function AnswerCard({ answer }: { answer: Answer }) {
  return (
    <div className={`border rounded-lg p-4 space-y-3 ${answer.is_accepted ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'bg-card'}`}>
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={answer.author.avatar_url ?? undefined} />
          <AvatarFallback>{(answer.author.full_name ?? answer.author.username)[0]}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm">{answer.author.full_name ?? answer.author.username}</span>
          {answer.author.role === 'experienced' && (
            <Badge variant="secondary" className="text-xs">Erfahren</Badge>
          )}
          {answer.is_accepted && <Badge className="text-xs bg-green-500">Akzeptiert</Badge>}
        </div>
        <span className="text-xs text-muted-foreground ml-auto">
          {formatDistanceToNow(new Date(answer.created_at), { addSuffix: true, locale: de })}
        </span>
      </div>
      <p className="text-sm whitespace-pre-wrap">{answer.content}</p>
    </div>
  )
}
