// src/pages/Favoritos/Favoritos.tsx
import { useFavorites } from "../../context/useFavorites";
import Navbar from "../../components/UI/Navbar";
import ProductDetailsModal from "../../components/UI/Modal"; // ajuste o caminho se necessário
import { useState } from "react";

interface FavoriteProduct {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

const Favoritos = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState<FavoriteProduct | null>(null);

  const handleRemove = (id: number) => {
    removeFromFavorites(id);
    alert("Produto removido dos favoritos ❤️");
  };

  const handleOpenModal = (product: FavoriteProduct) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl font-bold text-center mb-12">Seus Favoritos</h1>

          {favorites.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600 mb-4">Você ainda não tem favoritos ❤️</p>
              <p className="text-gray-500">Volte para a home e clique no coração dos produtos que você gosta!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden relative cursor-pointer"
                  onClick={() => handleOpenModal(product)}
                >
                  {/* Botão remover favoritos (lixeira ou coração vazio) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(product.id);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="red" strokeWidth="2">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="bg-gray-200 h-64 w-full" />

                  <div className="p-4">
                    <h3 className="font-bold text-lg truncate">{product.nome}</h3>
                    <p className="text-2xl font-bold text-green-600 mt-4">
                      R${product.preco.toFixed(2)}
                    </p>

                    <button className="mt-4 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default Favoritos;