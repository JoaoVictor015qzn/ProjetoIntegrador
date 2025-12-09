import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RecoverPassword from "./pages/RecoverPassword";
import Cadastro from "./pages/Cadastro/Cadastro";
import Cnpj from "./pages/CNPJ/Cnpj";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import CartPage from "./pages/Cart/CartPage";
import DeliveryPage from "./pages/Delivery/Delivery";
import PaymentPage from "./pages/Payment/Pagamento";
import Config from "./pages/Config/Config";
import Cartoes from "./pages/Cartoes/Cartoes";
import Enderecos from "./pages/Enderecos/Enderecos";
import Entregas from "./pages/Entregas/Entregas";
import Loja from "./pages/Loja/Loja";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/favoritos" element={<FavoritesPage />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/cadastro-cnpj" element={<Cnpj />} />
      <Route path="/config" element={<Config />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/checkout/delivery" element={<DeliveryPage />} />
      <Route path="/checkout/payment" element={<PaymentPage />} />
      <Route path="/cartoes" element={<Cartoes />} />
      <Route path="/enderecos" element={<Enderecos />} />
      <Route path="/entregas" element={<Entregas />} />
      <Route path="/loja" element={<Loja />} />
    </Routes>
  );
}

export default App;
