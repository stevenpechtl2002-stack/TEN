import Link from 'next/link'

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Background glows */}
      <div style={{
        position: 'fixed', top: '-20%', right: '-10%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-10%', left: '-5%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Navbar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: '1px solid var(--border)',
        background: 'rgba(8,8,10,0.85)',
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', height: '60px',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem',
          letterSpacing: '-0.03em', color: 'var(--text)',
        }}>
          TEN<span style={{ color: 'var(--accent)' }}>.</span>
        </span>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/auth" style={{
            padding: '0.45rem 1.1rem', borderRadius: '6px',
            color: 'var(--muted)', fontSize: '0.875rem', fontWeight: 500,
          }}>
            Anmelden
          </Link>
          <Link href="/auth" style={{
            padding: '0.5rem 1.25rem',
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: 600,
            boxShadow: '0 2px 12px rgba(255,107,53,0.4)',
          }}>
            Registrieren
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main style={{ position: 'relative', zIndex: 1, paddingTop: '60px' }}>
        <section style={{
          maxWidth: '1100px', margin: '0 auto',
          padding: '7rem 2rem 5rem',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem',
          alignItems: 'center',
        }}>
          <div>
            {/* Pill badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.25)',
              borderRadius: '100px', padding: '0.35rem 0.9rem', marginBottom: '2rem',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                The Entrepreneur Network
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05,
              color: 'var(--text)', marginBottom: '1.5rem',
            }}>
              Baue dein<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--gold) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Netzwerk.
              </span><br />
              Skaliere schneller.
            </h1>

            <p style={{
              color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.75,
              marginBottom: '2.5rem', maxWidth: '440px',
            }}>
              TEN verbindet Unternehmer, Gründer und Investoren.
              Stelle Fragen, teile Wissen, finde Kapital — alles auf einer Plattform.
            </p>

            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <Link href="/auth" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--accent)',
                color: '#fff',
                padding: '0.8rem 2rem',
                borderRadius: '10px',
                fontWeight: 700, fontSize: '0.95rem',
                letterSpacing: '0.01em',
                boxShadow: '0 4px 24px rgba(255,107,53,0.4)',
              }}>
                Kostenlos starten →
              </Link>
              <Link href="/qa" style={{
                display: 'inline-flex', alignItems: 'center',
                border: '1px solid var(--border-2)',
                color: 'var(--muted)',
                padding: '0.8rem 1.75rem',
                borderRadius: '10px',
                fontWeight: 500, fontSize: '0.95rem',
              }}>
                Q&A entdecken
              </Link>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex', gap: '2.5rem', marginTop: '3rem',
              paddingTop: '2rem', borderTop: '1px solid var(--border)',
            }}>
              {[['100%', 'Kostenlos'], ['6', 'Themenräume'], ['DE/EN', 'Sprachen']].map(([num, label]) => (
                <div key={label}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.5rem',
                    fontWeight: 800, color: 'var(--text)',
                  }}>{num}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[
              { icon: '⚡', title: 'Feed & Community', desc: 'Teile Einblicke, feiere Erfolge, lerne täglich.' },
              { icon: '🎯', title: 'Fragen & Antworten', desc: 'Echte Antworten von echten Unternehmern.' },
              { icon: '💰', title: 'Investor-Bereich', desc: 'Pitch dein Projekt. Finde das richtige Kapital.' },
              { icon: '💬', title: 'Private Nachrichten', desc: 'Vernetz dich direkt 1:1 mit Gleichgesinnten.' },
            ].map((f, i) => (
              <div key={f.title} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '1rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
                marginLeft: i % 2 === 1 ? '1.5rem' : '0',
                transition: 'border-color 0.2s',
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '8px',
                  background: 'var(--surface-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: '0.9rem', marginBottom: '2px', color: 'var(--text)',
                  }}>{f.title}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA strip */}
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: '5rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,107,53,0.04) 100%)',
        }}>
          <div style={{ maxWidth: '480px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '2.25rem',
              fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', color: 'var(--text)',
            }}>
              Bereit durchzustarten?
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
              Registriere dich jetzt — kostenlos, keine Kreditkarte nötig.
            </p>
            <Link href="/auth" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--accent)',
              color: '#fff',
              padding: '0.875rem 2.5rem',
              borderRadius: '10px',
              fontWeight: 700, fontSize: '1rem',
              boxShadow: '0 4px 28px rgba(255,107,53,0.35)',
            }}>
              Konto erstellen →
            </Link>
          </div>
        </section>

        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '1.5rem 2rem',
          textAlign: 'center',
          color: 'var(--faint)',
          fontSize: '0.8rem',
        }}>
          © 2026 TEN — The Entrepreneur Network
        </footer>
      </main>
    </div>
  )
}
