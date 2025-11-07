import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Cnpj.css";
import Walk from "../../assets/Walk.png";

function CNPJ() {
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
          <h1>Cadastro </h1>
          {/* Campos nome e CNPJ */}
          <div className="name-group">
            <input placeholder="Nome fantasia" name="nomef" type="text" />
            <input
              placeholder="CNPJ"
              name="cnpj"
              type="text"
              maxLength={18}
              inputMode="numeric"
            />
          </div>

          {/* Campo Razão Social e IE*/}
          <div className="razao-group">
            <input placeholder="Razão Social" name="razaos" type="text" />
            <div className="ie-box">
              <label>IE</label>
              <div className="ie-inner">
                <input name="isento" type="checkbox" id="isento" />
                <span>Isento</span>
              </div>
            </div>
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

export default CNPJ;
