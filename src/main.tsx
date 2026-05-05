import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'
import { LoginPage } from './pages/login.tsx'
import { ProtectedRoute } from './components/protected-route.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)
