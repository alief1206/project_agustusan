const getFallbackUrl = () => {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://polling-penganjuran-backend.vercel.app/api'
  }
  return 'http://localhost:5000/api'
}

const rawBaseUrl = import.meta.env.VITE_API_URL || getFallbackUrl()
const API_BASE_URL = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl.replace(/\/+$/, '')}/api`
const TOKEN_KEY = 'polling_admin_token'

export const getAdminToken = () => localStorage.getItem(TOKEN_KEY)

export const setAdminToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const clearAdminToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

const request = async (path, options = {}) => {
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.auth ? { Authorization: `Bearer ${getAdminToken()}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (response.status === 204) {
    return null
  }

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.message || 'Permintaan API gagal.')
  }

  return payload.data ?? payload
}

export const api = {
  login: (body) => request('/auth/login', { method: 'POST', body }),
  me: () => request('/auth/me', { auth: true }),
  getDashboard: () => request('/results/dashboard'),
  getResults: () => request('/results'),
  getSummary: () => request('/results/summary'),
  getCategories: () => request('/categories'),
  createCategory: (body) => request('/categories', { method: 'POST', body, auth: true }),
  updateCategory: (id, body) => request(`/categories/${id}`, { method: 'PATCH', body, auth: true }),
  deleteCategory: (id) => request(`/categories/${id}`, { method: 'DELETE', auth: true }),
  getCandidates: () => request('/candidates'),
  createCandidate: (body) => request('/candidates', { method: 'POST', body, auth: true }),
  updateCandidate: (id, body) => request(`/candidates/${id}`, { method: 'PATCH', body, auth: true }),
  deleteCandidate: (id) => request(`/candidates/${id}`, { method: 'DELETE', auth: true }),
  createVote: (body) => request('/votes', { method: 'POST', body }),
}
