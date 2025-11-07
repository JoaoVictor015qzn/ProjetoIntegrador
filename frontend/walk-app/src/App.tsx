import "./App.css";
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
import CNPJ from "./components/CNPJ/Cnpj";
import Config from "./components/Config/Config";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cnpj" element={<CNPJ />} />
        <Route path="/config" element={<Config />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
