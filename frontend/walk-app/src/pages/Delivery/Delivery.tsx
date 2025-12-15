// src/pages/Checkout/Delivery.tsx
import { useState } from "react";
import Navbar from "../../components/UI/Navbar";
import { useNavigate } from "react-router-dom";

const Delivery = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    nome: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [loadingCep, setLoadingCep] = useState(false);

  const handleCepChange = async (cep: string) => {
    setAddress(prev => ({ ...prev, cep }));

    const cleaned = cep.replace(/\D/g, "");
    if (cleaned.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setAddress(prev => ({
            ...prev,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
          }));
        }
      } catch {
        alert("Erro ao buscar CEP");
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleContinue = () => {
    if (!address.nome || !address.cep || !address.rua || !address.numero) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    // Salva endereço temporariamente (pode salvar na API depois)
    localStorage.setItem("checkoutAddress", JSON.stringify(address));
    navigate("/checkout/payment");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex justify-between mb-8 text-sm text-gray-600 border-b pb-4">
          <span className="font-bold text-black">Carrinho</span>
          <span className="font-bold text-black">Entrega</span>
          <span>Pagamento</span>
          <span>Confirmação</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Endereço de Entrega</h2>
            <div className="space-y-4">
              <input placeholder="Nome completo" value={address.nome} onChange={e => setAddress({ ...address, nome: e.target.value })} className="w-full p-4 border rounded-lg" />
              <input placeholder="CEP" value={address.cep} onChange={e => handleCepChange(e.target.value)} className="w-full p-4 border rounded-lg" disabled={loadingCep} />
              <input placeholder="Rua" value={address.rua} onChange={e => setAddress({ ...address, rua: e.target.value })} className="w-full p-4 border rounded-lg" />
              <input placeholder="Número" value={address.numero} onChange={e => setAddress({ ...address, numero: e.target.value })} className="w-full p-4 border rounded-lg" />
              <input placeholder="Complemento (opcional)" value={address.complemento} onChange={e => setAddress({ ...address, complemento: e.target.value })} className="w-full p-4 border rounded-lg" />
              <input placeholder="Bairro" value={address.bairro} onChange={e => setAddress({ ...address, bairro: e.target.value })} className="w-full p-4 border rounded-lg" />
              <input placeholder="Cidade" value={address.cidade} onChange={e => setAddress({ ...address, cidade: e.target.value })} className="w-full p-4 border rounded-lg" />
              <input placeholder="Estado" value={address.estado} onChange={e => setAddress({ ...address, estado: e.target.value })} className="w-full p-4 border rounded-lg" maxLength={2} />
            </div>

            <button onClick={handleContinue} className="mt-8 w-full bg-black text-white py-4 rounded-lg font-bold text-xl hover:bg-gray-900">
              Continuar para Pagamento
            </button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Resumo</h2>
            {/* Pode carregar o total do carrinho aqui se quiser */}
            <p className="text-lg">Frete calculado na próxima etapa</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Delivery;