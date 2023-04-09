import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from 'react-auth-kit'
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <AuthProvider 
        authType = {'cookie'}                            
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={false}>
          <App />
      </AuthProvider>
    </SnackbarProvider>

  </React.StrictMode>,
)
