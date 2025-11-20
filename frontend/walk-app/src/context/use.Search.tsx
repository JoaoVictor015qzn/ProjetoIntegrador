// src/context/useSearch.tsx
import { useContext } from "react";
import { SearchContext, type SearchContextType } from "./SearchContext";

export const useSearch = (): SearchContextType & {
  maxPrice: number | null;
  cleanTerm: string;
} => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within a SearchProvider");

  const { searchTerm } = context;

  const numeric = Number(searchTerm);
  const isNumber = !isNaN(numeric) && numeric > 0;

  const maxPrice = isNumber ? numeric : null;
  const cleanTerm = isNumber ? "" : searchTerm.toLowerCase();

  return { ...context, maxPrice, cleanTerm };
};