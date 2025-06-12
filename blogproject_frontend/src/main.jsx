import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SelectedBlogProvider } from './Context/SelectedBlog.jsx'
import { SelectedEmailProvider } from './Context/UserDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SelectedEmailProvider>
      <SelectedBlogProvider>
        <App />
      </SelectedBlogProvider>
    </SelectedEmailProvider>
  </StrictMode>,
)
