import { Link } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'

const registerStyles = `
  :root {
    color-scheme: light;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #201a22;
    background: #fdf3f2;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    min-height: 100%;
  }

  body {
    background: #f9eef0;
  }

  #root {
    min-height: 100vh;
  }

  .dashboard {
    position: relative;
    overflow: hidden;
  }

  .page-frame {
    position: relative;
    max-width: 1180px;
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 30px;
    padding: 1.25rem 1.75rem;
    box-shadow: 0 24px 80px rgba(70, 17, 36, 0.13);
    position: relative;
    z-index: 1;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .brand-mark,
  .brand-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 58px;
    border-radius: 18px;
    background: #ffffff;
    box-shadow: 0 8px 24px rgba(70, 17, 36, 0.12);
    position: relative;
    overflow: hidden;
  }

  .brand-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .brand-copy {
    display: grid;
    gap: 0.15rem;
  }

  .brand-copy strong {
    font-size: 1rem;
    letter-spacing: -0.02em;
  }

  .brand-copy span {
    font-size: 0.85rem;
    color: #6f5f6a;
  }

  .nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }

  .nav-links a {
    color: #4a3f4f;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .nav-links a:hover {
    color: #d30f1a;
  }

  .register-page {
    background: #0b1a47;
    min-height: 100vh;
    color: #1b2649;
  }

  .register-page::before,
  .register-page::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 16rem;
    background: transparent;
    pointer-events: none;
  }

  .register-page::before {
    left: 0;
  }

  .register-page::after {
    right: 0;
  }

  .register-frame {
    max-width: 1180px;
    margin: 0 auto;
    padding: 1.25rem 1rem 3rem;
    position: relative;
  }

  .register-topbar {
    background: rgba(255, 255, 255, 0.98);
    border-radius: 32px;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.12);
  }

  .register-brand {
    gap: 0.85rem;
  }

  .register-nav a {
    color: #1f2042;
  }

  .register-main {
    margin-top: 2rem;
    display: grid;
    justify-items: center;
    gap: 2rem;
  }

  .register-copy {
    text-align: center;
    max-width: 760px;
    margin: 0 auto;
  }

  .register-copy h1 {
    margin: 0;
    font-size: clamp(2.4rem, 4vw, 3.8rem);
    line-height: 1.02;
    color: #ffffff;
  }

  .register-copy h1 span {
    color: #e41a2d;
  }

  .register-copy p {
    margin: 1rem auto 0;
    max-width: 680px;
    color: rgba(255, 255, 255, 0.92);
    font-size: 1rem;
    letter-spacing: 0.03em;
  }

  .register-card {
    width: min(640px, 100%);
    background: rgba(255, 255, 255, 0.96);
    border-radius: 32px;
    padding: 2rem;
    box-shadow: 0 35px 90px rgba(12, 22, 55, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.48);
  }

  .register-form {
    display: grid;
    gap: 1.4rem;
  }

  .register-field span {
    display: block;
    font-weight: 700;
    font-size: 0.95rem;
    margin-bottom: 0.7rem;
    color: #172136;
  }

  .input-pill {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border-radius: 30px;
    border: 1px solid #d30f1a;
    background: #fff;
  }

  .input-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    border-radius: 18px;
    background: #f7e3e4;
    color: #d30f1a;
    font-size: 1rem;
  }

  .input-pill input,
  .input-pill textarea {
    width: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #2a2430;
    background: transparent;
  }

  .input-pill textarea {
    resize: none;
  }

  .register-submit {
    width: 100%;
    border: none;
    border-radius: 999px;
    padding: 1rem 1.5rem;
    background: #d30f1a;
    color: #fff;
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .register-submit:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 35px rgba(211, 15, 26, 0.24);
  }

  .register-footer {
    margin-top: 1.5rem;
    text-align: center;
    color: #5f4f5f;
    font-size: 0.95rem;
  }

  .register-footer a {
    color: #d30f1a;
    text-decoration: none;
    font-weight: 700;
  }

  @media (max-width: 1024px) {
    .register-page::before,
    .register-page::after {
      display: none;
    }

    .register-main {
      gap: 1.5rem;
    }
  }

  @media (max-width: 680px) {
    .topbar {
      padding: 1rem 0.8rem;
    }

    .register-topbar {
      padding: 1rem 1rem;
    }

    .register-nav {
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.65rem;
    }

    .register-copy h1 {
      font-size: 2.4rem;
    }

    .register-card {
      padding: 1.5rem;
    }
  }
`

function Register() {
  return (
    <>
      <style>{registerStyles}</style>
      <div className="dashboard register-page">
      <div className="page-frame register-frame">
        <header className="topbar register-topbar">
          <div className="brand register-brand">
            <div className="brand-logo" aria-hidden="true">
              <BrandLogo className="brand-image" />
            </div>
            <div className="brand-copy">
              <strong>Kelurahan Penganjuran</strong>
              <span>Polling Merdeka 79</span>
            </div>
          </div>

          <nav className="nav-links register-nav" aria-label="Main navigation">
            <Link to="/">BERANDA</Link>
            <Link to="/admin">KELOLA KANDIDAT</Link>
            <Link to="/admin">KELOLA KATEGORI</Link>
            <Link to="/admin/results">STATISTIK</Link>
            <Link to="/admin">PENGGUNA</Link>
            <Link to="/admin">PENGATURAN</Link>
          </nav>
        </header>

        <main className="register-main">
          <div className="register-copy">
            <h1>BUAT AKUN ANDA UNTUK MULAI <span>VOTING</span></h1>
            <p>BERSAMA MEMBANGUN LINGKUNGAN MAJU DAN SEJAHTERA</p>
          </div>

          <section className="register-card">
            <form className="register-form">
              <label className="register-field">
                <span>Nama Lengkap</span>
                <div className="input-pill">
                  <span className="input-icon">👤</span>
                  <input type="text" placeholder="BUDI SANTOSO" />
                </div>
              </label>

              <label className="register-field">
                <span>Alamat Lengkap</span>
                <div className="input-pill input-large">
                  <span className="input-icon">📍</span>
                  <textarea rows="3" placeholder="Jl. Welaran, No. 15, RT 01/RW 01, Kelurahan Penganjuran" />
                </div>
              </label>

              <button type="submit" className="register-submit">
                DAFTAR SEKARANG
              </button>
            </form>

            <div className="register-footer">
              Sudah punya akun? <Link to="/">Masuk di sini</Link>
            </div>
          </section>
        </main>
      </div>
      </div>
    </>
  )
}

export default Register
