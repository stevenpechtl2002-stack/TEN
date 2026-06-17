import Link from 'next/link'

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* Ambient light effects */}
      <div style={{
        position: 'fixed', top: '-15%', right: '-8%', width: '700px', height: '700px',
        background: 'radial-gradient(ellipse, rgba(200,151,58,0.09) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-20%', left: '-5%', width: '500px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(200,151,58,0.05) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Fine grain texture */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '64px',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(7,8,10,0.88)',
        backdropFilter: 'blur(24px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          color: 'var(--text)',
          textTransform: 'uppercase',
        }}>
          TEN<span style={{ color: 'var(--accent)', marginLeft: '2px' }}>·</span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {['Feed', 'Q&A', 'Investoren'].map(label => (
            <Link key={label} href={`/${label.toLowerCase().replace('&', '').replace(' ', '')}`} style={{
              fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--muted)', fontWeight: 500,
            }}>
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/auth" style={{
            fontSize: '0.82rem', color: 'var(--muted)', letterSpacing: '0.05em',
            padding: '0.45rem 1rem',
          }}>
            Anmelden
          </Link>
          <Link href="/auth" style={{
            fontSize: '0.82rem', fontWeight: 600,
            padding: '0.55rem 1.5rem',
            background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
            color: '#07080A',
            borderRadius: '4px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            boxShadow: '0 2px 20px rgba(200,151,58,0.3)',
          }}>
            Beitreten
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main style={{ position: 'relative', zIndex: 1, paddingTop: '64px' }}>
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '9rem 2.5rem 6rem' }}>

          {/* Eyebrow */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem',
          }}>
            <div style={{ height: '1px', width: '48px', background: 'var(--accent)', opacity: 0.6 }} />
            <span style={{
              fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--accent)', fontWeight: 600,
            }}>
              The Entrepreneur Network
            </span>
          </div>

          {/* Main headline */}
          <div style={{ maxWidth: '800px', marginBottom: '3rem' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              color: 'var(--text)',
              marginBottom: '0',
            }}>
              Wo Ambition
              <br />
              <span style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--gold) 60%, var(--accent-2) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                auf Kapital
              </span>
              <br />
              trifft.
            </h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'end' }}>
            <div>
              <p style={{
                color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.8,
                marginBottom: '2.5rem', maxWidth: '400px',
              }}>
                TEN ist der exklusive Treffpunkt für Gründer, Unternehmer und Investoren.
                Vernetze dich, lerne von den Besten und bringe dein Projekt auf das nächste Level.
              </p>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link href="/auth" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.875rem 2.25rem',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                  color: '#07080A',
                  borderRadius: '4px',
                  fontWeight: 700, fontSize: '0.85rem',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  boxShadow: '0 4px 28px rgba(200,151,58,0.35)',
                }}>
                  Mitglied werden
                </Link>
                <Link href="/qa" style={{
                  fontSize: '0.85rem', color: 'var(--muted)',
                  letterSpacing: '0.05em',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  Community entdecken →
                </Link>
              </div>
            </div>

            {/* Stats column */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem',
              paddingLeft: '2rem',
              borderLeft: '1px solid var(--border)',
            }}>
              {[
                { n: '6', label: 'Themenräume', sub: 'Q&A & Wissenstransfer' },
                { n: '∞', label: 'Möglichkeiten', sub: 'Grenzenlos skalieren' },
                { n: 'DE/EN', label: 'Bilingal', sub: 'Deutsch & Englisch' },
                { n: '0€', label: 'Einstieg', sub: 'Kostenlos starten' },
              ].map(({ n, label, sub }) => (
                <div key={label} style={{
                  padding: '1.25rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem', fontWeight: 600,
                    color: 'var(--accent)', lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}>{n}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>{label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature strip */}
        <section style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{
            maxWidth: '1200px', margin: '0 auto',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          }}>
            {[
              { icon: '◈', title: 'Community & Feed', desc: 'Teile Insights, baue Reputation, inspiriere andere Gründer.' },
              { icon: '◉', title: 'Q&A Räume', desc: 'Lerne von erfahrenen Unternehmern — direkt und authentisch.' },
              { icon: '◇', title: 'Investor-Bereich', desc: 'Pitch dein Projekt den richtigen Investoren.' },
              { icon: '◈', title: 'Private Chats', desc: '1:1 Vernetzung mit Gleichgesinnten. Direkt. Diskret.' },
            ].map((f, i) => (
              <div key={f.title} style={{
                padding: '2.5rem 2rem',
                borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                transition: 'background 0.3s',
              }} className="feature-block">
                <div style={{
                  fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '1rem',
                  fontFamily: 'var(--font-display)',
                }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem', fontWeight: 600,
                  color: 'var(--text)', marginBottom: '0.625rem',
                  letterSpacing: '-0.01em',
                }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Manifesto section */}
        <section style={{ padding: '8rem 2.5rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
              fontWeight: 500, fontStyle: 'italic',
              lineHeight: 1.35, color: 'var(--text)',
              marginBottom: '2.5rem',
              letterSpacing: '-0.01em',
            }}>
              "Erfolg entsteht nicht allein. Er entsteht im richtigen Netzwerk."
            </p>
            <Link href="/auth" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '1rem 2.75rem',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              borderRadius: '4px',
              fontWeight: 600, fontSize: '0.85rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'background 0.2s, color 0.2s',
            }} className="cta-outline">
              Jetzt beitreten
            </Link>
          </div>
        </section>

        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '2rem 2.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '1rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--faint)',
          }}>TEN·</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--faint)' }}>
            © 2026 The Entrepreneur Network
          </span>
        </footer>
      </main>

      <style>{`
        .feature-block:hover { background: var(--surface) !important; }
        .cta-outline:hover { background: rgba(200,151,58,0.08) !important; }
      `}</style>
    </div>
  )
}
