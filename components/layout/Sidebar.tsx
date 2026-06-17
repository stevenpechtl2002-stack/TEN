'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, MessageSquare, TrendingUp, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/feed', icon: Home, label: 'Feed' },
  { href: '/communities', icon: Users, label: 'Communities' },
  { href: '/qa', icon: MessageSquare, label: 'Q&A' },
  { href: '/investors', icon: TrendingUp, label: 'Investoren' },
  { href: '/chat', icon: MessageCircle, label: 'Nachrichten' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-56 border-r bg-background p-4 hidden md:block">
      <nav className="space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent',
              pathname.startsWith(href) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
