import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import { api, setAdminToken } from '../lib/api'

const loginStyles = `
  :root {
    color-scheme: light;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 16px;
    background: #ffffff;
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; min-height: 100vh; }
  body { background: #ffffff; }
  #root { min-height: 100vh; display: flex; flex-direction: column; }
  .dashboard { position: relative; overflow-x: clip; display: flex; flex-direction: column; flex: 1; }

  .page-frame {
    position: relative;
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    padding: 1.5rem 4vw 3rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 999px;
    padding: 1rem 2rem;
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.08);
    position: relative;
    z-index: 50;
  }

  .brand { display: flex; align-items: center; gap: 1rem; }
  .brand-logo { 
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px; 
    height: 50px; 
    border-radius: 14px;
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }
  .brand-mark img, .brand-mark svg, .brand-logo img, .brand-logo svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .brand-copy { display: flex; flex-direction: column; gap: 0.15rem; white-space: nowrap; }
  .brand-copy strong { display: block; font-size: 1.2rem; font-weight: 800; color: #111827; line-height: 1.2; }
  .brand-copy span { display: block; font-size: 0.9rem; color: #6b7280; line-height: 1.2; }

  /* WADAH KONTROL KANAN */
  .topbar-controls { 
    display: flex; 
    align-items: center; 
    gap: 1.5rem; 
  }

  .beranda-link {
    color: #374151; 
    text-decoration: none; 
    font-weight: 700; 
    font-size: 0.95rem;
    transition: color 0.2s ease;
  }

  .beranda-link:hover { 
    color: #10b981; 
  }

  .action-button {
    border: none; cursor: pointer; border-radius: 999px;
    background: #10b981; color: #fff; font-weight: 700;
    font-size: 0.9rem; padding: 0.8rem 1.8rem;
    text-decoration: none; display: inline-flex;
    transition: all 0.3s ease;
  }

  .action-button:hover { background: #059669; }

  /* LOGIN CARD STYLES */
  .login-main { margin-top: 5rem; display: grid; justify-items: center; }
  
  .login-card {
    width: min(500px, 90%);
    background: #ffffff;
    border: 1px solid #f3f4f6;
    border-radius: 32px;
    padding: 2.5rem;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
    text-align: center;
  }

  .login-card h1 { color: #111827; font-size: 2rem; margin-bottom: 0.5rem; }
  .slogan-gold { color: #b8860b; font-weight: 700; display: block; margin-bottom: 1.5rem; }

  .login-form { display: grid; gap: 1.2rem; text-align: left; }
  .field-label { font-weight: 700; display: block; margin-bottom: 0.5rem; color: #111827; }

  .input-pill {
    display: flex; align-items: center; gap: 1rem; padding: 1rem;
    border-radius: 20px; border: 1px solid #e5e7eb; background: #f9fafb;
  }
  .input-pill input { width: 100%; border: none; background: none; outline: none; font-size: 1rem; }

  .login-submit {
    width: 100%; border: none; border-radius: 999px; padding: 1rem;
    background: #10b981; color: #fff; font-weight: 800; cursor: pointer;
    margin-top: 1rem;
  }
  .login-submit:hover { background: #059669; }

  .login-message {
    padding: 0.9rem 1rem;
    border-radius: 16px;
    background: #fee2e2;
    color: #b91c1c;
    font-weight: 700;
    text-align: center;
  }

  .social-login { margin-top: 2rem; }
  .social-icons { display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; }
  .social-btn { width: 45px; height: 45px; border-radius: 12px; border: 1px solid #e5e7eb; background: #fff; cursor: pointer; }

  @media (max-width: 768px) {
    .topbar {
      padding: 1rem 1.25rem;
    }
  }

  @media (max-width: 480px) {
    .brand-copy span { display: none; }
    .brand-copy strong { font-size: 1rem; }
    .brand-logo { width: 40px; height: 40px; border-radius: 10px; }
    .topbar-controls { gap: 0.5rem; }
    .beranda-link { display: none; } /* Sembunyikan link BERANDA agar tidak terlalu ramai */
    .action-button { padding: 0.6rem 1rem; font-size: 0.75rem; }
    .login-main { margin-top: 3rem; }
    .login-card { padding: 1.5rem 1rem; width: 95%; }
    .login-card h1 { font-size: 1.5rem; }
    .slogan-gold { font-size: 0.85rem; }
    .input-pill { padding: 0.8rem; }
  }
`

function Login() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    setIsSubmitting(true)
    setMessage('')

    try {
      const data = await api.login({
        email: formData.get('email'),
        password: formData.get('password'),
      })
      setAdminToken(data.token)
      navigate('/admin')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <style>{loginStyles}</style>
      <div className="dashboard">
        <div className="page-frame">
          <header className="topbar">
            <div className="brand">
              <div className="brand-logo">
                <BrandLogo className="brand-image" />
              </div>
              <div className="brand-copy">
                <strong>Polling Merdeka</strong>
                <span>Dirgahayu RI ke-81</span>
              </div>
            </div>

            <div className="topbar-controls">
              {/* Tombol BERANDA dan KEMBALI di pojok kanan */}
              <Link to="/" className="beranda-link">BERANDA</Link>
              <Link to="/" className="action-button">KEMBALI</Link>
            </div>
          </header>

          <main className="login-main">
            <section className="login-card">
              <h1>MASUK SEKARANG</h1>
              <p className="slogan-gold">"BERSAMA MEMBANGUN LINGKUNGAN MAJU DAN SEJAHTERA"</p>

              <form className="login-form" onSubmit={handleLogin}>
                {message ? <p className="login-message">{message}</p> : null}
                <label className="field-label">
                  Username / Email / No. HP
                  <div className="input-pill">
                    <input type="text" name="email" placeholder="paklurah" required />
                  </div>
                </label>

                <label className="field-label">
                  Kata Sandi
                  <div className="input-pill">
                    <input type="password" name="password" placeholder="••••••••" required />
                  </div>
                </label>

                <button type="submit" className="login-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'MEMERIKSA...' : 'MASUK'}
                </button>
              </form>


            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default Login
