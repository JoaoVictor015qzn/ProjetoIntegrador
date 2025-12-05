import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { address, paymentMethod, total } = state;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center animate-fadeIn">
        
        {/* Check icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pedido confirmado! 🚀
        </h1>

        <p className="text-gray-600 mb-8">
          Seu pedido foi registrado com sucesso! Agora é só relaxar que ele já está sendo preparado. 😎🔥
        </p>

        {/* Infos Box */}
        <div className="bg-gray-50 p-6 rounded-xl text-left shadow-inner space-y-3">
          
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Endereço:</span>
            <span className="text-gray-500 text-right">
              {address?.street}, {address?.number}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Pagamento:</span>
            <span className="text-gray-500">{paymentMethod}</span>
          </div>

          <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
            <span>Total pago:</span>
            <span>R$ {total}</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full bg-black text-white py-3 rounded-xl font-semibold shadow-md hover:bg-gray-800 transition"
        >
          Voltar para o início
        </button>
      </div>
    </div>
  );
}