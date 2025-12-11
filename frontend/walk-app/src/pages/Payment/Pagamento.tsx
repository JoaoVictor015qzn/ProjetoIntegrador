import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentMethods.css";

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // refs dos inputs do cartão
  const cardNumberRef = useRef<HTMLInputElement>(null);
  const cardNameRef = useRef<HTMLInputElement>(null);
  const cardCvvRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    if (!selectedMethod) {
      alert("Escolha um método de pagamento!");
      return false;
    }

    if (selectedMethod === "card") {
      const number = cardNumberRef.current?.value;
      const name = cardNameRef.current?.value;
      const cvv = cardCvvRef.current?.value;

      if (!number || !name || !cvv) {
        alert("Preencha todos os dados do cartão!");
        return false;
      }
    }

    return true;
  };

  const handleFinish = () => {
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/entregas");
    }, 1800);
  };

  return (
    <div className="payment-main">
      {loading && (
        <div className="loading-modal">
          <div className="loading-box">Processando pagamento...</div>
        </div>
      )}

      <h1 className="payment-title">Formas de Pagamento</h1>

      <div className="payment-container">
        <div className="payment-options">
          <button
            className={`option-btn ${selectedMethod === "card" ? "active" : ""}`}
            onClick={() => setSelectedMethod("card")}
          >
            💳 Cartão de crédito
          </button>

          <button
            className={`option-btn ${selectedMethod === "boleto" ? "active" : ""}`}
            onClick={() => setSelectedMethod("boleto")}
          >
            🧾 Boleto bancário
          </button>

          <button
            className={`option-btn ${selectedMethod === "pix" ? "active" : ""}`}
            onClick={() => setSelectedMethod("pix")}
          >
            ❖ Pix (5% de desconto)
          </button>
        </div>

        <div className="payment-content">
          {selectedMethod === "card" && (
            <div className="card-form">
              <h3>Insira os dados do cartão:</h3>

              <input
                ref={cardNumberRef}
                id="card-number"
                type="text"
                placeholder="Número do cartão"
              />
              <input
                ref={cardNameRef}
                id="card-name"
                type="text"
                placeholder="Nome no cartão"
              />
              <input
                ref={cardCvvRef}
                id="card-cvv"
                type="text"
                placeholder="CVV"
              />
            </div>
          )}

          {selectedMethod === "boleto" && (
            <p>O boleto será gerado após finalizar o pedido.</p>
          )}

          {selectedMethod === "pix" && (
            <div className="pix-area">
              <p>
                <strong>Desconto: - R$ 10,00</strong>
              </p>

              <p>Seu QR Code:</p>

              <img
                className="pix-qrcode"
                src="/qrcode.png"
                alt="QR Code"
              />
            </div>
          )}

          <div className="total-area">
            <p>
              <strong>Total:</strong> R$ 190,00
            </p>
          </div>

          <button className="finish-btn" onClick={handleFinish}>
            Finalizar pedido
          </button>
        </div>
      </div>
    </div>
  );
}