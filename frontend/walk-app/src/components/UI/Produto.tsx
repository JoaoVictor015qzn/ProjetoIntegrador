// src/components/UI/ProductGrid.tsx
import { useEffect, useState } from "react";
import { useCart } from "../../context/useCart";
import { useFavorites } from "../../context/useFavorites";
import ProductDetailsModal from "./Modal";
import { Heart } from "lucide-react";

interface ApiProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
}

interface ModalProduct {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

const ProductGrid = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ModalProduct | null>(null);

  const { addToCart } = useCart();
  const { addToFavorites, favorites } = useFavorites(); // ← Só favorites aqui

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products?active=true`, {
          headers,
        });

        if (!res.ok) throw new Error("Erro ao carregar produtos");

        const data: ApiProduct[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: ApiProduct) => {
    addToCart({
      id: product.id,
      nome: product.name,
      preco: product.price,
      imagem: "/assets/placeholder.jpg",
    });
  };

  const handleAddToFavorites = (product: ApiProduct) => {
    addToFavorites({
      id: product.id,
      nome: product.name,
      preco: product.price,
      imagem: "/assets/placeholder.jpg",
    });
  };

  // ← Criado localmente no componente (não vem do contexto)
  const isFavorite = (productId: number) =>
    favorites.some((f) => f.id === productId);

  const handleOpenModal = (product: ApiProduct) => {
    setSelectedProduct({
      id: product.id,
      nome: product.name,
      preco: product.price,
      imagem: "/assets/placeholder.jpg",
    });
  };

  if (loading)
    return <p className="text-center py-10 text-lg">Carregando produtos...</p>;

  if (products.length === 0)
    return <p className="text-center py-10 text-lg">Nenhum produto disponível.</p>;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 py-10">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleOpenModal(product)}
            className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden relative cursor-pointer"
          >
            {/* Botão de Favoritos */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToFavorites(product);
              }}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
            >
              <Heart
                size={24}
                className={
                  isFavorite(product.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600"
                }
              />
            </button>

            {/* Imagem placeholder */}
            <div className="bg-gray-200 h-64 w-full" />

            <div className="p-4">
              <h3 className="font-bold text-lg truncate">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {product.description}
              </p>
              <p className="text-2xl font-bold text-green-600 mt-4">
                R$ {product.price.toFixed(2)}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="mt-4 w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
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
export default ProductGrid;