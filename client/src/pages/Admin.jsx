import { useState } from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'

const adminStyles = `
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

  .admin-nav a,
  .admin-nav .action-button {
    font-weight: 700;
  }

  .admin-hero {
    margin-top: 2rem;
    text-align: center;
    padding: 2rem 1.5rem;
    background: #ffffff;
    border-radius: 34px;
    box-shadow: 0 22px 55px rgba(0, 0, 0, 0.05);
  }

  .admin-hero h1 {
    margin: 0;
    font-size: clamp(2.8rem, 4vw, 3.5rem);
    line-height: 1.02;
    color: #111827;
  }

  .admin-hero h1 span {
    color: #10b981;
  }
  .admin-hero p {
    margin: 1rem auto 0;
    max-width: 760px;
    color: #6b7280;
    font-size: 1rem;
  }

  .admin-content {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 1.75rem;
    margin-top: 2rem;
  }

  .admin-main {
    display: grid;
    gap: 1.75rem;
  }

  .admin-metrics {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .admin-metric-card {
    background: #ffffff;
    border: 1px solid #f3f4f6;
    padding: 1.55rem 1.4rem;
    border-radius: 28px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  }

  .admin-metric-card span {
    display: block;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    color: #6b7280;
    text-transform: uppercase;
  }

  .admin-metric-card strong {
    display: block;
    margin-top: 0.7rem;
    font-size: 2.2rem;
    line-height: 1;
    color: #111827;
  }

  .admin-metric-card p {
    margin: 0.85rem 0 0;
    color: #6b7280;
  }

  .admin-table-card {
    background: #ffffff;
    border-radius: 32px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  .admin-table-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem 1.75rem;
    background: #f9fafb;
  }

  .admin-table-header h2 {
    margin: 0;
    font-size: 1.2rem;
    color: #111827;
  }

  .admin-filters {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 0.75rem;
    width: min(100%, 420px);
  }

  .admin-filters input,
  .admin-filters select {
    width: 100%;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    padding: 0.85rem 1rem;
    background: #ffffff;
    font-size: 0.95rem;
    color: #374151;
  }

  .admin-table {
    width: 100%;
    border-collapse: collapse;
  }

  .admin-table th,
  .admin-table td {
    padding: 1rem 1.25rem;
    text-align: left;
    border-bottom: 1px solid #f3f4f6;
  }

  .admin-table th {
    color: #6b7280;
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .admin-table tbody tr:hover {
    background: #fff7f6;
  }

  .admin-table td strong {
    display: block;
    margin-bottom: 0.25rem;
    color: #111827;
  }

  .admin-table td span {
    display: block;
    color: #6b7280;
    font-size: 0.92rem;
  }

  .admin-table button {
    border: none;
    background: transparent;
    color: #10b981;
    font-weight: 700;
    margin-right: 0.5rem;
    cursor: pointer;
  }

  .admin-table button.danger {
    color: #dc2626;
  }

  .status-active {
    color: #059669;
    font-weight: 700;
  }

  .status-inactive {
    color: #dc2626;
    font-weight: 700;
  }

  .admin-sidebar {
    background: #ffffff;
    border-radius: 32px;
    padding: 1.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
    display: grid;
    align-content: start;
    gap: 1rem;
  }

  .admin-sidebar-header h3 {
    margin: 0;
    color: #111827;
    font-size: 1.1rem;
  }

  .admin-quick-list {
    display: grid;
    gap: 1rem;
  }

  .quick-card {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 0.9rem;
    align-items: center;
    padding: 1rem 1rem 1rem 0.9rem;
    background: #f9fafb;
    border: 1px solid #f3f4f6;
    border-radius: 24px;
  }

  .quick-avatar {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: #10b981;
    color: #fff;
    display: grid;
    place-items: center;
    font-weight: 700;
  }

  .quick-card p {
    margin: 0 0 0.5rem;
    color: #2c1520;
    font-weight: 700;
  }

  .quick-card button {
    border: none;
    background: #fff;
    border-radius: 999px;
    padding: 0.6rem 0.9rem;
    font-weight: 700;
    color: #10b981;
    cursor: pointer;
  }

  .quick-card button.danger {
    background: #fee2e2;
    color: #b91c1c;
  }

  .create-button {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    text-align: center;
    padding: 1rem 1.2rem;
  }

  .site-footer {
    margin-top: 3rem;
    padding: 1.8rem 1.8rem 1.5rem;
    background: #059669;
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
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
  }

  /* MODAL STYLES */
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

  .confirm-modal .modal-header p {
    font-size: 1.05rem;
    line-height: 1.6;
  }
  .confirm-modal .modal-header strong {
    display: inline-block;
    margin: 0.5rem 0;
    padding: 0.25rem 0.75rem;
    background: #fee2e2;
    color: #b91c1c;
    border-radius: 8px;
    font-weight: 700;
  }
  .btn-submit.danger {
    background: #dc2626;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
  }
  .btn-submit.danger:hover { background: #b91c1c; }

  @media (max-width: 1024px) {
    .page-frame {
      padding: 1.5rem 1rem 2.5rem;
    }

    .admin-content {
      grid-template-columns: 1fr;
    }

    .admin-metrics {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 820px) {
    .mobile-menu-btn {
      display: block; 
    }

    .topbar {
      padding: 1rem 1.25rem;
      border-radius: 24px;
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

    .topbar-actions {
      justify-content: center;
    }

    .admin-table-header,
    .admin-sidebar {
      padding: 1rem;
    }

    .admin-filters {
      grid-template-columns: 1fr;
    }

    .admin-table th,
    .admin-table td {
      padding: 0.9rem 0.9rem;
    }
  }
`

