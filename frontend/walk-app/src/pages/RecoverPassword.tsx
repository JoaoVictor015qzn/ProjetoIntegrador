// src/pages/RecoverPassword.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";
import "./RecoverPassword.css";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email.trim()) return;

    // Simulação de envio (aqui você conecta com sua API)
    console.log("Enviando link de recuperação para:", email);
    
    // Mostra mensagem de sucesso
    setIsSubmitted(true);
  };

  return (
    <div className="recover-container">
      {/* Lado esquerdo com imagem */}
      <div className="recover-left">
        <img src="/assets/walk-logo.jpeg" alt="Logo Walk" />
      </div>

      {/* Lado direito com formulário */}
      <div className="recover-right">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="recover-form">
            <h1>Esqueceu sua senha?</h1>
            <p>Insira o e-mail cadastrado para receber o link de recuperação.</p>

            <input
              type="email"
              placeholder="Digite seu e-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="recover-input"
            />

            <button type="submit" className="recover-btn flex items-center justify-center">
              Enviar link de recuperação
            </button>

            <Link to="/login" className="back-link">
              <ArrowLeft size={18} /> Voltar para o login
            </Link>
          </form>
        ) : (
          /* Mensagem de Sucesso */
          <div className="success-message">
            <CheckCircle size={80} className="success-icon" />
            <h1>Email enviado com sucesso!</h1>
            <p>
              Verifique sua caixa de entrada em <strong>{email}</strong>
              <br />
              Enviamos um link para redefinir sua senha.
            </p>
            <p className="success-hint">
              Não recebeu? Verifique a pasta de spam ou tente novamente.
            </p>

            <Link to="/login" className="success-btn">
              Voltar para o login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;