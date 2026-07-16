import { Link } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import heroBackground from '../assets/background.PNG'

const homeStyles = `
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

  .dashboard::before,
  .dashboard::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 22rem;
    pointer-events: none;
  }

  .dashboard::before {
    left: -5rem;
    background: transparent;
  }

  .dashboard::after {
    right: -5rem;
    background: transparent;
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

  .secondary-button,
  .action-button.secondary {
    border: 2px solid #d30f1a;
    background: #fff;
    color: #d30f1a;
  }

  .secondary-button:hover,
  .action-button.secondary:hover {
    background: #fbeaea;
  }

  .topbar-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .hero-banner {
    position: relative;
    overflow: hidden;
    margin-top: 1.75rem;
    border-radius: 36px;
    min-height: 420px;
    background-size: cover;
    background-position: center;
    display: grid;
    place-items: center;
    padding: 3rem 2.5rem;
    box-shadow: 0 24px 80px rgba(70, 17, 36, 0.18);
  }

  .hero-banner::before {
    content: '';
    position: absolute;
    inset: 0;
    background: transparent;
  }

  .hero-glow {
    position: absolute;
    right: -18%;
    top: 20%;
    width: 26rem;
    height: 26rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    filter: blur(30px);
  }

  .hero-copy {
    position: relative;
    max-width: 760px;
    text-align: center;
    z-index: 1;
  }

  .hero-eyebrow {
    margin: 0 auto 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.75rem 1.4rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
    font-size: 0.92rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .hero-copy h1 {
    margin: 0;
    font-size: clamp(2.8rem, 4vw, 4.2rem);
    line-height: 1.02;
    color: #fff;
  }

  .hero-text {
    margin: 1.5rem auto 0;
    max-width: 650px;
    color: rgba(255, 255, 255, 0.88);
    font-size: 1.05rem;
  }

  .hero-button {
    display: inline-flex;
    margin-top: 2rem;
    text-decoration: none;
    background: #fff;
    color: #d30f1a;
    font-weight: 800;
    padding: 1rem 2.1rem;
    border-radius: 999px;
    letter-spacing: 0.07em;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .hero-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 24px 38px rgba(0, 0, 0, 0.16);
  }

  .popular-section {
    margin-top: 3rem;
    text-align: center;
  }

  .popular-section h2 {
    margin: 0;
    font-size: 1.2rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #2e1721;
  }

  .category-grid {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .category-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.25rem;
    border-radius: 30px;
    padding: 2rem 1.6rem 1.8rem;
    background: #ffffff;
    box-shadow: 0 24px 50px rgba(76, 20, 32, 0.08);
  }

  .category-icon {
    display: grid;
    place-items: center;
    padding: 1.2rem;
    background: #fdf2f2;
    border-radius: 28px;
  }

  .category-icon svg {
    width: 100%;
    max-width: 220px;
    height: auto;
  }

  .category-content h3 {
    margin: 0;
    font-size: 1rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #25171f;
  }

  .category-content p {
    margin: 1rem 0 0;
    color: #6f5f6d;
    font-size: 0.97rem;
    line-height: 1.8;
  }

  .category-action {
    border: none;
    background: #d30f1a;
    color: #fff;
    border-radius: 999px;
    padding: 0.95rem 1.4rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: background 0.25s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .category-action:hover {
    background: #b20c16;
  }

  .stats-section {
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .stat-card {
    background: #ffffff;
    border-radius: 24px;
    padding: 1.5rem 1.4rem;
    text-align: center;
    box-shadow: 0 22px 40px rgba(88, 23, 41, 0.09);
  }

  .stat-card span {
    display: block;
    font-size: 0.88rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #7f6e79;
  }

  .stat-card strong {
    display: block;
    margin-top: 0.9rem;
    font-size: 2.25rem;
    line-height: 1;
    color: #241721;
  }

  .site-footer {
    margin-top: 3rem;
    padding: 1.8rem 1.8rem 1.5rem;
    background: #d30f1a;
    border-radius: 32px;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    color: #fff;
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1.1rem;
    align-items: center;
  }

  .footer-links a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
  }

  .footer-links a:hover {
    text-decoration: underline;
  }

  .social-icons {
    display: flex;
    gap: 0.9rem;
  }

  .social-icons a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    text-decoration: none;
  }

  .social-symbol {
    font-size: 0.95rem;
    font-weight: 700;
  }

  .footer-copy {
    flex: 1 1 100%;
    text-align: center;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.88);
  }

  @media (max-width: 1024px) {
    .page-frame {
      padding: 1.5rem 1rem 2.5rem;
    }

    .topbar {
      flex-direction: column;
      align-items: stretch;
      padding: 1rem 1rem;
    }

    .nav-links {
      justify-content: center;
      gap: 1rem;
    }

    .hero-banner {
      padding: 2.5rem 1.5rem;
      min-height: 360px;
    }

    .category-grid,
    .stats-section {
      grid-template-columns: 1fr;
    }

    .site-footer {
      justify-content: center;
      text-align: center;
    }

    .footer-copy {
      margin-top: 0.5rem;
    }
  }

  @media (max-width: 680px) {
    .topbar {
      padding: 1rem 0.8rem;
    }

    .hero-copy h1 {
      font-size: 2.4rem;
    }

    .hero-text {
      font-size: 1rem;
    }

    .category-card {
      padding: 1.6rem 1.2rem 1.4rem;
    }

    .hero-button,
    .action-button {
      width: 100%;
      justify-content: center;
    }

    .site-footer {
      padding: 1.4rem 1rem 1rem;
    }
  }
`

