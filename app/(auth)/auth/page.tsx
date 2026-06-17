import { AuthForm } from '@/components/auth/AuthForm'

export const dynamic = 'force-dynamic'

export default function AuthPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '1.5rem', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(ellipse, rgba(200,151,58,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 600,
            fontSize: '2.75rem', letterSpacing: '0.1em',
            color: 'var(--text)', textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            TEN<span style={{ color: 'var(--accent)' }}>·</span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            The Entrepreneur Network
          </p>
        </div>

        <AuthForm />
      </div>
    </div>
  )
}
