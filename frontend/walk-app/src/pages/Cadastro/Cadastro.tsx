import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import Walk from "../../assets/Walk.png";

function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <nav>
        <img src={Walk} alt="Logo" />
        <span>Roupas sustentáveis e com melhor qualidade!</span>
      </nav>

      <div className="container">
        <form>
          <h1>Cadastro</h1>

          {/* Nome e Sobrenome */}
          <div className="name-group">
            <input placeholder="Nome" name="nome" type="text" />
            <input placeholder="Sobrenome" name="sobrenome" type="text" />
          </div>

          {/* Email */}
          <input placeholder="Email" name="email" type="email" />

          {/* Senha */}
          <div className="password-wrapper">
            <input
              placeholder="Senha"
              name="senha"
              type={showPassword ? "text" : "password"}
            />
            <button type="button" className="eye-btn" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirmar Senha */}
          <div className="password-wrapper">
            <input
              placeholder="Confirmar Senha"
              name="confirmasenha"
              type={showConfirmPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={toggleConfirmPassword}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Botões */}
          <button type="button" onClick={() => navigate("/")}>Criar Conta</button>

          <button type="button" onClick={() => navigate("/")}>
            Voltar para Login
          </button>

          <button type="button" onClick={() => navigate("/cadastro-cnpj")}>
            Cadastrar como Empresa
          </button>
        </form>
      </div>
    </>
  );
}

export default Cadastro;