import Link from 'next/link'

export default function LandingPage() {
  return (
    <div style={{ background: '#FAFAF8', color: '#0D0D0D', fontFamily: 'var(--font-body)', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '68px', borderBottom: '1px solid #E8E6E0', background: 'rgba(250,250,248,0.96)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '0.1em', color: '#0D0D0D' }}>
          TEN<span style={{ color: '#C8973A' }}>·</span>
        </div>
        <nav style={{ display: 'flex', gap: '3rem' }}>
          {['Feed', 'Q&A', 'Investoren'].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#666', fontWeight: 500 }}>{l}</Link>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/auth" style={{ fontSize: '0.82rem', color: '#666', padding: '0.5rem 1rem', fontWeight: 500 }}>Anmelden</Link>
          <Link href="/auth" style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0.65rem 1.75rem', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', color: '#fff', borderRadius: '6px', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 4px 20px rgba(200,151,58,0.4)' }}>
            Kostenlos starten
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ paddingTop: '68px', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'linear-gradient(160deg, #FAFAF8 55%, #FBF5E8 100%)' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 4rem 6rem 5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', marginBottom: '2rem', background: 'rgba(200,151,58,0.1)', border: '1px solid rgba(200,151,58,0.25)', padding: '0.4rem 1rem', borderRadius: '20px', width: 'fit-content' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8973A' }} />
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700 }}>The Entrepreneur Network</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem,5.5vw,5.75rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.75rem', color: '#0D0D0D' }}>
            Wo Gründer<br />
            auf Investoren<br />
            <span style={{ background: 'linear-gradient(135deg,#C8973A,#E2AD50)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>treffen.</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.8, maxWidth: '440px', marginBottom: '2.5rem' }}>
            TEN ist die exklusive Community für Gründer, erfahrene Unternehmer und Investoren. Lern, vernetze dich — und wachse schneller als je zuvor.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <Link href="/auth" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2.5rem', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: '0 6px 30px rgba(200,151,58,0.45)' }}>
              Jetzt kostenlos beitreten →
            </Link>
            <Link href="/qa" style={{ display: 'inline-flex', alignItems: 'center', padding: '1rem 1.75rem', border: '2px solid #E0DDD5', color: '#444', borderRadius: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
              Community ansehen
            </Link>
          </div>

          {/* Social proof bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingTop: '2rem', borderTop: '1px solid #E8E6E0' }}>
            <div style={{ display: 'flex' }}>
              {['#C8973A','#6366F1','#22C55E','#F59E0B'].map((c, i) => (
                <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', background: c, border: '2px solid #FAFAF8', marginLeft: i > 0 ? '-10px' : '0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#fff', fontWeight: 700 }}>
                  {['MR','SK','TH','JK'][i]}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0D0D0D' }}>Bereits aktiv</div>
              <div style={{ fontSize: '0.75rem', color: '#888' }}>Gründer · Experten · Investoren</div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#C8973A' }}>100%</div>
              <div style={{ fontSize: '0.72rem', color: '#888' }}>Kostenlos</div>
            </div>
          </div>
        </div>

        {/* Right — hero visual */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 4rem 6rem 2rem' }}>
          <div style={{ position: 'absolute', top: '15%', right: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(200,151,58,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />

          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            {/* Main feed card */}
            <div style={{ background: '#fff', border: '1px solid #E8E6E0', borderRadius: '16px', boxShadow: '0 24px 80px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0EDE8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAFAF8' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.08em' }}>TEN<span style={{ color: '#C8973A' }}>·</span></div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['Feed','Q&A','Investoren'].map((t, i) => (
                    <div key={t} style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 600, background: i === 0 ? 'rgba(200,151,58,0.12)' : 'transparent', color: i === 0 ? '#C8973A' : '#999', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t}</div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Maximilian R.', role: 'Gründer · Berlin', text: 'Wir haben gerade unsere Seed-Runde über €400k abgeschlossen! 🚀', likes: 48, comments: 12, color: '#C8973A' },
                  { name: 'Sarah K.', role: 'Angel Investor', text: 'Suche SaaS-Startups im B2B HR-Bereich mit ersten zahlenden Kunden. Gerne per DM!', likes: 31, comments: 8, color: '#6366F1' },
                  { name: 'Thomas H.', role: 'Serial Founder', text: 'Mein größter Fehler als Erstgründer: zu lange gewartet bevor ich mit Kunden gesprochen habe.', likes: 87, comments: 24, color: '#22C55E' },
                ].map((post, i) => (
                  <div key={i} style={{ padding: '14px', background: '#FAFAF8', borderRadius: '10px', border: '1px solid #F0EDE8' }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${post.color}, ${post.color}99)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#fff', fontWeight: 700 }}>
                        {post.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0D0D0D' }}>{post.name}</div>
                        <div style={{ fontSize: '0.62rem', color: '#999' }}>{post.role}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#444', lineHeight: 1.6, marginBottom: '10px' }}>{post.text}</p>
                    <div style={{ display: 'flex', gap: '14px' }}>
                      <span style={{ fontSize: '0.65rem', color: '#999' }}>❤️ {post.likes}</span>
                      <span style={{ fontSize: '0.65rem', color: '#999' }}>💬 {post.comments}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating notification */}
            <div style={{ position: 'absolute', top: '-20px', right: '-30px', background: '#fff', border: '1px solid #E8E6E0', borderRadius: '14px', padding: '14px 16px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '220px', zIndex: 2 }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>💼</div>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0D0D0D' }}>Neues Investment-Interesse</div>
                <div style={{ fontSize: '0.65rem', color: '#999', marginTop: '2px' }}>Thomas H. hat deinen Pitch gesehen</div>
              </div>
            </div>

            {/* Floating Q&A badge */}
            <div style={{ position: 'absolute', bottom: '-24px', left: '-24px', background: '#fff', border: '1px solid #E8E6E0', borderRadius: '14px', padding: '14px 18px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)', zIndex: 2 }}>
              <div style={{ fontSize: '0.65rem', color: '#999', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Neue Antwort in Q&A</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0D0D0D' }}>"Wie finde ich Investoren?"</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#6366F1' }} />
                <span style={{ fontSize: '0.65rem', color: '#999' }}>8 Antworten von Experten</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div style={{ background: 'linear-gradient(135deg,#C8973A,#D4A543,#E2AD50)', padding: '2.5rem 5rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {[['6', 'Q&A Themenräume'], ['3', 'Nutzer-Rollen'], ['100%', 'Kostenlos'], ['∞', 'Möglichkeiten']].map(([n, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', marginTop: '6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── FÜR WEN ── */}
      <section style={{ padding: '8rem 5rem', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700, marginBottom: '1rem' }}>Für wen ist TEN?</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,4vw,3.5rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-0.02em' }}>
              Drei Rollen.<br />Eine Plattform.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem' }}>
            {[
              { emoji: '🌱', tag: 'Neuling & Gründer', color: '#22C55E', bg: '#F0FDF4', border: '#BBF7D0', title: 'Du baust gerade auf.', desc: 'Du hast eine Idee oder ein junges Startup und suchst Orientierung, Mentoren und erste Kontakte. Stell deine Fragen direkt an Menschen die es geschafft haben.', ctas: ['Fragen stellen', 'Community beitreten'] },
              { emoji: '🏆', tag: 'Erfahrener Unternehmer', color: '#C8973A', bg: '#FFFBEB', border: '#FDE68A', title: 'Du hast das Wissen.', desc: 'Du hast Erfahrung aufgebaut, Fehler gemacht und Erfolge gefeiert. Teile dein Wissen mit der nächsten Generation — und vernetze dich mit Gleichgesinnten.', ctas: ['Antworten geben', 'Community leiten'] },
              { emoji: '💼', tag: 'Investor', color: '#6366F1', bg: '#EEF2FF', border: '#C7D2FE', title: 'Du suchst das Nächste.', desc: 'TEN zeigt dir die besten Projekte bevor sie groß werden. Finde die richtigen Pitches, baue Beziehungen zu Gründern auf — alles an einem Ort.', ctas: ['Pitches entdecken', 'Profil erstellen'] },
            ].map(card => (
              <div key={card.tag} style={{ background: card.bg, border: `2px solid ${card.border}`, borderRadius: '20px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>{card.emoji}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: card.color }}>{card.tag}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-0.01em' }}>{card.title}</h3>
                <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.75 }}>{card.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.75rem', flexWrap: 'wrap' }}>
                  {card.ctas.map(cta => (
                    <Link key={cta} href="/auth" style={{ fontSize: '0.78rem', padding: '0.5rem 1rem', background: card.color, color: '#fff', borderRadius: '6px', fontWeight: 600 }}>
                      {cta} →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE: Q&A ── */}
      <section style={{ padding: '8rem 5rem', background: 'linear-gradient(160deg,#FAFAF8 60%,#FBF5E8 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700, marginBottom: '1rem' }}>Q&A Räume</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.15 }}>
              Echte Antworten.<br />Von echten<br />
              <span style={{ fontStyle: 'italic', color: '#C8973A' }}>Unternehmern.</span>
            </h2>
            <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1rem', marginBottom: '2rem' }}>
              In 6 spezialisierten Themenräumen stellst du deine Fragen — erfahrene Unternehmer antworten direkt. Kein Google, keine KI. Echtes Praxiswissen.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📚', title: 'Gründung & Recht', desc: 'GmbH, UG, Verträge, Steuern' },
                { icon: '📣', title: 'Marketing & Vertrieb', desc: 'Kunden gewinnen, skalieren' },
                { icon: '💰', title: 'Finanzen & Investment', desc: 'Funding, Buchhaltung, Planung' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: '#fff', border: '1px solid #E8E6E0', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0D0D0D' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#888' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Q&A Mockup */}
          <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #E8E6E0', boxShadow: '0 32px 80px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0EDE8', background: '#FAFAF8', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Alle', 'Gründung', 'Marketing', 'Steuern', 'HR', 'Tech', 'Recht'].map((t, i) => (
                <div key={t} style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 600, background: i === 1 ? '#C8973A' : '#fff', color: i === 1 ? '#fff' : '#888', border: `1px solid ${i === 1 ? '#C8973A' : '#E8E6E0'}` }}>{t}</div>
              ))}
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { q: 'Wie finde ich meinen ersten B2B-Kunden?', tag: 'Marketing', answers: 8, badge: true },
                { q: 'Was kostet eine GmbH-Gründung wirklich?', tag: 'Gründung', answers: 14, badge: false },
                { q: 'Wie verhandle ich mein erstes Investment?', tag: 'Investment', answers: 6, badge: false },
                { q: 'Welche Steuer-Software für Startups?', tag: 'Steuern', answers: 11, badge: false },
              ].map((item, i) => (
                <div key={i} style={{ padding: '14px', background: '#FAFAF8', border: '1px solid #F0EDE8', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#0D0D0D', fontWeight: 500, lineHeight: 1.4 }}>{item.q}</span>
                    {item.badge && <span style={{ fontSize: '0.6rem', background: '#FEF3C7', color: '#D97706', padding: '3px 8px', borderRadius: '10px', flexShrink: 0, fontWeight: 700 }}>NEU</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.65rem', background: '#F0EDE8', color: '#888', padding: '2px 8px', borderRadius: '10px' }}>{item.tag}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ display: 'flex' }}>
                        {[...Array(3)].map((_,j) => <div key={j} style={{ width: '18px', height: '18px', borderRadius: '50%', background: ['#C8973A','#6366F1','#22C55E'][j], border: '2px solid #fff', marginLeft: j > 0 ? '-6px' : '0' }} />)}
                      </div>
                      <span style={{ fontSize: '0.65rem', color: '#999' }}>{item.answers} Antworten</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE: INVESTOR ── */}
      <section style={{ padding: '8rem 5rem', background: '#0D0D0D' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          {/* Investor Mockup */}
          <div style={{ background: '#161820', border: '1px solid #262836', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #262836', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', color: '#C8973A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Aktuelle Pitches</span>
              <span style={{ fontSize: '0.65rem', color: '#555', border: '1px solid #262836', padding: '3px 10px', borderRadius: '10px' }}>Filtern</span>
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { name: 'NutriFlow AI', sector: 'FoodTech', stage: 'MVP', amount: '€150k', color: '#22C55E', progress: 65 },
                { name: 'LegalMind Pro', sector: 'LegalTech', stage: 'Idee', amount: '€80k', color: '#6366F1', progress: 30 },
                { name: 'GreenGrid', sector: 'CleanTech', stage: 'Wachstum', amount: '€500k', color: '#C8973A', progress: 80 },
                { name: 'FinStack', sector: 'FinTech', stage: 'Pre-Seed', amount: '€200k', color: '#F59E0B', progress: 45 },
              ].map((p, i) => (
                <div key={i} style={{ padding: '14px', background: '#0E0F14', border: '1px solid #1C1E28', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F0F0F5' }}>{p.name}</div>
                      <div style={{ fontSize: '0.65rem', color: '#555', marginTop: '2px' }}>{p.sector}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#C8973A' }}>{p.amount}</div>
                      <div style={{ fontSize: '0.6rem', color: '#555', marginTop: '2px' }}>{p.stage}</div>
                    </div>
                  </div>
                  <div style={{ height: '4px', background: '#1C1E28', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${p.progress}%`, background: p.color, borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '14px 16px', borderTop: '1px solid #262836', display: 'flex', gap: '8px' }}>
              {['VC', 'Angel', 'Family Office', 'Corporate'].map((t, i) => (
                <div key={t} style={{ flex: 1, padding: '8px', background: '#0E0F14', border: '1px solid #262836', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: '#C8973A', fontWeight: 700 }}>{[4,12,3,2][i]}</div>
                  <div style={{ fontSize: '0.6rem', color: '#555', marginTop: '2px' }}>{t}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700, marginBottom: '1rem' }}>Investor-Bereich</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 700, color: '#F0F0F5', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.15 }}>
              Finde deinen<br />Investor — oder dein<br />
              <span style={{ fontStyle: 'italic', color: '#C8973A' }}>nächstes Investment.</span>
            </h2>
            <p style={{ color: '#888', lineHeight: 1.8, fontSize: '1rem', marginBottom: '2rem' }}>
              Gründer präsentieren ihre Projekte — Investoren finden in Sekunden die relevanten Pitches. Direkte Kontaktaufnahme, strukturierte Profile, echter Deal-Flow.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📋', title: 'Pitch einreichen', desc: 'Strukturiert mit Phase, Bedarf & Vision' },
                { icon: '🔍', title: 'Investor-Profile', desc: 'Gefiltert nach Sektor und Ticket-Größe' },
                { icon: '💬', title: 'Direkte Kontaktaufnahme', desc: 'Private Nachrichten, kein Mittelsmann' },
              ].map(item => (
                <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: '#161820', border: '1px solid #262836', borderRadius: '10px' }}>
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F0F0F5', marginBottom: '3px' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: '#666' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/auth" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginTop: '2rem', padding: '0.9rem 2rem', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', boxShadow: '0 4px 20px rgba(200,151,58,0.4)' }}>
              Jetzt Profil erstellen →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURE: CHAT ── */}
      <section style={{ padding: '8rem 5rem', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700, marginBottom: '1rem' }}>Privater Chat</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.15 }}>
              Deals entstehen<br />im
              <span style={{ fontStyle: 'italic', color: '#C8973A' }}> direkten Gespräch.</span>
            </h2>
            <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1rem', marginBottom: '2rem' }}>
              Private 1:1 Nachrichten direkt auf der Plattform. Kein WhatsApp, keine E-Mail. Alle Business-Gespräche an einem Ort — sicher, schnell, professionell.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[['🔒', 'Privat & sicher'], ['⚡', 'Echtzeit'], ['📎', 'Dateien teilen']].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#444', fontWeight: 600 }}>
                  <span>{icon}</span>{text}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Mockup */}
          <div style={{ background: '#FAFAF8', border: '1px solid #E8E6E0', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.08)' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #E8E6E0', background: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#6366F1,#818CF8)' }} />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0D0D0D' }}>Thomas H.</div>
                <div style={{ fontSize: '0.62rem', color: '#22C55E' }}>● Online</div>
              </div>
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '260px' }}>
              {[
                { from: 'them', text: 'Hallo! Ich habe deinen Pitch gesehen — sehr interessant. Können wir uns nächste Woche kurz austauschen?', time: '14:02' },
                { from: 'me', text: 'Natürlich, sehr gerne! Dienstag oder Mittwoch wäre perfekt.', time: '14:05' },
                { from: 'them', text: 'Dienstag 15 Uhr passt mir. Ich schicke dir eine Kalendereinladung.', time: '14:07' },
                { from: 'me', text: 'Super, freue mich! 🤝', time: '14:08' },
              ].map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '75%', padding: '10px 14px', borderRadius: msg.from === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: msg.from === 'me' ? 'linear-gradient(135deg,#C8973A,#E2AD50)' : '#fff', color: msg.from === 'me' ? '#fff' : '#0D0D0D', fontSize: '0.78rem', lineHeight: 1.5, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: msg.from === 'me' ? 'none' : '1px solid #E8E6E0' }}>
                    {msg.text}
                    <div style={{ fontSize: '0.6rem', color: msg.from === 'me' ? 'rgba(255,255,255,0.7)' : '#bbb', marginTop: '4px', textAlign: 'right' }}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #E8E6E0', display: 'flex', gap: '8px', alignItems: 'center', background: '#fff' }}>
              <div style={{ flex: 1, background: '#FAFAF8', border: '1px solid #E8E6E0', borderRadius: '20px', padding: '8px 14px', fontSize: '0.75rem', color: '#bbb' }}>Nachricht schreiben...</div>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.9rem' }}>↑</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '8rem 5rem', background: 'linear-gradient(160deg,#FAFAF8,#FBF5E8)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700, marginBottom: '1rem' }}>Mitglieder</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.25rem)', fontWeight: 700, color: '#0D0D0D', letterSpacing: '-0.02em' }}>
              Echte Stimmen.<br />Echte Ergebnisse.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
            {[
              { quote: 'Durch TEN habe ich meinen Co-Founder gefunden. Die Q&A-Räume haben mir geholfen, Fehler zu vermeiden die mich Monate gekostet hätten.', name: 'Maximilian R.', role: 'SaaS-Gründer', color: '#C8973A', bg: '#FFFBEB', initials: 'MR' },
              { quote: 'Als Investor finde ich auf TEN genau die Projekte die zu meinem Portfolio passen. Die Pitch-Qualität ist außergewöhnlich hoch.', name: 'Thomas H.', role: 'Angel Investor', color: '#6366F1', bg: '#EEF2FF', initials: 'TH' },
              { quote: 'Ich hatte keine Ahnung wie ich mein Startup finanzieren soll. In der Community habe ich innerhalb von 24h konkrete Antworten bekommen.', name: 'Sarah K.', role: 'Gründerin', color: '#22C55E', bg: '#F0FDF4', initials: 'SK' },
            ].map(t => (
              <div key={t.name} style={{ background: t.bg, border: `2px solid ${t.color}25`, borderRadius: '20px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_,i) => <span key={i} style={{ color: '#F59E0B', fontSize: '1rem' }}>★</span>)}
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontStyle: 'italic', color: '#222', lineHeight: 1.7 }}>"{t.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginTop: 'auto', paddingTop: '1.25rem', borderTop: `1px solid ${t.color}20` }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: `linear-gradient(135deg,${t.color},${t.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0D0D0D' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '10rem 5rem', background: 'linear-gradient(135deg,#0D0D0D 0%,#1A1208 50%,#0D0D0D 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(ellipse, rgba(200,151,58,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(200,151,58,0.15)', border: '1px solid rgba(200,151,58,0.3)', borderRadius: '20px', padding: '0.4rem 1.25rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8973A', fontWeight: 700 }}>Kostenlos starten</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5.5vw,4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#F0F0F5' }}>
            Bereit für das<br />
            <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>nächste Level?</span>
          </h2>
          <p style={{ color: '#888', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '3rem' }}>
            Tritt der Community bei, die Gründer und Investoren verbindet.
          </p>
          <Link href="/auth" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1.2rem 3.5rem', background: 'linear-gradient(135deg,#C8973A,#E2AD50)', color: '#fff', borderRadius: '10px', fontWeight: 700, fontSize: '0.92rem', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '0 8px 50px rgba(200,151,58,0.5)' }}>
            Kostenlos Mitglied werden →
          </Link>
          <div style={{ marginTop: '2rem', fontSize: '0.78rem', color: '#555' }}>Keine Kreditkarte · Keine Verpflichtung · Sofort loslegen</div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #1C1E28', padding: '2.5rem 5rem', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.1em', color: '#555' }}>TEN<span style={{ color: '#C8973A' }}>·</span></span>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Feed', 'Q&A', 'Investoren', 'Datenschutz', 'Impressum'].map(l => (
            <span key={l} style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#444' }}>{l}</span>
          ))}
        </div>
        <span style={{ fontSize: '0.72rem', color: '#444' }}>© 2026 The Entrepreneur Network</span>
      </footer>
    </div>
  )
}
