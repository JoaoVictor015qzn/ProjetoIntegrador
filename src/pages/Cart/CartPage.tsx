// src/pages/Cart/CartPage.tsx (página inicial do carrinho, redireciona para entrega ao continuar)
import Navbar from '../../components/UI/Navbar';
import { useCart } from '../../context/useCart';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  const handleContinueToDelivery = () => {
    navigate('/checkout/delivery');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-black">Seu Carrinho</h1>
          <p className="text-black">Seu carrinho está vazio.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8 max-w-7xl mx-auto">
        {/* Barra de progresso */}
        <div className="flex justify-between items-center mb-8 border-b pb-4 text-gray-600 text-sm md:text-base">
          <span className="font-bold text-black">Carrinho</span>
          <span>Entrega</span>
          <span>Pagamento</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Lista de itens */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-black">Itens no Carrinho</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                <img src={item.imagem} alt={item.nome} className="w-20 h-24 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-medium">{item.nome}</p>
                  {item.tamanho && <p className="text-sm text-gray-600">Tamanho: {item.tamanho}</p>}
                  {item.cor && <p className="text-sm text-gray-600">Cor: {item.cor}</p>}
                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => updateQuantity(item.id, item.quantidade - 1)} className="w-8 h-8 border rounded text-gray-600 hover:bg-gray-100">-</button>
                    <span>{item.quantidade}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantidade + 1)} className="w-8 h-8 border rounded text-gray-600 hover:bg-gray-100">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 hover:underline">Remover</button>
                  </div>
                </div>
                <p className="font-semibold">R${(item.preco * item.quantidade).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-black">Resumo</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>R${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>R${getTotal().toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-6 cursor-pointer hover:underline">Adicionar cupom de desconto</p>
            <button
              onClick={handleContinueToDelivery}
              className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-900 uppercase font-bold text-lg"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;