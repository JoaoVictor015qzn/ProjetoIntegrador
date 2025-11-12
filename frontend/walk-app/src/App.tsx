import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RecoverPassword from "./pages/RecoverPassword";
import Cadastro from "./pages/Cadastro/Cadastro";
import Cnpj from "./pages/CNPJ/Cnpj";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/cadastro-cnpj" element={<Cnpj />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
    </Routes>
  );
}

export default App;
