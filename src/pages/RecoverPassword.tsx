import { useState } from "react";
import { Link } from "react-router-dom";
import "./RecoverPassword.css";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email de recuperação:", email);
    alert("Se esse e-mail estiver cadastrado, enviaremos as instruções! 📩");
  };

  return (
    <div className="recover-container">
      {/* Lado esquerdo com imagem */}
      <div className="recover-left">
        <img src="/assets/walk-logo.jpeg" alt="Logo Walk" />
      </div>

      {/* Lado direito com formulário */}
      <div className="recover-right">
        <form onSubmit={handleSubmit}>
          <h1>Esqueceu sua senha?</h1>
          <p>Insira o e-mail cadastrado para receber o link de recuperação.</p>

          <input
            type="email"
            placeholder="Digite seu e-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">Enviar link</button>

          <Link to="/" className="back-link">
            Voltar para o login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;