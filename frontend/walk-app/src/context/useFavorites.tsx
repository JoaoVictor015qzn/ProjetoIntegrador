// src/context/useFavorites.tsx
import { useContext } from 'react';
import { FavoritesContext, type FavoritesContextType } from './FavoritesContext';

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};