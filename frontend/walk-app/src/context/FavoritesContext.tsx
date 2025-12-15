// src/context/FavoritesContext.tsx
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface FavoriteItem {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === item.id)) return prev; // já existe
      return [...prev, item];
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export { FavoritesContext };