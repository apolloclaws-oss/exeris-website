export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a1628',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ width: '380px', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>Exeris</h1>
          <p style={{ color: '#9ca3af', marginTop: '8px', fontSize: '14px' }}>Intern Dashboard</p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '16px',
          padding: '32px'
        }}>
          <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>
            Inloggen
          </h2>

          <form action="/api/auth/login" method="POST">
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
                E-mailadres
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="naam@exeris.nl"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: '#d1d5db', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
                Wachtwoord
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '8px',
                background: '#059669',
                color: '#fff',
                fontWeight: 600,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Inloggen
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
