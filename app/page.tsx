'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible] as const
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, v] = useReveal()
  return (
    <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  )
}

function GoldLine({ delay = 0 }: { delay?: number }) {
  const [ref, v] = useReveal()
  return (
    <div ref={ref} style={{ height: '1px', background: 'var(--accent)', transformOrigin: 'left', transform: v ? 'scaleX(1)' : 'scaleX(0)', transition: `transform 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}s` }} />
  )
}

export default function Landing() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const heroY = scrollY * 0.28

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)', overflowX: 'hidden', cursor: 'default' }}>
      <style>{`
        @keyframes grain {
          0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 30%{transform:translate(3%,-1%)}
          50%{transform:translate(-1%,2%)} 70%{transform:translate(2%,1%)} 90%{transform:translate(-3%,2%)}
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .lnk { transition: color 0.3s, opacity 0.3s; }
        .lnk:hover { color: var(--accent) !important; }
        .btn-primary { transition: box-shadow 0.4s, transform 0.3s; }
        .btn-primary:hover { box-shadow: 0 0 60px rgba(200,151,58,0.4) !important; transform: translateY(-1px); }
        .btn-outline { transition: background 0.3s, color 0.3s; }
        .btn-outline:hover { background: rgba(200,151,58,0.06) !important; color: var(--accent) !important; }
        .stat-item { transition: color 0.3s; }
        .stat-item:hover .stat-num { color: var(--accent); }
        .feature-num { font-feature-settings: 'tnum'; }
        .card-dark { transition: border-color 0.4s; }
        .card-dark:hover { border-color: var(--border-2) !important; }
        .quote-hover { transition: opacity 0.3s; }
        .quote-hover:hover { opacity: 1 !important; }
      `}</style>

      {/* Grain overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.035, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`, animation: 'grain 7s steps(2) infinite' }} />

      {/* ── NAVBAR ── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, padding: '0 4rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrollY > 60 ? 'rgba(7,8,10,0.92)' : 'transparent', borderBottom: scrollY > 60 ? '1px solid var(--border)' : '1px solid transparent', backdropFilter: scrollY > 60 ? 'blur(24px)' : 'none', transition: 'background 0.5s, border-color 0.5s, backdrop-filter 0.5s' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)' }}>
          TEN<span style={{ color: 'var(--accent)' }}>·</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/auth" className="lnk" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', padding: '0.5rem 1rem' }}>Anmelden</Link>
          <Link href="/auth" className="btn-primary" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, padding: '0.7rem 1.75rem', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '2px', boxShadow: '0 0 20px rgba(200,151,58,0.15)', display: 'inline-block' }}>
            Beitreten
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 4rem 6rem', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '700px', height: '700px', background: 'radial-gradient(ellipse, rgba(200,151,58,0.055) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(200,151,58,0.03) 0%, transparent 65%)', pointerEvents: 'none' }} />

        {/* Vertical rule */}
        <div style={{ position: 'absolute', left: '4rem', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, var(--border) 20%, var(--border) 80%, transparent)', pointerEvents: 'none' }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 1, transform: `translateY(${-heroY}px)`, willChange: 'transform' }}>
          {/* Eyebrow */}
          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 0.2s', display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--accent)' }} />
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 500 }}>The Entrepreneur Network</span>
          </div>

          {/* Main headline */}
          <h1 style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(50px)', transition: 'opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.35s', fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem,9vw,9.5rem)', fontWeight: 500, lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '3.5rem', maxWidth: '1100px' }}>
            Wo Gründer<br />
            auf Gründer<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>treffen.</em>
          </h1>

          {/* Bottom row */}
          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 0.65s', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem', alignItems: 'end', borderTop: '1px solid var(--border)', paddingTop: '2.5rem' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '320px' }}>
              Die exklusive Plattform für Gründer, erfahrene Unternehmer und Investoren — ein Netzwerk, das zählt.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/auth" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.875rem', padding: '1rem 2.25rem', background: 'var(--accent)', color: '#07080A', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', borderRadius: '2px', boxShadow: '0 8px 40px rgba(200,151,58,0.3)' }}>
                Mitglied werden
              </Link>
              <Link href="/qa" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', padding: '1rem 1.5rem', border: '1px solid var(--border-2)', color: 'var(--muted)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', background: 'transparent' }}>
                Community
              </Link>
            </div>
            <div style={{ display: 'flex', gap: '3rem', justifyContent: 'flex-end' }}>
              {[['100%', 'Kostenlos'], ['6', 'Q&A Räume'], ['3', 'Rollen']].map(([n, l]) => (
                <div key={l} className="stat-item" style={{ textAlign: 'right' }}>
                  <div className="stat-num feature-num" style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1, transition: 'color 0.3s' }}>{n}</div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '6px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', right: '4rem', bottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', opacity: 0.35 }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', writingMode: 'vertical-rl' }}>Scroll</div>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--muted), transparent)' }} />
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section style={{ padding: '7rem 4rem', borderTop: '1px solid var(--border)', position: 'relative' }}>
        <Reveal>
          <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem,3.5vw,3rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.35, color: 'var(--text)', maxWidth: '900px', margin: '0 auto', paddingLeft: '4rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, top: '-0.25em', fontFamily: 'var(--font-display)', fontSize: '5rem', color: 'var(--accent)', lineHeight: 1, opacity: 0.5, fontStyle: 'normal' }}>"</span>
            Die erfolgreichsten Unternehmer bauen nicht alleine. Sie bauen im richtigen Netzwerk.
            <footer style={{ marginTop: '2rem', fontStyle: 'normal', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '32px', height: '1px', background: 'var(--accent)' }} />
              The Entrepreneur Network
            </footer>
          </blockquote>
        </Reveal>
      </section>

      {/* ── FEATURE 01: Q&A ── */}
      <section style={{ padding: '9rem 4rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
        <Reveal>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
              <span className="feature-num" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--accent)', opacity: 0.7, letterSpacing: '0.1em' }}>01</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>Q&A Räume</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.1, color: 'var(--text)', marginBottom: '2rem', letterSpacing: '-0.01em' }}>
              Echte Antworten.<br />Echte Unternehmer.
            </h2>

            <p style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '2.5rem', maxWidth: '400px' }}>
              Sechs spezialisierte Räume — Gründung, Recht, Marketing, Steuern, HR, Technologie. Fragen stellen, Wissen empfangen. Direkt von Menschen die es bereits geschafft haben.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {['Gründung & Recht', 'Marketing & Vertrieb', 'Finanzen & Investment', 'Technologie & Produkt'].map((item, i) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.1rem 0', borderBottom: '1px solid var(--border)' }}>
                  <span className="feature-num" style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--accent)', opacity: 0.5, width: '24px', textAlign: 'right', flexShrink: 0 }}>0{i + 1}</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text)', letterSpacing: '0.02em' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          {/* Q&A mockup — dark editorial */}
          <div className="card-dark" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Alle', 'Gründung', 'Steuern'].map((t, i) => (
                  <span key={t} style={{ fontSize: '0.65rem', padding: '4px 12px', borderRadius: '2px', background: i === 1 ? 'rgba(200,151,58,0.1)' : 'transparent', color: i === 1 ? 'var(--accent)' : 'var(--muted)', border: `1px solid ${i === 1 ? 'rgba(200,151,58,0.25)' : 'var(--border)'}`, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t}</span>
                ))}
              </div>
              <span style={{ fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>6 Räume</span>
            </div>
            <div style={{ padding: '0' }}>
              {[
                { q: 'Wie finde ich meinen ersten B2B-Kunden?', tag: 'Marketing', n: 8 },
                { q: 'Was kostet eine GmbH-Gründung wirklich?', tag: 'Gründung', n: 14 },
                { q: 'Wie verhandle ich mein erstes Investment?', tag: 'Investment', n: 6 },
                { q: 'Steuern als Solo-Selbstständiger?', tag: 'Steuern', n: 11 },
              ].map((item, i) => (
                <div key={i} style={{ padding: '1.25rem 1.5rem', borderBottom: i < 3 ? '1px solid var(--border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', transition: 'background 0.2s', cursor: 'default' }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.4, marginBottom: '6px' }}>{item.q}</div>
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.7 }}>{item.tag}</span>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--muted)', fontWeight: 500 }}>{item.n}</div>
                    <div style={{ fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', opacity: 0.6 }}>Antworten</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FEATURE 02: INVESTOREN ── */}
      <section style={{ padding: '9rem 4rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
        <Reveal delay={0.1}>
          {/* Investor mockup */}
          <div className="card-dark" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.25rem' }}>Investor-Bereich</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Aktive Pitches</div>
            </div>
            <div>
              {[
                { name: 'NutriFlow AI', sector: 'FoodTech', amount: '€ 150k', p: 65 },
                { name: 'LegalMind', sector: 'LegalTech', amount: '€ 80k', p: 32 },
                { name: 'GreenGrid', sector: 'CleanTech', amount: '€ 500k', p: 78 },
                { name: 'FinStack', sector: 'FinTech', amount: '€ 200k', p: 44 },
              ].map((item, i) => (
                <div key={i} style={{ padding: '1.25rem 1.5rem', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '3px' }}>{item.sector}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--accent)', fontWeight: 500 }}>{item.amount}</div>
                  </div>
                  <div style={{ height: '1px', background: 'var(--border)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, height: '1px', width: `${item.p}%`, background: 'var(--accent)', opacity: 0.6 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.0}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
              <span className="feature-num" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--accent)', opacity: 0.7, letterSpacing: '0.1em' }}>02</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>Investoren</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.1, color: 'var(--text)', marginBottom: '2rem', letterSpacing: '-0.01em' }}>
              Finde dein<br />nächstes<br />Investment.
            </h2>

            <p style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '3rem', maxWidth: '400px' }}>
              Strukturierte Pitches. Klare Zahlen. Direkter Kontakt zwischen Gründern und Investoren — ohne Mittelsmann, ohne Rauschen.
            </p>

            <div style={{ display: 'flex', gap: '3rem' }}>
              {[['VC', '4'], ['Angel', '12'], ['Family Office', '3']].map(([type, n]) => (
                <div key={type} className="stat-item">
                  <div className="stat-num" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500, color: 'var(--text)', transition: 'color 0.3s' }}>{n}</div>
                  <div style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '4px' }}>{type}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FEATURE 03: CHAT ── */}
      <section style={{ padding: '9rem 4rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
        <Reveal>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
              <span className="feature-num" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--accent)', opacity: 0.7, letterSpacing: '0.1em' }}>03</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>Privater Chat</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.1, color: 'var(--text)', marginBottom: '2rem', letterSpacing: '-0.01em' }}>
              Deals entstehen<br />im Gespräch.
            </h2>

            <p style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: '0.95rem', maxWidth: '400px' }}>
              Private 1:1 Echtzeit-Kommunikation direkt auf der Plattform. Professionell, vertraulich, sofort.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="card-dark" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--surface-2)', border: '1px solid var(--border-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--accent)', position: 'relative' }}>
                TH
                <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E', border: '1.5px solid var(--surface)' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text)' }}>Thomas H.</div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.08em', color: '#22C55E', textTransform: 'uppercase' }}>Online</div>
              </div>
            </div>
            <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '240px' }}>
              {[
                { from: 'them', text: 'Ihr Pitch hat mich überzeugt. Können wir uns diese Woche kurz austauschen?' },
                { from: 'me', text: 'Sehr gerne. Dienstag 15 Uhr passt mir.' },
                { from: 'them', text: 'Perfekt. Ich schicke eine Einladung.' },
                { from: 'me', text: 'Ich freue mich auf das Gespräch.' },
              ].map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '78%', padding: '0.75rem 1rem', background: msg.from === 'me' ? 'rgba(200,151,58,0.12)' : 'var(--surface-2)', border: `1px solid ${msg.from === 'me' ? 'rgba(200,151,58,0.2)' : 'var(--border)'}`, borderRadius: '2px', fontSize: '0.78rem', color: msg.from === 'me' ? 'var(--accent)' : 'var(--muted)', lineHeight: 1.55 }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.75rem' }}>
              <div style={{ flex: 1, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '2px', padding: '0.7rem 1rem', fontSize: '0.72rem', color: 'var(--muted)' }}>Nachricht verfassen...</div>
              <div style={{ padding: '0 1rem', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#07080A', fontWeight: 700, borderRadius: '2px', cursor: 'pointer' }}>→</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '9rem 4rem', borderTop: '1px solid var(--border)' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '6rem' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--accent)' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)' }}>Mitglieder</span>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '4rem' }}>
          {[
            { q: 'Durch TEN habe ich meinen Co-Founder gefunden. Das Netzwerk hat mir Fehler erspart die mich Monate gekostet hätten.', name: 'Maximilian R.', role: 'SaaS-Gründer', delay: 0 },
            { q: 'Als Investor finde ich hier exakt die Projekte die zu meinem Portfolio passen. Die Qualität ist außergewöhnlich.', name: 'Thomas H.', role: 'Angel Investor', delay: 0.1 },
            { q: 'Innerhalb von 24 Stunden hatte ich konkrete Antworten auf meine Finanzierungsfrage — von echten Unternehmern.', name: 'Sarah K.', role: 'Gründerin', delay: 0.2 },
          ].map(t => (
            <Reveal key={t.name} delay={t.delay}>
              <div className="quote-hover" style={{ opacity: 0.75 }}>
                <div style={{ width: '40px', height: '1px', background: 'var(--accent)', marginBottom: '2rem', opacity: 0.5 }} />
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.65, marginBottom: '2rem' }}>
                  "{t.q}"
                </p>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', marginBottom: '3px' }}>{t.name}</div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.7 }}>{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '11rem 4rem', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(200,151,58,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <Reveal>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '4rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--border))', maxWidth: '200px' }} />
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)' }}>Kostenlos · Jetzt starten</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--border))', maxWidth: '200px' }} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,7.5rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '4rem' }}>
              Bereit für das<br />
              <em style={{ color: 'var(--accent)' }}>nächste Level?</em>
            </h2>

            <Link href="/auth" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 3.5rem', background: 'var(--accent)', color: '#07080A', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', border: 'none', borderRadius: '2px', boxShadow: '0 0 60px rgba(200,151,58,0.25)' }}>
              Kostenlos Mitglied werden
              <span style={{ fontSize: '1rem' }}>→</span>
            </Link>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2.5rem', justifyContent: 'center' }}>
              {['Keine Kreditkarte', 'Keine Verpflichtung', 'Sofort aktiv'].map(t => (
                <span key={t} style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '0.6rem' }}>◆</span>{t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '2.5rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          TEN<span style={{ color: 'var(--accent)' }}>·</span>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Feed', 'Q&A', 'Investoren', 'Datenschutz', 'Impressum'].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} className="lnk" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{l}</Link>
          ))}
        </div>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--muted)', opacity: 0.5 }}>© 2026 The Entrepreneur Network</span>
      </footer>
    </div>
  )
}
