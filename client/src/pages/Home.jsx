import { useState } from 'react'
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
    background: #ffffff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    min-height: 100vh;
  }

  body {
    background: #ffffff;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .dashboard {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1; 
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
    gap: 1rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 999px;
    padding: 1rem 2rem;
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.08); 
    position: relative;
    z-index: 50;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-shrink: 1;
  }

  .brand-mark,
  .brand-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 14px;
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;
  }

  .brand-mark img, .brand-mark svg, .brand-logo img, .brand-logo svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Teks Brand Vertikal */
  .brand-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.15rem;
    white-space: nowrap;
  }

  .brand-copy strong {
    display: block;
    font-size: 1.2rem;
    font-weight: 800;
    color: #111827;
    line-height: 1.2;
  }

  .brand-copy span {
    display: block;
    font-size: 0.9rem;
    color: #6b7280;
    line-height: 1.2;
  }

  .nav-links {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    align-items: center;
  }

  .nav-links a {
    color: #374151;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    transition: color 0.2s ease;
  }

  .nav-links a:hover {
    color: #10b981; 
  }

  /* Wadah Kontrol Kanan */
  .topbar-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0; 
  }

  /* Tombol Hamburger */
  .mobile-menu-btn {
    display: none; 
    background: #f0fdf4; 
    border: none; 
    cursor: pointer; 
    padding: 0.8rem; 
    border-radius: 12px; 
    color: #10b981;
    transition: background 0.3s;
  }
  
  .mobile-menu-btn:hover {
    background: #d1fae5;
  }

  /* GAYA DASAR TOMBOL */
  .action-button {
    padding: 0.9rem 1.6rem;
    border-radius: 999px;
    font-weight: 700;
    text-decoration: none;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #10b981; 
    color: #ffffff; 
    border: none;
    cursor: pointer;
  }

  .action-button:hover {
    transform: translateY(-2px); 
    background: #059669; 
    box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
  }

  .hero-banner {
    position: relative;
    overflow: hidden;
    margin-top: 2rem;
    border-radius: 2.5rem;
    min-height: 55vh; 
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem 2vw;
    box-shadow: 0 24px 80px rgba(16, 185, 129, 0.15);
  }

  .hero-banner::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.15); 
  }

  .hero-glow {
    position: absolute;
    right: -10%;
    top: 10%;
    width: 35rem;
    height: 35rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    filter: blur(40px);
    pointer-events: none;
  }

  .hero-copy {
    position: relative;
    max-width: 860px; 
    text-align: center;
    z-index: 1;
  }

  .hero-eyebrow {
    margin: 0 auto 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.6rem 1.4rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    color: #fff;
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .hero-copy h1 {
    margin: 0;
    font-size: clamp(2.8rem, 5vw, 5rem); 
    line-height: 1.1;
    color: #fff;
    text-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .hero-text {
    margin: 1.5rem auto 0;
    max-width: 700px;
    color: rgba(255, 255, 255, 0.95);
    font-size: 1.15rem;
    line-height: 1.6;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .hero-button {
    display: inline-flex;
    margin-top: 2.5rem;
    text-decoration: none;
    background: #fff;
    color: #10b981; 
    font-weight: 800;
    padding: 1.2rem 2.8rem;
    border-radius: 999px;
    font-size: 1.05rem;
    letter-spacing: 0.08em;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hero-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  .popular-section {
    margin-top: 5rem;
    text-align: center;
  }

  .popular-section h2 {
    margin: 0;
    font-size: 1.4rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #111827;
  }

  .category-grid {
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }

  .category-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;
    border-radius: 30px;
    padding: 2.5rem 2rem 2rem;
    background: #ffffff; 
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04); 
    border: 1px solid #f3f4f6; 
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(16, 185, 129, 0.08);
  }

  .category-icon {
    display: grid;
    place-items: center;
    padding: 1.5rem;
    background: #f0fdf4; 
    border-radius: 28px;
  }

  .category-icon svg {
    width: 100%;
    max-width: 180px;
    height: auto;
  }

  .category-content h3 {
    margin: 0;
    font-size: 1.15rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #111827;
  }

  .category-content p {
    margin: 1rem 0 0;
    color: #6b7280;
    font-size: 1rem;
    line-height: 1.7;
  }

  .category-action {
    border: none;
    background: #10b981; 
    color: #fff;
    border-radius: 999px;
    padding: 1rem 1.5rem;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: background 0.25s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .category-action:hover {
    background: #059669;
  }

  .stats-section {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
    gap: 1.5rem;
  }

  .stat-card {
    background: #ffffff; 
    border-radius: 24px;
    padding: 2rem 1.5rem;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04); 
    border: 1px solid #f3f4f6; 
  }

  .stat-card span {
    display: block;
    font-size: 0.95rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #6b7280;
  }

  .stat-card strong {
    display: block;
    margin-top: 1rem;
    font-size: 3rem;
    font-weight: 800;
    line-height: 1;
    color: #111827;
  }

  .site-footer {
    margin-top: auto; 
    padding: 2rem 3vw;
    background: #059669; 
    border-radius: 32px;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
    justify-content: space-between;
    color: #fff;
  }

  .footer-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }

  .footer-links a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .footer-links a:hover {
    text-decoration: underline;
  }

  .social-icons {
    display: flex;
    gap: 1rem;
  }

  .social-icons a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    text-decoration: none;
    transition: background 0.3s ease;
  }
  
  .social-icons a:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .social-symbol {
    font-size: 1.1rem;
    font-weight: 700;
  }

  .footer-copy {
    flex: 1 1 100%;
    text-align: center;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1.5rem;
  }

  @media (max-width: 1024px) {
    .page-frame {
      padding: 1.5rem 1rem 2.5rem;
    }
    .hero-banner {
      min-height: 40vh;
      border-radius: 2rem;
    }
  }

  @media (max-width: 768px) {
    .topbar {
      border-radius: 24px;
      padding: 1rem 1.25rem;
    }

    .mobile-menu-btn {
      display: block; 
    }

    .topbar-controls {
      gap: 0.5rem;
    }

    .action-button {
      padding: 0.5rem 0.8rem;
      font-size: 0.75rem;
    }

    /* DROPDOWN MELAYANG DI POJOK KANAN ATAS */
    .nav-links {
      display: none; 
      position: absolute;
      top: calc(100% + 0.5rem); 
      right: 1.25rem; 
      width: 240px;
      background: #ffffff;
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
      padding: 1.5rem;
      border-radius: 1.25rem;
      box-shadow: 0 10px 40px rgba(16, 185, 129, 0.15); 
      border: 1px solid #f3f4f6;
      z-index: 100;
    }

    .nav-links.open {
      display: flex; 
    }

    .nav-links a {
      text-align: right; 
      display: block;
      width: 100%;
      padding: 0.5rem !important;
      border-radius: 8px !important;
    }

    .hero-banner {
      padding: 3rem 1.5rem;
    }

    .hero-copy h1 {
      font-size: 2.2rem;
    }

    .hero-text {
      font-size: 1rem;
    }

    .site-footer {
      flex-direction: column;
      text-align: center;
      border-radius: 24px;
    }
    
    .footer-links {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .brand-copy span {
      display: none; 
    }
    .brand-logo {
      width: 44px;
      height: 44px;
      border-radius: 10px;
    }
    .nav-links {
      right: 1rem;
    }
  }
`

function CategoryIcon({ type }) {
  if (type === 'rt') {
    return (
      <svg viewBox="0 0 120 120" role="img" aria-label="RT icon">
        <rect x="12" y="36" width="96" height="58" rx="12" fill="#ffffff" stroke="#10b981" strokeWidth="5" />
        <path d="M22 36 L22 18 L98 18 L98 36" fill="#ffffff" stroke="#10b981" strokeWidth="5" />
        <rect x="42" y="48" width="36" height="26" rx="6" fill="#10b981" />
        <text x="60" y="64" textAnchor="middle" fontSize="18" fill="#ffffff" fontWeight="700">RT</text>
        <path d="M27 18 L27 6 L37 12 Z" fill="#10b981" />
        <path d="M93 18 L93 6 L83 12 Z" fill="#10b981" />
      </svg>
    )
  }

  if (type === 'rw') {
    return (
      <svg viewBox="0 0 120 120" role="img" aria-label="RW icon">
        <path d="M18 62 L60 24 L102 62 V92 H18 Z" fill="#ffffff" stroke="#10b981" strokeWidth="5" />
        <rect x="36" y="68" width="20" height="22" rx="5" fill="#f6f6f6" stroke="#10b981" strokeWidth="4" />
        <rect x="64" y="68" width="20" height="22" rx="5" fill="#f6f6f6" stroke="#10b981" strokeWidth="4" />
        <rect x="42" y="44" width="36" height="16" rx="6" fill="#10b981" />
        <text x="60" y="56" textAnchor="middle" fontSize="14" fill="#ffffff" fontWeight="700">RW</text>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="Posyandu icon">
      <circle cx="60" cy="42" r="20" fill="#10b981" />
      <path d="M40 70 Q60 90 80 70" fill="#d1fae5" stroke="#10b981" strokeWidth="5" />
      <rect x="28" y="76" width="26" height="18" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="4" />
      <rect x="66" y="76" width="26" height="18" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="4" />
      <path d="M58 28 L72 28 L74 18 L46 18 L48 28 Z" fill="#ffffff" stroke="#10b981" strokeWidth="4" />
    </svg>
  )
}

const categories = [
  {
    id: 'rt',
    title: '1. KATEGORI RT TERFAVORIT',
    description: 'Pilih RT paling kompak dan partisipatif.',
  },
  {
    id: 'rw',
    title: '2. KATEGORI RW TERFAVORIT',
    description: 'Vote RW dengan pengelolaan terbaik dan program inovatif.',
  },
  {
    id: 'posyandu',
    title: '3. KATEGORI KADER POSYANDU TERFAVORIT',
    description: 'Pilih kader Posyandu paling berdedikasi dan inspiratif.',
  },
]

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
            <a href="#home" onClick={() => setIsMenuOpen(false)}>BERANDA</a>
            <a href="#categories" onClick={() => setIsMenuOpen(false)}>KATEGORI POLLING</a>
            <a href="#cara" onClick={() => setIsMenuOpen(false)}>CARA MEMILIH</a>
          </nav>

          <div className="topbar-actions">
            {/* Tombol DAFTAR dihapus, hanya menyisakan tombol masuk ADMIN */}
            <Link to="/login" className="action-button">
              ADMIN
            </Link>

            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 12h16M4 6h16M4 18h16"} />
              </svg>
            </button>
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