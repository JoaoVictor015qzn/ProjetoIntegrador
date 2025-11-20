// src/components/UI/ProductGrid.tsx
import { useState } from 'react';
import { useCart } from '../../context/useCart';
import { useFavorites } from '../../context/useFavorites';
import { useSearch } from '../../context/use.Search';
import ProductDetailsModal from '../UI/Modal';

interface Product {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
}

const products: Product[] = [
  {
    id: 1,
    nome: "Vestido curto estampado vintage",
    preco: 89.9,
    imagem: "https://images.unsplash.com/photo-1618354691438-25bc0f0f8f29?w=400",
    categoria: "novidades",
  },
  {
    id: 2,
    nome: "Blazer feminino social marrom",
    preco: 159.9,
    imagem: "https://images.unsplash.com/photo-1593032465171-8b09c9d57d3a?w=400",
    categoria: "feminino",
  },
  {
    id: 3,
    nome: "Saia midi plissada lilás",
    preco: 99.9,
    imagem: "https://images.unsplash.com/photo-1613553231244-2a639b7a9d1d?w=400",
    categoria: "feminino",
  },
  {
    id: 4,
    nome: "Vestido floral romântico",
    preco: 109.9,
    imagem: "https://images.unsplash.com/photo-1589187155470-3a7a5f9a2b66?w=400",
    categoria: "promocoes",
  },
  {
    id: 5,
    nome: "Camisa social branca com gravata",
    preco: 79.9,
    imagem: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    categoria: "masculino",
  },
  {
    id: 6,
    nome: "Camiseta banda vintage",
    preco: 69.9,
    imagem: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400",
    categoria: "promocoes",
  },
  {
    id: 7,
    nome: "Short esportivo cinza",
    preco: 89.9,
    imagem: "https://images.unsplash.com/photo-1602810318383-e386cc2a3a9b?w=400",
    categoria: "masculino",
  },
  {
    id: 8,
    nome: "Camiseta preta com estampa",
    preco: 59.9,
    imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    categoria: "novidades",
  },
  {
    id: 9,
    nome: "Calça jeans infantil",
    preco: 79.9,
    imagem: "https://images.unsplash.com/photo-1602293589930-45aad59df195?w=400",
    categoria: "kids",
  },
  {
    id: 10,
    nome: "Tênis esportivo branco",
    preco: 129.9,
    imagem: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400",
    categoria: "calcados",
  },
  {
    id: 11,
    nome: "Bolsa de couro marrom",
    preco: 149.9,
    imagem: "https://images.unsplash.com/photo-1566150902887-83bed9c23710?w=400",
    categoria: "acessorios",
  },
  {
    id: 12,
    nome: "Camiseta algodão orgânico",
    preco: 49.9,
    imagem: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400",
    categoria: "tecidos",
  },
  {
    id: 13,
    nome: "Vestido infantil floral",
    preco: 69.9,
    imagem: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=400",
    categoria: "kids",
  },
  {
    id: 14,
    nome: "Óculos de sol aviador",
    preco: 89.9,
    imagem: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400",
    categoria: "acessorios",
  },
  {
    id: 15,
    nome: "Tecido linho natural",
    preco: 29.9,
    imagem: "https://images.unsplash.com/photo-1584278404602-8d2e9e0b2e26?w=400",
    categoria: "tecidos",
  },
  {
    id: 16,
    nome: "Sandália rasteira",
    preco: 99.9,
    imagem: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400",
    categoria: "calcados",
  },
];

const ProductGrid = () => {
  const { addToCart } = useCart();
  const { addToFavorites } = useFavorites();
  const { cleanTerm, maxPrice } = useSearch();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (item: Product) => setSelectedProduct(item);
  const closeModal = () => setSelectedProduct(null);

  const categories = [
    { id: "promocoes", title: "PROMOÇÕES" },
    { id: "feminino", title: "FEMININO" },
    { id: "masculino", title: "MASCULINO" },
    { id: "kids", title: "KIDS" },
    { id: "tecidos", title: "TECIDOS" },
    { id: "acessorios", title: "ACESSÓRIOS" },
    { id: "calcados", title: "CALÇADOS" },
    { id: "novidades", title: "NOVIDADES" },
  ];

  return (
    <>
      {categories.map((cat) => {
        let catProducts = products.filter((p) => p.categoria === cat.id);

        // 🔍 Busca por texto
        if (cleanTerm) {
          catProducts = catProducts.filter((p) =>
            p.nome.toLowerCase().includes(cleanTerm)
          );
        }

        // 💸 Filtro por preço máximo (ex: "50")
        if (maxPrice !== null) {
          catProducts = catProducts.filter((p) => p.preco <= maxPrice);
        }

        return (
          <section key={cat.id} id={cat.id} className="bg-white py-10">
            <h2 className="text-center text-3xl font-extrabold text-white bg-black py-3 tracking-wide">
              {cat.title}
            </h2>

            {catProducts.length === 0 ? (
              <p className="text-center mt-10 text-gray-600 text-lg">
                Não possui produto nesta seção com os filtros aplicados.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 mt-10">
                {catProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center bg-white shadow-md rounded-lg p-3 hover:scale-105 transition-transform"
                  >
                    <img
                      src={item.imagem}
                      className="rounded-md w-48 h-64 object-cover cursor-pointer"
                      onClick={() => openModal(item)}
                    />

                    <p className="text-sm mt-2 text-center">{item.nome}</p>

                    <p className="text-sm font-semibold">
                      R${item.preco.toFixed(2)}{" "}
                      <span className="text-gray-500">(5% OFF no Pix)</span>
                    </p>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm"
                      >
                        Carrinho
                      </button>
                      <button
                        onClick={() => addToFavorites(item)}
                        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 text-sm"
                      >
                        Favoritar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}

      {selectedProduct && (
        <ProductDetailsModal product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
};

export default ProductGrid;