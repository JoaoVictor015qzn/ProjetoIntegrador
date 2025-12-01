import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import Walk from "../../assets/Walk.png";

function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmasenha: "",
  });

  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Mesmas validações do outro código
  const senhaValida = form.senha.length >= 6;
  const senhasIguais = form.senha === form.confirmasenha;

  const criarConta = () => {
    if (!form.nome || !form.sobrenome || !form.email) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!senhaValida) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (!senhasIguais) {
      alert("As senhas não coincidem!");
      return;
    }

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
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Cadastro</h1>

          {/* Nome e Sobrenome */}
          <div className="name-group">
            <input
              placeholder="Nome"
              name="nome"
              type="text"
              value={form.nome}
              onChange={handleChange}
            />
            <input
              placeholder="Sobrenome"
              name="sobrenome"
              type="text"
              value={form.sobrenome}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          {/* ---------------------- SENHA ---------------------- */}
          <div className="password-wrapper">
            <input
              placeholder="Senha"
              name="senha"
              type={showPassword ? "text" : "password"}
              value={form.senha}
              onChange={handleChange}
              className={
                !senhaValida && form.senha.length > 0 ? "erro-input" : ""
              }
            />
            <button type="button" className="eye-btn" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Texto igual ao outro arquivo */}
          {form.senha.length > 0 && !senhaValida && (
            <p className="erro-texto">
              A senha deve ter pelo menos 6 caracteres.
            </p>
          )}

          {/* ------------------ CONFIRMAR SENHA ------------------ */}
          <div className="password-wrapper">
            <input
              placeholder="Confirmar Senha"
              name="confirmasenha"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmasenha}
              onChange={handleChange}
              className={
                form.confirmasenha.length > 0 && !senhasIguais
                  ? "erro-input"
                  : ""
              }
            />
            <button
              type="button"
              className="eye-btn"
              onClick={toggleConfirmPassword}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {form.confirmasenha.length > 0 && !senhasIguais && (
            <p className="erro-texto">As senhas não coincidem.</p>
          )}

          {/* Botões */}
          <button type="button" onClick={criarConta}>
            Criar Conta
          </button>

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
