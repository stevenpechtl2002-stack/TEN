'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return [ref, v] as const
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, v] = useReveal()
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  )
}

const CREAM = '#F7F4EF'
const INK   = '#1A1814'
const STONE = '#6B6560'
const GOLD  = '#B8862A'
const GOLD2 = '#D4A040'
const BORDER = 'rgba(26,24,20,0.1)'

export default function Landing() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div style={{ background: CREAM, color: INK, fontFamily: 'var(--font-body)', overflowX: 'hidden' }}>
      <style>{`
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        .lnk:hover { color: ${GOLD} !important; }
        .lnk { transition: color 0.3s; }
        .btn-gold { transition: box-shadow 0.35s, transform 0.25s; }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 14px 48px rgba(184,134,42,0.45) !important; }
        .btn-ghost:hover { border-color: ${GOLD} !important; color: ${GOLD} !important; }
        .btn-ghost { transition: border-color 0.3s, color 0.3s; }
        .row-hover:hover { background: rgba(184,134,42,0.04) !important; }
        .row-hover { transition: background 0.2s; }
        .quote-item { transition: opacity 0.3s; }
        .quote-item:hover { opacity: 1 !important; }
        .stat-hover { transition: color 0.3s; }
        .stat-hover:hover { color: ${GOLD} !important; }
      `}</style>

      {/* ── NAVBAR ── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, height: '70px', padding: '0 4.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrollY > 50 ? 'rgba(247,244,239,0.96)' : 'rgba(247,244,239,0)', borderBottom: `1px solid ${scrollY > 50 ? BORDER : 'transparent'}`, backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none', transition: 'all 0.45s ease' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: INK }}>
          TEN<span style={{ color: GOLD }}>·</span>
        </div>
        <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
          <Link href="/auth" className="lnk" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: STONE, padding: '0.5rem 1rem' }}>Anmelden</Link>
          <Link href="/auth" className="btn-gold" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, padding: '0.72rem 1.75rem', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, color: '#fff', borderRadius: '3px', boxShadow: `0 4px 20px rgba(184,134,42,0.3)`, display: 'inline-block' }}>
            Beitreten
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ paddingTop: '70px', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative', background: `linear-gradient(160deg, ${CREAM} 0%, #F0EBE1 100%)` }}>

        {/* Subtle texture lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 79px, ${BORDER} 79px, ${BORDER} 80px)`, opacity: 0.4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', background: `linear-gradient(to bottom, transparent, ${BORDER} 15%, ${BORDER} 85%, transparent)`, pointerEvents: 'none' }} />

        {/* Ambient gold glow */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: '600px', height: '600px', background: `radial-gradient(ellipse, rgba(184,134,42,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />

        {/* Left: Text */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 4rem 6rem 4.5rem', position: 'relative', zIndex: 1 }}>

          {/* Eyebrow */}
          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.1s', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.75rem' }}>
            <div style={{ width: '36px', height: '1px', background: GOLD }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: GOLD, fontWeight: 600 }}>The Entrepreneur Network</span>
          </div>

          {/* Headline */}
          <h1 style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1.1s cubic-bezier(0.16,1,0.3,1) 0.25s', fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem,6.5vw,7rem)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.02em', color: INK, marginBottom: '2.25rem' }}>
            Wo Gründer<br />
            auf Gründer<br />
            <em style={{ fontStyle: 'italic', background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 50%, ${GOLD} 100%)`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 5s linear infinite' }}>treffen.</em>
          </h1>

          <p style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.9s ease 0.45s', fontSize: '1rem', color: STONE, lineHeight: 1.8, maxWidth: '380px', marginBottom: '2.75rem' }}>
            Die exklusive Community für Gründer, erfahrene Unternehmer und Investoren — ein Netzwerk, das wirklich zählt.
          </p>

          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.9s ease 0.55s', display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
            <Link href="/auth" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2.25rem', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, color: '#fff', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '3px', boxShadow: `0 6px 28px rgba(184,134,42,0.35)` }}>
              Kostenlos beitreten →
            </Link>
            <Link href="/qa" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', padding: '1rem 1.5rem', border: `1px solid ${BORDER}`, color: STONE, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: '3px', background: 'transparent' }}>
              Community
            </Link>
          </div>

          {/* Stats */}
          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.9s ease 0.7s', display: 'flex', gap: '3rem', paddingTop: '2.25rem', borderTop: `1px solid ${BORDER}` }}>
            {[['100%', 'Kostenlos'], ['6', 'Q&A Räume'], ['3', 'Rollen']].map(([n, l]) => (
              <div key={l}>
                <div className="stat-hover" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: INK, lineHeight: 1, transition: 'color 0.3s' }}>{n}</div>
                <div style={{ fontSize: '0.63rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: STONE, marginTop: '6px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: App preview */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 4.5rem 6rem 3rem', position: 'relative', zIndex: 1, transform: `translateY(${scrollY * 0.08}px)` }}>
          <div style={{ width: '100%', maxWidth: '460px', position: 'relative' }}>

            {/* Main mockup */}
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0) rotate(-0.75deg)' : 'translateY(50px)', transition: 'all 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '8px', boxShadow: `0 32px 80px rgba(26,24,20,0.1), 0 4px 16px rgba(26,24,20,0.06)`, overflow: 'hidden' }}>

              {/* Window bar */}
              <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, background: CREAM, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, opacity: 0.8 }} />)}
                <div style={{ flex: 1, marginLeft: '8px', background: `rgba(26,24,20,0.05)`, borderRadius: '4px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.6rem', color: STONE, opacity: 0.7 }}>ten.network/feed</span>
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                {/* Sidebar */}
                <div style={{ width: '48px', borderRight: `1px solid ${BORDER}`, background: CREAM, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  {[['⌂', true], ['⊞', false], ['?', false], ['◈', false], ['✉', false]].map(([ic, active], i) => (
                    <div key={i} style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', background: active ? `rgba(184,134,42,0.1)` : 'transparent', fontSize: '0.85rem', color: active ? GOLD : STONE, opacity: active ? 1 : 0.5 }}>{ic as string}</div>
                  ))}
                </div>

                {/* Feed */}
                <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { init: 'MR', color: GOLD, name: 'Max R.', role: 'Gründer', text: 'Seed-Runde über €400k abgeschlossen! 🚀 Danke an alle.', likes: 48 },
                    { init: 'SK', color: '#6366F1', name: 'Sarah K.', role: 'Investor', text: 'Suche B2B SaaS mit ersten Kunden — gerne per Nachricht.', likes: 31 },
                    { init: 'TH', color: '#22C55E', name: 'Thomas H.', role: 'Mentor', text: 'Holt euch frühzeitig Kundenfeedback — das ist der #1 Fehler.', likes: 87 },
                  ].map((p, i) => (
                    <div key={i} style={{ padding: '11px', background: i === 0 ? `rgba(184,134,42,0.04)` : CREAM, border: `1px solid ${i === 0 ? `rgba(184,134,42,0.15)` : BORDER}`, borderRadius: '6px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '7px', alignItems: 'center' }}>
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: `linear-gradient(135deg,${p.color},${p.color}88)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', color: '#fff', fontWeight: 700 }}>{p.init}</div>
                        <div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: INK }}>{p.name}</div>
                          <div style={{ fontSize: '0.58rem', color: STONE }}>{p.role}</div>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.68rem', color: '#444', lineHeight: 1.5, marginBottom: '7px' }}>{p.text}</p>
                      <span style={{ fontSize: '0.6rem', color: STONE }}>❤ {p.likes}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating card 1 */}
            <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 0.9s', position: 'absolute', top: '-18px', right: '-32px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '12px 16px', boxShadow: `0 12px 40px rgba(26,24,20,0.1)`, display: 'flex', alignItems: 'center', gap: '10px', minWidth: '210px', zIndex: 10, animation: mounted ? 'none' : undefined }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>💼</div>
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: INK }}>Investor-Interesse</div>
                <div style={{ fontSize: '0.6rem', color: STONE, marginTop: '2px' }}>Thomas H. · gerade eben</div>
              </div>
            </div>

            {/* Floating card 2 */}
            <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 1.1s', position: 'absolute', bottom: '-20px', left: '-28px', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '12px 16px', boxShadow: `0 12px 40px rgba(26,24,20,0.1)`, zIndex: 10 }}>
              <div style={{ fontSize: '0.6rem', color: STONE, marginBottom: '5px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Neue Antwort · Q&A</div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: INK, marginBottom: '7px' }}>"Wie finde ich Investoren?"</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                {[GOLD,'#6366F1','#22C55E'].map((c,i) => <div key={i} style={{ width: '16px', height: '16px', borderRadius: '50%', background: c, marginLeft: i > 0 ? '-5px' : '0', border: '1.5px solid #fff' }} />)}
                <span style={{ fontSize: '0.6rem', color: STONE, marginLeft: '5px' }}>8 Experten</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOLD DIVIDER STRIP ── */}
      <div style={{ padding: '3rem 4.5rem', background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 50%, ${GOLD} 100%)`, backgroundSize: '200% auto', animation: 'shimmer 6s linear infinite', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {[['6','Q&A Räume'],['3','Nutzerrollen'],['100%','Kostenlos'],['∞','Möglichkeiten']].map(([n,l]) => (
          <Reveal key={l}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 600, color: '#fff', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginTop: '8px' }}>{l}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── PERSONAS ── */}
      <section style={{ padding: '9rem 4.5rem', background: '#fff' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '5.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.75rem' }}>
              <div style={{ width: '40px', height: '1px', background: GOLD }} />
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, fontWeight: 600 }}>Für wen ist TEN?</span>
              <div style={{ width: '40px', height: '1px', background: GOLD }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4.5vw,4rem)', fontWeight: 500, fontStyle: 'italic', color: INK, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Drei Rollen. Eine Plattform.
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px', background: BORDER }}>
          {[
            { num: '01', tag: 'Gründer', title: 'Du baust gerade auf.', desc: 'Stell deine Fragen direkt an erfahrene Unternehmer. Finde Co-Founder, lerne aus echten Erfahrungen und baue schneller auf.', delay: 0 },
            { num: '02', tag: 'Unternehmer', title: 'Du hast das Wissen.', desc: 'Teile dein Know-how mit der nächsten Generation. Vernetze dich auf Augenhöhe und werde zur Anlaufstelle für Gründer.', delay: 0.1 },
            { num: '03', tag: 'Investor', title: 'Du suchst das Nächste.', desc: 'Entdecke die besten Startups bevor sie bekannt werden. Direkter Zugang zu strukturierten Pitches und Gründern.', delay: 0.2 },
          ].map(card => (
            <Reveal key={card.num} delay={card.delay}>
              <div style={{ background: '#fff', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', transition: 'background 0.3s', cursor: 'default' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: GOLD, fontWeight: 500, opacity: 0.6, letterSpacing: '0.08em' }}>{card.num}</span>
                  <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: STONE, border: `1px solid ${BORDER}`, padding: '3px 10px', borderRadius: '2px' }}>{card.tag}</span>
                </div>
                <div style={{ width: '36px', height: '1px', background: GOLD, opacity: 0.4 }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 500, fontStyle: 'italic', color: INK, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{card.title}</h3>
                <p style={{ color: STONE, fontSize: '0.9rem', lineHeight: 1.75, flex: 1 }}>{card.desc}</p>
                <Link href="/auth" className="lnk" style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '0.5rem' }}>
                  Jetzt starten →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Q&A ── */}
      <section style={{ padding: '9rem 4.5rem', background: CREAM, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
        <Reveal>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: GOLD, opacity: 0.6 }}>01</span>
              <div style={{ flex: 1, height: '1px', background: BORDER }} />
              <span style={{ fontSize: '0.63rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: STONE }}>Q&A Räume</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,4vw,3.75rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.12, color: INK, marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
              Echte Antworten.<br />Von echten<br /><em style={{ color: GOLD }}>Unternehmern.</em>
            </h2>
            <p style={{ color: STONE, lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '2.5rem', maxWidth: '380px' }}>
              Sechs spezialisierte Räume. Praxiswissen direkt von Menschen die es bereits geschafft haben.
            </p>
            {['Gründung & Recht', 'Marketing & Vertrieb', 'Finanzen & Investment', 'Technologie & Produkt'].map((item, i) => (
              <div key={item} className="row-hover" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem 0.5rem', borderBottom: `1px solid ${BORDER}`, background: 'transparent' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', color: GOLD, opacity: 0.5, width: '20px', textAlign: 'right' }}>0{i + 1}</span>
                <span style={{ fontSize: '0.88rem', color: INK }}>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '6px', overflow: 'hidden', boxShadow: `0 20px 60px rgba(26,24,20,0.07)` }}>
            <div style={{ padding: '14px 18px', borderBottom: `1px solid ${BORDER}`, background: CREAM, display: 'flex', gap: '6px' }}>
              {['Alle','Gründung','Marketing','Steuern','HR','Tech'].map((t,i) => (
                <span key={t} style={{ fontSize: '0.62rem', padding: '4px 10px', borderRadius: '2px', background: i === 1 ? `rgba(184,134,42,0.1)` : 'transparent', color: i === 1 ? GOLD : STONE, border: `1px solid ${i === 1 ? `rgba(184,134,42,0.25)` : BORDER}`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t}</span>
              ))}
            </div>
            {[
              { q: 'Wie finde ich meinen ersten B2B-Kunden?', tag: 'Marketing', n: 8, fresh: true },
              { q: 'Was kostet eine GmbH-Gründung wirklich?', tag: 'Gründung', n: 14, fresh: false },
              { q: 'Wie verhandle ich mein erstes Investment?', tag: 'Investment', n: 6, fresh: false },
              { q: 'Steuer-Software für Startups?', tag: 'Steuern', n: 11, fresh: false },
            ].map((item, i) => (
              <div key={i} className="row-hover" style={{ padding: '1.1rem 1.25rem', borderBottom: i < 3 ? `1px solid ${BORDER}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', background: 'transparent' }}>
                <div>
                  <div style={{ fontSize: '0.82rem', color: INK, marginBottom: '6px', lineHeight: 1.4 }}>{item.q}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: GOLD, opacity: 0.7 }}>{item.tag}</span>
                    {item.fresh && <span style={{ fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: GOLD, padding: '2px 7px', borderRadius: '2px' }}>Neu</span>}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, color: STONE }}>{item.n}</div>
                  <div style={{ fontSize: '0.55rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: STONE, opacity: 0.6 }}>Antworten</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── INVESTOR (DARK SECTION) ── */}
      <section style={{ padding: '9rem 4.5rem', background: '#111009', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '-8%', width: '500px', height: '500px', background: `radial-gradient(ellipse, rgba(184,134,42,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />

        <Reveal>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.62rem', color: GOLD, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Aktive Pitches</span>
              <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>Filtern</span>
            </div>
            {[
              { name: 'NutriFlow AI', sector: 'FoodTech', amount: '€ 150k', p: 65 },
              { name: 'LegalMind', sector: 'LegalTech', amount: '€ 80k', p: 32 },
              { name: 'GreenGrid', sector: 'CleanTech', amount: '€ 500k', p: 78 },
              { name: 'FinStack', sector: 'FinTech', amount: '€ 200k', p: 44 },
            ].map((item, i) => (
              <div key={i} style={{ padding: '1.1rem 1.25rem', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>{item.sector}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: GOLD, fontWeight: 500 }}>{item.amount}</div>
                </div>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}>
                  <div style={{ height: '1px', width: `${item.p}%`, background: `linear-gradient(90deg,${GOLD}66,${GOLD})` }} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: GOLD, opacity: 0.6 }}>02</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
              <span style={{ fontSize: '0.63rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Investor-Bereich</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,4vw,3.75rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.12, color: 'rgba(255,255,255,0.92)', marginBottom: '1.5rem' }}>
              Finde dein<br />nächstes<br /><em style={{ color: GOLD }}>Investment.</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '3rem', maxWidth: '380px' }}>
              Strukturierte Pitches, klare Zahlen, direkter Kontakt — ohne Mittelsmann.
            </p>
            <div style={{ display: 'flex', gap: '3rem', marginBottom: '3rem' }}>
              {[['VC','4'],['Angel','12'],['Family Office','3']].map(([type,n]) => (
                <div key={type}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{n}</div>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{type}</div>
                </div>
              ))}
            </div>
            <Link href="/auth" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 2rem', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, color: '#fff', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '3px', boxShadow: `0 4px 24px rgba(184,134,42,0.3)` }}>
              Profil erstellen →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── CHAT ── */}
      <section style={{ padding: '9rem 4.5rem', background: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
        <Reveal>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: GOLD, opacity: 0.6 }}>03</span>
              <div style={{ flex: 1, height: '1px', background: BORDER }} />
              <span style={{ fontSize: '0.63rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: STONE }}>Privater Chat</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,4vw,3.75rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.12, color: INK, marginBottom: '1.5rem' }}>
              Deals entstehen<br />im<em style={{ color: GOLD }}> Gespräch.</em>
            </h2>
            <p style={{ color: STONE, lineHeight: 1.85, fontSize: '0.95rem', maxWidth: '380px' }}>
              Private 1:1 Echtzeit-Kommunikation. Professionell, vertraulich, direkt.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ background: CREAM, border: `1px solid ${BORDER}`, borderRadius: '6px', overflow: 'hidden', boxShadow: `0 20px 60px rgba(26,24,20,0.07)` }}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, background: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative', width: '34px', height: '34px', borderRadius: '50%', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: '#fff', fontWeight: 600 }}>
                TH
                <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', border: '1.5px solid #fff' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: INK }}>Thomas H.</div>
                <div style={{ fontSize: '0.6rem', color: '#22C55E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Online</div>
              </div>
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { from: 'them', text: 'Ihr Pitch hat mich überzeugt. Können wir uns diese Woche kurz austauschen?' },
                { from: 'me', text: 'Sehr gerne. Dienstag 15 Uhr wäre ideal.' },
                { from: 'them', text: 'Perfekt — ich schicke eine Einladung.' },
                { from: 'me', text: 'Ich freue mich auf das Gespräch.' },
              ].map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '78%', padding: '9px 13px', background: msg.from === 'me' ? `linear-gradient(135deg,${GOLD},${GOLD2})` : '#fff', borderRadius: msg.from === 'me' ? '14px 14px 3px 14px' : '14px 14px 14px 3px', fontSize: '0.76rem', color: msg.from === 'me' ? '#fff' : INK, lineHeight: 1.5, border: msg.from === 'me' ? 'none' : `1px solid ${BORDER}`, boxShadow: `0 2px 8px rgba(26,24,20,0.06)` }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '10px 14px', borderTop: `1px solid ${BORDER}`, display: 'flex', gap: '8px', background: '#fff' }}>
              <div style={{ flex: 1, background: CREAM, border: `1px solid ${BORDER}`, borderRadius: '20px', padding: '8px 14px', fontSize: '0.72rem', color: STONE }}>Nachricht verfassen...</div>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.85rem', cursor: 'pointer' }}>↑</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '9rem 4.5rem', background: CREAM }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5.5rem' }}>
            <div style={{ width: '36px', height: '1px', background: GOLD }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, fontWeight: 600 }}>Mitglieder</span>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '5rem' }}>
          {[
            { q: 'Durch TEN habe ich meinen Co-Founder gefunden. Das Netzwerk hat mir Fehler erspart die mich Monate gekostet hätten.', name: 'Maximilian R.', role: 'SaaS-Gründer', delay: 0 },
            { q: 'Als Investor finde ich hier exakt die Projekte die zu meinem Portfolio passen. Außergewöhnliche Qualität.', name: 'Thomas H.', role: 'Angel Investor', delay: 0.1 },
            { q: 'Innerhalb von 24 Stunden hatte ich konkrete Antworten auf meine Finanzierungsfrage — von echten Unternehmern.', name: 'Sarah K.', role: 'Gründerin', delay: 0.2 },
          ].map(t => (
            <Reveal key={t.name} delay={t.delay}>
              <div className="quote-item" style={{ opacity: 0.8 }}>
                <div style={{ width: '28px', height: '1px', background: GOLD, marginBottom: '1.75rem', opacity: 0.5 }} />
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1.5rem' }}>
                  {[...Array(5)].map((_,i) => <span key={i} style={{ color: GOLD, fontSize: '0.85rem' }}>★</span>)}
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontStyle: 'italic', color: INK, lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  "{t.q}"
                </p>
                <div style={{ paddingTop: '1.25rem', borderTop: `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: INK, marginBottom: '3px' }}>{t.name}</div>
                  <div style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, opacity: 0.8 }}>{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '11rem 4.5rem', background: '#111009', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: `radial-gradient(ellipse, rgba(184,134,42,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <Reveal>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '4rem' }}>
              <div style={{ width: '60px', height: '1px', background: `linear-gradient(to right, transparent, ${GOLD}66)` }} />
              <span style={{ fontSize: '0.63rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, fontWeight: 600 }}>Kostenlos · Jetzt starten</span>
              <div style={{ width: '60px', height: '1px', background: `linear-gradient(to left, transparent, ${GOLD}66)` }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7.5vw,8rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.0, letterSpacing: '-0.025em', color: 'rgba(255,255,255,0.92)', marginBottom: '4rem' }}>
              Bereit für das<br />
              <em style={{ color: GOLD }}>nächste Level?</em>
            </h2>
            <Link href="/auth" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 3.5rem', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, color: '#fff', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: '3px', boxShadow: `0 0 60px rgba(184,134,42,0.25)` }}>
              Kostenlos Mitglied werden →
            </Link>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2.5rem', justifyContent: 'center' }}>
              {['Keine Kreditkarte','Keine Verpflichtung','Sofort aktiv'].map(t => (
                <span key={t} style={{ fontSize: '0.68rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: GOLD, fontSize: '0.55rem' }}>◆</span>{t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 4.5rem', background: '#0D0B06', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
          TEN<span style={{ color: GOLD }}>·</span>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Feed','Q&A','Investoren','Datenschutz','Impressum'].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} className="lnk" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>{l}</Link>
          ))}
        </div>
        <span style={{ fontSize: '0.62rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.15)' }}>© 2026 The Entrepreneur Network</span>
      </footer>
    </div>
  )
}
