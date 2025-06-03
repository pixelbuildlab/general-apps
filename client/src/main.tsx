import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import Pages from './Pages.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { Toaster } from '@/components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Pages />
        <Toaster />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
)
