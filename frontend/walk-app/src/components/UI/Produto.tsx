// src/components/UI/ProductGrid.tsx
import { useState } from "react";
import { useCart } from "../../context/useCart";
import { useFavorites } from "../../context/useFavorites";
import { useSearch } from "../../context/use.Search";
import ProductDetailsModal from "../UI/Modal";

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
    imagem:
      "https://oqvestir.fbitsstatic.net/img/p/vestido-curto-brasil-vintage-branco-226802/660856-5.jpg?w=1600&h=2133&v=202509041642",
    categoria: "novidades",
  },
  {
    id: 2,
    nome: "Blazer feminino social marrom",
    preco: 159.9,
    imagem:
      "https://shop2gether.fbitsstatic.net/img/p/blazer-feminino-maddie-marrom-193510/503067.jpg?w=1225&h=1633&v=no-value",
    categoria: "feminino",
  },
  {
    id: 3,
    nome: "Saia midi plissada lilás",
    preco: 99.9,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIl5BWqWfygTQtXSFjzvykiNFTBwjpjXpFGg&s",
    categoria: "feminino",
  },
  {
    id: 4,
    nome: "Vestido floral romântico",
    preco: 109.9,
    imagem:
      "https://img.ltwebstatic.com/images3_pi/2024/09/05/34/17255150348ae80e08608e839a7e8aa57d754e9184_thumbnail_750x999.jpg",
    categoria: "promocoes",
  },
  {
    id: 5,
    nome: "Camisa social branca com gravata",
    preco: 79.9,
    imagem:
      "https://cdn.awsli.com.br/600x700/2537/2537740/produto/2450281857bbdc3fb5b.jpg",
    categoria: "masculino",
  },
  {
    id: 6,
    nome: "Camiseta banda vintage",
    preco: 69.9,
    imagem:
      "https://down-br.img.susercontent.com/file/8cd3890ebc7ba6c2808811de946daf18",
    categoria: "promocoes",
  },
  {
    id: 7,
    nome: "Short esportivo cinza",
    preco: 89.9,
    imagem:
      "https://cdn.sistemawbuy.com.br/arquivos/ddaa0ea772456a9b1f31a54e3426ff86/produtos/686afc48ac2d3/short-academia-masculino-cinza-corrida-treino-01-686afc6c2d8ae.jpg",
    categoria: "masculino",
  },
  {
    id: 8,
    nome: "Camiseta preta com estampa",
    preco: 59.9,
    imagem:
      "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/rota34/media/uploads/produtos/foto/dsuuzanv/camiseta-preta.jpg",
    categoria: "novidades",
  },
  {
    id: 9,
    nome: "Calça jeans infantil",
    preco: 79.9,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV8xM_2c26v6WgZZ6rfWHOS0OI1mkG0e4BHg&s",
    categoria: "kids",
  },
  {
    id: 10,
    nome: "Tênis esportivo branco",
    preco: 129.9,
    imagem:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400",
    categoria: "calcados",
  },
  {
    id: 11,
    nome: "Bolsa de couro marrom",
    preco: 149.9,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf4kYI1b963Pj917kwpaMDN_UM-kSurHxppw&s0",
    categoria: "acessorios",
  },
  {
    id: 12,
    nome: "Camiseta algodão orgânico",
    preco: 49.9,
    imagem:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400",
    categoria: "tecidos",
  },
  {
    id: 13,
    nome: "Vestido infantil floral",
    preco: 69.9,
    imagem:
      "https://cdn.awsli.com.br/545/545706/produto/215281648/vestido-de-festa-9hq27v43z2.jfif",
    categoria: "kids",
  },
  {
    id: 14,
    nome: "Óculos de sol aviador",
    preco: 89.9,
    imagem:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400",
    categoria: "acessorios",
  },
  {
    id: 15,
    nome: "Tecido linho natural",
    preco: 29.9,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ9YoIH_73IBGBGWwxYuOmHpqdQVyA0t7KzQ&s",
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

        // 💸 Filtro por preço máximo
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
