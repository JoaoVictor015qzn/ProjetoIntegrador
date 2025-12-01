import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Cnpj.css";
import Walk from "../../assets/Walk.png";

function CNPJ() {
  const maskCNPJ = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  };

  const [cnpj, setCnpj] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [senhaErro, setSenhaErro] = useState("");
  const [confirmarErro, setConfirmarErro] = useState("");

  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Regex
  const validarSenha = (valor: string) => {
    if (valor.length < 6) {
      return "A senha deve ter no mínimo 6 caracteres.";
    }

    if (!/[A-Za-z]/.test(valor) || !/[0-9]/.test(valor)) {
      return "A senha deve conter letras e números.";
    }

    return "";
  };

  const validarConfirmacao = (senha: string, confirmar: string) => {
    if (confirmar && confirmar !== senha) {
      return "As senhas não coincidem.";
    }
    return "";
  };

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setSenha(valor);
    setSenhaErro(validarSenha(valor));
    setConfirmarErro(validarConfirmacao(valor, confirmarSenha));
  };

  const handleConfirmarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setConfirmarSenha(valor);
    setConfirmarErro(validarConfirmacao(senha, valor));
  };

  const tudoValido =
    senhaErro === "" && confirmarErro === "" && senha && confirmarSenha;

  const handleCreateAccount = () => {
    if (!tudoValido) return;
    alert("Conta criada com sucesso!");
    navigate("/");
  };

  return (
    <>
      <nav>
        <img src={Walk} alt="Logo" />
        <span>Roupas sustentáveis e com melhor qualidade!</span>
      </nav>

      <div className="container">
        <form>
          <h1>Cadastro Empresa</h1>

          <div className="name-group">
            <input placeholder="Nome Fantasia" name="nomef" type="text" />
            <input
              placeholder="CNPJ"
              name="cnpj"
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(maskCNPJ(e.target.value))}
              maxLength={18}
            />
          </div>

          <input placeholder="Email" name="email" type="email" />

          {/* Senha */}
          <div className="password-wrapper">
            <input
              placeholder="Senha"
              name="senha"
              type={showPassword ? "text" : "password"}
              value={senha}
              onChange={handleSenhaChange}
              className={senhaErro ? "input-error" : ""}
            />
            <button type="button" className="eye-btn" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {senhaErro && <p className="error-text">{senhaErro}</p>}

          {/* Confirmar Senha */}
          <div className="password-wrapper">
            <input
              placeholder="Confirmar Senha"
              name="confirmasenha"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmarSenha}
              onChange={handleConfirmarChange}
              className={confirmarErro ? "input-error" : ""}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={toggleConfirmPassword}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {confirmarErro && <p className="error-text">{confirmarErro}</p>}

          {/* Botão */}
          <button
            type="button"
            onClick={handleCreateAccount}
            disabled={!tudoValido}
            className={tudoValido ? "" : "disabled-btn"}
          >
            Criar Conta
          </button>

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
