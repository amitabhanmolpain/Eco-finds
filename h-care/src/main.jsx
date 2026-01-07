import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import { ProductProvider } from '../context/ProductContext.jsx'
import { OrderProvider } from '../context/OrderContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ProductProvider>
      <OrderProvider>
        <App/>
      </OrderProvider>
    </ProductProvider>
  </AuthProvider>,
)
