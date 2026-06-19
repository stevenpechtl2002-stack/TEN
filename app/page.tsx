'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'

/* ── helpers ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return [ref, v] as const
}

function Reveal({ children, delay = 0, y = 20 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const [ref, v] = useReveal()
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : `translateY(${y}px)`, transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s` }}>
      {children}
    </div>
  )
}

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [ref, v] = useReveal()
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!v) return
    const dur = 1800, steps = 60, inc = target / steps
    let cur = 0
    const t = setInterval(() => {
      cur = Math.min(cur + inc, target)
      setCount(Math.floor(cur))
      if (cur >= target) clearInterval(t)
    }, dur / steps)
    return () => clearInterval(t)
  }, [v, target])
  return <span ref={ref}>{count}{suffix}</span>
}

function Typewriter({ items }: { items: string[] }) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const current = items[idx]
    const timeout = deleting
      ? setTimeout(() => {
          setText(t => t.slice(0, -1))
          if (text.length <= 1) { setDeleting(false); setIdx(i => (i + 1) % items.length) }
        }, 40)
      : setTimeout(() => {
          setText(current.slice(0, text.length + 1))
          if (text.length >= current.length - 1) setTimeout(() => setDeleting(true), 1800)
        }, 70)
    return () => clearTimeout(timeout)
  }, [text, deleting, idx, items])
  return <span>{text}<span style={{ borderRight: '2px solid #B8862A', marginLeft: '2px', animation: 'blink 1s step-end infinite' }}>&nbsp;</span></span>
}

/* ── constants ── */
const BG     = '#0A0B0F'
const SURF   = '#0E1018'
const SURF2  = '#13151F'
const BORDER = 'rgba(255,255,255,0.06)'
const BORDER2= 'rgba(255,255,255,0.1)'
const TEXT   = '#E2E2EC'
const MUTED  = '#5C5D72'
const GOLD   = '#B8862A'
const GOLD2  = '#D4A040'
const MONO   = '"Courier New", "Lucida Console", monospace'

