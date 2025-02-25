import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextApi from './context/ContextApi.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ContextApi>
      <App />
    </ContextApi>
  </BrowserRouter>
)
