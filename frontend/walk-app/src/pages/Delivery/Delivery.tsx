import Navbar from "../../components/UI/Navbar";
import { useCart } from "../../context/useCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DeliveryPage = () => {
  const navigate = useNavigate();
  const { getTotal } = useCart();

  const [address, setAddress] = useState({
    nome: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  const subtotal = getTotal();
  const desconto = subtotal * 0.05;
  const totalComDesconto = subtotal - desconto;

  // 🔥 AUTO-PREENCHER QUANDO O CEP FOR DIGITADO
  const handleCepChange = async (value: string) => {
    setAddress((prev) => ({ ...prev, cep: value }));

    // Só chama API com 8 dígitos
    if (value.replace(/\D/g, "").length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await res.json();

        if (!data.erro) {
          setAddress((prev) => ({
            ...prev,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
          }));
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
      }
    }
  };

  const handleContinue = () => {
    navigate("/checkout/payment", { state: { address } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex justify-between mb-8 text-sm text-gray-600 border-b pb-4">
          <span>Carrinho</span>
          <span className="font-bold text-black">Entrega</span>
          <span>Pagamento</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ENDEREÇO */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-black">Endereço de Entrega</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="NOME"
                value={address.nome}
                onChange={(e) => setAddress({ ...address, nome: e.target.value })}
                className="w-full p-3 border rounded-md"
              />

              {/* 🔥 Campo CEP com AutoComplete */}
              <input
                type="text"
                placeholder="CEP"
                value={address.cep}
                onChange={(e) => handleCepChange(e.target.value)}
                className="w-full p-3 border rounded-md"
              />

              <input
                type="text"
                placeholder="RUA"
                value={address.rua}
                onChange={(e) => setAddress({ ...address, rua: e.target.value })}
                className="w-full p-3 border rounded-md"
              />

              <input
                type="text"
                placeholder="NÚMERO"
                value={address.numero}
                onChange={(e) => setAddress({ ...address, numero: e.target.value })}
                className="w-full p-3 border rounded-md"
              />

              <input
                type="text"
                placeholder="BAIRRO"
                value={address.bairro}
                onChange={(e) => setAddress({ ...address, bairro: e.target.value })}
                className="w-full p-3 border rounded-md"
              />

              <input
                type="text"
                placeholder="CIDADE"
                value={address.cidade}
                onChange={(e) => setAddress({ ...address, cidade: e.target.value })}
                className="w-full p-3 border rounded-md"
              />

              <input
                type="text"
                placeholder="ESTADO"
                value={address.estado}
                onChange={(e) => setAddress({ ...address, estado: e.target.value })}
                className="w-full p-3 border rounded-md"
              />
            </div>

            <button
              className="mt-6 bg-black text-white px-6 py-3 rounded-md w-full font-bold hover:bg-gray-900"
              onClick={handleContinue}
            >
              Continuar
            </button>
          </div>

          {/* RESUMO */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4 text-black">Resumo</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Desconto PIX (5%)</span>
                <span>-R$ {desconto.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>R$ {totalComDesconto.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              O valor pode variar dependendo do frete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;