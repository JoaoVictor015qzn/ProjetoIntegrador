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
import CheckoutSuccess from "./pages/Payment/Success";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<FavoritesPage />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/cadastro-cnpj" element={<Cnpj />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/checkout/delivery" element={<DeliveryPage />} />
      <Route path="/checkout/payment" element={<PaymentPage />} />
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
    </Routes>
  );
}

export default App;