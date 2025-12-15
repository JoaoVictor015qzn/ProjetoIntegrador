/* eslint-disable react-refresh/only-export-components */  // Desabilita a regra ESLint para este arquivo

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../services/api";

/* =======================
   TIPOS VINDOS DO BACKEND
======================= */

interface CartItemApi {
  productId: number;
  productName: string;
  unitPrice: number;
  qty: number;
}

interface CartResponse {
  items: CartItemApi[];
  total: number;
}

/* =======================
   TIPO USADO NO FRONT
======================= */

interface CartItem {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
  tamanho?: string;
  cor?: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantidade">) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantidade: number) => Promise<void>;
  getTotal: () => number;
  loadCart: () => Promise<void>;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

/* =======================
   PROVIDER
======================= */

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCart = async () => {
    try {
      const data = await api.get<CartResponse>("/api/cart");

      const mappedItems: CartItem[] = data.items.map((item) => ({
        id: item.productId,
        nome: item.productName,
        preco: item.unitPrice,
        imagem: "/assets/placeholder.jpg",
        quantidade: item.qty,
      }));

      setCart(mappedItems);
    } catch (err) {
      console.error("Erro ao carregar carrinho", err);
      setCart([]);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadCart();
    }
  }, []);

  const addToCart = async (item: Omit<CartItem, "quantidade">) => {
    try {
      await api.post<void, { productId: number; qty: number }>(
        "/api/cart/items",
        {
          productId: item.id,
          qty: 1,
        }
      );

      await loadCart();
    } catch {
      alert("Erro ao adicionar ao carrinho");
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      await api.post<void, { productId: number; qty: number }>(
        "/api/cart/items",
        {
          productId: id,
          qty: 0,
        }
      );

      await loadCart();
    } catch {
      alert("Erro ao remover item");
    }
  };

  const updateQuantity = async (id: number, quantidade: number) => {
    try {
      await api.post<void, { productId: number; qty: number }>(
        "/api/cart/items",
        {
          productId: id,
          qty: quantidade,
        }
      );

      await loadCart();
    } catch {
      alert("Erro ao atualizar quantidade");
    }
  };

  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
        loadCart,
        clearCart: () => setCart([]),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* =======================
   HOOK
======================= */

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};