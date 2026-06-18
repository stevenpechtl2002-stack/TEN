'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView] as const
}

function FadeIn({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : `translateY(${y}px)`, transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  )
}

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    setHeroVisible(true)
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: '#F8F7F4', color: '#0D0D0D', fontFamily: 'var(--font-body)', overflowX: 'hidden' }}>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.5);opacity:0} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes spin-slow { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes bounce-in { 0%{transform:scale(0.8) translateY(20px);opacity:0} 60%{transform:scale(1.05);opacity:1} 100%{transform:scale(1) translateY(0)} }
        @keyframes slide-up { 0%{transform:translateY(100%);opacity:0} 100%{transform:translateY(0);opacity:1} }
        @keyframes gradient-x { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes typing { 0%{width:0} 100%{width:100%} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .btn-gold { transition: transform 0.2s, box-shadow 0.2s; }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(200,151,58,0.55) !important; }
        .btn-ghost:hover { border-color: #C8973A !important; color: #C8973A !important; }
        .card-hover { transition: transform 0.3s, box-shadow 0.3s; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.12) !important; }
        .feature-icon { transition: transform 0.3s; }
        .card-hover:hover .feature-icon { transform: scale(1.15) rotate(-5deg); }
        .nav-link { transition: color 0.2s; }
        .nav-link:hover { color: #C8973A !important; }
        .glow-dot { animation: pulse-ring 2s ease-out infinite; }
      `}</style>

      {/* ── NAVBAR ── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5rem', background: scrollY > 40 ? 'rgba(248,247,244,0.95)' : 'transparent', borderBottom: scrollY > 40 ? '1px solid #E8E6E0' : '1px solid transparent', backdropFilter: scrollY > 40 ? 'blur(20px)' : 'none', transition: 'all 0.3s ease' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          TEN<span style={{ color: '#C8973A' }}>·</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/auth" className="nav-link" style={{ fontSize: '0.82rem', color: '#666', padding: '0.5rem 1rem', fontWeight: 500 }}>Anmelden</Link>
          <Link href="/auth" className="btn-gold" style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.7rem 1.75rem', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', color: '#fff', borderRadius: '8px', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 4px 20px rgba(200,151,58,0.4)', display: 'inline-block' }}>
            Kostenlos starten
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '68px 5rem 0', background: 'linear-gradient(145deg, #F8F7F4 0%, #FDF8EE 50%, #F8F7F4 100%)', position: 'relative', overflow: 'hidden' }}>

        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '10%', right: '8%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,151,58,0.12) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', animation: 'float 10s ease-in-out infinite 2s', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', left: '40%', width: '600px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,151,58,0.15), transparent)', pointerEvents: 'none' }} />

        {/* Left */}
        <div style={{ paddingRight: '4rem', paddingTop: '3rem', paddingBottom: '3rem' }}>
          {/* Badge */}
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s', display: 'inline-flex', alignItems: 'center', gap: '0.625rem', marginBottom: '2rem', background: 'rgba(200,151,58,0.08)', border: '1px solid rgba(200,151,58,0.2)', padding: '0.45rem 1.1rem', borderRadius: '30px' }}>
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#C8973A', display: 'block' }} />
              <span className="glow-dot" style={{ position: 'absolute', width: '7px', height: '7px', borderRadius: '50%', background: '#C8973A', top: 0, left: 0 }} />
            </span>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700 }}>The Entrepreneur Network</span>
          </div>

          {/* Headline */}
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.2s' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.2rem,5.5vw,6rem)', fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.03em', marginBottom: '1.75rem', color: '#0D0D0D' }}>
              Wo Gründer<br />
              auf Gründer<br />
              <span style={{ background: 'linear-gradient(135deg,#C8973A 0%,#E8B84B 40%,#C8973A 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic', animation: 'shimmer 4s linear infinite' }}>treffen.</span>
            </h1>
          </div>

          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.35s' }}>
            <p style={{ fontSize: '1.1rem', color: '#5A5A6A', lineHeight: 1.8, maxWidth: '440px', marginBottom: '2.5rem' }}>
              TEN ist die exklusive Community für Gründer, erfahrene Unternehmer und Investoren — lern, vernetze dich und wachse schneller als je zuvor.
            </p>
          </div>

          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease 0.45s', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <Link href="/auth" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2.5rem', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', color: '#fff', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.04em', boxShadow: '0 6px 30px rgba(200,151,58,0.4)' }}>
              Jetzt kostenlos beitreten →
            </Link>
            <Link href="/qa" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', padding: '1rem 1.75rem', border: '2px solid #DDD', color: '#555', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.2s' }}>
              Community ansehen
            </Link>
          </div>

          {/* Social proof */}
          <div style={{ opacity: heroVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.6s', display: 'flex', alignItems: 'center', gap: '1.5rem', paddingTop: '2rem', borderTop: '1px solid #E5E2DA' }}>
            <div style={{ display: 'flex' }}>
              {['#C8973A','#6366F1','#22C55E','#F59E0B','#EC4899'].map((c, i) => (
                <div key={i} style={{ width: '34px', height: '34px', borderRadius: '50%', background: `linear-gradient(135deg,${c},${c}BB)`, border: '2px solid #F8F7F4', marginLeft: i > 0 ? '-10px' : '0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#fff', fontWeight: 700 }}>
                  {['MR','SK','TH','JK','LB'][i]}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Gründer, Experten & Investoren</div>
              <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '2px' }}>warten bereits auf dich</div>
            </div>
          </div>
        </div>

        {/* Right — App Preview */}
        <div style={{ position: 'relative', paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0) rotate(-1deg)' : 'translateY(40px)', transition: 'all 0.9s ease 0.4s', position: 'relative' }}>

            {/* Main card */}
            <div style={{ background: '#fff', border: '1px solid #E8E6E0', borderRadius: '20px', boxShadow: '0 30px 90px rgba(0,0,0,0.13)', overflow: 'hidden' }}>
              {/* App topbar */}
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0EDE8', background: '#FAFAF8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
                </div>
                <div style={{ flex: 1, margin: '0 8px', background: '#F0EDE8', borderRadius: '6px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.65rem', color: '#aaa' }}>ten.network/feed</span>
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                {/* Sidebar */}
                <div style={{ width: '52px', borderRight: '1px solid #F0EDE8', padding: '12px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: '#FAFAF8' }}>
                  {[['🏠',true],['👥',false],['❓',false],['💼',false],['💬',false]].map(([icon, active], i) => (
                    <div key={i} style={{ width: '36px', height: '36px', borderRadius: '10px', background: active ? 'rgba(200,151,58,0.15)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>{icon as string}</div>
                  ))}
                </div>

                {/* Feed */}
                <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { name: 'Max R.', role: 'Gründer', color: '#C8973A', text: 'Seed-Runde über €400k abgeschlossen! 🚀 Danke an alle die uns unterstützt haben.', likes: 48, time: '2h' },
                    { name: 'Sarah K.', role: 'Investor', color: '#6366F1', text: 'Suche B2B SaaS-Startups mit traction. Gerne per DM!', likes: 31, time: '5h' },
                    { name: 'Thomas H.', role: 'Mentor', color: '#22C55E', text: 'Größter Fehler: zu spät mit Kunden gesprochen. Holt euch frühzeitig Feedback.', likes: 87, time: '1d' },
                  ].map((p, i) => (
                    <div key={i} style={{ padding: '12px', background: i === 0 ? '#FFFBF0' : '#FAFAF8', border: `1px solid ${i === 0 ? '#FDE68A' : '#F0EDE8'}`, borderRadius: '12px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg,${p.color},${p.color}88)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#fff', fontWeight: 700 }}>{p.name[0]}{p.name.split(' ')[1][0]}</div>
                        <div>
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0D0D0D' }}>{p.name}</div>
                          <div style={{ fontSize: '0.6rem', color: '#aaa' }}>{p.role} · {p.time}</div>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.7rem', color: '#444', lineHeight: 1.5, marginBottom: '8px' }}>{p.text}</p>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <span style={{ fontSize: '0.62rem', color: '#aaa' }}>❤️ {p.likes}</span>
                        <span style={{ fontSize: '0.62rem', color: '#aaa' }}>💬 Kommentieren</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge 1 */}
            <div style={{ position: 'absolute', top: '60px', right: '-40px', background: '#fff', border: '1px solid #E8E6E0', borderRadius: '16px', padding: '12px 16px', boxShadow: '0 16px 50px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: '10px', animation: 'float 6s ease-in-out infinite', zIndex: 10 }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>💼</div>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0D0D0D' }}>Investment-Interesse</div>
                <div style={{ fontSize: '0.62rem', color: '#aaa', marginTop: '2px' }}>Thomas H. · gerade eben</div>
              </div>
            </div>

            {/* Floating badge 2 */}
            <div style={{ position: 'absolute', bottom: '80px', left: '-40px', background: '#fff', border: '1px solid #E8E6E0', borderRadius: '16px', padding: '12px 16px', boxShadow: '0 16px 50px rgba(0,0,0,0.12)', animation: 'float 7s ease-in-out infinite 1s', zIndex: 10 }}>
              <div style={{ fontSize: '0.62rem', color: '#aaa', marginBottom: '5px' }}>💬 Neue Antwort in Q&A</div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#0D0D0D', marginBottom: '6px' }}>"Wie finde ich Investoren?"</div>
              <div style={{ display: 'flex', gap: '2px' }}>
                {['#C8973A','#6366F1','#22C55E'].map((c,i) => <div key={i} style={{ width: '16px', height: '16px', borderRadius: '50%', background: c, marginLeft: i > 0 ? '-4px' : '0', border: '1.5px solid #fff' }} />)}
                <span style={{ fontSize: '0.6rem', color: '#aaa', marginLeft: '6px', lineHeight: '16px' }}>8 Experten</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOLD STATS BAR ── */}
      <div style={{ background: 'linear-gradient(135deg,#B8852A,#C8973A,#D4A543,#E2AD50,#C8973A)', backgroundSize: '300% 300%', animation: 'gradient-x 6s ease infinite', padding: '2.75rem 5rem', display: 'flex', justifyContent: 'space-around' }}>
        {[['6', 'Q&A Räume'], ['3', 'Rollen'], ['100%', 'Kostenlos'], ['∞', 'Möglichkeiten']].map(([n, l]) => (
          <FadeIn key={l}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.75rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', marginTop: '8px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{l}</div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* ── PERSONAS ── */}
      <section style={{ padding: '9rem 5rem', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700, marginBottom: '1.25rem' }}>Für wen ist TEN?</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,4vw,3.5rem)', fontWeight: 700, letterSpacing: '-0.025em', color: '#0D0D0D' }}>
                Drei Rollen. Eine Plattform.
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.75rem' }}>
            {[
              { emoji: '🌱', tag: 'Neuling & Gründer', color: '#22C55E', bg: 'linear-gradient(145deg,#F0FDF4,#DCFCE7)', border: '#86EFAC', title: 'Du baust gerade auf.', desc: 'Stell deine Fragen direkt an erfahrene Unternehmer, finde Co-Founder und lerne aus echten Erfahrungen.', delay: 0 },
              { emoji: '🏆', tag: 'Erfahrener Unternehmer', color: '#C8973A', bg: 'linear-gradient(145deg,#FFFBEB,#FEF3C7)', border: '#FCD34D', title: 'Du hast das Wissen.', desc: 'Teile dein Know-how, bau dein Netzwerk aus und werde zur Anlaufstelle für die nächste Generation.', delay: 0.1 },
              { emoji: '💼', tag: 'Investor', color: '#6366F1', bg: 'linear-gradient(145deg,#EEF2FF,#E0E7FF)', border: '#A5B4FC', title: 'Du suchst das Nächste.', desc: 'Entdecke die besten Startups bevor sie bekannt werden — direkt, strukturiert, ohne Zwischenhändler.', delay: 0.2 },
            ].map(card => (
              <FadeIn key={card.tag} delay={card.delay}>
                <div className="card-hover" style={{ background: card.bg, border: `2px solid ${card.border}`, borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem', height: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                  <div className="feature-icon" style={{ fontSize: '2.5rem', display: 'inline-block' }}>{card.emoji}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: card.color }}>{card.tag}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{card.title}</h3>
                  <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.75, flex: 1 }}>{card.desc}</p>
                  <Link href="/auth" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: card.color, marginTop: '0.5rem' }}>
                    Jetzt starten →
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE: Q&A ── */}
      <section style={{ padding: '9rem 5rem', background: 'linear-gradient(160deg,#F8F7F4,#FDF8EE)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7rem', alignItems: 'center' }}>
          <FadeIn>
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700, marginBottom: '1.25rem' }}>Q&A Räume</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                Echte Antworten.<br />Von echten<br /><span style={{ fontStyle: 'italic', color: '#C8973A' }}>Unternehmern.</span>
              </h2>
              <p style={{ color: '#555', lineHeight: 1.85, fontSize: '1rem', marginBottom: '2.5rem' }}>In 6 spezialisierten Themenräumen bekommst du Praxiswissen direkt von Menschen die es bereits geschafft haben.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {[['📚','Gründung & Recht','GmbH, UG, Verträge, Steuern'],['📣','Marketing & Vertrieb','Kunden gewinnen & skalieren'],['💰','Finanzen & Investment','Funding, Planung, Buchhaltung']].map(([icon,title,sub]) => (
                  <div key={title as string} className="card-hover" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: '#fff', border: '1px solid #EAE7DF', borderRadius: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <span className="feature-icon" style={{ fontSize: '1.5rem', display: 'inline-block' }}>{icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0D0D0D' }}>{title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '2px' }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ background: '#fff', borderRadius: '24px', border: '1px solid #E8E6E0', boxShadow: '0 32px 80px rgba(0,0,0,0.09)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0EDE8', background: '#FAFAF8', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Alle','Gründung','Marketing','Steuern','HR','Tech','Recht'].map((t, i) => (
                  <div key={t} style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.67rem', fontWeight: 600, background: i === 1 ? '#C8973A' : '#fff', color: i === 1 ? '#fff' : '#888', border: `1px solid ${i === 1 ? '#C8973A' : '#E8E6E0'}`, cursor: 'pointer', transition: 'all 0.2s' }}>{t}</div>
                ))}
              </div>
              <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { q: 'Wie finde ich meinen ersten B2B-Kunden?', tag: 'Marketing', answers: 8, badge: true },
                  { q: 'Was kostet eine GmbH-Gründung wirklich?', tag: 'Gründung', answers: 14, badge: false },
                  { q: 'Wie verhandle ich mein erstes Investment?', tag: 'Investment', answers: 6, badge: false },
                  { q: 'Welche Steuer-Software für Startups?', tag: 'Steuern', answers: 11, badge: false },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '14px', background: i === 0 ? '#FFFBF0' : '#FAFAF8', border: `1px solid ${i === 0 ? '#FDE68A' : '#F0EDE8'}`, borderRadius: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#0D0D0D', fontWeight: 500, lineHeight: 1.4 }}>{item.q}</span>
                      {item.badge && <span style={{ fontSize: '0.58rem', background: '#FEF3C7', color: '#D97706', padding: '3px 8px', borderRadius: '10px', flexShrink: 0, fontWeight: 700 }}>NEU</span>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.63rem', background: '#F0EDE8', color: '#888', padding: '2px 8px', borderRadius: '8px' }}>{item.tag}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {[...Array(3)].map((_,j) => <div key={j} style={{ width: '18px', height: '18px', borderRadius: '50%', background: ['#C8973A','#6366F1','#22C55E'][j], border: '2px solid #fff', marginLeft: j > 0 ? '-6px' : '0' }} />)}
                        <span style={{ fontSize: '0.63rem', color: '#aaa' }}>{item.answers} Antworten</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FEATURE: INVESTOR (DARK) ── */}
      <section style={{ padding: '9rem 5rem', background: '#0D0D0D', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,151,58,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7rem', alignItems: 'center' }}>
          <FadeIn>
            <div style={{ background: '#111218', border: '1px solid #22242E', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #22242E', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#C8973A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Aktuelle Pitches</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['FoodTech','LegalTech','CleanTech'].map(t => <span key={t} style={{ fontSize: '0.58rem', padding: '3px 8px', background: '#1A1C24', border: '1px solid #2A2C38', borderRadius: '8px', color: '#666' }}>{t}</span>)}
                </div>
              </div>
              <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'NutriFlow AI', sector: 'FoodTech', amount: '€150k', color: '#22C55E', p: 65 },
                  { name: 'LegalMind Pro', sector: 'LegalTech', amount: '€80k', color: '#6366F1', p: 30 },
                  { name: 'GreenGrid', sector: 'CleanTech', amount: '€500k', color: '#C8973A', p: 80 },
                  { name: 'FinStack', sector: 'FinTech', amount: '€200k', color: '#F59E0B', p: 45 },
                ].map((p, i) => (
                  <div key={i} style={{ padding: '14px', background: '#0C0E14', border: '1px solid #1C1E28', borderRadius: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F0F0F5' }}>{p.name}</div>
                        <div style={{ fontSize: '0.62rem', color: '#555', marginTop: '2px' }}>{p.sector}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#C8973A' }}>{p.amount}</div>
                        <div style={{ fontSize: '0.6rem', padding: '2px 8px', background: `${p.color}18`, color: p.color, borderRadius: '6px', marginTop: '4px' }}>Suche Investor</div>
                      </div>
                    </div>
                    <div style={{ height: '4px', background: '#1C1E28', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${p.p}%`, background: `linear-gradient(90deg,${p.color}88,${p.color})`, borderRadius: '2px', transition: 'width 1.5s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700, marginBottom: '1.25rem' }}>Investor-Bereich</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 700, color: '#F0F0F5', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                Finde dein<br />nächstes<br /><span style={{ fontStyle: 'italic', color: '#C8973A' }}>Investment.</span>
              </h2>
              <p style={{ color: '#777', lineHeight: 1.85, fontSize: '1rem', marginBottom: '2.5rem' }}>Strukturierte Pitches, klare Zahlen, direkter Kontakt. Kein Rauschen — nur echte Deal-Flow-Qualität.</p>
              {[['📋','Pitch einreichen','Strukturiert mit Phase & Kapitalbedarf'],['🔍','Investor-Profile','Nach Sektor und Ticket-Größe filtern'],['💬','Direkt anfragen','Private Nachrichten, kein Mittelsmann']].map(([icon,title,sub]) => (
                <div key={title as string} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '1rem', background: '#111218', border: '1px solid #22242E', borderRadius: '14px' }}>
                  <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F0F0F5' }}>{title}</div>
                    <div style={{ fontSize: '0.77rem', color: '#555', marginTop: '3px' }}>{sub}</div>
                  </div>
                </div>
              ))}
              <Link href="/auth" className="btn-gold" style={{ display: 'inline-flex', marginTop: '1.5rem', padding: '0.9rem 2rem', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', color: '#fff', borderRadius: '10px', fontWeight: 700, fontSize: '0.86rem', boxShadow: '0 4px 24px rgba(200,151,58,0.4)' }}>
                Profil erstellen →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CHAT FEATURE ── */}
      <section style={{ padding: '9rem 5rem', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7rem', alignItems: 'center' }}>
          <FadeIn>
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700, marginBottom: '1.25rem' }}>Privater Chat</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                Deals entstehen im<br /><span style={{ fontStyle: 'italic', color: '#C8973A' }}>direkten Gespräch.</span>
              </h2>
              <p style={{ color: '#555', lineHeight: 1.85, fontSize: '1rem', marginBottom: '2rem' }}>Private 1:1 Echtzeit-Nachrichten direkt auf der Plattform. Professionell, sicher, sofort.</p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[['🔒','Privat'],['⚡','Echtzeit'],['📎','Dateien']].map(([icon,text]) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 700, color: '#333' }}>
                    <span style={{ fontSize: '1.2rem' }}>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ background: '#FAFAF8', border: '1px solid #E8E6E0', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.08)' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #E8E6E0', background: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg,#6366F1,#818CF8)' }} />
                  <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '9px', height: '9px', borderRadius: '50%', background: '#22C55E', border: '1.5px solid #fff' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0D0D0D' }}>Thomas H.</div>
                  <div style={{ fontSize: '0.63rem', color: '#22C55E', fontWeight: 600 }}>Online</div>
                </div>
              </div>
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { from: 'them', text: 'Hallo! Dein Pitch hat mich sehr interessiert. Können wir uns kurz austauschen?', time: '14:02' },
                  { from: 'me', text: 'Natürlich! Dienstag oder Mittwoch?', time: '14:05' },
                  { from: 'them', text: 'Dienstag 15 Uhr — ich schicke dir eine Einladung.', time: '14:07' },
                  { from: 'me', text: 'Super, freue mich! 🤝', time: '14:08' },
                ].map((msg, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '78%', padding: '10px 14px', borderRadius: msg.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: msg.from === 'me' ? 'linear-gradient(135deg,#C8973A,#E2AD50)' : '#fff', color: msg.from === 'me' ? '#fff' : '#0D0D0D', fontSize: '0.78rem', lineHeight: 1.5, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: msg.from === 'me' ? 'none' : '1px solid #E8E6E0' }}>
                      {msg.text}
                      <div style={{ fontSize: '0.58rem', color: msg.from === 'me' ? 'rgba(255,255,255,0.65)' : '#ccc', marginTop: '4px', textAlign: 'right' }}>{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px 16px', borderTop: '1px solid #E8E6E0', display: 'flex', gap: '8px', background: '#fff' }}>
                <div style={{ flex: 1, background: '#F5F3EF', borderRadius: '20px', padding: '9px 14px', fontSize: '0.75rem', color: '#ccc' }}>Nachricht schreiben...</div>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1rem', cursor: 'pointer' }}>↑</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '9rem 5rem', background: 'linear-gradient(160deg,#F8F7F4,#FDF8EE)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700, marginBottom: '1.25rem' }}>Mitglieder</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-0.025em' }}>
                Echte Stimmen. Echte Ergebnisse.
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
            {[
              { q: 'Durch TEN habe ich meinen Co-Founder gefunden. Die Q&A-Räume haben mir Fehler erspart die mich Monate gekostet hätten.', name: 'Maximilian R.', role: 'SaaS-Gründer', color: '#C8973A', bg: '#FFFBEB', delay: 0 },
              { q: 'Als Investor finde ich auf TEN exakt die Projekte die zu meinem Portfolio passen. Außergewöhnliche Pitch-Qualität.', name: 'Thomas H.', role: 'Angel Investor', color: '#6366F1', bg: '#EEF2FF', delay: 0.1 },
              { q: 'Innerhalb von 24h hatte ich konkrete Antworten auf meine Finanzierungsfrage — von echten Unternehmern.', name: 'Sarah K.', role: 'Gründerin', color: '#22C55E', bg: '#F0FDF4', delay: 0.2 },
            ].map(t => (
              <FadeIn key={t.name} delay={t.delay}>
                <div className="card-hover" style={{ background: t.bg, border: `2px solid ${t.color}22`, borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_,i) => <span key={i} style={{ color: '#F59E0B', fontSize: '1rem' }}>★</span>)}
                  </div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontStyle: 'italic', color: '#222', lineHeight: 1.7, flex: 1 }}>"{t.q}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingTop: '1.25rem', borderTop: `1px solid ${t.color}18` }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: `linear-gradient(135deg,${t.color},${t.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '0.8rem' }}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0D0D0D' }}>{t.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '11rem 5rem', background: '#0D0D0D', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', background: 'radial-gradient(ellipse, rgba(200,151,58,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(200,151,58,0.08)', animation: 'spin-slow 30s linear infinite', pointerEvents: 'none' }} />

        <FadeIn>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '660px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'rgba(200,151,58,0.12)', border: '1px solid rgba(200,151,58,0.25)', borderRadius: '30px', padding: '0.45rem 1.25rem', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700 }}>Kostenlos · Jetzt starten</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.75rem,6vw,5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '1.5rem', color: '#F0F0F5' }}>
              Bereit für das<br />
              <span style={{ background: 'linear-gradient(135deg,#C8973A 0%,#E8B84B 50%,#C8973A 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic', animation: 'shimmer 4s linear infinite' }}>nächste Level?</span>
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem' }}>
              Tritt der Community bei die Gründer und Investoren verbindet.
            </p>
            <Link href="/auth" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1.2rem 3.5rem', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', color: '#fff', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: '0 8px 50px rgba(200,151,58,0.5)' }}>
              Kostenlos Mitglied werden →
            </Link>
            <div style={{ marginTop: '2rem', fontSize: '0.78rem', color: '#444', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              {['Keine Kreditkarte','Keine Verpflichtung','Sofort loslegen'].map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ color: '#C8973A' }}>✓</span>{t}</span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <footer style={{ borderTop: '1px solid #1C1E28', padding: '2.5rem 5rem', background: '#0A0A0C', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', letterSpacing: '0.1em', color: '#444' }}>TEN<span style={{ color: '#C8973A' }}>·</span></span>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Feed','Q&A','Investoren','Datenschutz','Impressum'].map(l => (
            <span key={l} style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#333' }}>{l}</span>
          ))}
        </div>
        <span style={{ fontSize: '0.72rem', color: '#333' }}>© 2026 The Entrepreneur Network</span>
      </footer>
    </div>
  )
}
