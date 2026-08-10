import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import { api } from '../lib/api'

const voteStyles = `
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
    overflow-x: clip;
    display: flex;
    flex-direction: column;
    flex: 1; 
  }

  .menu-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 998;
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
    background: rgba(255, 255, 255, 0.98);
    border-radius: 999px;
    padding: 1rem 2rem;
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.08); 
    position: relative;
    z-index: 1000; 
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

  .brand-mark img,
  .brand-mark svg,
  .brand-logo img,
  .brand-logo svg {
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

  .topbar-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0; 
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
  }

  .action-button:hover {
    transform: translateY(-2px);
    background: #059669;
    box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
  }

  .vote-page .page-frame {
    padding-top: 1.5rem;
  }

  .vote-hero {
    text-align: center;
    margin-top: 2rem;
    padding: 2rem 1.5rem;
    background: #ffffff;
    border-radius: 34px;
    box-shadow: 0 22px 55px rgba(0, 0, 0, 0.05);
  }

  .vote-hero h1 {
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    margin: 0;
    line-height: 1.1;
    color: #111827;
  }

  .vote-hero h1 span {
    color: #10b981; 
  }

  .vote-text {
    margin: 1.25rem auto 0;
    color: #6b7280;
    font-size: 1.1rem;
    max-width: 660px;
    line-height: 1.6;
  }

  .state-message {
    margin: 2rem auto 0;
    max-width: 720px;
    padding: 1rem 1.25rem;
    border-radius: 18px;
    background: #f0fdf4;
    color: #047857;
    font-weight: 700;
    text-align: center;
  }

  .state-message.error {
    background: #fee2e2;
    color: #b91c1c;
  }

  .quick-jump {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  .quick-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.8rem 1.6rem;
    border-radius: 999px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-decoration: none;
    color: #10b981;
    border: 2px solid #10b981;
    background: #fff;
    transition: all 0.3s ease;
  }

  .quick-button:hover {
    background: #10b981;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  }

  .quick-button.secondary {
    background: transparent;
    color: #10b981;
  }

  .quick-button.secondary:hover {
    background: #f0fdf4;
    color: #059669;
    border-color: #059669;
    box-shadow: none;
  }

  .candidate-section {
    margin-top: 4rem;
  }

  .section-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 2rem 2.2rem;
    border-radius: 28px;
    background: #fff;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
    border: 1px solid #f3f4f6;
  }

  .section-title span {
    display: inline-flex;
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    background: #10b981; 
    color: #fff;
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .section-title p {
    margin: 0;
    color: #6b7280;
    font-size: 1rem;
    line-height: 1.6;
  }

  .candidate-grid {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
    gap: 1.5rem;
  }

  .candidate-card {
    background: #ffffff;
    border: 1px solid #f3f4f6;
    border-radius: 28px;
    padding: 2rem 1.5rem;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .candidate-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.1);
    border-color: #d1fae5;
  }

  .candidate-avatar {
    width: 90px;
    height: 90px;
    margin: 0 auto 1.25rem;
    border-radius: 50%; 
    background: #d1fae5; 
    display: grid;
    place-items: center;
    font-weight: 800;
    color: #047857; 
    font-size: 1.5rem;
    border: 4px solid #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  }

  .candidate-card .candidate-label {
    font-weight: 800;
    text-transform: uppercase;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #111827;
  }

  .candidate-card p {
    margin: 0;
    color: #6b7280;
    font-size: 0.9rem;
    line-height: 1.6;
    min-height: 3rem;
  }

  .candidate-vote-button {
    display: inline-flex;
    margin: 1.25rem auto 0;
    text-decoration: none;
    border-radius: 999px;
    background: #10b981;
    color: #ffffff;
    padding: 0.8rem 1.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
  }

  .candidate-vote-button:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(16, 185, 129, 0.3);
  }

  /* MODAL DATA PEMILIH STYLES */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .modal-card {
    background: #ffffff;
    border-radius: 28px;
    padding: 2.5rem;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    animation: modalFadeIn 0.3s ease;
  }

  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .modal-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .modal-header h2 {
    margin: 0;
    color: #111827;
    font-size: 1.6rem;
  }

  .modal-header p {
    margin: 0.8rem 0 0;
    color: #6b7280;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .modal-form {
    display: grid;
    gap: 1.25rem;
  }

  .modal-form label {
    display: block;
    font-weight: 700;
    color: #374151;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .modal-input {
    width: 100%;
    padding: 1rem;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    transition: all 0.2s;
  }

  .modal-input:focus {
    border-color: #10b981;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .btn-cancel {
    flex: 1;
    padding: 0.8rem;
    border-radius: 999px;
    border: 2px solid #e5e7eb;
    background: #ffffff;
    color: #4b5563;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-cancel:hover {
    background: #f3f4f6;
  }

  .btn-submit {
    flex: 1;
    padding: 0.8rem;
    border-radius: 999px;
    border: none;
    background: #10b981;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
    transition: all 0.2s;
  }

  .btn-submit:hover {
    background: #059669;
    transform: translateY(-2px);
  }

  .vote-page .site-footer {
    margin-top: auto; 
  }

  .vote-page .footer-links a {
    color: rgba(255, 255, 255, 0.95);
  }

  .site-footer {
    margin-top: 3rem;
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

  .footer-copy {
    flex: 1 1 100%;
    text-align: center;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1.5rem;
  }

  @media (max-width: 1024px) {
    .page-frame { padding: 1.5rem 1rem 2.5rem; }
    .topbar { border-radius: 24px; padding: 1rem 1.25rem; }
  }

  @media (max-width: 768px) {
    .mobile-menu-btn {
      display: flex !important;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border-radius: 12px;
      background: #f0fdf4;
      color: #10b981;
      border: none;
      cursor: pointer;
      flex-shrink: 0;
    }
    .topbar {
      border-radius: 24px;
      padding: 0.75rem 1rem;
      position: relative;
      z-index: 1000;
      gap: 0.5rem;
    }
    .brand {
      min-width: 0;
      flex: 1;
      gap: 0.5rem;
    }
    .brand-copy strong {
      font-size: 0.95rem;
    }
    .brand-copy span {
      display: none;
    }
    .topbar-actions {
      gap: 0.5rem;
      flex-shrink: 0;
    }
    .refresh-btn {
      padding: 0.45rem 0.8rem;
      font-size: 0.8rem;
    }
    .desktop-only-action {
      display: none !important;
    }

    .nav-links {
      display: none;
      position: absolute;
      top: calc(100% + 0.6rem);
      left: 0.5rem;
      right: 0.5rem;
      width: auto;
      max-width: calc(100vw - 2rem);
      margin-left: auto;
      background: #ffffff;
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
      padding: 1.25rem;
      border-radius: 1.5rem;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18), 0 4px 15px rgba(16, 185, 129, 0.12);
      border: 1.5px solid #e5e7eb;
      z-index: 999;
    }

    .nav-links.open {
      display: flex !important;
      animation: navMenuSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes navMenuSlide {
      from {
        opacity: 0;
        transform: translateY(-8px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .nav-links a {
      text-align: left !important;
      display: flex !important;
      align-items: center;
      width: 100%;
      padding: 0.85rem 1.15rem !important;
      border-radius: 12px !important;
      color: #111827 !important;
      font-size: 0.95rem !important;
      font-weight: 700 !important;
      background: #f9fafb;
      border: 1px solid #f3f4f6;
      text-decoration: none;
      min-height: 44px;
    }

    .nav-links a:hover,
    .nav-links a:active {
      background: #ecfdf5 !important;
      color: #059669 !important;
      border-color: #a7f3d0 !important;
    }

    .vote-hero h1 { font-size: 2.5rem; }
    .vote-text { font-size: 1rem; }
    .quick-button { width: 100%; }
    .section-title { padding: 1.5rem; }
    .site-footer { flex-direction: column; text-align: center; border-radius: 24px; }
    .footer-links { justify-content: center; }
  }

  @media (max-width: 480px) {
    .brand-copy span { display: none; }
    .brand-copy strong { font-size: 1rem; }
    .brand-mark,
    .brand-logo { width: 40px; height: 40px; border-radius: 10px; }
    .modal-card { padding: 1.5rem; border-radius: 20px; max-height: 90vh; overflow-y: auto; }
    .vote-hero { padding: 1.5rem 1rem; }
    .vote-hero h1 { font-size: 2rem; }
    .candidate-card { padding: 1.5rem 1rem; }
  }
`

