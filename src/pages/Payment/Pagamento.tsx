// src/pages/Checkout/PaymentPage.tsx (corrigido)
import Navbar from '../../components/UI/Navbar';
import { useCart } from '../../context/useCart';  // Importe useCart para acessar cart
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type PaymentMethod = 'cartao' | 'pix' | 'mercado-pago' | 'linha-credito';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart, getTotal } = useCart();  // Acesse cart e getTotal
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cartao');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleOrder = () => {
    alert('Pedido realizado com sucesso! Obrigado pela compra.');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8 max-w-7xl mx-auto">
       {/* Barra de progresso - Pagamento */}
<div className="relative max-w-4xl mx-auto mb-12">
  <div className="flex justify-between items-center text-lg font-medium">
    <span className="text-gray-500">Carrinho</span>
    <span className="text-gray-500">Entrega</span>
    <span className="font-bold text-black">Pagamento</span>
  </div>
  <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 -z-10"></div>
</div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Lado esquerdo: Pagamento */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4 uppercase">Forma de Pagamento</h2>

            <div className="space-y-6">
              {/* Cartão */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="pay" checked={paymentMethod === 'cartao'} onChange={() => setPaymentMethod('cartao')} />
                <span>Cartão de crédito - Até 3 parcelas sem juros →</span>
              </label>
              {paymentMethod === 'cartao' && (
                <div className="ml-8 space-y-4 bg-gray-50 p-5 rounded-md">
                  <input placeholder="Número do cartão" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full p-4 border rounded-md" />
                  <input placeholder="Nome no cartão" value={cardName} onChange={(e) => setCardName(e.target.value)} className="w-full p-4 border rounded-md" />
                  <div className="flex gap-4">
                    <input placeholder="MM/AA" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-1/2 p-4 border rounded-md" />
                    <input placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} className="w-1/2 p-4 border rounded-md" />
                  </div>
                </div>
              )}

              {/* Pix */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="pay" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} />
                <span>Pix</span>
              </label>
              {paymentMethod === 'pix' && (
                <div className="ml-8 p-5 bg-green-50 border border-green-200 rounded-md text-center">
                  <p className="font-medium text-green-800">Pague com Pix e receba em até 1 dia útil!</p>
                  <p className="text-sm text-gray-600 mt-2">O código será gerado após clicar em "Fazer Pedido"</p>
                </div>
              )}
            </div>

            <label className="flex items-center mt-6 text-sm text-gray-600">
              <input type="checkbox" className="mr-2" />
              Salvar dados para compras mais rápidas
            </label>
            <p className="text-xs text-gray-500 mt-2">Nas próximas compras enviaremos um código para: (11) 94680-8179. Alterar</p>
            <p className="text-xs text-gray-500 mt-2">Ao salvar, você aceita os Termos de uso e a Política de Privacidade.</p>
          </div>

          {/* Resumo */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-black">Resumo</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (  // Agora 'cart' está acessível
                <div key={item.id} className="flex gap-4 items-center">
                  <img src={item.imagem} alt={item.nome} className="w-12 h-16 object-cover rounded" />
                  <div>
                    <p className="text-sm font-medium">{item.nome}</p>
                    <p className="text-xs text-gray-500">R${item.preco.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>R${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-2 text-black">
                <span>Total</span>
                <span>R${getTotal().toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 cursor-pointer hover:underline">Adicionar cupom de desconto</p>
          </div>
        </div>

        {/* Botão Fazer Pedido */}
        <div className="mt-10 text-center">
          <button
            onClick={handleOrder}
            className="bg-black text-white px-12 py-4 rounded-md hover:bg-gray-900 transition uppercase font-bold text-lg"
          >
            Fazer Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;