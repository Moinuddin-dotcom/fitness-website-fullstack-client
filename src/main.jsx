import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Router } from './Routes/Router.jsx'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './Provider/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        {/* Query client */}
        <RouterProvider router={Router} />
        {/* Query client */}
        <Toaster position='top-right' reverseOrder={false} />
      </HelmetProvider>
    </AuthProvider>

  </StrictMode>,
)
