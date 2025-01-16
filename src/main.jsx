import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Router } from './Routes/Router.jsx'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      {/* Query client */}
      <RouterProvider router={Router} />
      {/* Query client */}
      <Toaster position='top-right' reverseOrder={false} />
    </HelmetProvider>
  </StrictMode>,
)
