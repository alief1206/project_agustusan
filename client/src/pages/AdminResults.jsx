import { Link } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'

const adminResultsStyles = `
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

  .action-button {
    border: none;
    cursor: pointer;
    border-radius: 999px;
    background: #d30f1a;
    color: #fff;
    font-weight: 700;
    padding: 0.9rem 1.6rem;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .action-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 32px rgba(211, 15, 26, 0.22);
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

  .admin-results-page {
    background: #11204f;
  }

  .admin-results-topbar {
    background: rgba(255, 255, 255, 0.96);
  }

  .admin-results-topbar .brand-copy strong {
    color: #191b34;
  }

  .admin-results-topbar .brand-copy span {
    color: #524d62;
  }

  .admin-results-topbar .nav-links {
    gap: 1rem;
  }

  .admin-results-topbar .nav-links a {
    color: #1f2042;
  }

  .admin-results-topbar .nav-links a.active-nav,
  .admin-results-topbar .nav-links a:hover {
    background: #11204f;
    color: #fff;
    border-radius: 999px;
    padding: 0.8rem 1rem;
  }

  .admin-results-hero {
    padding: 2rem 2rem 1.5rem;
    text-align: center;
    margin-top: 2rem;
    background: rgba(255, 255, 255, 0.97);
    border-radius: 34px;
    box-shadow: 0 22px 70px rgba(0, 0, 0, 0.18);
  }

  .admin-results-hero .subtitle {
    display: inline-flex;
    padding: 0.65rem 1rem;
    border-radius: 999px;
    background: #d30f1a;
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
    color: #241721;
  }

  .hero-actions {
    margin-top: 1.5rem;
  }

  .results-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .result-card {
    background: rgba(255, 255, 255, 0.97);
    border-radius: 32px;
    padding: 1.4rem;
    box-shadow: 0 22px 65px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(211, 15, 26, 0.12);
  }

  .result-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: #d30f1a;
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
    color: #241721;
  }

  .row-label .rank {
    display: inline-flex;
    width: 2rem;
    height: 2rem;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #f5e2e2;
    color: #d30f1a;
    font-weight: 800;
  }

  .row-meta {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-size: 0.95rem;
    color: #574751;
  }

  .progress-bar {
    width: 100%;
    height: 0.85rem;
    border-radius: 999px;
    background: #fde6e7;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: #d30f1a;
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

    .results-grid {
      grid-template-columns: 1fr;
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
  return (
    <>
      <style>{adminResultsStyles}</style>
      <div className="dashboard admin-page admin-results-page">
      <div className="page-frame">
        <header className="topbar admin-topbar admin-results-topbar">
          <div className="brand">
            <div className="brand-mark">
              <BrandLogo className="brand-image" />
            </div>
            <div className="brand-copy">
              <strong>Polling Merdeka</strong>
              <span>Dirgahayu RI ke-79</span>
            </div>
          </div>

          <nav className="nav-links admin-nav" aria-label="Admin navigation">
            <Link to="/">BERANDA</Link>
            <Link to="/admin">KELOLA KANDIDAT</Link>
            <Link to="/admin">KELOLA KATEGORI</Link>
            <Link to="/admin/results" className="active-nav">STATISTIK</Link>
            <Link to="/admin">PENGGUNA</Link>
            <Link to="/admin">PENGATURAN</Link>
          </nav>

          <Link to="/" className="action-button">KEMBALI</Link>
        </header>

        <section className="admin-results-hero">
          <span className="subtitle">DASBOR</span>
          <h1>HASIL POLLING BERDASARKAN KATEGORI</h1>
          <div className="hero-actions">
            <button type="button" className="secondary-button">Refresh Data</button>
          </div>
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
          <button type="button" className="secondary-button">Refresh Data</button>
          <button type="button" className="action-button">Cetak Laporan</button>
        </div>
      </div>
      </div>
    </>
  )
}

export default AdminResults
