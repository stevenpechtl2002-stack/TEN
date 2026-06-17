import Link from 'next/link'

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', overflow: 'hidden' }}>

      {/* ── AMBIENT GLOWS ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '800px', height: '800px', background: 'radial-gradient(ellipse, rgba(200,151,58,0.10) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(200,151,58,0.06) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: '40%', left: '30%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(200,151,58,0.04) 0%, transparent 60%)' }} />
        {/* Grain */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* ── NAV ── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '64px', borderBottom: '1px solid var(--border)', background: 'rgba(7,8,10,0.92)', backdropFilter: 'blur(24px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 3rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          TEN<span style={{ color: 'var(--accent)' }}>·</span>
        </div>
        <nav style={{ display: 'flex', gap: '2.5rem' }}>
          {[['Feed', '/feed'], ['Q&A', '/qa'], ['Investoren', '/investors']].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{l}</Link>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/auth" style={{ fontSize: '0.82rem', color: 'var(--muted)', padding: '0.45rem 1rem' }}>Anmelden</Link>
          <Link href="/auth" style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.6rem 1.5rem', background: 'linear-gradient(135deg,var(--accent),var(--accent-2))', color: '#07080A', borderRadius: '4px', letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: '0 2px 20px rgba(200,151,58,0.35)' }}>Beitreten</Link>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 1, paddingTop: '64px' }}>

        {/* ── HERO ── */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '7rem 3rem 5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '2.5rem' }}>
              <div style={{ height: '1px', width: '40px', background: 'var(--accent)' }} />
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>The Entrepreneur Network</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.2rem, 5.5vw, 5.5rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.75rem' }}>
              Dein Netzwerk.<br />
              <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,var(--accent) 0%,var(--gold) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Dein Kapital.</span><br />
              Deine Zukunft.
            </h1>

            <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '420px' }}>
              TEN ist die exklusive Plattform, auf der Gründer auf erfahrene Unternehmer und Investoren treffen. Lerne, vernetze dich und wachse schneller als je zuvor.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <Link href="/auth" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 2.5rem', background: 'linear-gradient(135deg,var(--accent),var(--accent-2))', color: '#07080A', borderRadius: '4px', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '0 4px 32px rgba(200,151,58,0.4)' }}>
                Kostenlos Mitglied werden →
              </Link>
              <Link href="/qa" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.9rem 1.75rem', border: '1px solid var(--border-2)', color: 'var(--muted)', borderRadius: '4px', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                Community ansehen
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              {[['100%', 'Kostenlos'], ['6', 'Q&A Räume'], ['3', 'Nutzer-Rollen']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--accent)', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '4px', letterSpacing: '0.05em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Mockup */}
          <div style={{ position: 'relative' }}>
            {/* Outer glow */}
            <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(ellipse, rgba(200,151,58,0.12) 0%, transparent 70%)', borderRadius: '20px', zIndex: 0 }} />

            {/* Main card - Feed mockup */}
            <div style={{ position: 'relative', zIndex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>
              {/* Window chrome */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                {['#EF4444','#F5C842','#22C55E'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.7 }} />)}
                <div style={{ flex: 1, marginLeft: '12px', background: 'var(--surface-2)', borderRadius: '4px', height: '20px', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>ten.network/feed</span>
                </div>
              </div>

              {/* Feed content */}
              <div style={{ padding: '16px', display: 'flex', gap: '12px' }}>
                {/* Sidebar */}
                <div style={{ width: '140px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {[{ icon: '◈', label: 'Feed', active: true }, { icon: '◎', label: 'Communities' }, { icon: '◉', label: 'Q&A' }, { icon: '◇', label: 'Investoren' }, { icon: '◈', label: 'Nachrichten' }].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', borderRadius: '6px', background: item.active ? 'var(--surface-2)' : 'transparent', fontSize: '0.72rem', color: item.active ? 'var(--text)' : 'var(--muted)', fontWeight: item.active ? 600 : 400 }}>
                      <span style={{ color: item.active ? 'var(--accent)' : 'inherit', fontSize: '0.8rem' }}>{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* Posts */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { name: 'Maximilian R.', role: 'Gründer', time: 'vor 2h', text: 'Wir haben gerade unsere Seed-Runde abgeschlossen. Danke an alle die uns unterstützt haben 🎉', likes: 42 },
                    { name: 'Sarah K.', role: 'Investor', time: 'vor 5h', text: 'Suche SaaS-Startups im B2B-Bereich mit traction. DM mich gerne!', likes: 28 },
                  ].map((post, i) => (
                    <div key={i} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '7px', alignItems: 'center' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `linear-gradient(135deg, var(--accent), var(--gold))`, flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text)' }}>{post.name}</div>
                          <div style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>{post.role} · {post.time}</div>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.67rem', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '7px' }}>{post.text}</p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>♥ {post.likes}</span>
                        <span style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>💬 Kommentieren</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating chat bubble */}
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 16px', boxShadow: '0 16px 40px rgba(0,0,0,0.5)', zIndex: 2, minWidth: '200px' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginBottom: '6px' }}>💬 Neue Nachricht von Thomas M.</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text)', lineHeight: 1.5 }}>"Interessantes Projekt! Lass uns über eine mögliche Investition sprechen."</div>
              <div style={{ marginTop: '8px', padding: '5px 12px', background: 'linear-gradient(135deg,var(--accent),var(--accent-2))', borderRadius: '4px', fontSize: '0.6rem', color: '#07080A', fontWeight: 700, display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Antworten</div>
            </div>
          </div>
        </section>

        {/* ── FÜR WEN ── */}
        <section style={{ borderTop: '1px solid var(--border)', padding: '6rem 3rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
                <div style={{ height: '1px', width: '40px', background: 'var(--accent)' }} />
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>Für wen ist TEN?</span>
                <div style={{ height: '1px', width: '40px', background: 'var(--accent)' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                Drei Rollen. Eine Plattform.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {[
                {
                  icon: '🌱',
                  tag: 'Neuling / Gründer',
                  title: 'Du baust gerade auf.',
                  desc: 'Du hast eine Idee oder ein junges Startup und suchst Orientierung, Mentoren und erste Kontakte. TEN gibt dir Zugang zu echtem Wissen — direkt von Menschen die es bereits geschafft haben.',
                  ctas: ['Q&A stellen', 'Communities beitreten'],
                  color: '#22C55E',
                },
                {
                  icon: '🏆',
                  tag: 'Erfahrener Unternehmer',
                  title: 'Du hast das Wissen.',
                  desc: 'Du hast Erfahrung aufgebaut, Fehler gemacht und Erfolge gefeiert. Teile dein Wissen mit der nächsten Generation — und vernetze dich mit Gleichgesinnten auf Augenhöhe.',
                  ctas: ['Fragen beantworten', 'Community führen'],
                  color: 'var(--accent)',
                },
                {
                  icon: '💼',
                  tag: 'Investor',
                  title: 'Du suchst das Nächste.',
                  desc: 'Du investierst in Startups und Gründer. TEN zeigt dir die besten Projekte, bevor sie groß werden. Finde die richtigen Pitches, baue Beziehungen auf.',
                  ctas: ['Pitches entdecken', 'Profil erstellen'],
                  color: '#818CF8',
                },
              ].map((card) => (
                <div key={card.tag} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'border-color 0.2s' }} className="persona-card">
                  <div style={{ fontSize: '2rem' }}>{card.icon}</div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: card.color, fontWeight: 600 }}>{card.tag}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text)' }}>{card.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.75 }}>{card.desc}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.5rem' }}>
                    {card.ctas.map(cta => (
                      <Link key={cta} href="/auth" style={{ fontSize: '0.75rem', padding: '0.4rem 0.875rem', border: `1px solid ${card.color}30`, color: card.color, borderRadius: '4px', letterSpacing: '0.03em' }}>
                        {cta} →
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '6rem 3rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8rem' }}>

            {/* Feature 1: Q&A */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
                  <div style={{ height: '1px', width: '32px', background: 'var(--accent)' }} />
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>Q&A Räume</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
                  Echte Antworten.<br />Von echten Unternehmern.
                </h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  In unseren Themenräumen (Gründung, Steuern, Marketing, Recht, HR, Technologie) stellst du deine Fragen — und erfahrene Unternehmer antworten direkt. Kein Google, keine KI — echtes Wissen aus der Praxis.
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {['6 spezialisierte Themenräume', 'Antworten mit Erfahren-Badge markiert', 'Öffentlich lesbar — auch ohne Account'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>◆</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Q&A Mockup */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
                  {['Gründung', 'Marketing', 'Steuern'].map((t, i) => (
                    <div key={t} style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: '20px', background: i === 0 ? 'rgba(200,151,58,0.15)' : 'var(--surface)', color: i === 0 ? 'var(--accent)' : 'var(--muted)', border: `1px solid ${i === 0 ? 'rgba(200,151,58,0.3)' : 'var(--border)'}` }}>{t}</div>
                  ))}
                </div>
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { q: 'Wie finde ich meinen ersten Kunden als B2B SaaS?', answers: 8, new: true },
                    { q: 'Was muss ich bei der GmbH-Gründung beachten?', answers: 14, new: false },
                    { q: 'Wie verhandle ich mein erstes Investment?', answers: 6, new: false },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '12px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text)', lineHeight: 1.5 }}>{item.q}</span>
                        {item.new && <span style={{ fontSize: '0.55rem', background: 'rgba(200,151,58,0.15)', color: 'var(--accent)', padding: '2px 6px', borderRadius: '10px', flexShrink: 0, fontWeight: 700 }}>NEU</span>}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                        {[...Array(3)].map((_, j) => <div key={j} style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--accent),var(--gold))', marginLeft: j > 0 ? '-6px' : '0' }} />)}
                        <span style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>{item.answers} Antworten</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 2: Investor */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
              {/* Investor Mockup */}
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Aktuelle Pitches</div>
                  {[
                    { name: 'NutriFlow AI', stage: 'MVP', funding: '€150k', sector: 'FoodTech' },
                    { name: 'LegalMind Pro', stage: 'Idee', funding: '€80k', sector: 'LegalTech' },
                    { name: 'GreenGrid', stage: 'Wachstum', funding: '€500k', sector: 'CleanTech' },
                  ].map((pitch, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', marginBottom: '6px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)' }}>{pitch.name}</div>
                        <div style={{ fontSize: '0.62rem', color: 'var(--muted)' }}>{pitch.sector}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 600 }}>{pitch.funding}</div>
                        <div style={{ fontSize: '0.6rem', padding: '2px 6px', background: 'var(--surface-2)', borderRadius: '4px', color: 'var(--muted)', marginTop: '3px' }}>{pitch.stage}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '12px 16px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Investoren</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['VC', 'Angel', 'Family Office'].map((type, i) => (
                      <div key={i} style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.68rem', color: 'var(--muted)' }}>
                        <div style={{ fontSize: '0.6rem', color: 'var(--accent)', marginBottom: '2px' }}>▲ {[4, 12, 3][i]}</div>
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
                  <div style={{ height: '1px', width: '32px', background: 'var(--accent)' }} />
                  <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>Investor-Bereich</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
                  Finde dein<br />Investment — oder<br />
                  <span style={{ fontStyle: 'italic' }}>deinen Investor.</span>
                </h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  Gründer präsentieren ihre Projekte strukturiert — mit Phase, Kapitalbedarf und Vision. Investoren finden in Sekunden die relevantesten Pitches. Alles auf einer Plattform.
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {['Pitch einreichen in wenigen Minuten', 'Investoren-Profile nach Sektor filtern', 'Direkte Bewerbung per Nachricht'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>◆</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section style={{ padding: '7rem 3rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.875rem', marginBottom: '1.25rem' }}>
                <div style={{ height: '1px', width: '40px', background: 'var(--accent)' }} />
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>Was Mitglieder sagen</span>
                <div style={{ height: '1px', width: '40px', background: 'var(--accent)' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                Echte Stimmen. Echte Ergebnisse.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {[
                { quote: 'Durch TEN habe ich meinen Co-Founder gefunden. Die Q&A-Räume haben mir geholfen Fehler zu vermeiden die mich Monate gekostet hätten.', name: 'Maximilian R.', role: 'SaaS-Gründer', initials: 'MR' },
                { quote: 'Als Investor finde ich auf TEN genau die Projekte die zu meinem Portfolio passen. Die Pitch-Qualität ist bemerkenswert hoch.', name: 'Thomas H.', role: 'Angel Investor', initials: 'TH' },
                { quote: 'Ich hatte keine Ahnung wie ich mein Startup finanzieren soll. In der Community habe ich innerhalb von 24h Antworten bekommen.', name: 'Sarah K.', role: 'Gründerin', initials: 'SK' },
              ].map((t) => (
                <div key={t.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--accent)', lineHeight: 1, opacity: 0.6 }}>"</div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.65 }}>{t.quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--accent),var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: '#07080A', fontFamily: 'var(--font-display)' }}>{t.initials}</div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>{t.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ padding: '9rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(200,151,58,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Bereit für das<br />
              <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,var(--accent) 0%,var(--gold) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>nächste Level?</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '3rem' }}>
              Tritt der Community bei, die Gründer und Investoren verbindet.
              Kostenlos. Jetzt.
            </p>
            <Link href="/auth" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1.1rem 3rem', background: 'linear-gradient(135deg,var(--accent),var(--accent-2))', color: '#07080A', borderRadius: '4px', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 8px 40px rgba(200,151,58,0.45)' }}>
              Kostenlos Mitglied werden →
            </Link>
          </div>
        </section>

        <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)' }}>TEN·</span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Feed', 'Q&A', 'Investoren', 'Datenschutz'].map(l => (
              <span key={l} style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--faint)' }}>{l}</span>
            ))}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--faint)' }}>© 2026 The Entrepreneur Network</span>
        </footer>
      </main>

      <style>{`
        .persona-card:hover { border-color: var(--border-2) !important; }
      `}</style>
    </div>
  )
}
