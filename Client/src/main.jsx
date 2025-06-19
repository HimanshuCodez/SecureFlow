import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
    <App />
</GoogleOAuthProvider>
  </AppContextProvider>
  </BrowserRouter>

)
