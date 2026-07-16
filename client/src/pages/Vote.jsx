import { Link } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'

const voteStyles = `
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

  .vote-page .page-frame {
    padding-top: 1.25rem;
  }

  .vote-hero {
    text-align: center;
    margin-top: 2rem;
  }

  .vote-hero h1 {
    font-size: clamp(2.8rem, 4vw, 4rem);
    margin: 0;
    line-height: 1.03;
  }

  .vote-hero h1 span {
    color: #d30f1a;
  }

  .vote-text {
    margin: 1rem auto 0;
    color: #544552;
    font-size: 1rem;
    max-width: 660px;
  }

  .quick-jump {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.75rem;
  }

  .quick-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.95rem 1.6rem;
    border-radius: 999px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-decoration: none;
    color: #d30f1a;
    border: 2px solid #d30f1a;
    background: #fff;
  }

  .quick-button.secondary {
    background: transparent;
    color: #d30f1a;
  }

  .candidate-section {
    margin-top: 2.5rem;
  }

  .section-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.65rem;
    padding: 1.6rem 1.8rem 1.3rem;
    border-radius: 28px;
    background: #fff;
    box-shadow: 0 22px 40px rgba(88, 23, 41, 0.08);
  }

  .section-title span {
    display: inline-flex;
    padding: 0.6rem 1rem;
    border-radius: 999px;
    background: #d30f1a;
    color: #fff;
    font-size: 0.92rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .section-title p {
    margin: 0;
    color: #5c4c57;
    font-size: 0.96rem;
  }

  .candidate-grid {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 1rem;
  }

  .candidate-card {
    background: #ffffff;
    border: 2px solid #f3e3e6;
    border-radius: 28px;
    padding: 1.5rem 1rem 1.3rem;
    text-align: center;
    box-shadow: 0 16px 36px rgba(94, 32, 48, 0.08);
  }

  .candidate-avatar {
    width: 85px;
    height: 85px;
    margin: 0 auto 1rem;
    border-radius: 28px;
    background: #f9d8d8;
    display: grid;
    place-items: center;
    font-weight: 800;
    color: #9f2f37;
    font-size: 1.25rem;
  }

  .candidate-card .candidate-label {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.92rem;
    margin-bottom: 0.45rem;
    color: #241721;
  }

  .candidate-card p {
    margin: 0;
    color: #6f5f6d;
    font-size: 0.88rem;
    line-height: 1.5;
    min-height: 3rem;
  }

  .candidate-vote-button {
    display: inline-flex;
    margin: 1rem auto 0;
    text-decoration: none;
    border-radius: 999px;
    background: #d30f1a;
    color: #ffffff;
    padding: 0.75rem 1.4rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    transition: background 0.2s ease;
    border: none;
    cursor: pointer;
  }

  .candidate-vote-button:hover {
    background: #b20c16;
  }

  .vote-page .site-footer {
    margin-top: 2.5rem;
  }

  .vote-page .footer-links a {
    color: rgba(255, 255, 255, 0.95);
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

const rtCandidates = [
  { id: 2, name: 'EKO RETNANI', role: 'Ketua RT. 01/01 Welaran' },
  { id: 3, name: 'NANANG ARIYANTO', role: 'Ketua RT. 02/01 Welaran' },
  { id: 4, name: 'RESTU WAHYU PRASTIYO', role: 'Ketua RT. 06/01 Welaran' },
  { id: 8, name: 'IMAM HARIYADI', role: 'Ketua RT. 02/02 Welaran' },
]

const rwCandidates = [
  { id: 1, name: 'BUDI SANTOSO', role: 'Ketua RW. Welaran/01' },
  { id: 6, name: 'SUTRISNO', role: 'Ketua RW. Welaran/02' },
]

const posyanduCandidates = [
  { id: 1, name: 'SITI RAHMANIAH', role: 'POSYANDU: APEL KADER' },
  { id: 2, name: 'MUIDYANTI', role: 'POSYANDU: APEL KADER' },
  { id: 3, name: 'MASITAH', role: 'POSYANDU: APEL KADER' },
  { id: 4, name: 'SULIS EKAWASIH', role: 'POSYANDU: APEL KADER' },
  { id: 5, name: 'SINTA KAROHMAH', role: 'POSYANDU: APEL KADER' },
  { id: 6, name: 'DIANA DWI SETYOWATI', role: 'POSYANDU: JERUK KADER' },
]

function CandidateCard({ candidate }) {
  return (
    <article className="candidate-card">
      <div className="candidate-avatar" aria-hidden="true">
        <span>{candidate.name.split(' ').map((part) => part[0]).join('')}</span>
      </div>
      <div className="candidate-label">{candidate.name}</div>
      <p>{candidate.role}</p>
      <button type="button" className="candidate-vote-button">
        VOTE
      </button>
    </article>
  )
}

function Vote() {
  return (
    <>
      <style>{voteStyles}</style>
      <div className="dashboard vote-page">
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
            <Link to="/">BERANDA</Link>
            <a href="/#categories">KATEGORI POLLING</a>
            <a href="/#cara">CARA MEMILIH</a>
          </nav>

          <Link to="/" className="action-button">KEMBALI</Link>
        </header>

        <section className="vote-hero">
          <h1>
            PILIH <span>KANDIDAT</span> ANDA
          </h1>
          <p className="vote-text">Daftar semua kandidat pemungutan suara Kelurahan Kemerdekaan.</p>
          <div className="quick-jump">
            <a className="quick-button" href="#rt">KANDIDAT RT</a>
            <a className="quick-button" href="#rw">KANDIDAT RW</a>
            <a className="quick-button secondary" href="#posyandu">KADER POSYANDU</a>
          </div>
        </section>

        <section className="candidate-section" id="rt">
          <div className="section-title">
            <span>KANDIDAT RT TERFAVORIT</span>
            <p>Daftar kandidat Ketua RT yang akan mewakili lingkungan Welaran dan sekitarnya.</p>
          </div>
          <div className="candidate-grid">
            {rtCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </section>

        <section className="candidate-section" id="rw">
          <div className="section-title">
            <span>KANDIDAT RW TERFAVORIT</span>
            <p>Daftar kandidat Ketua RW untuk wilayah Welaran yang bisa Anda pilih.</p>
          </div>
          <div className="candidate-grid">
            {rwCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </section>

        <section className="candidate-section" id="posyandu">
          <div className="section-title">
            <span>KANDIDAT KADER POSYANDU TERFAVORIT</span>
            <p>Kandidat Kader Posyandu untuk Kelurahan Kemerdekaan Tahun 2026.</p>
          </div>
          <div className="candidate-grid">
            {posyanduCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </section>

        <footer className="site-footer">
          <div className="footer-links">
            <Link to="/">Tentang</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Kontak</Link>
            <Link to="/">Syarat</Link>
          </div>
          <div className="footer-copy">© 2024 Polling Merdeka. Dirgahayu RI ke-79!</div>
        </footer>
      </div>
      </div>
    </>
  )
}

export default Vote
