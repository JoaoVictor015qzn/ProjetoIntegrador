import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Cnpj.css";
import Walk from "../../assets/Walk.png";

function CNPJ() {
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
          <h1>Cadastro Empresa</h1>

          {/* Nome Fantasia e CNPJ */}
          <div className="name-group">
            <input placeholder="Nome Fantasia" name="nomef" type="text" />
            <input
              placeholder="CNPJ"
              name="cnpj"
              type="text"
              maxLength={18}
              inputMode="numeric"
            />
          </div>

          {/* Razão Social e IE */}
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
          <button type="button" onClick={() => navigate("/")}>
            Criar Conta</button>

          <button type="button" onClick={() => navigate("/")}>
            Voltar para Login
          </button>

          <button type="button" onClick={() => navigate("/cadastro")}>
            Cadastrar como Pessoa Física
          </button>
        </form>
      </div>
    </>
  );
}

export default CNPJ;