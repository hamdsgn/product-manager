import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <RecentlyViewedProvider>
          <App />
        </RecentlyViewedProvider>
      </FavoritesProvider>
    </CartProvider>
  </StrictMode>,
)
