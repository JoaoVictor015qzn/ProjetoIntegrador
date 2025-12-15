import { useState, useEffect } from "react";
import Navbar from "../../components/UI/Navbar";
import Sidebar from "../../components/UI/Sidebar";
import { FaTrash } from "react-icons/fa";
import "./Cartoes.css";

interface Card {
  // Para fins de teste/mock, ID pode ser um número simples
  id: number;
  nome: string;
  // Número deve ser os últimos 4 dígitos para exibição, mas usaremos 16 dígitos completos para o formulário.
  numero: string; 
  validade: string; // MM/AA
}

// Removendo a lista inicial de cartões mockados para iniciar vazio
const initialCards: Card[] = []; 

// Função de Máscara para Número do Cartão
const formatarNumeroCartao = (valor: string) => {
  valor = valor.replace(/\D/g, ""); // Remove tudo que não é dígito
  valor = valor.slice(0, 16); // Limita a 16 dígitos
  // Adiciona espaços a cada 4 dígitos: 4444 4444 4444 4444
  valor = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
  return valor;
};

const Cartoes = () => {
  const [open, setOpen] = useState(false);
  // Estado inicial agora é vazio
  const [cartoes, setCartoes] = useState<Card[]>(initialCards);
  const [form, setForm] = useState({
    nome: "",
    numero: "",
    validade: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true); 
  const [error, setError] = useState("");

  // Carregar cartões (Simulação de useEffect)
  useEffect(() => {
    // Simula o carregamento (vazio) da API com um pequeno delay
    setTimeout(() => {
        setLoadingList(false);
    }, 500);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({ nome: "", numero: "", validade: "", cvv: "" });
    setError("");
  };

  // Funções de CRUD Mockadas
  const handleSave = async () => {
    const numeroLimpo = form.numero.replace(/\s/g, "");

    if (!form.nome || numeroLimpo.length < 16 || form.validade.length < 5 || form.cvv.length < 3) {
      setError("Preencha todos os campos corretamente (Cartão: 16 dígitos, Validade: MM/AA, CVV: 3 dígitos)");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // *** MOCK: Simulação de API POST/Salvar ***
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay da rede

      const newCard: Card = {
        // Gera um ID simples (em produção, o backend faria isso)
        id: Date.now(), 
        nome: form.nome,
        // Guarda apenas os últimos 4 dígitos para exibição
        numero: numeroLimpo.slice(-4), 
        validade: form.validade,
      };

      setCartoes((prev) => [...prev, newCard]);

      alert("Cartão adicionado com sucesso! 🎉");
      handleClose();
    } catch {
      // Erro mockado
      setError("Erro ao salvar cartão (MOCK)");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover este cartão?")) return;

    try {
      // *** MOCK: Simulação de API DELETE ***
      await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay da rede
      
      setCartoes((prev) => prev.filter((c) => c.id !== id));
      alert("Cartão removido com sucesso");
    } catch {
      alert("Erro ao remover cartão (MOCK)");
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <div className="main-content-cartoes">
          <div className="header-cartao">
            <h2>Cartão De Crédito</h2>
            <button onClick={handleOpen}>+ Adicionar Cartão De Crédito</button>
          </div>

          {error && <div className="error-box">{error}</div>}

          {loadingList ? (
            <p className="text-center py-8">Carregando cartões...</p>
          ) : cartoes.length === 0 ? (
            // Mensagem exibida quando a lista está vazia
            <p className="nenhum-cartao">Você ainda não tem cartões cadastrados.</p>
          ) : (
            <div className="cards-list">
              {cartoes.map((c) => (
                <div key={c.id} className="card-box">
                  <div className="card-header">
                    <h4>{c.nome}</h4>
                    <button className="delete-btn" onClick={() => handleDelete(c.id)}>
                      <FaTrash size={18} color="#ff4d4d" />
                    </button>
                  </div>
                  {/* Exibição: **** **** **** XXXX */}
                  <p>**** **** **** {c.numero}</p>
                  <p>Validade: {c.validade}</p>
                </div>
              ))}
            </div>
          )}

          {/* Modal de adicionar cartão */}
          {open && (
            <div className="modal-overlay" onClick={handleClose}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Informações do Cartão</h3>
                
                {/* Campo Nome no Cartão */}
                <div className="modal-field-group full-width">
                  <label>Nome no Cartão</label>
                  <input
                    type="text"
                    placeholder="Nome como está no cartão"
                    className="modal-input"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    disabled={loading}
                  />
                </div>

                {/* Campo Número do Cartão com Máscara */}
                <div className="modal-field-group full-width">
                  <label>Número do Cartão</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0000 0000 0000 0000"
                    className="modal-input" 
                    value={form.numero}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        numero: formatarNumeroCartao(e.target.value),
                      })
                    }
                    maxLength={19} 
                    disabled={loading}
                  />
                </div>

                {/* Validade e CVV (em linha) */}
                <div className="modal-row fields-split">
                  {/* Validade */}
                  <div className="modal-field-group">
                    <label>Validade</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/AA"
                      className="modal-input" 
                      value={form.validade}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "");
                        if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                        setForm({ ...form, validade: v });
                      }}
                      maxLength={5}
                      disabled={loading}
                    />
                  </div>
                  {/* CVV */}
                  <div className="modal-field-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="000"
                      className="modal-input" 
                      value={form.cvv}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                        })
                      }
                      maxLength={3}
                      disabled={loading}
                    />
                  </div>
                </div>

                <button onClick={handleSave} disabled={loading} className="confirmar">
                  {loading ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Cartoes;