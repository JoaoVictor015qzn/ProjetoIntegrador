import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [userType, setUserType] = useState("Pessoa Jurídica/Física");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ userType, email, password });
  };

  return (
    <div className="login-container">
      {/* Lado esquerdo */}
      <div className="login-left">
        <img
          src="/assets/walk-logo.jpeg"
          alt="Logo Walk"
        />
        </div>

      {/* Lado direito */}
      <div className="login-right">
        <form onSubmit={handleSubmit}>
          <h1>Acesse com seu login ou cadastre-se!</h1>

          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option>Pessoa Jurídica</option>
            <option>Pessoa Física</option>
          </select>

          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <a href="#" className="forgot">Esqueceu a senha?</a>

          <button type="submit">Entrar</button>

          <p className="signup-link">
            Não possui conta? <a href="#">Criar conta</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;