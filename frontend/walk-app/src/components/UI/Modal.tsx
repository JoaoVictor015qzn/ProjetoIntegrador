// src/components/ProductDetailsModal.tsx (novo modal para opções de produto)
import { useState } from 'react';
import { useCart } from '../../context/useCart';

interface ProductDetailsModalProps {
  product: {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
  };
  onClose: () => void;
}

const ProductDetailsModal = ({ product, onClose }: ProductDetailsModalProps) => {  // Adicione tipo para props
  const { addToCart } = useCart();
  const [tamanho, setTamanho] = useState('M');
  const [cor, setCor] = useState('Preto');
  const tamanhos = ['P', 'M', 'G', 'GG'];
  const cores = ['Preto', 'Branco', 'Azul', 'Vermelho'];
  const descricao = ['Produto desenvolvido com materiais de qualidade, oferecendo durabilidade e ótimo acabamento. Garantindo conforto e versatilidade.'];

  const handleAdd = () => {
    addToCart({ ...product, tamanho, cor});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">{product.nome}</h2>
          <button onClick={onClose} className="text-gray-500">X</button>
        </div>
        <img src={product.imagem} alt={product.nome} className="w-full h-64 object-cover rounded-md mb-4" />
        <p className="text-lg font-semibold mb-4">R${product.preco.toFixed(2)}</p>
        <div className="mb-4">
          <label className="block text-sm mb-1">Tamanho:</label>
          <select value={tamanho} onChange={(e) => setTamanho(e.target.value)} className="w-full border px-3 py-2 rounded-md">
            {tamanhos.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Cor:</label>
          <select value={cor} onChange={(e) => setCor(e.target.value)} className="w-full border px-3 py-2 rounded-md">
            {cores.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 font-semibold">Descrição:</label>
          <p className="text-gray-700 text-sm leading-relaxed">
            {descricao}
          </p>
        </div>

        <button onClick={handleAdd} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal;