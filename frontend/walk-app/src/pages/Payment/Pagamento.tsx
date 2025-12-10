import Navbar from "../../components/UI/Navbar";
import { useCart } from "../../context/useCart";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { getTotal } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credito" | "debito" | null>(null);

  const subtotal = getTotal();
  const desconto = subtotal * 0.05;
  const totalComDesconto = subtotal - desconto;

  const handleFinishOrder = () => {
    if (!paymentMethod) return alert("Escolha um método de pagamento!");

    navigate("/checkout/success", {
      state: {
        address: state?.address,
        paymentMethod,
        total: totalComDesconto,
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8 max-w-5xl mx-auto">
        {/* Barra de progresso */}
        <div className="flex justify-between mb-8 text-sm text-gray-600 border-b pb-4">
          <span>Carrinho</span>
          <span>Entrega</span>
          <span className="font-bold text-black">Pagamento</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Métodos */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-black">Pagamento</h2>

            <div className="space-y-4">

              {/* PIX */}
              <label className="block border p-4 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  className="mr-3"
                  onChange={() => setPaymentMethod("pix")}
                />
                Pagar com PIX (5% de desconto)
              </label>

              {/* Cartão */}
              <label className="block border p-4 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  className="mr-3"
                  onChange={() => setPaymentMethod("credito")}
                />
                Cartão de Crédito
              </label>

              <label className="block border p-4 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  className="mr-3"
                  onChange={() => setPaymentMethod("debito")}
                />
                Cartão de Débito
              </label>

            </div>

            <button
              className="mt-6 bg-black text-white px-6 py-3 rounded-md w-full font-bold hover:bg-gray-900"
              onClick={handleFinishOrder}
            >
              Finalizar Pedido
            </button>
          </div>

          {/* Resumo */}
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
              O valor final será aplicado no fechamento do pedido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;