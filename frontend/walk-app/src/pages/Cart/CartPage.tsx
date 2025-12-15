// src/pages/Cart/CartPage.tsx
import { useEffect, useState } from "react";
import Navbar from "../../components/UI/Navbar";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

interface CartItemView {
  productId: number;
  productName: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

interface CartResponse {
  items: CartItemView[];
  total: number;
}

const CartPage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<number | null>(null); // item sendo atualizado

  const getErrorMessage = (err: unknown) => {
    if (err instanceof Error) return err.message;
    return String(err);
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Erro ao carregar carrinho");

      const data: CartResponse = await res.json();
      setCart(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err) || "Erro ao carregar carrinho");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [navigate]);

  const updateQuantity = async (productId: number, qty: number) => {
    if (qty < 1) return; // não permite menor que 1
    setUpdating(productId);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, qty }),
      });

      // Atualiza estado local imediatamente
      setCart((prev) =>
        prev
          ? {
              ...prev,
              items: prev.items.map((i) =>
                i.productId === productId
                  ? { ...i, qty, lineTotal: i.unitPrice * qty }
                  : i
              ),
              total: prev.items.reduce((sum, i) =>
                i.productId === productId ? sum + i.unitPrice * qty : sum + i.lineTotal
              , 0),
            }
          : null
      );
    } catch (err: unknown) {
      alert(getErrorMessage(err) || "Erro ao atualizar item");
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (productId: number) => {
    setUpdating(productId);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/items/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      // Atualiza estado local removendo o item
      setCart((prev) =>
        prev
          ? {
              ...prev,
              items: prev.items.filter((i) => i.productId !== productId),
              total: prev.items
                .filter((i) => i.productId !== productId)
                .reduce((sum, i) => sum + i.lineTotal, 0),
            }
          : null
      );
    } catch (err: unknown) {
      alert(getErrorMessage(err) || "Erro ao remover item");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="p-8 text-center text-lg">Carregando carrinho...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <p className="p-8 text-center text-red-600">{error}</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-black">Seu Carrinho</h1>
          <p className="text-black">Seu carrinho está vazio.</p>
        </div>
      </div>
    );
  }

  const desconto = cart.total * 0.05;
  const totalComDesconto = cart.total - desconto;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b pb-4 text-gray-600 text-sm md:text-base">
          <span className="font-bold text-black">Carrinho</span>
          <span>Entrega</span>
          <span>Pagamento</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-black">Itens no Carrinho</h2>

            {cart.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-6 bg-white p-6 rounded-xl shadow-md"
              >
                <div className="bg-gray-200 w-28 h-32 rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">{item.productName}</h3>
                  <p className="text-gray-600 mt-1">
                    Preço unitário: R${item.unitPrice.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    {/* BOTÃO DE MENOS */}
                    <button
                      onClick={() => updateQuantity(item.productId, item.qty - 1)}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition font-bold text-lg"
                      disabled={item.qty <= 1 || updating === item.productId}
                    >
                      -
                    </button>

                    <span className="text-xl font-bold w-12 text-center">{item.qty}</span>

                    {/* BOTÃO DE MAIS */}
                    <button
                      onClick={() => updateQuantity(item.productId, item.qty + 1)}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition font-bold text-lg"
                      disabled={updating === item.productId}
                    >
                      +
                    </button>

                    {/* LIXEIRA */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-auto text-red-600 hover:text-red-800 transition"
                      title="Remover item"
                      disabled={updating === item.productId}
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    R${item.lineTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RESUMO DO PEDIDO */}
          <div className="bg-white p-8 rounded-xl shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-6 text-black">Resumo do Pedido</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>R${cart.total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg text-green-600">
                <span>Desconto PIX (5%)</span>
                <span>-R${desconto.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-2xl font-bold pt-4 border-t">
                <span>Total a pagar</span>
                <span>R${totalComDesconto.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={() => navigate("/checkout/delivery")} className="w-full bg-black text-white py-5 rounded-xl font-bold text-xl hover:bg-gray-900 uppercase">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;