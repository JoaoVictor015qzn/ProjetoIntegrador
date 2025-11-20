/* eslint-disable react-refresh/only-export-components */

import { createContext, useState } from "react";

export type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};