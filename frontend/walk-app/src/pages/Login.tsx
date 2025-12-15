import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import  api  from "../services/api"; 
import "./Login.css";

interface LoginResponse {
  token: string;
  userId: number;
  name: string;
  email: string;
  role?: "PF" | "PJ";
}

const Login = () => {
  const [userType, setUserType] = useState<"Pessoa Física" | "Pessoa Jurídica">(
    "Pessoa Física"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post<
  LoginResponse,
  { email: string; password: string }
>(
  "/api/auth/login",
  { email, password }
);


      // 🔐 salva token e usuário
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.userId.toString());
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.userId,
          name: res.name,
          email: res.email,
          role: res.role ?? (userType === "Pessoa Jurídica" ? "PJ" : "PF"),
        })
      );

      // 🚦 redirecionamento
      if (userType === "Pessoa Jurídica") {
        navigate("/loja");
      } else {
        navigate("/home");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Email ou senha inválidos 😭");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Lado esquerdo */}
      <div className="login-left">
        <img src="/assets/walk-logo.jpeg" alt="Logo Walk" />
      </div>

      {/* Lado direito */}
      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Acesse com seu login ou cadastre-se!</h1>

          {error && <span className="error-text">{error}</span>}

          <select
            className="input-field"
            value={userType}
            onChange={(e) =>
              setUserType(e.target.value as "Pessoa Física" | "Pessoa Jurídica")
            }
          >
            <option>Pessoa Jurídica</option>
            <option>Pessoa Física</option>
          </select>

          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />

          {/* 🔑 senha */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <Link to="/recover-password" className="forgot">
            Esqueceu a senha?
          </Link>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="signup-link">
            Não possui conta? <Link to="/Cadastro">Criar conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;