import { Link } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'

const adminStyles = `
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
    box-shadow: 0 22px 55px rgba(70, 17, 36, 0.12);
  }

  .admin-hero h1 {
    margin: 0;
    font-size: clamp(2.8rem, 4vw, 3.5rem);
    line-height: 1.02;
  }

  .admin-hero h1 span {
    color: #d30f1a;
  }

  .admin-hero p {
    margin: 1rem auto 0;
    max-width: 760px;
    color: #584651;
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
    background: #fff6f5;
    border: 1px solid #f0d7d7;
    padding: 1.55rem 1.4rem;
    border-radius: 28px;
    box-shadow: 0 14px 30px rgba(79, 24, 36, 0.08);
  }

  .admin-metric-card span {
    display: block;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    color: #5b4650;
    text-transform: uppercase;
  }

  .admin-metric-card strong {
    display: block;
    margin-top: 0.7rem;
    font-size: 2rem;
    line-height: 1;
    color: #2b181f;
  }

  .admin-metric-card p {
    margin: 0.85rem 0 0;
    color: #69555f;
  }

  .admin-table-card {
    background: #ffffff;
    border-radius: 32px;
    box-shadow: 0 24px 65px rgba(70, 17, 36, 0.1);
    overflow: hidden;
  }

  .admin-table-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem 1.75rem;
    background: #f8e5e6;
  }

  .admin-table-header h2 {
    margin: 0;
    font-size: 1.1rem;
    color: #2b171d;
  }

  .admin-filters {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
    width: min(100%, 520px);
  }

  .admin-filters input,
  .admin-filters select {
    width: 100%;
    border-radius: 999px;
    border: 1px solid #e1c7c9;
    padding: 0.85rem 1rem;
    font-size: 0.95rem;
    color: #3f2f37;
  }

  .admin-table {
    width: 100%;
    border-collapse: collapse;
  }

  .admin-table th,
  .admin-table td {
    padding: 1rem 1.25rem;
    text-align: left;
    border-bottom: 1px solid #f0e4e6;
  }

  .admin-table th {
    color: #5f4f58;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .admin-table tbody tr:hover {
    background: #fff7f6;
  }

  .admin-table td strong {
    display: block;
    margin-bottom: 0.35rem;
    color: #241721;
  }

  .admin-table td span {
    display: block;
    color: #6b5761;
    font-size: 0.92rem;
  }

  .admin-table button {
    border: none;
    background: transparent;
    color: #d30f1a;
    font-weight: 700;
    margin-right: 0.5rem;
    cursor: pointer;
  }

  .admin-table button.danger {
    color: #a1191f;
  }

  .status-active {
    color: #1f6d27;
    font-weight: 700;
  }

  .status-inactive {
    color: #a11f23;
    font-weight: 700;
  }

  .admin-sidebar {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 32px;
    padding: 1.5rem;
    box-shadow: 0 22px 55px rgba(70, 17, 36, 0.12);
    display: grid;
    gap: 1rem;
  }

  .admin-sidebar-header h3 {
    margin: 0;
    color: #2b161c;
    font-size: 1rem;
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
    background: #fff5f4;
    border: 1px solid #f1d4d6;
    border-radius: 24px;
  }

  .quick-avatar {
    width: 56px;
    height: 56px;
    border-radius: 18px;
    background: #d30f1a;
    color: #fff;
    display: grid;
    place-items: center;
    font-weight: 800;
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
    color: #d30f1a;
    cursor: pointer;
  }

  .quick-card button.danger {
    background: #f6d8d8;
    color: #a11f23;
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

    .admin-content {
      grid-template-columns: 1fr;
    }

    .admin-metrics {
      grid-template-columns: 1fr;
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

          <nav className="nav-links admin-nav" aria-label="Admin navigation">
            <Link to="/">BERANDA</Link>
            <a href="#kelola-kandidat">KELOLA KANDIDAT</a>
            <a href="#kelola-kategori">KELOLA KATEGORI</a>
            <Link to="/admin/results">STATISTIK</Link>
            <a href="#pengguna">PENGGUNA</a>
            <a href="#pengaturan">PENGATURAN</a>
          </nav>

          <Link to="/" className="action-button">KEMBALI</Link>
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
                  <input type="search" placeholder="Search" />
                  <select>
                    <option>Kategori Utama</option>
                    <option>RT/RW</option>
                    <option>Posyandu</option>
                  </select>
                  <select>
                    <option>Kategori</option>
                    <option>RT/RW</option>
                    <option>Posyandu</option>
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
                        <button type="button">EDIT</button>
                        <button type="button" className="danger">HAPUS</button>
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
                    <button type="button" className={action.type === 'HAPUS' ? 'danger' : undefined}>
                      [{action.type}]
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="secondary-button create-button">
              BUAT KANDIDAT BARU
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
      </div>
    </>
  )
}

export default Admin
