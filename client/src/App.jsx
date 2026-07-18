import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Vote from './pages/Vote.jsx'
import Admin from './pages/Admin.jsx'
import AdminResults from './pages/AdminResults.jsx'
import Login from './pages/login.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/results" element={<AdminResults />} />
        <Route path="/login" element={<Login />} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
