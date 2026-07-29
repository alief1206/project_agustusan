import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import { api, clearAdminToken, getAdminToken } from '../lib/api'

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

  *,
*::before,
*::after {
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

  img,
svg {
  max-width: 100%;
  height: auto;
}

  #root {
    min-height: 100vh;
  }

  .dashboard {
  position: relative;
  overflow-x: hidden;
  width: 100%;
}

  .page-frame {
  position: relative;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
}

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
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
  align-items: flex-start;
  gap: 0.15rem;
  white-space: nowrap;
  min-width: 0;
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
    white-space: nowrap;
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
  flex-wrap: wrap;
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
    overflow: hidden;
  }

  .admin-hero h1 {
    margin: 0;
    font-size: clamp(2.8rem, 4vw, 3.5rem);
    line-height: 1.02;
    color: #111827;
    word-break: break-word;
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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
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

  .table-wrapper {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.admin-table {
  width: 100%;
  min-width: 780px;
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
  margin: .25rem;
  cursor: pointer;
  white-space: nowrap;
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

    width: 100%;
    position: sticky;
    top: 1rem;
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
    width:100%;
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
    word-break: break-word;
  }

  .quick-card button {
    border: none;
    background: #fff;
    border-radius: 999px;
    padding: 0.6rem 0.9rem;
    font-weight: 700;
    color: #10b981;
    cursor: pointer;
    margin-top: .4rem;
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
    width: 100%;
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
    overflow-y:auto;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

.modal-card {
  background: #ffffff;
  border-radius: 28px;
  padding: 2rem;
  width: min(100%, 500px);
  max-height: 90vh;
  overflow-y: auto;
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
  resize: vertical;
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
  flex-wrap: wrap;
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

  .admin-message {
    margin-top: 1rem;
    padding: 1rem 1.2rem;
    border-radius: 18px;
    background: #f0fdf4;
    color: #047857;
    font-weight: 700;
    text-align: center;
  }

  .admin-message.error {
    background: #fee2e2;
    color: #b91c1c;
  }

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
      .admin-sidebar{
    position: static;
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

   .brand {
  width: auto;
  justify-content: flex-start;
  align-items: center;
  gap: 0.75rem;
}

.topbar-actions {
  width: 100%;
  justify-content: flex-end;
}

.action-button {
  padding: .75rem 1rem;
  font-size: .9rem;
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

    .brand-copy strong {
  font-size: 1rem;
}

.brand-copy span {
  font-size: .8rem;
}

.topbar-actions {
  width: 100%;
  justify-content: center;
}

.action-button {
  flex: 1;
  min-width: 110px;
}

.mobile-menu-btn {
  flex: 0;
}

.site-footer{
  text-align:center;
}

.footer-links{
  justify-content:center;
}
  }

@media (max-width: 480px) {

  /* Modal */
  .modal-card {
    padding: 1.25rem;
    border-radius: 20px;
  }

  .modal-header h2 {
    font-size: 1.25rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .btn-cancel,
  .btn-submit {
    width: 100%;
  }

  .modal-input {
    font-size: 16px;
  }

  /* Topbar */
  .brand {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: .6rem;
  width: auto;
}

  .brand-mark {
    width: 42px;
    height: 42px;
  }

  .brand-copy strong {
    font-size: .95rem;
  }

  .brand-copy span {
    font-size: .75rem;
  }

  .topbar-actions {
    gap: .5rem;
  }

  .action-button {
    font-size: .8rem;
    padding: .7rem;
  }

}

  @media (max-width: 768px){

  .table-wrapper{
    border-radius:20px;
  }

  .admin-table th,
  .admin-table td{
    white-space: nowrap;
  }

}

@media (max-width:360px){

  .page-frame{
    padding:1rem .75rem 2rem;
  }

  .admin-hero h1{
    font-size:1.8rem;
  }

  .admin-hero p{
    font-size:.9rem;
  }

  .admin-table-header h2{
    font-size:1rem;
  }

  .quick-avatar{
    width:48px;
    height:48px;
  }

}
`

const formatStatus = (status) => (status === 'ACTIVE' ? 'Aktif' : 'Tidak Aktif')
const getInitials = (name = '') => name.split(' ').map((part) => part[0]).join('').slice(0, 3)

function Admin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [candidateToEdit, setCandidateToEdit] = useState(null)
  const [categoryToEdit, setCategoryToEdit] = useState(null)
  const [categories, setCategories] = useState([])
  const [candidates, setCandidates] = useState([])
  const [dashboard, setDashboard] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [isSaving, setIsSaving] = useState(false)

  const isLoggedIn = Boolean(getAdminToken())

  const showMessage = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
  }

  const loadAdminData = async () => {
    const [dashboardData, categoryData, candidateData] = await Promise.all([
      api.getDashboard(),
      api.getCategories(),
      api.getCandidates(),
    ])
    setDashboard(dashboardData)
    setCategories(categoryData)
    setCandidates(candidateData)
  }

  useEffect(() => {
    if (!isLoggedIn) return

    loadAdminData().catch((error) => showMessage(error.message, 'error'))
  }, [isLoggedIn])

  const stats = useMemo(() => {
    const summary = dashboard?.summary || {
      participants: 0,
      totalVotes: 0,
      activeCategories: 0,
      totalCandidates: 0,
    }

    return [
      { label: 'TOTAL KANDIDAT', value: summary.totalCandidates.toLocaleString('id-ID') },
      { label: 'TOTAL KATEGORI AKTIF', value: summary.activeCategories.toLocaleString('id-ID') },
      { label: 'TOTAL SUARA MASUK', value: summary.totalVotes.toLocaleString('id-ID') },
      { label: 'PESERTA POLLING', value: summary.participants.toLocaleString('id-ID') },
    ]
  }, [dashboard])

  const topCandidates = useMemo(() => {
    return (dashboard?.topByCategory || []).flatMap((category) =>
      category.candidates.map((candidate, index) => ({
        ...candidate,
        rank: index + 1,
        categoryName: category.name,
      })),
    )
  }, [dashboard])

  const filteredCandidates = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase()

    return candidates.filter((candidate) => {
      const matchesKeyword = !keyword || candidate.name.toLowerCase().includes(keyword)
      const matchesCategory = !categoryFilter || candidate.categoryId === categoryFilter

      return matchesKeyword && matchesCategory
    })
  }, [candidates, categoryFilter, searchTerm])

  const openModal = (type) => {
    setModalType(type)
    setCandidateToEdit(null)
    setCategoryToEdit(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalType(null)
    setCandidateToEdit(null)
    setCategoryToEdit(null)
  }

  const openEditModal = (candidate) => {
    setModalType('editCandidate')
    setCandidateToEdit(candidate)
    setIsModalOpen(true)
  }

  const openEditCategoryModal = (category) => {
    setModalType('editCategory')
    setCategoryToEdit(category)
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setIsSaving(true)

    try {
      if (modalType === 'candidate' || modalType === 'editCandidate') {
        const body = {
          name: formData.get('name'),
          role: formData.get('role'),
          region: formData.get('region'),
          categoryId: formData.get('categoryId'),
          status: formData.get('status') || 'ACTIVE',
        }

        if (modalType === 'editCandidate') {
          await api.updateCandidate(candidateToEdit.id, body)
          showMessage(`Data kandidat "${candidateToEdit.name}" berhasil diperbarui.`)
        } else {
          await api.createCandidate(body)
          showMessage('Kandidat baru berhasil ditambahkan.')
        }
      }

      if (modalType === 'category' || modalType === 'editCategory') {
        const body = {
          name: formData.get('name'),
          description: formData.get('description'),
        }

        if (modalType === 'editCategory') {
          await api.updateCategory(categoryToEdit.id, body)
          showMessage(`Kategori "${categoryToEdit.name}" berhasil diperbarui.`)
        } else {
          await api.createCategory(body)
          showMessage('Kategori baru berhasil ditambahkan.')
        }
      }

      closeModal()
      await loadAdminData()
    } catch (error) {
      showMessage(error.message, 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const openConfirmModal = (item, type = 'candidate') => {
    setItemToDelete({ ...item, deleteType: type })
    setIsConfirmModalOpen(true)
  }

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false)
    setItemToDelete(null)
  }

  const handleDelete = async () => {
    if (!itemToDelete) return

    try {
      if (itemToDelete.deleteType === 'category') {
        await api.deleteCategory(itemToDelete.id)
      } else {
        await api.deleteCandidate(itemToDelete.id)
      }
      showMessage(`"${itemToDelete.name}" berhasil dihapus.`)
      closeConfirmModal()
      await loadAdminData()
    } catch (error) {
      showMessage(error.message, 'error')
    }
  }

  const handleLogout = () => {
    clearAdminToken()
    window.location.href = '/login'
  }

  if (!isLoggedIn) {
    return (
      <>
        <style>{adminStyles}</style>
        <div className="dashboard admin-page">
          <div className="page-frame">
            <section className="admin-hero">
              <h1>AKSES <span>ADMIN</span></h1>
              <p>Silakan masuk terlebih dahulu untuk memantau dan mengubah data polling.</p>
              <p className="admin-message error">Token admin belum tersedia.</p>
              <Link to="/login" className="action-button">MASUK ADMIN</Link>
            </section>
          </div>
        </div>
      </>
    )
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
              <button type="button" className="action-button secondary" onClick={loadAdminData}>REFRESH</button>
              <button type="button" className="action-button secondary" onClick={handleLogout}>KELUAR</button>
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
            {message ? <p className={`admin-message ${messageType === 'error' ? 'error' : ''}`}>{message}</p> : null}
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
                    <input
                      type="search"
                      placeholder="Cari kandidat..."
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                      <option value="">Semua Kategori</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="table-wrapper">
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
                      {filteredCandidates.map((candidate) => (
                        <tr key={candidate.id}>
                          <td>
                            <strong>{candidate.name}</strong>
                            <span>{candidate.role}</span>
                          </td>
                          <td>{candidate.category?.name}</td>
                          <td>{candidate.region || '-'}</td>
                          <td>{candidate._count?.votes?.toLocaleString('id-ID') || 0} Suara</td>
                          <td className={candidate.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}>
                            {formatStatus(candidate.status)}
                          </td>
                          <td>
                            <button type="button" onClick={() => openEditModal(candidate)}>EDIT</button>
                            <button type="button" className="danger" onClick={() => openConfirmModal(candidate, 'candidate')}>HAPUS</button>
                          </td>
                        </tr>
                      ))}
                      {filteredCandidates.length === 0 ? (
                        <tr>
                          <td colSpan="6">Belum ada kandidat yang cocok.</td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <aside className="admin-sidebar" id="pengguna">
              <div className="admin-sidebar-header">
                <h3>3 Besar Setiap Kategori</h3>
              </div>
              <div className="admin-quick-list">
                {topCandidates.map((candidate) => (
                  <div key={`${candidate.categoryName}-${candidate.id}`} className="quick-card">
                    <div className="quick-avatar" aria-hidden="true">
                      {candidate.rank}
                    </div>
                    <div>
                      <p>{candidate.name}</p>
                      <span>{candidate.categoryName} - {candidate.votes.toLocaleString('id-ID')} suara</span>
                    </div>
                  </div>
                ))}
                {topCandidates.length === 0 ? <p>Belum ada suara yang masuk.</p> : null}
              </div>

              <div className="admin-sidebar-header">
                <h3>Kelola Kategori</h3>
              </div>
              <div className="admin-quick-list">
                {categories.map((category) => (
                  <div key={category.id} className="quick-card">
                    <div className="quick-avatar" aria-hidden="true">
                      {getInitials(category.name)}
                    </div>
                    <div>
                      <p>{category.name}</p>
                      <button type="button" onClick={() => openEditCategoryModal(category)}>[EDIT]</button>
                      <button type="button" className="danger" onClick={() => openConfirmModal(category, 'category')}>[HAPUS]</button>
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
                    {modalType === 'editCategory' && 'Edit Kategori'}
                    {modalType === 'category' && 'Tambah Kategori Baru'}
                  </h2>
                  <p>
                    {modalType === 'editCandidate' && `Ubah detail untuk kandidat ${candidateToEdit?.name}.`}
                    {modalType === 'candidate' && 'Isi detail kandidat untuk menambahkannya ke dalam daftar polling.'}
                    {modalType === 'editCategory' && `Ubah detail kategori ${categoryToEdit?.name}.`}
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
                          name="name"
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
                          name="role"
                          className="modal-input"
                          placeholder="Contoh: Ketua RT. 01/01"
                          defaultValue={candidateToEdit?.role || ''}
                          required
                        />
                      </div>
                      <div>
                        <label>Kategori</label>
                        <select name="categoryId" className="modal-input" defaultValue={candidateToEdit?.categoryId || ''} required>
                          <option value="">Pilih Kategori</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label>Wilayah</label>
                        <input
                          type="text"
                          name="region"
                          className="modal-input"
                          placeholder="Contoh: Welaran"
                          defaultValue={candidateToEdit?.region || ''}
                        />
                      </div>
                      <div>
                        <label>Status</label>
                        <select name="status" className="modal-input" defaultValue={candidateToEdit?.status || 'ACTIVE'} required>
                          <option value="ACTIVE">Aktif</option>
                          <option value="INACTIVE">Tidak Aktif</option>
                        </select>
                      </div>
                    </>
                  )}

                  {(modalType === 'category' || modalType === 'editCategory') && (
                    <>
                      <div>
                        <label>Judul Kategori</label>
                        <input
                          type="text"
                          name="name"
                          className="modal-input"
                          placeholder="Contoh: LOMBA TRADISIONAL TERFAVORIT"
                          defaultValue={categoryToEdit?.name || ''}
                          required
                        />
                      </div>
                      <div>
                        <label>Deskripsi Singkat</label>
                        <textarea
                          name="description"
                          className="modal-input"
                          rows="3"
                          placeholder="Jelaskan tentang kategori ini"
                          defaultValue={categoryToEdit?.description || ''}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={closeModal}>
                    Batal
                  </button>
                  <button type="submit" className="btn-submit" disabled={isSaving}>
                    {isSaving ? 'Menyimpan...' : 'Simpan'}
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