function CandidateCard({ candidate, onVote }) {
  return (
    <article className="candidate-card">
      <div className="candidate-avatar" aria-hidden="true">
        <span>{candidate.name.split(' ').map((part) => part[0]).join('')}</span>
      </div>
      <div className="candidate-label">{candidate.name}</div>
      <p>{candidate.role}</p>
      <button 
        type="button" 
        className="candidate-vote-button"
        onClick={() => onVote(candidate)}
      >
        VOTE
      </button>
    </article>
  )
}

function Vote() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  const loadCategories = async () => {
    try {
      const data = await api.getCategories()
      setCategories(Array.isArray(data) ? data : [])
      setMessage('')
    } catch (error) {
      setCategories([])
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleVoteClick = (candidate) => {
    setSelectedCandidate(candidate)
    setMessage('')
    setIsModalOpen(true)
  }

  const handleSubmitVote = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    setIsSubmitting(true)
    setMessage('')

    try {
      await api.createVote({
        candidateId: selectedCandidate.id,
        voterName: formData.get('voterName'),
        voterAddress: formData.get('voterAddress'),
      })
      setMessage(`Terima kasih! Suara Anda untuk ${selectedCandidate.name} telah berhasil dicatat.`)
      setIsModalOpen(false)
      setSelectedCandidate(null)
      await loadCategories()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <style>{voteStyles}</style>
      {isMenuOpen && <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)} />}
      <div className="dashboard vote-page">
      <div className="page-frame">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">
              <BrandLogo className="brand-image" />
            </div>
            <div className="brand-copy">
              <strong>Polling Merdeka</strong>
              <span>Dirgahayu RI ke-81</span>
            </div>
          </div>

          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>BERANDA</Link>
            <a href="/#categories" onClick={() => setIsMenuOpen(false)}>KATEGORI POLLING</a>
            <a href="/#cara" onClick={() => setIsMenuOpen(false)}>CARA MEMILIH</a>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>KEMBALI KE BERANDA</Link>
          </nav>

          <div className="topbar-actions">
            <button type="button" className="action-button secondary refresh-btn" onClick={loadCategories}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              Refresh
            </button>
            <Link to="/" className="action-button desktop-only-action">KEMBALI</Link>
            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 12h16M4 6h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </header>

        <section className="vote-hero">
          <h1>
            PILIH <span>KANDIDAT</span> ANDA
          </h1>
          <p className="vote-text">Daftar semua kandidat pemungutan suara Kelurahan Kemerdekaan. Setiap warga dapat memberikan 1 suara untuk setiap kategori.</p>
          <div className="quick-jump">
            {(categories || []).map((category, index) => (
              <a
                key={category.id}
                className={`quick-button ${index === (categories || []).length - 1 ? 'secondary' : ''}`}
                href={`#${category.slug}`}
              >
                {category.name}
              </a>
            ))}
          </div>
          {message ? <p className={`state-message ${message.includes('gagal') || message.includes('sudah') ? 'error' : ''}`}>{message}</p> : null}
        </section>

        {isLoading ? (
          <p className="state-message">Memuat kandidat...</p>
        ) : (categories || []).map((category) => {
          const activeCandidates = (category.candidates || []).filter((candidate) => candidate.status === 'ACTIVE')

          return (
            <section className="candidate-section" id={category.slug} key={category.id}>
              <div className="section-title">
                <span>{category.name}</span>
                <p>{category.description || 'Pilih kandidat favorit Anda pada kategori ini.'}</p>
              </div>
              <div className="candidate-grid">
                {activeCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} onVote={handleVoteClick} />
                ))}
              </div>
            </section>
          )
        })}

        <footer className="site-footer">
          <div className="footer-links">
            <Link to="/">Tentang</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Kontak</Link>
            <Link to="/">Syarat</Link>
          </div>
          <div className="footer-copy">© 2024 Polling Merdeka. Dirgahayu RI ke-81!</div>
        </footer>
      </div>
      </div>

      {/* OVERLAY MODAL FORMULIR PEMILIH */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Konfirmasi Suara</h2>
              <p>Anda memilih <strong>{selectedCandidate?.name}</strong>. Lengkapi data berikut untuk memvalidasi suara Anda.</p>
            </div>
            
            <form className="modal-form" onSubmit={handleSubmitVote}>
              <div>
                <label>Nama Lengkap</label>
                <input 
                  type="text" 
                  name="voterName"
                  className="modal-input" 
                  placeholder="Masukkan nama lengkap Anda" 
                  required 
                />
              </div>
              <div>
                <label>Alamat Lengkap</label>
                <textarea 
                  name="voterAddress"
                  className="modal-input" 
                  rows="3" 
                  placeholder="Contoh: Jl. Welaran, No. 15, RT 01/RW 01" 
                  required 
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cancel" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Mengirim...' : 'Kirim Suara'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  )
}

export default Vote
