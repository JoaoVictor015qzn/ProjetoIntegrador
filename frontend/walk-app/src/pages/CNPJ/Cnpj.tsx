import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Walk from "../../assets/Walk.png";
import "./Cnpj.css";

const API_URL = import.meta.env.VITE_API_URL;

const Cnpj = () => {
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
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
          name: nomeFantasia,
          email,
          password: senha,
          cnpj,
          role: "PJ",
        }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId.toString());
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.userId,
          name: data.name,
          email: data.email,
          role: "PJ",
        })
      );

      navigate("/home");
    } catch {
      alert("Erro ao criar conta da empresa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav>
        <img src={Walk} alt="Logo" onClick={() => navigate("/")} />
        <span>Roupas sustentáveis e com melhor qualidade!</span>
      </nav>

      <div className="container">
        <form>
          <h1>Criar Conta Empresa</h1>

          <div className="name-group">
            <input
              placeholder="Nome Fantasia"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
            />
            <input
              placeholder="CNPJ"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </div>

          <input
            placeholder="Email corporativo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* SENHA */}
          <div className="password-wrapper">
            <input
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* CONFIRMAR SENHA */}
          <div className="password-wrapper">
            <input
              placeholder="Confirmar senha"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="button" onClick={handleRegister} disabled={loading}>
            {loading ? "Criando conta..." : "Criar Conta Empresa"}
          </button>

          {/* LINKS */}
          <div className="links-row">
            <button
              type="button"
              className="link-btn"
              onClick={() => navigate("/")}
            >
              Já tem conta? Fazer login
            </button>

            <button
              type="button"
              className="link-btn secondary"
              onClick={() => navigate("/cadastro")}
            >
              Cadastrar como Pessoa Física
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Cnpj;