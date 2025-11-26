/* eslint-disable react-refresh/only-export-components */  // Desabilita a regra ESLint para este arquivo

// src/context/CartContext.tsx
import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
  tamanho?: string;  // Opcional para opções do modal
  cor?: string;      // Opcional para opções do modal
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantidade'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantidade: number) => void;
  getTotal: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantidade'>) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...prev, { ...item, quantidade: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantidade: number) => {
    if (quantidade < 1) return removeFromCart(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantidade } : item))
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.preco * item.quantidade, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};