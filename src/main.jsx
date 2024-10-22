import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextOfUserProvider } from './context/UserContext.jsx'
import { ContextOfCartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextOfUserProvider>
      <ContextOfCartProvider>
        <App />
      </ContextOfCartProvider>
    </ContextOfUserProvider>
  </StrictMode>,
)
