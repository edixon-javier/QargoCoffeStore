import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

import { CartProvider } from './contexts/CartContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { OrderProvider } from './contexts/OrderContext.tsx';
import { initializeMockData } from './initializeMockData';

// Inicializar datos mock y tienda seleccionada antes de renderizar la app
initializeMockData();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <OrderProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);