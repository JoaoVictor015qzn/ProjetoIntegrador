// src/pages/Entregas.tsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/UI/Navbar";
import Sidebar from "../../components/UI/Sidebar";
import "./Entregas.css";

interface Pedido {
  id: number;
  loja: string;
  status: string;
  img: string;
  titulo: string;
  variacao: string;
  qtd: number;
  preco: number;
}

const tabs = ["Tudo", "A Pagar", "Preparando", "A caminho", "Finalizado", "Cancelado"];

function Entregas() {
  const [activeTab, setActiveTab] = useState("Tudo");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pedidoId = query.get("pedido");

  useEffect(() => {
    // Mock
    setPedidos([]);
  }, []);

  useEffect(() => {
    if (pedidoId && pedidos.length > 0) {
      const id = Number(pedidoId);
      const pedido = pedidos.find((p) => p.id === id);
      if (pedido) setActiveTab(pedido.status);
    }
  }, [pedidoId, pedidos]);

  const pedidosFiltrados = pedidos.filter((p) => activeTab === "Tudo" || p.status === activeTab);

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <div className="main-content-entregas">
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
            {pedidosFiltrados.length === 0 ? (
              <div className="empty-state">Nenhum pedido nesta aba.</div>
            ) : (
              pedidosFiltrados.map((pedido) => (
                <div key={pedido.id} className={`pedido-card ${pedido.id === Number(pedidoId) ? "highlight" : ""}`}>
                  <div className="card-header">
                    <div className="loja-info">
                      <span className="tag-indicado">Indicado</span>
                      <strong>{pedido.loja}</strong>
                      <button className="chat-btn">Chat</button>
                      <button className="loja-btn">Ver Loja</button>
                    </div>
                    <div className="status-entrega">
                      <span>Status:</span>
                      <span className="status-texto">{pedido.status.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="card-body">
                    <img src={pedido.img} alt={pedido.titulo} />
                    <div className="prod-detalhes">
                      <h3>{pedido.titulo}</h3>
                      <p>Variação: {pedido.variacao}</p>
                      <p>x{pedido.qtd}</p>
                    </div>
                    <div className="prod-preco">
                      R${pedido.preco.toFixed(2).replace(".", ",")}
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="total-label">
                      Total do Pedido: <span>R${pedido.preco.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="card-actions">
                      <button className="comprar-novamente">Comprar Novamente</button>
                      <button className="falar-vendedor">Falar Com Vendedor</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Entregas;