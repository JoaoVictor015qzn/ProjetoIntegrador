// src/pages/FavoritesPage/FavoritesPage.tsx (página completa de favoritos)
import Navbar from '../../components/UI/Navbar';
import { useFavorites } from '../../context/useFavorites';
import { useState } from 'react';
import ProductDetailsModal from '../../components/UI/Modal';  // Use o caminho correto (ajuste se for '../../components/UI/Modal')

import type { FavoriteItem } from '../../context/FavoritesContext';  // Importe o tipo FavoriteItem se necessário (caso não esteja acessível)

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState<FavoriteItem | null>(null);  // Adicione o tipo aqui: FavoriteItem | null

  const openModal = (item: typeof favorites[0]) => {  // Tipo já correto
    setSelectedProduct(item);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-black">Seus Favoritos</h1>
          <p className="text-black">Você ainda não adicionou itens aos seus favoritos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Seus Favoritos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow">
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-full h-64 object-cover mb-2 rounded cursor-pointer"
                onClick={() => openModal(item)}
              />
              <p className="font-bold">{item.nome}</p>
              <p>R${item.preco.toFixed(2)}</p>
              <button onClick={() => removeFromFavorites(item.id)} className="mt-2 text-red-500">Remover</button>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && <ProductDetailsModal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
};

export default FavoritesPage;