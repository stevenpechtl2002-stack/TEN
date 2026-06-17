'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Mode = 'login' | 'register'

export function AuthForm() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) {
      setMessage(error.message)
    } else if (mode === 'register') {
      setMessage('Überprüfe deine E-Mail um dein Konto zu bestätigen.')
    }
    setLoading(false)
  }

  async function handleGoogleAuth() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--surface-2)',
    border: '1px solid var(--border-2)',
    borderRadius: '8px',
    padding: '0.7rem 1rem',
    color: 'var(--text)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      padding: '2rem',
      width: '100%',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '1.5rem', letterSpacing: '-0.03em',
        color: 'var(--text)', marginBottom: '0.4rem',
      }}>
        {mode === 'login' ? 'Willkommen zurück' : 'Konto erstellen'}
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
        {mode === 'login' ? 'Melde dich in deinem Konto an' : 'Starte kostenlos auf TEN'}
      </p>

      {/* Google */}
      <button onClick={handleGoogleAuth} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
        padding: '0.7rem 1rem',
        background: 'var(--surface-2)', border: '1px solid var(--border-2)',
        borderRadius: '8px', cursor: 'pointer',
        color: 'var(--text)', fontSize: '0.9rem', fontWeight: 500,
        fontFamily: 'var(--font-body)',
        transition: 'border-color 0.2s',
        marginBottom: '1.25rem',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Mit Google fortfahren
      </button>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--faint)', fontWeight: 500 }}>ODER</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>
            E-Mail
          </label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            required style={inputStyle} placeholder="deine@email.de"
          />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>
            Passwort
          </label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            required style={inputStyle} placeholder="••••••••"
          />
        </div>

        {message && (
          <div style={{
            padding: '0.7rem 1rem', borderRadius: '8px',
            background: message.includes('prüfe') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${message.includes('prüfe') ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
            color: message.includes('prüfe') ? 'var(--success)' : 'var(--error)',
            fontSize: '0.85rem',
          }}>
            {message}
          </div>
        )}

        <button type="submit" disabled={loading} style={{
          width: '100%', padding: '0.75rem',
          background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
          color: '#07080A', border: 'none', borderRadius: '4px',
          fontWeight: 700, fontSize: '0.82rem',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          fontFamily: 'var(--font-body)',
          boxShadow: '0 2px 20px rgba(200,151,58,0.3)',
          transition: 'opacity 0.2s',
        }}>
          {loading ? 'Lädt...' : mode === 'login' ? 'Anmelden' : 'Registrieren'}
        </button>
      </form>

      <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{
        width: '100%', marginTop: '1.25rem', padding: '0.5rem',
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--muted)', fontSize: '0.85rem', fontFamily: 'var(--font-body)',
        transition: 'color 0.2s',
      }}>
        {mode === 'login'
          ? <>Noch kein Konto? <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Registrieren</span></>
          : <>Bereits Mitglied? <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Anmelden</span></>
        }
      </button>
    </div>
  )
}