const stats = [
  { label: 'TOTAL KANDIDAT', value: '57', detail: '45 RT/RW, 12 Posyandu' },
  { label: 'TOTAL KATEGORI', value: '2 Kategori Utama', detail: '5 Sub-Kategori' },
  { label: 'TOTAL SUARA MASUK', value: '12,500' },
  { label: 'PENGGUNA TERDAFTAR', value: '5,000' },
]

const actions = [
  { id: 1, name: 'BUDI SANTOSO', type: 'EDIT' },
  { id: 2, name: 'SITI RAHMANIAH', type: 'HAPUS' },
  { id: 3, name: 'IMAM HARIYADI', type: 'LIHAT PROFIL' },
]

const recentCandidates = [
  {
    id: 1,
    name: 'BUDI SANTOSO',
    category: 'RT/RW',
    region: 'Welaran',
    votes: '1,500 Suara',
    status: 'Aktif',
    role: 'Ketua RW. Welaran/01',
  },
  {
    id: 2,
    name: 'SITI RAHMANIAH',
    category: 'Kader Posyandu',
    region: 'Kemerdekaan',
    votes: '800 Suara',
    status: 'Aktif',
    role: 'Posyandu: Apel',
  },
]

function Admin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState(null) // 'candidate' or 'category'
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [candidateToEdit, setCandidateToEdit] = useState(null)

  const openModal = (type) => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalType(null)
    setCandidateToEdit(null)
  }

  const openEditModal = (candidate) => {
    setModalType('editCandidate')
    setCandidateToEdit(candidate)
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (modalType === 'editCandidate') {
      alert(`Data kandidat "${candidateToEdit.name}" berhasil diperbarui! (Ini hanya simulasi)`)
    } else {
      // Simulasi pengiriman data
      alert(`Data baru untuk '${modalType}' berhasil ditambahkan! (Ini hanya simulasi)`)
    }
    closeModal()
  }

  const openConfirmModal = (item) => {
    setItemToDelete(item)
    setIsConfirmModalOpen(true)
  }

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false)
    setItemToDelete(null)
  }

  const handleDelete = () => {
    if (itemToDelete) {
      alert(`Item "${itemToDelete.name}" telah dihapus! (Ini hanya simulasi)`)
      closeConfirmModal()
    }
  }

  return (
    <>
      <style>{adminStyles}</style>
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
            <Link to="/admin/results" onClick={() => setIsMenuOpen(false)}>STATISTIK</Link>
          </nav>

          <div className="topbar-actions">
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

        <section className="admin-hero">
          <h1>
            DASBOR ADMIN: <span>KELOLA PEMUNGUTAN SUARA 'POLLING MERDEKA 79'</span>
          </h1>
          <p>Kelola kandidat, kategori, statistik, dan pengguna secara cepat dan akurat di Polling Merdeka 79.</p>
        </section>

        <div className="admin-content">
          <div className="admin-main">
            <div className="admin-metrics" id="statistik">
              {stats.map((item) => (
                <article key={item.label} className="admin-metric-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  {item.detail ? <p>{item.detail}</p> : null}
                </article>
              ))}
            </div>

            <div className="admin-table-card" id="kelola-kandidat">
              <div className="admin-table-header">
                <h2>DAFTAR KANDIDAT TERBARU</h2>
                <div className="admin-filters">
                  <input type="search" placeholder="Cari kandidat..." />
                  <select>
                    <option value="">Semua Kategori</option>
                    <option value="rt">Kandidat RT</option>
                    <option value="rw">Kandidat RW</option>
                    <option value="posyandu">Kader Posyandu</option>
                  </select>
                </div>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nama Kandidat</th>
                    <th>Kategori</th>
                    <th>Wilayah</th>
                    <th>Total Suara</th>
                    <th>Status</th>
                    <th>Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCandidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td>
                        <strong>{candidate.name}</strong>
                        <span>{candidate.role}</span>
                      </td>
                      <td>{candidate.category}</td>
                      <td>{candidate.region}</td>
                      <td>{candidate.votes}</td>
                      <td className={candidate.status === 'Aktif' ? 'status-active' : 'status-inactive'}>
                        {candidate.status}
                      </td>
                      <td>
                        <button type="button" onClick={() => openEditModal(candidate)}>EDIT</button>
                        <button type="button" className="danger" onClick={() => openConfirmModal(candidate)}>HAPUS</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="admin-sidebar" id="pengguna">
            <div className="admin-sidebar-header">
              <h3>Tindakan Cepat</h3>
            </div>
            <div className="admin-quick-list">
              {actions.map((action) => (
                <div key={action.id} className="quick-card">
                  <div className="quick-avatar" aria-hidden="true">
                    {action.name.split(' ').map((part) => part[0]).join('')}
                  </div>
                  <div>
                    <p>{action.name}</p>
                    <button
                      type="button"
                      className={action.type === 'HAPUS' ? 'danger' : undefined}
                      onClick={() => {
                        if (action.type === 'HAPUS') openConfirmModal(action)
                        else if (action.type === 'EDIT') openEditModal(action)
                        else alert(`Tindakan '${action.type}' untuk ${action.name}`);
                      }}>
                      [{action.type}]
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="secondary-button create-button" onClick={() => openModal('candidate')}>
              BUAT KANDIDAT BARU
            </button>
            <button type="button" className="secondary-button create-button" onClick={() => openModal('category')}>
              BUAT KATEGORI BARU
            </button>
          </aside>
        </div>

        <footer className="site-footer admin-footer">
          <div className="footer-links">
            <Link to="/">Tentang</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Kontak</Link>
            <Link to="/">Syarat</Link>
          </div>
          <div className="footer-copy">© 2024 Polling Merdeka. Dirgahayu RI ke-79!</div>
        </footer>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h2>
                  {modalType === 'editCandidate' && 'Edit Kandidat'}
                  {modalType === 'candidate' && 'Tambah Kandidat Baru'}
                  {modalType === 'category' && 'Tambah Kategori Baru'}
                </h2>
                <p>
                  {modalType === 'editCandidate' && `Ubah detail untuk kandidat ${candidateToEdit?.name}.`}
                  {modalType === 'candidate' && 'Isi detail kandidat untuk menambahkannya ke dalam daftar polling.'}
                  {modalType === 'category' && 'Buat kategori polling baru untuk diikuti oleh para pemilih.'}
                </p>
              </div>

              <div className="modal-form">
                {(modalType === 'candidate' || modalType === 'editCandidate') && (
                  <>
                    <div>
                      <label>Nama Lengkap Kandidat</label>
                      <input 
                        type="text" 
                        className="modal-input" 
                        placeholder="Contoh: Budi Santoso" 
                        defaultValue={candidateToEdit?.name || ''}
                        required 
                      />
                    </div>
                    <div>
                      <label>Jabatan/Peran</label>
                      <input 
                        type="text" 
                        className="modal-input" 
                        placeholder="Contoh: Ketua RT. 01/01" 
                        defaultValue={candidateToEdit?.role || ''}
                        required 
                      />
                    </div>
                    <div>
                      <label>Kategori</label>
                      <select className="modal-input" defaultValue={candidateToEdit ? (candidateToEdit.category === 'RT/RW' ? 'rt' : 'posyandu') : ''} required>
                        <option value="">Pilih Kategori</option>
                        <option value="rt">Kandidat RT Terfavorit</option>
                        <option value="rw">Kandidat RW Terfavorit</option>
                        <option value="posyandu">Kader Posyandu Terfavorit</option> 
                      </select>
                    </div>
                  </>
                )}

                {modalType === 'category' && (
                  <>
                    <div>
                      <label>Judul Kategori</label>
                      <input type="text" className="modal-input" placeholder="Contoh: LOMBA TRADISIONAL TERFAVORIT" required />
                    </div>
                    <div>
                      <label>Deskripsi Singkat</label>
                      <textarea className="modal-input" rows="3" placeholder="Jelaskan tentang kategori ini" required />
                    </div>
                  </>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Batal
                </button>
                <button type="submit" className="btn-submit">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card confirm-modal">
            <div className="modal-header">
              <h2>Konfirmasi Penghapusan</h2>
              <p>
                Apakah Anda yakin ingin menghapus item ini?
                <br />
                <strong>{itemToDelete?.name}</strong>
                <br />
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={closeConfirmModal}>
                Batal
              </button>
              <button type="button" className="btn-submit danger" onClick={handleDelete}>
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  )
}

export default Admin
