// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './context/CartContext.tsx';
import { FavoritesProvider } from './context/FavoritesContext.tsx';
import { SearchProvider } from './context/SearchContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <SearchProvider> 
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SearchProvider>
      </FavoritesProvider>
    </CartProvider>
  </React.StrictMode>
);