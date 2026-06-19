import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import {
  Home, MessageSquare, TrendingUp, MessageCircle, Users,
  ArrowRight, Plus, Zap, BookOpen,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const QA_ROOMS = [
  { slug: 'gruendung', label: 'Gründung & Recht', icon: '⚖', desc: 'GmbH, UG, Verträge' },
  { slug: 'marketing', label: 'Marketing & Sales', icon: '📊', desc: 'SEO, Ads, Vertrieb' },
  { slug: 'finanzen', label: 'Finanzen & Steuern', icon: '💰', desc: 'Buchhaltung, Funding' },
  { slug: 'hr', label: 'HR & Team', icon: '👥', desc: 'Recruiting, Kultur' },
  { slug: 'technologie', label: 'Technologie', icon: '⚙', desc: 'Stack, APIs, Infra' },
  { slug: 'wachstum', label: 'Wachstum', icon: '📈', desc: 'PMF, Skalierung' },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [profileRes, postsRes, questionsRes] = await Promise.all([
    user
      ? supabase.from('profiles').select('username, full_name, avatar_url').eq('id', user.id).single()
      : Promise.resolve({ data: null }),
    supabase
      .from('posts')
      .select('id, content, created_at, author:profiles!author_id(username, full_name, avatar_url), post_likes(user_id), post_comments(id)')
      .is('community_id', null)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('questions')
      .select('id, title, room, created_at, author:profiles!author_id(username), answers(id)')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const profile = profileRes.data
  const posts = postsRes.data ?? []
  const questions = questionsRes.data ?? []
  const displayName = profile?.full_name ?? profile?.username ?? 'Unternehmer'
  const initials = displayName.slice(0, 2).toUpperCase()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Guten Morgen' : hour < 17 ? 'Guten Tag' : 'Guten Abend'

  const ACCENT = 'var(--accent)'
  const BG     = 'var(--bg)'
  const SURF   = 'var(--surface)'
  const SURF2  = 'var(--surface-2)'
  const BORDER = 'var(--border)'
  const TEXT   = 'var(--text)'
  const MUTED  = 'var(--muted)'
  const MONO   = '"Courier New", monospace'

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>

      {/* ── Welcome Bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.75rem 0 1.5rem', borderBottom: `1px solid ${BORDER}`, marginBottom: '2rem',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
            background: profile?.avatar_url ? 'transparent' : 'linear-gradient(135deg, var(--accent), var(--gold))',
            border: `2px solid ${BORDER}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', fontWeight: 700, color: '#07080A',
            overflow: 'hidden',
          }}>
            {profile?.avatar_url
              ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : initials}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, color: TEXT, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
              {greeting}, <em style={{ color: ACCENT }}>{displayName}</em>
            </div>
            <div style={{ fontFamily: MONO, fontSize: '0.62rem', color: MUTED, marginTop: '3px', letterSpacing: '0.06em' }}>
              {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
        <Link href="/feed" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.625rem 1.25rem',
          background: `linear-gradient(135deg, var(--accent), var(--gold))`,
          color: '#07080A', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em',
          textTransform: 'uppercase', borderRadius: '4px',
          boxShadow: '0 4px 16px rgba(200,151,58,0.25)',
        }}>
          <Plus size={13} />
          Beitrag erstellen
        </Link>
      </div>

      {/* ── Two-column grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>

        {/* ── LEFT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Quick actions */}
          <div>
            <SectionHeader label="Schnellzugriff" mono="// ACTIONS" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: BORDER }}>
              {[
                { href: '/feed', icon: Home, label: 'Zum Feed', desc: 'Beiträge lesen & teilen', color: '#6366F1' },
                { href: '/qa', icon: MessageSquare, label: 'Frage stellen', desc: 'Expertise aus der Community', color: '#22C55E' },
                { href: '/investors', icon: TrendingUp, label: 'Investor-Bereich', desc: 'Pitches & Kapital', color: ACCENT },
                { href: '/chat', icon: MessageCircle, label: 'Nachrichten', desc: 'Direkt vernetzen', color: '#F59E0B' },
              ].map(({ href, icon: Icon, label, desc, color }) => (
                <Link key={href} href={href} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.875rem',
                  padding: '1.25rem', background: SURF, textDecoration: 'none',
                  transition: 'background 0.15s',
                }} className="action-card">
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '6px', flexShrink: 0,
                    background: `${color}18`, border: `1px solid ${color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: TEXT, marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '0.75rem', color: MUTED }}>{desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent feed posts */}
          <div>
            <SectionHeader label="Aus dem Feed" mono="// RECENT POSTS" href="/feed" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: BORDER }}>
              {posts.length === 0 && (
                <div style={{ background: SURF, padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: MONO, fontSize: '0.65rem', color: MUTED }}>Noch keine Beiträge</div>
                </div>
              )}
              {posts.map((post: any) => {
                const author = Array.isArray(post.author) ? post.author[0] : post.author
                const preview = post.content.length > 140 ? post.content.slice(0, 140) + '…' : post.content
                const ago = timeAgo(post.created_at)
                return (
                  <Link key={post.id} href="/feed" style={{ background: SURF, padding: '1.125rem 1.25rem', display: 'block', textDecoration: 'none' }} className="post-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.625rem' }}>
                      <div style={{
                        width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, var(--accent), var(--gold))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.58rem', fontWeight: 700, color: '#07080A',
                        overflow: 'hidden', border: `1px solid ${BORDER}`,
                      }}>
                        {author?.avatar_url
                          ? <img src={author.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : (author?.full_name ?? author?.username ?? '?').slice(0, 2).toUpperCase()
                        }
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: TEXT }}>{author?.full_name ?? author?.username}</span>
                      <span style={{ fontFamily: MONO, fontSize: '0.58rem', color: MUTED, marginLeft: 'auto' }}>{ago}</span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: MUTED, lineHeight: 1.6, margin: 0 }}>{preview}</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.625rem' }}>
                      <span style={{ fontFamily: MONO, fontSize: '0.6rem', color: MUTED }}>♥ {post.post_likes?.length ?? 0}</span>
                      <span style={{ fontFamily: MONO, fontSize: '0.6rem', color: MUTED }}>💬 {post.post_comments?.length ?? 0}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
            {posts.length > 0 && (
              <Link href="/feed" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', background: SURF2, fontSize: '0.75rem', color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: MONO, borderTop: `1px solid ${BORDER}`, textDecoration: 'none' }} className="view-all-link">
                Alle Beiträge ansehen <ArrowRight size={11} />
              </Link>
            )}
          </div>

          {/* Recent Q&A */}
          <div>
            <SectionHeader label="Aktuelle Fragen" mono="// Q&A" href="/qa" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: BORDER }}>
              {questions.length === 0 && (
                <div style={{ background: SURF, padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: MONO, fontSize: '0.65rem', color: MUTED }}>Noch keine Fragen</div>
                </div>
              )}
              {questions.map((q: any) => {
                const room = QA_ROOMS.find(r => r.slug === q.room)
                const ago = timeAgo(q.created_at)
                return (
                  <Link key={q.id} href={`/qa/${q.room}/${q.id}`} style={{ background: SURF, padding: '1rem 1.25rem', display: 'block', textDecoration: 'none' }} className="post-row">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '5px', flexWrap: 'wrap' }}>
                          {room && (
                            <span style={{ fontFamily: MONO, fontSize: '0.58rem', color: ACCENT, background: `var(--accent)18`, border: `1px solid var(--accent)33`, padding: '1px 7px', borderRadius: '2px' }}>
                              {room.icon} {room.label}
                            </span>
                          )}
                          <span style={{ fontFamily: MONO, fontSize: '0.58rem', color: MUTED }}>{ago}</span>
                        </div>
                        <div style={{ fontSize: '0.84rem', fontWeight: 600, color: TEXT, lineHeight: 1.4 }}>{q.title}</div>
                        <div style={{ fontFamily: MONO, fontSize: '0.6rem', color: MUTED, marginTop: '5px' }}>von @{q.author?.username}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: MUTED, lineHeight: 1 }}>{q.answers?.length ?? 0}</div>
                        <div style={{ fontFamily: MONO, fontSize: '0.55rem', color: MUTED, opacity: 0.6 }}>Antworten</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
            {questions.length > 0 && (
              <Link href="/qa" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', background: SURF2, fontSize: '0.75rem', color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: MONO, borderTop: `1px solid ${BORDER}`, textDecoration: 'none' }} className="view-all-link">
                Alle Fragen ansehen <ArrowRight size={11} />
              </Link>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '80px' }}>

          {/* Q&A Rooms */}
          <div>
            <SectionHeader label="Q&A Räume" mono="// ROOMS" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: BORDER }}>
              {QA_ROOMS.map(room => (
                <Link key={room.slug} href={`/qa/${room.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem', background: SURF, textDecoration: 'none' }} className="room-row">
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{room.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: TEXT, lineHeight: 1.2 }}>{room.label}</div>
                    <div style={{ fontFamily: MONO, fontSize: '0.6rem', color: MUTED, marginTop: '2px' }}>{room.desc}</div>
                  </div>
                  <ArrowRight size={12} style={{ color: MUTED, flexShrink: 0, opacity: 0.5 }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Platform guide */}
          <div style={{ background: SURF, border: `1px solid ${BORDER}`, padding: '1.25rem' }}>
            <div style={{ fontFamily: MONO, fontSize: '0.6rem', color: ACCENT, letterSpacing: '0.1em', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: `1px solid ${BORDER}` }}>
              // PLATTFORM
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '/feed', icon: <Home size={12} />, label: 'Feed', desc: 'Community-Beiträge' },
                { href: '/communities', icon: <Users size={12} />, label: 'Communities', desc: 'Gruppen beitreten' },
                { href: '/qa', icon: <MessageSquare size={12} />, label: 'Q&A', desc: '6 Themenräume' },
                { href: '/investors', icon: <TrendingUp size={12} />, label: 'Investoren', desc: 'Pitches & Funding' },
                { href: '/chat', icon: <MessageCircle size={12} />, label: 'Chat', desc: 'Private Nachrichten' },
              ].map(({ href, icon, label, desc }) => (
                <Link key={href} href={href} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.5rem 0.625rem', borderRadius: '4px',
                  textDecoration: 'none',
                }} className="guide-link">
                  <span style={{ color: MUTED, display: 'flex', alignItems: 'center' }}>{icon}</span>
                  <span style={{ fontSize: '0.8rem', color: TEXT, fontWeight: 500, flex: 1 }}>{label}</span>
                  <span style={{ fontFamily: MONO, fontSize: '0.6rem', color: MUTED }}>{desc}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Tip card */}
          <div style={{
            background: `linear-gradient(135deg, var(--accent)0D, var(--surface))`,
            border: `1px solid var(--accent)33`,
            padding: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Zap size={13} style={{ color: ACCENT }} />
              <span style={{ fontFamily: MONO, fontSize: '0.6rem', color: ACCENT, letterSpacing: '0.1em' }}>TIPP DES TAGES</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: MUTED, lineHeight: 1.65, margin: 0 }}>
              Stelle eine Frage im Q&A — je spezifischer dein Problem, desto wertvoller die Antwort.
            </p>
            <Link href="/qa" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.875rem', fontFamily: MONO, fontSize: '0.65rem', color: ACCENT, textDecoration: 'none', letterSpacing: '0.06em' }}>
              <BookOpen size={11} /> Jetzt eine Frage stellen →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .action-card:hover { background: var(--surface-2) !important; }
        .post-row:hover { background: var(--surface-2) !important; }
        .room-row:hover { background: var(--surface-2) !important; }
        .guide-link:hover { background: var(--surface-2) !important; }
        .view-all-link:hover { color: var(--text) !important; }

        @media (max-width: 700px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
          .dashboard-right { display: none !important; }
        }
      `}</style>
    </div>
  )
}

/* helpers */
function SectionHeader({ label, mono, href }: { label: string; mono: string; href?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <span style={{ fontFamily: '"Courier New", monospace', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>{mono}</span>
        <div style={{ height: '1px', width: '40px', background: 'var(--border)' }} />
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>{label}</span>
      </div>
      {href && (
        <Link href={href} style={{ fontFamily: '"Courier New", monospace', fontSize: '0.6rem', color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '4px' }} className="view-all-link">
          Alle <ArrowRight size={10} />
        </Link>
      )}
    </div>
  )
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'gerade eben'
  if (m < 60) return `vor ${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `vor ${h}h`
  const d = Math.floor(h / 24)
  return `vor ${d}d`
}
