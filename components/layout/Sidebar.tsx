'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, MessageSquare, TrendingUp, MessageCircle } from 'lucide-react'

const navItems = [
  { href: '/feed', icon: Home, label: 'Feed' },
  { href: '/communities', icon: Users, label: 'Communities' },
  { href: '/qa', icon: MessageSquare, label: 'Fragen & Antworten' },
  { href: '/investors', icon: TrendingUp, label: 'Investoren' },
  { href: '/chat', icon: MessageCircle, label: 'Nachrichten' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      position: 'fixed', left: 0, top: '58px',
      height: 'calc(100vh - 58px)', width: '220px',
      borderRight: '1px solid var(--border)',
      background: 'var(--bg)',
      padding: '1.25rem 0.75rem',
      display: 'none',
    }} className="sidebar">
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.6rem 0.875rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: active ? 600 : 400,
                color: active ? 'var(--text)' : 'var(--muted)',
                background: active ? 'var(--surface)' : 'transparent',
                transition: 'background 0.15s, color 0.15s',
                textDecoration: 'none',
                position: 'relative',
              }}
              className="sidebar-link"
            >
              {active && (
                <span style={{
                  position: 'absolute', left: 0, top: '20%', bottom: '20%',
                  width: '3px', borderRadius: '0 2px 2px 0',
                  background: 'var(--accent)',
                }} />
              )}
              <Icon size={16} style={{ opacity: active ? 1 : 0.6 }} />
              {label}
            </Link>
          )
        })}
      </nav>

      <style>{`
        @media (min-width: 768px) { .sidebar { display: block !important; } }
        .sidebar-link:hover { background: var(--surface) !important; color: var(--text) !important; }
      `}</style>
    </aside>
  )
}
