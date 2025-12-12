import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [userType, setUserType] = useState("Pessoa Física");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userType === "Pessoa Jurídica") {
      navigate("/loja");
    } else {
      navigate("/home");
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="login-container">

      <div className="login-left">
        <img src="/assets/walk-logo.jpeg" alt="Logo Walk" />
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Acesse com seu login ou cadastre-se!</h1>

          <select
            className="input-field"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
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

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />

            <button type="button" className="eye-btn flex items-center justify-center" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <Link to="/recover-password" className="forgot">
            Esqueceu a senha?
          </Link>

          <button type="submit" className="login-btn">
            Entrar
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