// src/pages/Enderecos/Enderecos.tsx
import { useState, useEffect } from "react";
import Navbar from "../../components/UI/Navbar";
import Sidebar from "../../components/UI/Sidebar";
import "./Enderecos.css";

interface Endereco {
  id: number;
  nome: string;
  telefone: string;
  cep: string;
  estadoCidade: string; // Ex: São Paulo - SP
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
  isDefault: boolean;
}

const initialEnderecos: Endereco[] = [];

// Funções de Máscara (Mantidas)
const formatTelefone = (v: string) => {
    v = v.replace(/\D/g, "").slice(0, 11);
    if (v.length > 6) return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
    return v;
};

const formatCEP = (v: string) => {
    v = v.replace(/\D/g, "").slice(0, 8);
    if (v.length > 5) return `${v.slice(0, 5)}-${v.slice(5)}`;
    return v;
};

const Enderecos = () => {
  const [open, setOpen] = useState(false);
  const [enderecos, setEnderecos] = useState<Endereco[]>(initialEnderecos);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState("");
  const [cepLoading, setCepLoading] = useState(false); // Estado para o loading do CEP

  const [form, setForm] = useState<Omit<Endereco, 'id' | 'isDefault'>>({
    nome: "",
    telefone: "",
    cep: "",
    estadoCidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  });

  // Simulação de Carregamento da Lista
  useEffect(() => {
    setTimeout(() => {
        setLoadingList(false);
    }, 500);
  }, []);

  const resetForm = () => {
    setForm({
      nome: "",
      telefone: "",
      cep: "",
      estadoCidade: "",
      bairro: "",
      rua: "",
      numero: "",
      complemento: "",
    });
    setEditId(null);
    setError("");
  };

  const handleOpenCreate = () => {
    resetForm();
    setOpen(true);
  };

  const handleOpenEdit = (endereco: Endereco) => {
    setEditId(endereco.id);
    setForm({
        nome: endereco.nome,
        telefone: endereco.telefone,
        cep: endereco.cep,
        estadoCidade: endereco.estadoCidade,
        bairro: endereco.bairro,
        rua: endereco.rua,
        numero: endereco.numero,
        complemento: endereco.complemento,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    // Validação básica
    if (!form.nome || !form.cep || form.cep.replace(/\D/g, "").length < 8 || !form.rua || !form.numero) {
      setError("Preencha todos os campos obrigatórios (Nome, CEP, Rua, Número).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // *** MOCK: Simulação de API POST/PUT ***
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      const isFirstAddress = enderecos.length === 0 && !editId;

      const saved: Endereco = {
        id: editId ?? Date.now(), 
        ...form,
        isDefault: isFirstAddress ? true : false, 
      };
      
      if (editId) {
        setEnderecos((prev) => prev.map((e) => (e.id === editId ? saved : e)));
      } else {
        setEnderecos((prev) => [...prev, saved]);
      }

      alert(`Endereço ${editId ? "editado" : "salvo"} com sucesso!`);
      setOpen(false);
      resetForm();
    } catch {
      setError("Erro ao salvar (MOCK)");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este endereço?")) return;

    try {
        // *** MOCK: Simulação de API DELETE ***
        await new Promise(resolve => setTimeout(resolve, 500)); 

        setEnderecos((prev) => prev.filter((e) => e.id !== id));
        alert("Endereço excluído com sucesso");
    } catch {
        alert("Erro ao excluir endereço (MOCK)");
    }
  };
  
  const handleSetDefault = (id: number) => {
    setEnderecos((prev) => 
        prev.map(e => ({
            ...e,
            isDefault: e.id === id ? true : false,
        }))
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // FUNÇÃO ATUALIZADA: Tratar a mudança no campo CEP e buscar o endereço no ViaCEP
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const maskedValue = formatCEP(rawValue);
    const unmaskedValue = rawValue.replace(/\D/g, "");

    setForm(prev => ({ ...prev, cep: maskedValue }));
    setError(""); // Limpa erros anteriores de CEP

    // Checa se atingiu o tamanho completo do CEP (8 dígitos)
    if (unmaskedValue.length === 8) {
      setCepLoading(true);
      
      // Limpa os campos de endereço antes de buscar
      setForm(prev => ({
        ...prev,
        estadoCidade: "",
        bairro: "",
        rua: "",
        // Manter o complemento aqui para que o ViaCEP sobrescreva, se houver
      }));

      try {
        // *** REAL API CALL PARA VIACEP ***
        const res = await fetch(`https://viacep.com.br/ws/${unmaskedValue}/json/`);
        const data = await res.json();
        
        if (!data.erro) {
          setForm(prev => ({
            ...prev,
            // Combina localidade e UF no campo estadoCidade
            estadoCidade: `${data.localidade} - ${data.uf}`, 
            bairro: data.bairro || "",
            rua: data.logradouro || "", // logradouro é a rua
            // Usa o complemento retornado, mas se for vazio, mantém o que o usuário digitou (prev.complemento)
            complemento: data.complemento || prev.complemento, 
          }));
          // Foca no campo de número
          document.getElementById('numero-input')?.focus();
        } else {
          setError("CEP não encontrado. Preencha o endereço manualmente.");
        }
      } catch {
        setError("Erro na busca de CEP. Verifique sua conexão.");
      } finally {
        setCepLoading(false);
      }
    }
  };


  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <div className="main-content-enderecos">
          <div className="endereco-header">
            <h2>Meus endereços</h2>
            <button className="add-btn" onClick={handleOpenCreate}>
              + Inserir novo endereço
            </button>
          </div>

          {error && <div className="error-box">{error}</div>}

          {loadingList ? (
            <p className="text-center py-8">Carregando endereços...</p>
          ) : enderecos.length === 0 ? (
            <p className="nenhum-endereco">Nenhum endereço cadastrado ainda.</p>
          ) : (
            enderecos.map((e) => (
              <div key={e.id} className="endereco-card">
                <div className="endereco-info">
                  <div className="endereco-top">
                    <strong>{e.nome}</strong>
                    <span className="separador">|</span>
                    <span>{e.telefone}</span>
                  </div>
                  <div className="endereco-detalhes">
                    <p>
                      {e.rua}, {e.numero}
                      {e.complemento && `, ${e.complemento}`}
                    </p>
                    <p>
                      {e.bairro}, {e.estadoCidade} - {e.cep}
                    </p>
                  </div>
                </div>
                <div className="endereco-actions">
                  <div className="btn-group">
                    <button className="editar" onClick={() => handleOpenEdit(e)}>
                      Editar
                    </button>
                    <button className="excluir" onClick={() => handleDelete(e.id)}>
                      Excluir
                    </button>
                  </div>
                  <button 
                    className={`padrao-btn ${e.isDefault ? 'is-default' : ''}`}
                    onClick={() => handleSetDefault(e.id)}
                    disabled={e.isDefault}
                  >
                    {e.isDefault ? "Padrão" : "Definir como padrão"}
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Modal */}
          {open && (
            <div className="modal-overlay" onClick={() => setOpen(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>{editId ? "Editar Endereço" : "Novo Endereço"}</h2>
                <div className="form-grid">
                  <input name="nome" placeholder="Nome Completo" value={form.nome} onChange={handleChange} disabled={loading} />
                  <input
                    name="telefone"
                    placeholder="Número de Telefone"
                    value={form.telefone}
                    onChange={(e) => setForm({ ...form, telefone: formatTelefone(e.target.value) })}
                    disabled={loading}
                  />
                  {/* CAMPO CEP COM LOADER */}
                  <div className="input-group-with-loader"> 
                      <input
                          name="cep"
                          placeholder={cepLoading ? "Buscando CEP..." : "CEP"}
                          value={form.cep}
                          onChange={handleCepChange} // Usando a nova função de busca
                          disabled={loading || cepLoading}
                      />
                      {cepLoading && <span className="cep-loader"></span>} 
                  </div>
                  
                  {/* CAMPOS DE ENDEREÇO DESABILITADOS DURANTE A BUSCA */}
                  <input 
                      name="estadoCidade" 
                      placeholder="Cidade - UF" 
                      value={form.estadoCidade} 
                      onChange={handleChange} 
                      disabled={loading || cepLoading} 
                  />
                  <input 
                      name="bairro" 
                      placeholder="Bairro" 
                      value={form.bairro} 
                      onChange={handleChange} 
                      disabled={loading || cepLoading} 
                  />
                  <input 
                      name="rua" 
                      placeholder="Rua / Avenida" 
                      value={form.rua} 
                      onChange={handleChange} 
                      disabled={loading || cepLoading} 
                  />
                  <input 
                      name="numero" 
                      placeholder="Número" 
                      value={form.numero} 
                      onChange={handleChange} 
                      disabled={loading} 
                      id="numero-input" 
                  />
                  <input 
                      name="complemento" 
                      placeholder="Complemento" 
                      value={form.complemento} 
                      onChange={handleChange} 
                      disabled={loading} 
                  />
                </div>
                <div className="modal-actions">
                  <button className="cancelar" onClick={() => setOpen(false)} disabled={loading}>
                    Cancelar
                  </button>
                  <button className="enviar" onClick={handleSave} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Enderecos;