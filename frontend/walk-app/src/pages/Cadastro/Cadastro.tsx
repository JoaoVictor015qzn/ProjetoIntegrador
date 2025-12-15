import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Cadastro.css";

const API_URL = import.meta.env.VITE_API_URL;

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem 😭");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${nome} ${sobrenome}`,
          email,
          password: senha,
          role: "PF",
        }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId.toString());

      navigate("/home");
    } catch {
      alert("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form>
        <h1>Criar Conta</h1>

        <div className="name-group">
          <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
        </div>

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="password-wrapper">
          <input
            placeholder="Confirmar senha"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <button type="button" className="eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="button" onClick={handleRegister} disabled={loading}>
          {loading ? "Criando conta..." : "Criar Conta"}
        </button>

        <div className="links-row">
          <button type="button" className="link-btn" onClick={() => navigate("/")}>
            Voltar para Login
          </button>

          <button type="button" className="link-btn" onClick={() => navigate("/cadastro-cnpj")}>
            Cadastrar como Empresa
          </button>
        </div>
      </form>
    </div>
  );
};
export default Cadastro;