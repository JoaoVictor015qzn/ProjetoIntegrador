const products = [
  {
    id: 1,
    nome: "Vestido curto estampado vintage",
    preco: 89.9,
    imagem:
      "https://images.unsplash.com/photo-1618354691438-25bc0f0f8f29?w=400",
  },
  {
    id: 2,
    nome: "Blazer feminino social marrom",
    preco: 159.9,
    imagem:
      "https://images.unsplash.com/photo-1593032465171-8b09c9d57d3a?w=400",
  },
  {
    id: 3,
    nome: "Saia midi plissada lilás",
    preco: 99.9,
    imagem:
      "https://images.unsplash.com/photo-1613553231244-2a639b7a9d1d?w=400",
  },
  {
    id: 4,
    nome: "Vestido floral romântico",
    preco: 109.9,
    imagem:
      "https://images.unsplash.com/photo-1589187155470-3a7a5f9a2b66?w=400",
  },
  {
    id: 5,
    nome: "Camisa social branca com gravata",
    preco: 79.9,
    imagem:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
  },
  {
    id: 6,
    nome: "Camiseta banda vintage",
    preco: 69.9,
    imagem:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400",
  },
  {
    id: 7,
    nome: "Short esportivo cinza",
    preco: 89.9,
    imagem:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3a9b?w=400",
  },
  {
    id: 8,
    nome: "Camiseta preta com estampa",
    preco: 59.9,
    imagem:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
  },
];

const ProductGrid = () => {
  return (
    <section className="bg-white py-10">
      <h2 className="text-center text-3xl font-extrabold text-black bg-black text-white py-3 tracking-wide">
        NOVIDADES
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 mt-10">
        {products.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-3 hover:scale-105 transition-transform"
          >
            <img
              src={item.imagem}
              alt={item.nome}
              className="rounded-md w-48 h-64 object-cover"
            />
            <p className="text-sm mt-2 text-center">{item.nome}</p>
            <p className="text-sm font-semibold">
              R${item.preco.toFixed(2)}{" "}
              <span className="text-gray-500">(5% OFF no Pix)</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
