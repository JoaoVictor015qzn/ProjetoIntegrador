// src/pages/Checkout/DeliveryPage.tsx
import Navbar from '../../components/UI/Navbar';
import { useCart } from '../../context/useCart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeliveryPage = () => {
  const navigate = useNavigate();
  const { cart, getTotal } = useCart();

  // === Estados usados de verdade ===
  const [email, setEmail] = useState('');
  const [receiveOffers, setReceiveOffers] = useState(false);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');

  const handleContinue = () => {
    navigate('/checkout/payment');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8 max-w-7xl mx-auto">

       {/* Barra de progresso - Entrega */}
<div className="relative max-w-4xl mx-auto mb-12">
  <div className="flex justify-between items-center text-lg font-medium">
    <span className="text-gray-500">Carrinho</span>
    <span className="font-bold text-black">Entrega</span>
    <span className="text-gray-500">Pagamento</span>
  </div>
  <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 -z-10"></div>
</div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Formulários */}
          <div className="lg:col-span-2 space-y-10">

            {/* Contato */}
            <section>
              <h2 className="text-2xl font-bold mb-5 uppercase">Dados de Contato</h2>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border rounded-md focus:border-black outline-none"
              />
              <label className="flex items-center mt-3 text-sm">
                <input type="checkbox" checked={receiveOffers} onChange={(e) => setReceiveOffers(e.target.checked)} className="mr-2" />
                Receber ofertas e novidades por e-mail
              </label>
            </section>

            {/* Frete simulado */}
            <section>
              <h2 className="text-2xl font-bold mb-5 uppercase">Entrega</h2>
              <div className="bg-gray-100 p-5 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-semibold">Correios - PAC</p>
                  <p className="text-sm text-gray-600">Chega até 28/11</p>
                </div>
                <span className="font-bold">R$21,41</span>
              </div>
            </section>

            {/* Endereço */}
            <section>
              <h2 className="text-2xl font-bold mb-5 uppercase">Dados para Entrega</h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="p-4 border rounded-md" />
                <input placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} className="p-4 border rounded-md" />
              </div>

              {/* Telefone com limite e máscara */}
              <input
                type="text"
                placeholder="Telefone com DDD"
                value={telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setTelefone(digits);
                }}
                maxLength={15}
                className="w-full p-4 border rounded-md mt-4"
              />

              {/* CEP com máscara */}
              <input
                type="text"
                placeholder="CEP"
                value={cep.replace(/(\d{5})(\d{3})/, '$1-$2')}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
                  setCep(digits);
                }}
                maxLength={9}
                className="w-full p-4 border rounded-md mt-4"
              />

              <div className="flex gap-4 mt-4">
                <input placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} className="w-1/3 p-4 border rounded-md" />
                <input placeholder="Complemento (opcional)" value={complemento} onChange={(e) => setComplemento(e.target.value)} className="flex-1 p-4 border rounded-md" />
              </div>
            </section>

            {/* Nota Fiscal */}
            <section>
              <h2 className="text-2xl font-bold mb-5 uppercase">Dados para Nota Fiscal</h2>
              {/* CPF com máscara */}
              <input
                type="text"
                placeholder="CPF"
                value={cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setCpfCnpj(digits);
                }}
                maxLength={14}
                className="w-full p-4 border rounded-md"
              />
            </section>
          </div>

          {/* Resumo */}
          <div className="bg-white p-8 rounded-lg shadow-lg sticky top-6">
            <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.imagem} alt={item.nome} className="w-16 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.nome}</p>
                    <p className="text-xs text-gray-600">
                      {item.tamanho && `Tam: ${item.tamanho} `}
                      {item.cor && `• Cor: ${item.cor}`}
                    </p>
                  </div>
                  <p className="font-semibold">R${(item.preco * item.quantidade).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>R${getTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full mt-8 bg-black text-white py-5 rounded-md hover:bg-gray-900 uppercase font-bold text-lg"
            >
              Continuar para Pagamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;