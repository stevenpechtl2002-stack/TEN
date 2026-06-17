import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { LogOut, Settings, User } from 'lucide-react'

async function signOut() {
  'use server'
  const { createClient: sc } = await import('@/lib/supabase/server')
  const supabase = await sc()
  await supabase.auth.signOut()
}

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = user
    ? await supabase.from('profiles').select('username, avatar_url, full_name').eq('id', user.id).single()
    : { data: null }

  const initials = profile
    ? (profile.full_name ?? profile.username ?? '?').slice(0, 2).toUpperCase()
    : '?'

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '58px', zIndex: 50,
      borderBottom: '1px solid var(--border)',
      background: 'rgba(8,8,10,0.92)',
      backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 1.5rem',
    }}>
      <Link href="/feed" style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '1.3rem', letterSpacing: '-0.03em', color: 'var(--text)',
      }}>
        TEN<span style={{ color: 'var(--accent)' }}>.</span>
      </Link>

      {profile && (
        <div style={{ position: 'relative' }} className="nav-group">
          <button style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: profile.avatar_url ? 'transparent' : 'linear-gradient(135deg, var(--accent), var(--gold))',
            border: '2px solid var(--border-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', overflow: 'hidden',
            color: '#fff', fontSize: '0.7rem', fontWeight: 700,
            fontFamily: 'var(--font-display)',
          }}>
            {profile.avatar_url
              ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : initials
            }
          </button>

          <div className="nav-dropdown" style={{
            position: 'absolute', top: 'calc(100% + 10px)', right: 0,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '10px', minWidth: '185px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
            display: 'none', flexDirection: 'column', overflow: 'hidden',
            zIndex: 100,
          }}>
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                {profile.full_name ?? profile.username}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '1px' }}>@{profile.username}</div>
            </div>

            {[
              { href: `/profile/${profile.username}`, icon: User, label: 'Mein Profil' },
              { href: '/settings', icon: Settings, label: 'Einstellungen' },
            ].map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href} className="nav-dropdown-item" style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.625rem 1rem', fontSize: '0.85rem', color: 'var(--muted)',
              }}>
                <Icon size={13} />
                {label}
              </Link>
            ))}

            <form action={signOut} style={{ borderTop: '1px solid var(--border)' }}>
              <button type="submit" className="nav-dropdown-item" style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.625rem 1rem', fontSize: '0.85rem', color: 'var(--muted)',
                background: 'none', border: 'none', width: '100%', cursor: 'pointer',
              }}>
                <LogOut size={13} />
                Abmelden
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .nav-group:hover .nav-dropdown { display: flex !important; }
        .nav-dropdown-item:hover { background: var(--surface-2) !important; color: var(--text) !important; }
      `}</style>
    </header>
  )
}
