'use client'

import Link from 'next/link'
import Image from 'next/image'
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

const CREAM  = '#F7F4EF'
const INK    = '#1A1814'
const STONE  = '#6B6560'
const GOLD   = '#B8862A'
const GOLD2  = '#D4A040'
const BORDER = 'rgba(26,24,20,0.1)'

const IMGS = {
  hero:       'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85&fit=crop',
  manifesto:  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=85&fit=crop',
  qa:         'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=85&fit=crop',
  investor:   'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=85&fit=crop',
  chat:       'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=85&fit=crop',
  p1:         'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=85&fit=crop&crop=face',
  p2:         'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=85&fit=crop&crop=face',
  p3:         'https://images.unsplash.com/photo-1573496359142-b89e28d6de93?w=200&q=85&fit=crop&crop=face',
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

  return (
    <div style={{ background: CREAM, color: INK, fontFamily: 'var(--font-body)', overflowX: 'hidden' }}>
      <style>{`
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
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
        .img-zoom img { transition: transform 8s ease; }
        .img-zoom:hover img { transform: scale(1.04); }
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
      <section style={{ paddingTop: '70px', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: `linear-gradient(160deg, ${CREAM} 0%, #EDE8DF 100%)` }}>

        {/* Left: text */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 4rem 6rem 4.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.8s ease 0.1s', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.75rem' }}>
            <div style={{ width: '36px', height: '1px', background: GOLD }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: GOLD, fontWeight: 600 }}>The Entrepreneur Network</span>
          </div>

          <h1 style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1.1s cubic-bezier(0.16,1,0.3,1) 0.25s', fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem,6vw,6.5rem)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.02em', color: INK, marginBottom: '2.25rem' }}>
            Wo Gründer<br />auf Gründer<br />
            <em style={{ fontStyle: 'italic', background: `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD})`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 5s linear infinite' }}>treffen.</em>
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

          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.9s ease 0.7s', display: 'flex', gap: '3rem', paddingTop: '2.25rem', borderTop: `1px solid ${BORDER}` }}>
            {[['100%','Kostenlos'],['6','Q&A Räume'],['3','Rollen']].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: INK, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '0.63rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: STONE, marginTop: '6px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="img-zoom" style={{ position: 'absolute', inset: 0 }}>
            <Image src={IMGS.hero} alt="Unternehmer im Gespräch" fill style={{ objectFit: 'cover', objectPosition: 'center' }} priority sizes="50vw" />
          </div>
          {/* Gradient overlay left edge */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${CREAM} 0%, transparent 25%)`, zIndex: 1 }} />
          {/* Bottom overlay */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${CREAM} 0%, transparent 30%)`, zIndex: 1 }} />

          {/* Floating badge 1 */}
          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 0.9s', position: 'absolute', top: '22%', right: '8%', background: 'rgba(247,244,239,0.92)', backdropFilter: 'blur(16px)', border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '14px 18px', boxShadow: `0 16px 48px rgba(26,24,20,0.12)`, display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>💼</div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: INK }}>Investor-Interesse</div>
              <div style={{ fontSize: '0.6rem', color: STONE, marginTop: '2px' }}>Thomas H. · gerade eben</div>
            </div>
          </div>

          {/* Floating badge 2 */}
          <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 1.1s', position: 'absolute', bottom: '20%', right: '6%', background: 'rgba(247,244,239,0.92)', backdropFilter: 'blur(16px)', border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '14px 18px', boxShadow: `0 16px 48px rgba(26,24,20,0.12)`, zIndex: 10 }}>
            <div style={{ fontSize: '0.6rem', color: STONE, marginBottom: '6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Neue Antwort · Q&A</div>
            <div style={{ fontSize: '0.74rem', fontWeight: 600, color: INK, marginBottom: '8px' }}>"Wie finde ich Investoren?"</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {[GOLD,'#6366F1','#22C55E'].map((c,i) => <div key={i} style={{ width: '18px', height: '18px', borderRadius: '50%', background: c, marginLeft: i > 0 ? '-5px' : '0', border: '2px solid rgba(247,244,239,0.9)' }} />)}
              <span style={{ fontSize: '0.62rem', color: STONE, marginLeft: '6px' }}>8 Experten</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOLD STRIP ── */}
      <div style={{ padding: '3rem 4.5rem', background: `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD})`, backgroundSize: '200% auto', animation: 'shimmer 6s linear infinite', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {[['6','Q&A Räume'],['3','Nutzerrollen'],['100%','Kostenlos'],['∞','Möglichkeiten']].map(([n,l]) => (
          <Reveal key={l}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 600, color: '#fff', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginTop: '8px' }}>{l}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── MANIFESTO + FULL IMAGE ── */}
      <section style={{ position: 'relative', height: '60vh', minHeight: '420px', overflow: 'hidden' }} className="img-zoom">
        <Image src={IMGS.manifesto} alt="Unternehmer Netzwerk" fill style={{ objectFit: 'cover', objectPosition: 'center 30%' }} sizes="100vw" />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,12,8,0.62)' }} />
        <Reveal>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', zIndex: 1 }}>
            <blockquote style={{ textAlign: 'center', maxWidth: '760px' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem,3.5vw,3rem)', fontWeight: 400, fontStyle: 'italic', color: '#fff', lineHeight: 1.35, marginBottom: '2rem' }}>
                "Die erfolgreichsten Unternehmer bauen nicht alleine. Sie bauen im richtigen Netzwerk."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <div style={{ width: '32px', height: '1px', background: GOLD, opacity: 0.7 }} />
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, fontWeight: 600 }}>The Entrepreneur Network</span>
                <div style={{ width: '32px', height: '1px', background: GOLD, opacity: 0.7 }} />
              </div>
            </blockquote>
          </div>
        </Reveal>
      </section>

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
              <div style={{ background: '#fff', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: GOLD, fontWeight: 500, opacity: 0.6 }}>{card.num}</span>
                  <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: STONE, border: `1px solid ${BORDER}`, padding: '3px 10px', borderRadius: '2px' }}>{card.tag}</span>
                </div>
                <div style={{ width: '36px', height: '1px', background: GOLD, opacity: 0.4 }} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 500, fontStyle: 'italic', color: INK, lineHeight: 1.2 }}>{card.title}</h3>
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
      <section style={{ background: CREAM, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '600px' }}>
        {/* Image */}
        <div style={{ position: 'relative', minHeight: '500px', overflow: 'hidden' }} className="img-zoom">
          <Image src={IMGS.qa} alt="Unternehmer im Austausch" fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="50vw" />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 70%, ${CREAM} 100%)` }} />
          {/* Section label on photo */}
          <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', zIndex: 2 }}>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.15)' }}>Q&A Räume</span>
          </div>
        </div>

        {/* Text */}
        <div style={{ padding: '6rem 4.5rem 6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: GOLD, opacity: 0.6 }}>01</span>
              <div style={{ flex: 1, height: '1px', background: BORDER }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,3.5vw,3.5rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.12, color: INK, marginBottom: '1.5rem' }}>
              Echte Antworten.<br />Von echten<br /><em style={{ color: GOLD }}>Unternehmern.</em>
            </h2>
            <p style={{ color: STONE, lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '2.5rem', maxWidth: '380px' }}>
              Sechs spezialisierte Räume. Praxiswissen direkt von Menschen die es bereits geschafft haben.
            </p>
            {['Gründung & Recht', 'Marketing & Vertrieb', 'Finanzen & Investment', 'Technologie & Produkt'].map((item, i) => (
              <div key={item} className="row-hover" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem 0.5rem', borderBottom: `1px solid ${BORDER}`, background: 'transparent' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', color: GOLD, opacity: 0.5, width: '20px', textAlign: 'right' }}>0{i+1}</span>
                <span style={{ fontSize: '0.88rem', color: INK }}>{item}</span>
              </div>
            ))}
            <Link href="/qa" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginTop: '2.5rem', padding: '0.9rem 2rem', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, color: '#fff', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '3px' }}>
              Q&A ansehen →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── INVESTOR ── */}
      <section style={{ background: '#111009', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '600px' }}>
        {/* Text */}
        <div style={{ padding: '6rem 4rem 6rem 4.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '400px', height: '400px', background: `radial-gradient(ellipse, rgba(184,134,42,0.06) 0%, transparent 65%)`, pointerEvents: 'none' }} />
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: GOLD, opacity: 0.6 }}>02</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,3.5vw,3.5rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.12, color: 'rgba(255,255,255,0.92)', marginBottom: '1.5rem' }}>
                Finde dein<br />nächstes<br /><em style={{ color: GOLD }}>Investment.</em>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '3rem', maxWidth: '380px' }}>
                Strukturierte Pitches, klare Zahlen, direkter Kontakt zwischen Gründern und Investoren.
              </p>
              <div style={{ display: 'flex', gap: '3rem', marginBottom: '3rem' }}>
                {[['VC','4'],['Angel','12'],['Family Office','3']].map(([type,n]) => (
                  <div key={type}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{n}</div>
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{type}</div>
                  </div>
                ))}
              </div>
              <Link href="/investors" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 2rem', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, color: '#fff', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '3px' }}>
                Investoren entdecken →
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden' }} className="img-zoom">
          <Image src={IMGS.investor} alt="Unternehmer" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="50vw" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #111009 0%, transparent 30%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,9,6,0.4)' }} />
          {/* Pitch overlay card */}
          <div style={{ position: 'absolute', bottom: '2.5rem', right: '2.5rem', background: 'rgba(10,9,6,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '1.25rem', minWidth: '220px', zIndex: 2 }}>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: '1rem', opacity: 0.8 }}>Top Pitch</div>
            {[{ name: 'NutriFlow AI', amount: '€ 150k', p: 65 }, { name: 'GreenGrid', amount: '€ 500k', p: 80 }].map((item, i) => (
              <div key={i} style={{ marginBottom: i === 0 ? '0.875rem' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{item.name}</span>
                  <span style={{ fontSize: '0.75rem', color: GOLD, fontFamily: 'var(--font-display)' }}>{item.amount}</span>
                </div>
                <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px' }}>
                  <div style={{ height: '2px', width: `${item.p}%`, background: `linear-gradient(90deg,${GOLD}66,${GOLD})`, borderRadius: '1px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAT ── */}
      <section style={{ background: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '600px' }}>
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden' }} className="img-zoom">
          <Image src={IMGS.chat} alt="Business Gespräch" fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="50vw" />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 70%, #fff 100%)` }} />
          <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', zIndex: 2 }}>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.15)' }}>Privater Chat</span>
          </div>
        </div>

        {/* Text */}
        <div style={{ padding: '6rem 4.5rem 6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: GOLD, opacity: 0.6 }}>03</span>
              <div style={{ flex: 1, height: '1px', background: BORDER }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem,3.5vw,3.5rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.12, color: INK, marginBottom: '1.5rem' }}>
              Deals entstehen<br />im <em style={{ color: GOLD }}>Gespräch.</em>
            </h2>
            <p style={{ color: STONE, lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '2.5rem', maxWidth: '380px' }}>
              Private 1:1 Echtzeit-Kommunikation direkt auf der Plattform. Professionell, vertraulich, sofort.
            </p>
            {/* Chat preview */}
            <div style={{ background: CREAM, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '1.25rem', maxWidth: '360px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#fff', fontWeight: 700, flexShrink: 0 }}>TH</div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: INK }}>Thomas H.</div>
                  <div style={{ fontSize: '0.58rem', color: '#22C55E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Online</div>
                </div>
              </div>
              {[
                { me: false, text: 'Ihr Pitch hat mich überzeugt. Können wir uns diese Woche austauschen?' },
                { me: true, text: 'Sehr gerne — Dienstag 15 Uhr wäre ideal.' },
                { me: false, text: 'Perfekt, ich schicke eine Einladung.' },
              ].map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.me ? 'flex-end' : 'flex-start', marginBottom: '8px' }}>
                  <div style={{ maxWidth: '82%', padding: '8px 12px', background: msg.me ? `linear-gradient(135deg,${GOLD},${GOLD2})` : '#fff', borderRadius: msg.me ? '12px 12px 3px 12px' : '12px 12px 12px 3px', fontSize: '0.74rem', color: msg.me ? '#fff' : INK, lineHeight: 1.45, border: msg.me ? 'none' : `1px solid ${BORDER}` }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '9rem 4.5rem', background: CREAM }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '5.5rem' }}>
            <div style={{ width: '36px', height: '1px', background: GOLD }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, fontWeight: 600 }}>Mitglieder</span>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '4rem' }}>
          {[
            { q: 'Durch TEN habe ich meinen Co-Founder gefunden. Das Netzwerk hat mir Fehler erspart die mich Monate gekostet hätten.', name: 'Maximilian R.', role: 'SaaS-Gründer', img: IMGS.p1, delay: 0 },
            { q: 'Als Investor finde ich hier exakt die Projekte die zu meinem Portfolio passen. Außergewöhnliche Qualität.', name: 'Thomas H.', role: 'Angel Investor', img: IMGS.p2, delay: 0.1 },
            { q: 'Innerhalb von 24 Stunden hatte ich konkrete Antworten auf meine Finanzierungsfrage — von echten Unternehmern.', name: 'Sarah K.', role: 'Gründerin', img: IMGS.p3, delay: 0.2 },
          ].map(t => (
            <Reveal key={t.name} delay={t.delay}>
              <div className="quote-item" style={{ opacity: 0.85 }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1.5rem' }}>
                  {[...Array(5)].map((_,i) => <span key={i} style={{ color: GOLD, fontSize: '0.85rem' }}>★</span>)}
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.08rem', fontStyle: 'italic', color: INK, lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  "{t.q}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '1.25rem', borderTop: `1px solid ${BORDER}` }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <Image src={t.img} alt={t.name} fill style={{ objectFit: 'cover' }} sizes="44px" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: INK }}>{t.name}</div>
                    <div style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: GOLD, opacity: 0.8, marginTop: '2px' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: 'relative', padding: '11rem 4.5rem', textAlign: 'center', overflow: 'hidden' }}>
        <Image src={IMGS.manifesto} alt="" fill style={{ objectFit: 'cover', objectPosition: 'center 60%' }} sizes="100vw" />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,4,0.8)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: `radial-gradient(ellipse, rgba(184,134,42,0.12) 0%, transparent 65%)`, pointerEvents: 'none' }} />
        <Reveal>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '4rem' }}>
              <div style={{ width: '60px', height: '1px', background: `${GOLD}66` }} />
              <span style={{ fontSize: '0.63rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, fontWeight: 600 }}>Kostenlos · Jetzt starten</span>
              <div style={{ width: '60px', height: '1px', background: `${GOLD}66` }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,7.5vw,8rem)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.0, letterSpacing: '-0.025em', color: 'rgba(255,255,255,0.93)', marginBottom: '4rem' }}>
              Bereit für das<br /><em style={{ color: GOLD }}>nächste Level?</em>
            </h2>
            <Link href="/auth" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 3.5rem', background: `linear-gradient(135deg,${GOLD},${GOLD2})`, color: '#fff', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: '3px', boxShadow: `0 0 60px rgba(184,134,42,0.3)` }}>
              Kostenlos Mitglied werden →
            </Link>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2.5rem', justifyContent: 'center' }}>
              {['Keine Kreditkarte','Keine Verpflichtung','Sofort aktiv'].map(t => (
                <span key={t} style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
        <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.15)' }}>© 2026 The Entrepreneur Network</span>
      </footer>
    </div>
  )
}
