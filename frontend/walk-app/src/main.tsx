import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { SearchProvider } from "./context/SearchContext";
import InitApp from "./components/InitApp";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <FavoritesProvider>
        <SearchProvider>
          <BrowserRouter>
            <InitApp>
              <App />
            </InitApp>
          </BrowserRouter>
        </SearchProvider>
      </FavoritesProvider>
    </CartProvider>
  </React.StrictMode>
);