function CategoryIcon({ type }) {
  if (type === 'rt') {
    return (
      <svg viewBox="0 0 120 120" role="img" aria-label="RT icon">
        <rect x="12" y="36" width="96" height="58" rx="12" fill="#ffffff" stroke="#d30f1a" strokeWidth="5" />
        <path d="M22 36 L22 18 L98 18 L98 36" fill="#ffffff" stroke="#d30f1a" strokeWidth="5" />
        <rect x="42" y="48" width="36" height="26" rx="6" fill="#d30f1a" />
        <text x="60" y="64" textAnchor="middle" fontSize="18" fill="#ffffff" fontWeight="700">RT</text>
        <path d="M27 18 L27 6 L37 12 Z" fill="#d30f1a" />
        <path d="M93 18 L93 6 L83 12 Z" fill="#d30f1a" />
      </svg>
    )
  }

  if (type === 'rw') {
    return (
      <svg viewBox="0 0 120 120" role="img" aria-label="RW icon">
        <path d="M18 62 L60 24 L102 62 V92 H18 Z" fill="#ffffff" stroke="#d30f1a" strokeWidth="5" />
        <rect x="36" y="68" width="20" height="22" rx="5" fill="#f6f6f6" stroke="#d30f1a" strokeWidth="4" />
        <rect x="64" y="68" width="20" height="22" rx="5" fill="#f6f6f6" stroke="#d30f1a" strokeWidth="4" />
        <rect x="42" y="44" width="36" height="16" rx="6" fill="#d30f1a" />
        <text x="60" y="56" textAnchor="middle" fontSize="14" fill="#ffffff" fontWeight="700">RW</text>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="Posyandu icon">
      <circle cx="60" cy="42" r="20" fill="#d30f1a" />
      <path d="M40 70 Q60 90 80 70" fill="#f4e0d9" stroke="#d30f1a" strokeWidth="5" />
      <rect x="28" y="76" width="26" height="18" rx="6" fill="#ffffff" stroke="#d30f1a" strokeWidth="4" />
      <rect x="66" y="76" width="26" height="18" rx="6" fill="#ffffff" stroke="#d30f1a" strokeWidth="4" />
      <path d="M58 28 L72 28 L74 18 L46 18 L48 28 Z" fill="#ffffff" stroke="#d30f1a" strokeWidth="4" />
    </svg>
  )
}

const categories = [
  {
    id: 'rt',
    title: '5. KATEGORI RT TERFAVORIT',
    description: 'Pilih RT paling kompak dan partisipatif.',
  },
  {
    id: 'rw',
    title: '6. KATEGORI RW TERFAVORIT',
    description: 'Vote RW dengan pengelolaan terbaik dan program inovatif.',
  },
  {
    id: 'posyandu',
    title: '7. KATEGORI KADER POSYANDU TERFAVORIT',
    description: 'Pilih kader Posyandu paling berdedikasi dan inspiratif.',
  },
]

function Home() {
  return (
    <>
      <style>{homeStyles}</style>
      <div className="dashboard">
      <div className="page-frame">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">
              <BrandLogo className="brand-image" />
            </div>
            <div className="brand-copy">
              <strong>Polling Merdeka</strong>
              <span>Dirgahayu RI ke-79</span>
            </div>
          </div>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#home">BERANDA</a>
            <a href="#categories">KATEGORI POLLING</a>
            <a href="#cara">CARA MEMILIH</a>
          </nav>
 
          <div className="topbar-actions">
            <Link to="/admin" className="action-button admin-button">
              ADMIN
            </Link>
            <Link to="/daftar" className="action-button secondary">
              DAFTAR
            </Link>
          </div>
        </header>

        <section className="hero-banner" id="home" style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="hero-glow" />
          <div className="hero-copy">
            <p className="hero-eyebrow">AYO SUARAKAN PILIHANMU DI AGUSTUSAN INI!</p>
            <h1>Ikuti Polling Seru Kemerdekaan Indonesia ke-79!</h1>
            <p className="hero-text">
              Bergabung dalam perayaan kemerdekaan dengan memilih kategori favoritmu dan tunjukkan kebanggaan nasional.
            </p>
            <Link to="/vote" className="hero-button">
              MULAI VOTE SEKARANG
            </Link>
          </div>
        </section>

        <section className="popular-section" id="categories">
          <h2>KATEGORI POLLING POPULER</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <article className="category-card" key={category.id}>
                <div className="category-icon">
                  <CategoryIcon type={category.id} />
                </div>
                <div className="category-content">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
                <Link to="/vote" className="category-action">VOTE</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <span>Votes Cast:</span>
            <strong>145,230</strong>
          </div>
          <div className="stat-card">
            <span>Polls Active:</span>
            <strong>45</strong>
          </div>
          <div className="stat-card">
            <span>Participants:</span>
            <strong>12,890</strong>
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-links">
            <a href="#tentang">Tentang</a>
            <a href="#faq">FAQ</a>
            <a href="#kontak">Kontak</a>
            <a href="#syarat">Syarat</a>
          </div>
          <div className="social-icons" aria-label="Social media links">
            <a href="#facebook" aria-label="Facebook">
              <span className="social-symbol">F</span>
            </a>
            <a href="#twitter" aria-label="Twitter">
              <span className="social-symbol">T</span>
            </a>
            <a href="#instagram" aria-label="Instagram">
              <span className="social-symbol">I</span>
            </a>
            <a href="#youtube" aria-label="YouTube">
              <span className="social-symbol">Y</span>
            </a>
          </div>
          <div className="footer-copy">© 2024 Polling Merdeka, Dirgahayu RI ke-79!</div>
        </footer>
      </div>
      </div>
    </>
  )
}

export default Home
