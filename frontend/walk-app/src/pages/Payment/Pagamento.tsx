// src/pages/Checkout/Payment.tsx
import { useState } from "react";
import Navbar from "../../components/UI/Navbar";
import { useNavigate } from "react-router-dom";
import "./PaymentMethods.css";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<"pix" | "card">("pix");

  const pixQRCode = "/path/to/qr-code.png";

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao finalizar pedido");

      alert("Pedido confirmado com sucesso! 🎉");
      localStorage.removeItem("checkoutAddress");
      navigate("/entregas");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Erro ao confirmar pedido. Tente novamente.");
    }
  };

  const totalOriginal = 200;
  const desconto = selectedMethod === "pix" ? totalOriginal * 0.05 : 0;
  const totalFinal = totalOriginal - desconto;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        {/* Passos do Checkout */}
        <div className="flex justify-between mb-8 text-sm text-gray-600 border-b pb-4">
          <span>Carrinho</span>
          <span>Entrega</span>
          <span className="font-bold text-black">Pagamento</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formas de Pagamento */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Forma de Pagamento</h2>
            <div className="space-y-4 bg-white p-6 md:p-8 rounded-xl shadow-md">
              {/* PIX */}
              <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition hover:bg-gray-50 ${selectedMethod === "pix" ? "border-green-500 bg-green-50" : ""}`}>
                <input
                  type="radio"
                  name="method"
                  checked={selectedMethod === "pix"}
                  onChange={() => setSelectedMethod("pix")}
                  className="accent-green-600"
                />
                <div>
                  <p className="font-bold text-lg">PIX (-5% de desconto)</p>
                  <p className="text-gray-600">Pagamento instantâneo</p>
                </div>
              </label>

              {/* Cartão */}
              <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition hover:bg-gray-50 ${selectedMethod === "card" ? "border-blue-500 bg-blue-50" : ""}`}>
                <input
                  type="radio"
                  name="method"
                  checked={selectedMethod === "card"}
                  onChange={() => setSelectedMethod("card")}
                  className="accent-blue-600"
                />
                <div>
                  <p className="font-bold text-lg">Cartão de Crédito</p>
                  <p className="text-gray-600">Parcelamento em até 12x</p>
                </div>
              </label>

              {/* PIX QR Code */}
              {selectedMethod === "pix" && (
                <div className="mt-4 flex flex-col items-center gap-2">
                  <p className="font-semibold text-gray-700">Seu QR Code:</p>
                  <img src={pixQRCode} alt="QR Code PIX" className="w-40 h-40 md:w-48 md:h-48 rounded-lg border-2 border-gray-300" />
                  <p className="text-green-600 font-semibold mt-2">Desconto aplicado: R$ {desconto.toFixed(2)}</p>
                </div>
              )}
            </div>

            <button
              onClick={handleConfirm}
              className="mt-6 w-full bg-green-600 text-white py-4 md:py-5 rounded-xl font-bold text-xl md:text-2xl hover:bg-green-700 uppercase transition"
            >
              Finalizar Pedido
            </button>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-md flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-4">Resumo do Pedido</h2>
            <p className="text-gray-600">Endereço salvo na etapa anterior</p>
            <p className="text-gray-800 font-medium">Pagamento via {selectedMethod === "pix" ? "PIX" : "Cartão"}</p>
            {desconto > 0 && (
              <p className="text-green-600 font-semibold">Desconto PIX: - R$ {desconto.toFixed(2)}</p>
            )}
            <p className="text-xl md:text-2xl font-bold mt-2">Total: R$ {totalFinal.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payment;