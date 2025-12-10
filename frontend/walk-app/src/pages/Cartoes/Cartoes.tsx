import Navbar from "../../components/UI/Navbar";
import Sidebar from "../../components/UI/Sidebar";
import React, { useState } from "react";
import "./Cartoes.css";

interface CardFormState {
  numero: string;
  validade: string;
  cvv: string;
  nome: string;
}

function Cartoes() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<CardFormState>({
    numero: "",
    validade: "",
    cvv: "",
    nome: "",
  });

  const [cartoes, setCartoes] = useState<CardFormState[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }
  ) => {
    const name = "target" in e ? e.target.name : e.name;
    const value = "target" in e ? e.target.value : e.value;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setCartoes((prev) => [...prev, form]);

    setForm({
      numero: "",
      validade: "",
      cvv: "",
      nome: "",
    });

    handleClose();
  };

  const handleDelete = (index: number) => {
    setCartoes((prev) => prev.filter((_, i) => i !== index));
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

          {cartoes.length === 0 && (
            <p className="nenhum-cartao">
              Você ainda não tem cartões cadastrados.
            </p>
          )}

          <div className="cards-list">
            {cartoes.map((c, index) => (
              <div key={index} className="card-box">
                <div className="card-header">
                  <h4>{c.nome}</h4>
                </div>

                <p>**** **** **** {c.numero.slice(-4)}</p>
                <p>Validade: {c.validade}</p>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                />
              </div>
            ))}
          </div>

          {/* MODAL */}
          {open && (
            <div className="modal-overlay" onClick={handleClose}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>Informações do Cartão</h3>

                <div className="modal-row">
                  <input
                    name="numero"
                    placeholder="Número do Cartão"
                    type="text"
                    maxLength={16}
                    value={form.numero}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      handleChange({ name: "numero", value: onlyNums });
                    }}
                  />
                </div>

                <div className="modal-row">
                  <input
                    name="validade"
                    placeholder="Data de Validade (MM/AA)"
                    value={form.validade}
                    maxLength={5}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "");
                      if (v.length > 2) {
                        v = v.slice(0, 2) + "/" + v.slice(2, 4);
                      }
                      handleChange({ name: "validade", value: v });
                    }}
                  />

                  <input
                    name="cvv"
                    placeholder="CVV"
                    type="text"
                    maxLength={3}
                    value={form.cvv}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      handleChange({ name: "cvv", value: onlyNums });
                    }}
                  />
                </div>

                <div className="modal-row">
                  <input
                    name="nome"
                    placeholder="Nome no Cartão"
                    type="text"
                    value={form.nome}
                    onChange={handleChange}
                  />
                </div>

                <button className="confirmar" onClick={handleSave}>
                  Salvar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cartoes;
