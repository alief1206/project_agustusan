import { useState } from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'

const adminResultsStyles = `
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
    min-height: 100%;
  }

  body {
    background: #ffffff;
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
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.08);
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
    gap: 1.5rem;
    justify-content: center;
  }

  .nav-links a {
    color: #374151;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .nav-links a:hover {
    color: #10b981;
  }

  .action-button {
    border: none;
    cursor: pointer;
    border-radius: 999px;
    background: #10b981;
    color: #fff;
    font-weight: 700;
    padding: 0.9rem 1.6rem;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .action-button:hover {
    transform: translateY(-2px);
    background: #059669;
    box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
  }

  .secondary-button,
  .action-button.secondary {
    border: 2px solid #10b981;
    background: #fff;
    color: #10b981;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.9rem 1.2rem;
  }

  .secondary-button:hover,
  .action-button.secondary:hover {
    background: #f0fdf4;
    color: #059669;
    border-color: #059669;
  }

  .topbar-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

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

  .admin-topbar .nav-links {
    gap: 1rem;
  }

  .admin-nav a.active-nav {
    background: #10b981;
    color: #fff;
    border-radius: 999px;
    padding: 0.8rem 1rem;
  }
  
  .admin-nav a.active-nav:hover {
    background: #059669;
    color: #fff;
  }

  .admin-results-hero {
    padding: 2rem 2rem 1.5rem;
    text-align: center;
    margin-top: 2rem;
    background: #ffffff;
    border-radius: 34px;
    box-shadow: 0 22px 55px rgba(0, 0, 0, 0.05);
  }

  .admin-results-hero .subtitle {
    display: inline-flex;
    padding: 0.65rem 1rem;
    border-radius: 999px;
    background: #10b981;
    color: #fff;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .admin-results-hero h1 {
    margin: 1rem auto 0;
    max-width: 900px;
    font-size: clamp(2.8rem, 4vw, 4rem);
    line-height: 1.02;
    color: #111827;
  }

  .results-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .result-card {
    background: #ffffff;
    border-radius: 32px;
    padding: 1.4rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
    border: 1px solid #f3f4f6;
  }

  .result-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: #10b981;
    color: #fff;
    padding: 1rem 1.2rem;
    border-radius: 24px;
    margin-bottom: 1rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .result-list {
    display: grid;
    gap: 1rem;
  }

  .result-row {
    display: grid;
    gap: 0.65rem;
  }

  .row-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 700;
    color: #111827;
  }

  .row-label .rank {
    display: inline-flex;
    width: 2rem;
    height: 2rem;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #d1fae5;
    color: #047857;
    font-weight: 800;
  }

  .row-meta {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-size: 0.95rem;
    color: #6b7280;
  }

  .progress-bar {
    width: 100%;
    height: 0.85rem;
    border-radius: 999px;
    background: #e5e7eb;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: #10b981;
  }

  .results-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 2rem auto 0;
    flex-wrap: wrap;
  }

  .results-actions .action-button,
  .results-actions .secondary-button {
    min-width: 180px;
    padding: 1.1rem 2.5rem;
    font-size: 1rem;
    letter-spacing: 0.08em;
  }

  @media (max-width: 1024px) {
    .page-frame {
      padding: 1.5rem 1rem 2.5rem;
    }

    .topbar {
      padding: 1rem 1.25rem;
      border-radius: 24px;
    }

    .results-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 820px) {
    .mobile-menu-btn {
      display: block; 
    }

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
  }

  @media (max-width: 680px) {
    .topbar {
      padding: 1rem 0.8rem;
    }

    .admin-results-hero {
      padding: 1.5rem 1rem;
    }

    .results-actions {
      flex-direction: column;
    }
  }
`

const categories = [
  {
    title: 'LOMBA TRADISIONAL TERFAVORIT',
    items: [
      { label: 'Panjat Pinang', votes: '3,500', percent: 40 },
      { label: 'Tarik Tambang', votes: '2,800', percent: 32 },
      { label: 'Lari Karung', votes: '1,200', percent: 14 },
      { label: 'Makan Kerupuk', votes: '700', percent: 8 },
      { label: 'Bakiak', votes: '500', percent: 6 },
    ],
  },
  {
    title: 'MAKANAN KHAS SYUKURAN TERBAIK',
    items: [
      { label: 'Nasi Tumpeng', votes: '4,100', percent: 45 },
      { label: 'Rujak Cuka', votes: '1,900', percent: 21 },
      { label: 'Ketan Kuning', votes: '1,100', percent: 12 },
      { label: 'Bubur Sumsum', votes: '1,000', percent: 11 },
      { label: 'Opak Singkong', votes: '900', percent: 10 },
    ],
  },
  {
    title: 'DEKORASI LINGKUNGAN TERKREATIF',
    items: [
      { label: 'Gapura Utama', votes: '3,200', percent: 38 },
      { label: 'Pojok Bendera', votes: '2,100', percent: 25 },
      { label: 'Taman Merdeka', votes: '1,500', percent: 18 },
      { label: 'Lampu Hias Jalan', votes: '1,000', percent: 12 },
      { label: 'Pagar Putih', votes: '600', percent: 7 },
    ],
  },
  {
    title: 'KADER POSYANDU TERDEDIKASI',
    items: [
      { label: 'Siti Rahmaniah', votes: '800', percent: 55 },
      { label: 'Muidayanti', votes: '436', percent: 30 },
      { label: 'Siti Masitah', votes: '218', percent: 15 },
    ],
  },
]

function ResultRow({ item, rank }) {
  return (
    <div className="result-row">
      <div className="row-label">
        <span className="rank">{rank}.</span>
        <span>{item.label}</span>
      </div>
      <div className="row-meta">
        <span>{item.votes} votes</span>
        <span>({item.percent}%)</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${item.percent}%` }} />
      </div>
    </div>
  )
}

function AdminResults() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <style>{adminResultsStyles}</style>
      <div className="dashboard admin-page">
      <div className="page-frame">
        <header className="topbar admin-topbar">
          <div className="brand">
            <div className="brand-mark">
              <BrandLogo className="brand-image" />
            </div>
            <div className="brand-copy">
              <strong>Polling Merdeka</strong>
              <span>Dirgahayu RI ke-79</span>
            </div>
          </div>

          <nav className={`nav-links admin-nav ${isMenuOpen ? 'open' : ''}`} aria-label="Admin navigation">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>BERANDA</Link>
            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>BERANDA ADMIN</Link>
            <Link to="/admin/results" className="active-nav" onClick={() => setIsMenuOpen(false)}>STATISTIK</Link>
          </nav>

          <div className="topbar-actions">
            <button type="button" className="action-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              Refresh
            </button>
            <Link to="/" className="action-button">KEMBALI</Link>
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

        <section className="admin-results-hero">
          <span className="subtitle">DASBOR</span>
          <h1>HASIL POLLING BERDASARKAN KATEGORI</h1>
        </section>

        <div className="results-grid">
          {categories.map((category) => (
            <section key={category.title} className="result-card">
              <div className="result-card-header">
                <span>{category.title}</span>
              </div>
              <div className="result-list">
                {category.items.map((item, index) => (
                  <ResultRow key={item.label} item={item} rank={index + 1} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="results-actions">
          <button type="button" className="action-button">Cetak Laporan</button>
        </div>
      </div>
      </div>
    </>
  )
}

export default AdminResults
