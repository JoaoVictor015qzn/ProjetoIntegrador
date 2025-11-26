import Navbar from "../../components/UI/Navbar";
import Sidebar from "../../components/UI/Sidebar";
import "./Enderecos.css";
import React, { useState } from "react";

interface Endereco {
  nome: string;
  telefone: string;
  cep: string;
  estadoCidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
}

function Enderecos() {
  const [open, setOpen] = useState(false);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);

  // Guarda o índice do endereço sendo editado
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [form, setForm] = useState<Endereco>({
    nome: "",
    telefone: "",
    cep: "",
    estadoCidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  });

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
  };

  // Abrir modal para CRIAR
  const handleOpenCreate = () => {
    setEditIndex(null);
    resetForm();
    setOpen(true);
  };

  // Abrir modal para EDITAR
  const handleOpenEdit = (index: number) => {
    setEditIndex(index);
    setForm(enderecos[index]); // carrega dados
    setOpen(true);
  };

  // Salvar (criar OU editar)
  const handleSave = () => {
    if (editIndex !== null) {
      // Editar
      setEnderecos((prev) =>
        prev.map((item, i) => (i === editIndex ? form : item))
      );
    } else {
      // Criar
      setEnderecos((prev) => [...prev, form]);
    }

    resetForm();
    setOpen(false);
  };

  // Excluir endereço
  const handleDelete = (index: number) => {
    setEnderecos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

          {enderecos.length === 0 && (
            <p className="nenhum-endereco">Nenhum endereço cadastrado ainda.</p>
          )}

          {enderecos.map((e, idx) => (
            <div key={idx} className="endereco-card">
              
              {/* LADO ESQUERDO: Informações */}
              <div className="endereco-info">
                <div className="endereco-top">
                  <strong>{e.nome}</strong>
                  <span className="separador">|</span>
                  <span>{e.telefone}</span>
                </div>

                <div className="endereco-detalhes">
                  <p>{e.rua}, {e.numero}, {e.bairro}</p>
                  <p>{e.estadoCidade}, {e.cep}</p>
                  {e.complemento && <p>{e.complemento}</p>}
                </div>
              </div>

              {/* LADO DIREITO: Botões */}
              <div className="endereco-actions">
                <div className="btn-group">
                  <button className="editar" onClick={() => handleOpenEdit(idx)}>
                    Editar
                  </button>
                  <button className="excluir" onClick={() => handleDelete(idx)}>
                    Excluir
                  </button>
                </div>

                <button className="padrao-btn">Definir como padrão</button>
              </div>

            </div>
          ))}

          {open && (
            <div className="modal-overlay" onClick={() => setOpen(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>{editIndex !== null ? "Editar Endereço" : "Novo Endereço"}</h2>

                <div className="form-grid">
                  <input name="nome" placeholder="Nome Completo" value={form.nome} onChange={handleChange} />
                  <input name="telefone" placeholder="Número de Telefone" value={form.telefone} onChange={handleChange} />

                  <input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
                  <input name="estadoCidade" placeholder="Estado - Cidade" value={form.estadoCidade} onChange={handleChange} />

                  <input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />

                  <input name="rua" placeholder="Rua / Avenida" value={form.rua} onChange={handleChange} />
                  <input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} />

                  <input name="complemento" placeholder="Complemento / Descrição" value={form.complemento} onChange={handleChange} />
                </div>

                <div className="modal-actions">
                  <button className="cancelar" onClick={() => setOpen(false)}>Cancelar</button>
                  <button className="enviar" onClick={handleSave}>
                    {editIndex !== null ? "Salvar Alterações" : "Enviar"}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Enderecos;
