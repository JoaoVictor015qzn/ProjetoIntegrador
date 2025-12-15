// src/pages/Entregas/Entregas.tsx
import { useEffect, useState } from "react";
import Navbar from "../../components/UI/Navbar";
import Sidebar from "../../components/UI/Sidebar";
import api from "../../services/api";
import "./Entregas.css";

interface Order {
  id: number;
  total: number;
  createdAt: string;
  itemsJson: string;
  status?: string; // pode vir do backend se tiver
}

interface OrderItem {
  ProductId: number;
  ProductName: string;
  Qty: number;
  LineTotal: number;
  // Pode adicionar imagem se tiver no backend
}

const tabs = ["Tudo", "A Pagar", "Preparando", "A caminho", "Finalizado", "Cancelado"];

const Entregas = () => {
  const [activeTab, setActiveTab] = useState("Tudo");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.get<Order[]>("/api/orders/mine");
        setOrders(data);
      } catch (err) {
        console.error("Erro ao carregar pedidos", err);
        alert("Erro ao carregar pedidos");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filtra por status (se o backend enviar status, use ele. Caso contrário, usa "Tudo")
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Tudo") return true;
    // Se o backend não enviar status, todos vão para "Tudo"
    return order.status === activeTab;
  });

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="app-layout">
          <Sidebar />
          <div className="main-content-entregas">
            <p className="text-center py-20 text-lg">Carregando pedidos...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <div className="main-content-entregas">
          <h1 className="text-3xl font-bold mb-8 text-center">Minhas Compras</h1>

          <div className="tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="pedidos-list">
            {filteredOrders.length === 0 ? (
              <div className="empty-state">
                {activeTab === "Tudo"
                  ? "Você ainda não tem pedidos."
                  : `Nenhum pedido em "${activeTab}".`}
              </div>
            ) : (
              filteredOrders.map((order) => {
                const items = JSON.parse(order.itemsJson) as OrderItem[];

                return (
                  <div key={order.id} className="pedido-card">
                    <div className="card-header">
                      <div className="loja-info">
                        <span className="tag-indicado">WalkWord</span>
                        <strong>Loja Oficial</strong>
                        <button className="chat-btn">Chat</button>
                        <button className="loja-btn">Ver Loja</button>
                      </div>
                      <div className="status-entrega">
                        <span>Status:</span>
                        <span className="status-texto">
                          {order.status || "A Processar"}
                        </span>
                      </div>
                    </div>

                    <div className="card-body">
                      {/* Imagem placeholder (pode melhorar com imagem real do produto) */}
                      <div className="bg-gray-200 w-32 h-32 rounded-lg" />

                      <div className="prod-detalhes">
                        <h3>Itens do pedido</h3>
                        <div className="space-y-2 mt-2">
                          {items.map((item) => (
                            <div key={item.ProductId}>
                              <p>
                                <strong>{item.ProductName}</strong>
                              </p>
                              <p>Variação: Padrão</p>
                              <p>Quantidade: {item.Qty}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="prod-preco">
                        R${order.total.toFixed(2).replace(".", ",")}
                      </div>
                    </div>

                    <div className="card-footer">
                      <div className="total-label">
                        Total do Pedido:{" "}
                        <span>R${order.total.toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="card-actions">
                        <button className="comprar-novamente">
                          Comprar Novamente
                        </button>
                        <button className="falar-vendedor">
                          Falar Com Vendedor
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Entregas;