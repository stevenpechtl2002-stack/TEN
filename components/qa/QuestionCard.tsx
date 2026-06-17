import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'
import { MessageSquare } from 'lucide-react'

type Question = {
  id: string
  title: string
  content: string
  created_at: string
  answer_count: number
  author: { username: string; avatar_url: string | null; full_name: string | null }
  room_slug: string
}

export function QuestionCard({ question }: { question: Question }) {
  return (
    <Link href={`/qa/${question.room_slug}/${question.id}`}>
      <div className="border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors space-y-2">
        <h3 className="font-medium">{question.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{question.content}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Avatar className="h-5 w-5">
              <AvatarImage src={question.author.avatar_url ?? undefined} />
              <AvatarFallback>{(question.author.full_name ?? question.author.username)[0]}</AvatarFallback>
            </Avatar>
            {question.author.full_name ?? question.author.username}
            <span>·</span>
            {formatDistanceToNow(new Date(question.created_at), { addSuffix: true, locale: de })}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MessageSquare className="h-3 w-3" />
            {question.answer_count}
          </div>
        </div>
      </div>
    </Link>
  )
}
