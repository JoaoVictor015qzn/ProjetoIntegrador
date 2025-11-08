import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Cadastro.css";
import Walk from "../../assets/Walk.png";

function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <nav>
        <img src={Walk} alt="Logo" />
        <span>Roupas sustentavéis e com melhor qualidade!</span>
      </nav>
      <div className="container">
        <form>
          <h1>Cadastro</h1>
          {/* Campos nome e sobrenome */}
          <div className="name-group">
            <input placeholder="Nome" name="nome" type="text" />
            <input placeholder="Sobrenome" name="sobrenome" type="text" />
          </div>

          {/* Campo email */}
          <input placeholder="Email" name="email" type="text" />

          {/* Campo senha */}
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

          {/* Campo confirmar senha */}
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

          <button type="button">Criar Conta</button>
          <button type="button">Voltar para Login</button>
          {/* <Link to="/Cadastro_CNPJ"></Link> */}
        </form>
      </div>
    </>
  );
}

export default Cadastro;