const HERO_IMG    = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop'
const NETWORK_IMG = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80&fit=crop'
const P_IMGS      = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573496359142-b89e28d6de93?w=120&q=80&fit=crop&crop=face',
]

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
    <div style={{ background: BG, color: TEXT, fontFamily: 'var(--font-body)', overflowX: 'hidden' }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes drawLine { from{scaleX:0} to{scaleX:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes scanline { 0%{top:0} 100%{top:100%} }
        .lnk:hover { color:${GOLD} !important; }
        .lnk { transition:color 0.2s; }
        .btn-g { transition:box-shadow 0.3s,transform 0.2s; }
        .btn-g:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(184,134,42,0.4) !important; }
        .btn-o:hover { border-color:${GOLD} !important; color:${GOLD} !important; }
        .btn-o { transition:border-color 0.3s,color 0.3s; }
        .feat-card:hover { border-color:${BORDER2} !important; background:${SURF2} !important; }
        .feat-card { transition:border-color 0.3s,background 0.3s; }
        .qa-row:hover { background:rgba(184,134,42,0.05) !important; }
        .qa-row { transition:background 0.2s; }
        .tag { font-family:${MONO}; font-size:0.65rem; letter-spacing:0.06em; padding:3px 10px; border-radius:2px; border:1px solid ${BORDER2}; color:${MUTED}; background:${SURF2}; }
      `}</style>

      {/* ── NAVBAR ── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300, height: '68px', padding: '0 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrollY > 40 ? 'rgba(10,11,15,0.94)' : 'transparent', borderBottom: `1px solid ${scrollY > 40 ? BORDER : 'transparent'}`, backdropFilter: scrollY > 40 ? 'blur(20px)' : 'none', transition: 'all 0.4s ease' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: TEXT }}>
          TEN<span style={{ color: GOLD }}>·</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/dashboard" className="btn-g" style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, padding: '0.7rem 1.75rem', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, color: '#07080A', borderRadius: '3px', boxShadow: `0 4px 20px rgba(184,134,42,0.25)`, display: 'inline-block' }}>
            Weiter →
          </Link>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section style={{ paddingTop: '68px', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative', overflow: 'hidden' }}>

        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`, backgroundSize: '80px 80px', opacity: 0.4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD}44, transparent)` }} />

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 4rem 5rem 4rem', position: 'relative', zIndex: 1 }}>

          {/* Terminal-style tag */}
          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: GOLD, opacity: 0.8 }}>v1.0</span>
            <div style={{ width: '1px', height: '12px', background: BORDER2 }} />
            <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: MUTED, letterSpacing: '0.08em' }}>THE ENTREPRENEUR NETWORK</span>
          </div>

          {/* Headline */}
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(30px)', transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.2s' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,5.5vw,5.75rem)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', color: TEXT, marginBottom: '1.5rem' }}>
              Die Plattform<br />
              für jeden<br />
              <em style={{ fontStyle: 'italic', background: `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD})`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 5s linear infinite' }}>Unternehmer.</em>
            </h1>
          </div>

          {/* Typewriter */}
          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.5s', fontFamily: MONO, fontSize: '0.88rem', color: GOLD, marginBottom: '2rem', minHeight: '1.4em' }}>
            <Typewriter items={[
              'Fragen stellen. Antworten erhalten.',
              'Co-Founder finden.',
              'Investor-Pitches einreichen.',
              'Erfahrene Unternehmer vernetzen.',
              'Wissen aus der Praxis aufbauen.',
            ]} />
          </div>

          <p style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.6s', fontSize: '0.95rem', color: MUTED, lineHeight: 1.8, maxWidth: '400px', marginBottom: '2.5rem' }}>
            TEN verbindet Gründer, erfahrene Unternehmer und Investoren auf einer strukturierten Plattform — mit Community-Feed, Q&A-Räumen, Investor-Bereich und privatem Chat.
          </p>

          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.7s', display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <Link href="/dashboard" className="btn-g" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.95rem 2.25rem', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, color: '#07080A', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '3px', boxShadow: `0 6px 28px rgba(184,134,42,0.35)` }}>
              Kostenlos beitreten →
            </Link>
            <Link href="/qa" className="btn-o" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.95rem 1.5rem', border: `1px solid ${BORDER2}`, color: MUTED, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: '3px', background: 'transparent' }}>
              Community ansehen
            </Link>
          </div>

          {/* Live stat bar */}
          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.85s', display: 'flex', gap: '0', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
            {[
              { label: 'Gründer', val: 0, suffix: '+', live: true },
              { label: 'Q&A Räume', val: 6, suffix: '' },
              { label: 'Bereiche', val: 5, suffix: '' },
              { label: 'Kostenlos', val: 100, suffix: '%' },
            ].map(({ label, val, suffix, live }, i) => (
              <div key={label} style={{ flex: 1, padding: '1.1rem 0', textAlign: 'center', borderRight: i < 3 ? `1px solid ${BORDER}` : 'none', position: 'relative' }}>
                {live && <div style={{ position: 'absolute', top: '8px', right: '8px', width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E', animation: 'float 2s ease infinite' }} />}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 600, color: TEXT, lineHeight: 1 }}>
                  <Counter target={val} suffix={suffix} />
                </div>
                <div style={{ fontFamily: MONO, fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, marginTop: '5px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image src={HERO_IMG} alt="Modernes Büro" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority sizes="50vw" />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${BG} 0%, rgba(10,11,15,0.5) 40%, rgba(10,11,15,0.2) 100%)` }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${BG} 0%, transparent 30%)` }} />

          {/* Floating terminal cards */}
          <div style={{ position: 'absolute', top: '18%', right: '6%', background: 'rgba(14,16,24,0.88)', backdropFilter: 'blur(20px)', border: `1px solid ${BORDER2}`, borderRadius: '6px', padding: '1rem 1.25rem', minWidth: '220px', zIndex: 10, animation: 'float 6s ease-in-out infinite', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <div style={{ fontFamily: MONO, fontSize: '0.55rem', color: GOLD, marginBottom: '0.75rem', letterSpacing: '0.1em' }}>● NEUE NACHRICHT</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: TEXT, marginBottom: '4px' }}>Thomas H.</div>
            <div style={{ fontSize: '0.72rem', color: MUTED, lineHeight: 1.5 }}>„Ihr Pitch hat mich überzeugt. Können wir uns diese Woche sprechen?"</div>
          </div>

          <div style={{ position: 'absolute', bottom: '22%', right: '4%', background: 'rgba(14,16,24,0.88)', backdropFilter: 'blur(20px)', border: `1px solid ${BORDER2}`, borderRadius: '6px', padding: '1rem 1.25rem', zIndex: 10, animation: 'float 7s ease-in-out infinite 1.5s', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            <div style={{ fontFamily: MONO, fontSize: '0.55rem', color: '#22C55E', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>● Q&A · GRÜNDUNG</div>
            <div style={{ fontSize: '0.72rem', color: TEXT, marginBottom: '6px', lineHeight: 1.4 }}>„Wie gründe ich eine GmbH?"</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: '16px', height: '16px', borderRadius: '50%', background: [GOLD,'#6366F1','#22C55E'][i], border: `1.5px solid ${SURF}`, marginLeft: i > 0 ? '-5px' : '0' }} />)}
              <span style={{ fontFamily: MONO, fontSize: '0.58rem', color: MUTED, marginLeft: '5px' }}>14 Antworten</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT IS TEN — Detailed breakdown
      ══════════════════════════════════════════════ */}
      <section style={{ padding: '8rem 4rem', borderTop: `1px solid ${BORDER}`, background: SURF }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
              <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: GOLD, letterSpacing: '0.12em' }}>// WAS IST TEN?</span>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${BORDER2}, transparent)` }} />
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
            <Reveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,4vw,4rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.1, color: TEXT, marginBottom: '2rem', letterSpacing: '-0.02em' }}>
                Eine Plattform.<br />
                Fünf Bereiche.<br />
                <em style={{ color: GOLD }}>Unbegrenzte Möglichkeiten.</em>
              </h2>
              <p style={{ color: MUTED, lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '2rem' }}>
                TEN ist kein soziales Netzwerk für die Masse. Es ist eine strukturierte Infrastruktur für Unternehmer — gebaut mit den Werkzeugen die Gründer, Experten und Investoren tatsächlich brauchen.
              </p>
              <p style={{ color: MUTED, lineHeight: 1.85, fontSize: '0.95rem' }}>
                Ob du gerade gründest, bereits skalierst oder als Investor nach dem nächsten Deal suchst — TEN gibt dir den direkten Zugang zu den Menschen und dem Wissen das zählt.
              </p>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { id: '01', name: 'Community-Feed', desc: 'Teile Updates, Meilensteine und Learnings. Folge anderen Unternehmern und baue dein Netzwerk systematisch auf.' },
                { id: '02', name: 'Q&A Themenräume', desc: '6 spezialisierte Räume: Gründung, Recht, Marketing, Steuern, HR und Technologie — mit verifizierten Antworten von Experten.' },
                { id: '03', name: 'Communities & Gruppen', desc: 'Erstelle oder tritt themenspezifischen Gruppen bei. Branchenspezifisch, regional oder nach Gründungsphase.' },
                { id: '04', name: 'Investor-Bereich', desc: 'Investoren erstellen Profile, Gründer pitchen strukturiert. Direktbewerbung, Filterfunktion nach Sektor und Ticketgröße.' },
                { id: '05', name: 'Privater 1:1 Chat', desc: 'Echtzeit-Nachrichten zwischen Mitgliedern. Vertraulich, direkt, professionell — kein Umweg über externe Tools.' },
              ].map((item, i) => (
                <Reveal key={item.id} delay={i * 0.07}>
                  <div className="qa-row" style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: '1.5rem', padding: '1.5rem 0.75rem', borderBottom: `1px solid ${BORDER}`, background: 'transparent', cursor: 'default' }}>
                    <div style={{ fontFamily: MONO, fontSize: '0.72rem', color: GOLD, opacity: 0.55, paddingTop: '2px' }}>{item.id}</div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: TEXT, marginBottom: '5px' }}>{item.name}</div>
                      <div style={{ fontSize: '0.82rem', color: MUTED, lineHeight: 1.65 }}>{item.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Q&A DEEP DIVE
      ══════════════════════════════════════════════ */}
      <section style={{ padding: '8rem 4rem', borderTop: `1px solid ${BORDER}`, background: BG }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
              <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: GOLD, letterSpacing: '0.12em' }}>// Q&A RÄUME</span>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${BORDER2}, transparent)` }} />
              <span className="tag">FEATURE 01</span>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <Reveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,3.5vw,3.5rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.12, color: TEXT, marginBottom: '1.5rem', letterSpacing: '-0.015em' }}>
                Wissen das du<br />wirklich brauchst —<br /><em style={{ color: GOLD }}>direkt aus der Praxis.</em>
              </h2>
              <p style={{ color: MUTED, lineHeight: 1.85, fontSize: '0.92rem', marginBottom: '2.5rem' }}>
                Statt stundenlang zu googeln bekommst du in TEN direkte Antworten von Menschen die genau das schon erlebt haben. Jeder Raum ist thematisch spezialisiert — so findet deine Frage sofort die richtigen Experten.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: BORDER, marginBottom: '2.5rem' }}>
                {[
                  { icon: '⚖', room: 'Gründung & Recht', sub: 'GmbH, UG, Verträge, IP' },
                  { icon: '📊', room: 'Marketing & Vertrieb', sub: 'SEO, Ads, Sales-Prozesse' },
                  { icon: '💰', room: 'Finanzen & Steuern', sub: 'Buchhaltung, Funding, USt.' },
                  { icon: '👥', room: 'HR & Team', sub: 'Recruiting, Kultur, Anstellungen' },
                  { icon: '⚙', room: 'Technologie', sub: 'Stack, APIs, Skalierung' },
                  { icon: '📈', room: 'Wachstum', sub: 'Product-Market-Fit, Skalierung' },
                ].map(r => (
                  <div key={r.room} className="feat-card" style={{ background: SURF, padding: '1.1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'default' }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: TEXT, marginBottom: '3px' }}>{r.room}</div>
                      <div style={{ fontFamily: MONO, fontSize: '0.6rem', color: MUTED }}>{r.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '2.5rem' }}>
                {[['6', 'Räume'], ['∞', 'Fragen'], ['✓', 'Verifiziert']].map(([n, l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500, color: GOLD }}>{n}</div>
                    <div style={{ fontFamily: MONO, fontSize: '0.6rem', color: MUTED, marginTop: '4px', letterSpacing: '0.08em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Q&A mockup */}
            <Reveal delay={0.15}>
              <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: '6px', overflow: 'hidden', boxShadow: `0 32px 80px rgba(0,0,0,0.4)` }}>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, background: SURF2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c, opacity: 0.7 }} />)}
                  </div>
                  <span style={{ fontFamily: MONO, fontSize: '0.6rem', color: MUTED }}>ten.network/qa</span>
                </div>
                <div style={{ padding: '12px 14px', borderBottom: `1px solid ${BORDER}`, display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {['Alle','Gründung','Marketing','Steuern','HR','Tech','Recht'].map((t,i) => (
                    <span key={t} style={{ fontFamily: MONO, fontSize: '0.6rem', padding: '3px 10px', borderRadius: '2px', background: i === 1 ? `${GOLD}18` : SURF2, color: i === 1 ? GOLD : MUTED, border: `1px solid ${i === 1 ? `${GOLD}44` : BORDER}` }}>{t}</span>
                  ))}
                </div>
                <div>
                  {[
                    { q: 'Wie gründe ich eine GmbH und was kostet es?', tag: 'Gründung', n: 14, hot: true },
                    { q: 'Wie finde ich meinen ersten zahlenden Kunden?', tag: 'Marketing', n: 8, hot: false },
                    { q: 'Welche Steuervorteile gibt es für Startups?', tag: 'Steuern', n: 11, hot: false },
                    { q: 'Wie verhandle ich ein Term Sheet?', tag: 'Investment', n: 6, hot: false },
                  ].map((item, i) => (
                    <div key={i} className="qa-row" style={{ padding: '1rem 1rem', borderBottom: i < 3 ? `1px solid ${BORDER}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', background: 'transparent', cursor: 'default' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          {item.hot && <span style={{ fontFamily: MONO, fontSize: '0.55rem', background: `${GOLD}22`, color: GOLD, padding: '2px 7px', borderRadius: '2px', border: `1px solid ${GOLD}44` }}>HOT</span>}
                          <span style={{ fontFamily: MONO, fontSize: '0.58rem', color: MUTED }}>{item.tag}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: TEXT, lineHeight: 1.4 }}>{item.q}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: MUTED }}>{item.n}</div>
                        <div style={{ fontFamily: MONO, fontSize: '0.55rem', color: MUTED, opacity: 0.6 }}>Antworten</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INVESTOR BEREICH
      ══════════════════════════════════════════════ */}
      <section style={{ borderTop: `1px solid ${BORDER}`, background: SURF, position: 'relative', overflow: 'hidden' }}>
        {/* Full-width image band */}
        <div style={{ position: 'relative', height: '340px', overflow: 'hidden' }}>
          <Image src={NETWORK_IMG} alt="Netzwerk" fill style={{ objectFit: 'cover', objectPosition: 'center 40%' }} sizes="100vw" />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,11,15,0.72)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`, backgroundSize: '80px 80px', opacity: 0.3 }} />
          <Reveal>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', zIndex: 1 }}>
              <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: GOLD, letterSpacing: '0.2em' }}>// INVESTOR-BEREICH</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,4rem)', fontWeight: 500, fontStyle: 'italic', color: '#fff', textAlign: 'center', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Wo Kapital auf Vision trifft.
              </h2>
            </div>
          </Reveal>
        </div>

        <div style={{ padding: '6rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: BORDER, marginBottom: '5rem' }}>
            {[
              { title: 'Für Gründer', points: ['Pitch strukturiert einreichen', 'Projektstatus & Kapitalbedarf angeben', 'Sektor und Geschäftsmodell beschreiben', 'Direkte Bewerbungen von Investoren erhalten', 'Keine Gebühren, keine Provision'] },
              { title: 'Für Investoren', points: ['Profil mit Fokus & Ticketgröße anlegen', 'Deals nach Sektor & Stage filtern', 'Gründer direkt kontaktieren', 'Deal-Flow ohne Mittelsmann aufbauen', 'VC, Angel, Family Office — alle Typen'] },
              { title: 'Der Prozess', points: ['01 — Profil erstellen', '02 — Pitch einreichen', '03 — Investor findet dich', '04 — Direkter Kontakt per Chat', '05 — Deal abschließen'] },
            ].map((col, i) => (
              <Reveal key={col.title} delay={i * 0.1}>
                <div className="feat-card" style={{ background: SURF2, padding: '2rem', height: '100%', cursor: 'default' }}>
                  <div style={{ fontFamily: MONO, fontSize: '0.65rem', color: GOLD, letterSpacing: '0.1em', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: `1px solid ${BORDER}` }}>
                    {col.title.toUpperCase()}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {col.points.map(p => (
                      <li key={p} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.84rem', color: MUTED, lineHeight: 1.5 }}>
                        <span style={{ color: GOLD, flexShrink: 0, fontSize: '0.7rem', marginTop: '2px' }}>◆</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Pitch mockup */}
          <Reveal delay={0.1}>
            <div style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, background: SURF2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: MONO, fontSize: '0.6rem', color: GOLD, letterSpacing: '0.1em' }}>● LIVE PITCHES</span>
                <span style={{ fontFamily: MONO, fontSize: '0.6rem', color: MUTED }}>Aktualisiert · gerade eben</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0', borderBottom: `1px solid ${BORDER}` }}>
                {['Startup','Sektor','Ziel','Stage'].map(h => (
                  <div key={h} style={{ padding: '0.6rem 1rem', fontFamily: MONO, fontSize: '0.58rem', color: MUTED, letterSpacing: '0.1em', borderRight: `1px solid ${BORDER}`, textTransform: 'uppercase' }}>{h}</div>
                ))}
              </div>
              {[
                { name: 'NutriFlow AI', sector: 'FoodTech', amount: '€ 150.000', stage: 'MVP', p: 62 },
                { name: 'LegalMind Pro', sector: 'LegalTech', amount: '€ 80.000', stage: 'Idee', p: 28 },
                { name: 'GreenGrid', sector: 'CleanTech', amount: '€ 500.000', stage: 'Wachstum', p: 81 },
                { name: 'FinStack', sector: 'FinTech', amount: '€ 200.000', stage: 'Pre-Seed', p: 45 },
              ].map((item, i) => (
                <div key={i} className="qa-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0', borderBottom: i < 3 ? `1px solid ${BORDER}` : 'none', background: 'transparent' }}>
                  <div style={{ padding: '0.875rem 1rem', borderRight: `1px solid ${BORDER}`, fontSize: '0.82rem', fontWeight: 600, color: TEXT }}>{item.name}</div>
                  <div style={{ padding: '0.875rem 1rem', borderRight: `1px solid ${BORDER}`, fontFamily: MONO, fontSize: '0.72rem', color: MUTED }}>{item.sector}</div>
                  <div style={{ padding: '0.875rem 1rem', borderRight: `1px solid ${BORDER}`, fontFamily: MONO, fontSize: '0.75rem', color: GOLD, fontWeight: 600 }}>
                    {item.amount}
                    <div style={{ marginTop: '5px', height: '2px', background: BORDER2 }}>
                      <div style={{ height: '2px', width: `${item.p}%`, background: `linear-gradient(90deg,${GOLD}55,${GOLD})` }} />
                    </div>
                  </div>
                  <div style={{ padding: '0.875rem 1rem' }}><span className="tag">{item.stage}</span></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <section style={{ padding: '8rem 4rem', borderTop: `1px solid ${BORDER}`, background: BG }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
              <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: GOLD, letterSpacing: '0.12em' }}>// WIE ES FUNKTIONIERT</span>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${BORDER2}, transparent)` }} />
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: BORDER }}>
            {[
              { step: '01', title: 'Registrieren', desc: 'Kostenloses Konto erstellen. Kein Abo, kein Haken — du bist in 60 Sekunden dabei.' },
              { step: '02', title: 'Profil anlegen', desc: 'Definiere deine Rolle — Gründer, Experte oder Investor. TEN zeigt dir die relevanten Bereiche.' },
              { step: '03', title: 'Netzwerk aufbauen', desc: 'Stell Fragen, beantworte welche, pitche dein Projekt oder entdecke neue Investments.' },
              { step: '04', title: 'Direkt vernetzen', desc: 'Kontaktiere Mitglieder per privatem Chat. Aus Austausch werden echte Geschäftsbeziehungen.' },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.08}>
                <div className="feat-card" style={{ background: SURF, padding: '2.5rem 2rem', cursor: 'default' }}>
                  <div style={{ fontFamily: MONO, fontSize: '2rem', color: GOLD, opacity: 0.2, lineHeight: 1, marginBottom: '1.25rem', fontWeight: 700 }}>{item.step}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, color: TEXT, marginBottom: '0.875rem', letterSpacing: '-0.01em' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: MUTED, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section style={{ padding: '8rem 4rem', borderTop: `1px solid ${BORDER}`, background: SURF }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5rem' }}>
              <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: GOLD, letterSpacing: '0.12em' }}>// MITGLIEDER</span>
              <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${BORDER2}, transparent)` }} />
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: BORDER }}>
            {[
              { q: 'Durch TEN habe ich meinen Co-Founder gefunden. Die Q&A-Räume haben mir Fehler erspart die mich Monate gekostet hätten.', name: 'Maximilian R.', role: 'SaaS-Gründer', company: 'FlowStack GmbH', img: P_IMGS[0], delay: 0 },
              { q: 'Als Investor finde ich auf TEN exakt die Projekte die zu meinem Portfolio passen. Deal-Qualität die ich sonst nur auf Konferenzen finde.', name: 'Thomas H.', role: 'Angel Investor', company: '12 Exits', img: P_IMGS[1], delay: 0.1 },
              { q: 'Innerhalb von 24 Stunden hatte ich 8 konkrete Antworten auf meine Steuerfrage — von echten Unternehmern die das Problem kennen.', name: 'Sarah K.', role: 'Gründerin', company: 'LegalEdge', img: P_IMGS[2], delay: 0.2 },
            ].map(t => (
              <Reveal key={t.name} delay={t.delay}>
                <div className="feat-card" style={{ background: SURF2, padding: '2.25rem', cursor: 'default' }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '1.25rem' }}>
                    {[...Array(5)].map((_,i) => <span key={i} style={{ color: GOLD, fontSize: '0.75rem' }}>★</span>)}
                  </div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontStyle: 'italic', color: TEXT, lineHeight: 1.7, marginBottom: '1.75rem' }}>
                    "{t.q}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingTop: '1.25rem', borderTop: `1px solid ${BORDER}` }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, position: 'relative', border: `1px solid ${BORDER2}` }}>
                      <Image src={t.img} alt={t.name} fill style={{ objectFit: 'cover' }} sizes="40px" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: TEXT }}>{t.name}</div>
                      <div style={{ fontFamily: MONO, fontSize: '0.6rem', color: MUTED, marginTop: '2px' }}>{t.role} · {t.company}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════ */}
      <section style={{ padding: '10rem 4rem', borderTop: `1px solid ${BORDER}`, background: BG, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`, backgroundSize: '80px 80px', opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: `radial-gradient(ellipse, rgba(184,134,42,0.08) 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <Reveal>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: MONO, fontSize: '0.65rem', color: GOLD, letterSpacing: '0.2em', marginBottom: '3rem' }}>// KOSTENLOS · JETZT STARTEN</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7vw,7.5rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.0, letterSpacing: '-0.025em', color: TEXT, marginBottom: '3.5rem' }}>
              Werde Teil von<br /><em style={{ color: GOLD }}>TEN.</em>
            </h2>
            <p style={{ color: MUTED, fontSize: '1rem', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto 3rem' }}>
              Die Plattform die Gründer, Experten und Investoren verbindet — strukturiert, professionell, kostenlos.
            </p>
            <Link href="/dashboard" className="btn-g" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', padding: '1.15rem 3.25rem', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, color: '#07080A', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '3px', boxShadow: `0 0 60px rgba(184,134,42,0.25)` }}>
              Kostenlos Mitglied werden →
            </Link>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2.5rem', justifyContent: 'center' }}>
              {['Keine Kreditkarte', 'Keine Verpflichtung', 'Sofort aktiv'].map(t => (
                <span key={t} style={{ fontFamily: MONO, fontSize: '0.65rem', color: MUTED, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: GOLD }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '2.25rem 4rem', background: SURF2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED }}>
          TEN<span style={{ color: GOLD }}>·</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Feed','Q&A','Investoren','Datenschutz','Impressum'].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} className="lnk" style={{ fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, opacity: 0.6 }}>{l}</Link>
          ))}
        </div>
        <span style={{ fontFamily: MONO, fontSize: '0.58rem', color: MUTED, opacity: 0.4 }}>© 2026 THE ENTREPRENEUR NETWORK</span>
      </footer>
    </div>
  )
}
