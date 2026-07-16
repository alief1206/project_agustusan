import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Vote from './pages/Vote.jsx'
import Admin from './pages/Admin.jsx'
import AdminResults from './pages/AdminResults.jsx'
import Register from './pages/Register.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/daftar" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/results" element={<AdminResults />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
