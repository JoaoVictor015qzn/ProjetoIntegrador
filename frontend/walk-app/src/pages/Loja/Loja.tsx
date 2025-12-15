// src/pages/Loja/Loja.tsx
import { useState } from "react";
import Navbar from "../../components/UI/Navbar";
import "./Loja.css";
import { Link } from "react-router-dom";

function Loja() {
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("venda");

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!cidade.trim() || !uf.trim()) {
      alert("Preencha a Cidade e UF antes de salvar.");
      return;
    }
    alert("Alterações salvas com sucesso!");
  };

  return (
    <>
      <Navbar />

      <div className="loja-container">
        <div
          className="banner-loja"
          style={{
            backgroundImage: `url(${bannerPreview || "https://img.pikbest.com/backgrounds/20190319/original-square-rhombus-pure-black-banner-background_2752217.jpg!w700wp"})`,
          }}
        >
          <label className="editar-banner">
            Alterar banner
            <input type="file" accept="image/*" onChange={handleBannerChange} />
          </label>
        </div>

        <div className="info-loja-container">
          <div className="foto-wrapper">
            <img
              src={fotoPreview || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
              className="foto-perfil-loja"
              alt="Perfil da loja"
            />
            <label className="editar-foto">
              Alterar foto
              <input type="file" accept="image/*" onChange={handleFotoChange} />
            </label>
          </div>

          <div className="info-texto">
            <h2 className="nome-loja">Nome da Loja</h2>
            <div className="local-loja-inputs">
              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="input-local"
                required
              />
              <input
                type="text"
                placeholder="UF"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
                className="input-local uf"
                maxLength={2}
                required
              />
            </div>
          </div>

          <button className="btn-salvar-loja" onClick={handleSave}>
            Salvar alterações
          </button>
        </div>

        <div className="abas-loja">
          {["venda", "vendidos", "favoritos", "seguidores", "seguindo"].map((aba) => (
            <button
              key={aba}
              className={`aba ${abaAtiva === aba ? "ativa" : ""}`}
              onClick={() => setAbaAtiva(aba)}
            >
              {aba === "venda" && "À venda (0)"}
              {aba === "vendidos" && "Vendidos (0)"}
              {aba === "favoritos" && "Favoritados (0)"}
              {aba === "seguidores" && "Seguidores (0)"}
              {aba === "seguindo" && "Seguindo (0)"}
            </button>
          ))}
          <button className="aba solicitar-relatorio">
            Solicitar relatório
          </button>
        </div>

        <div className="conteudo-aba">
          {abaAtiva === "venda" && (
            <div className="aba-vazia">
              <h2>Anuncie um produto</h2>
              <p>Anuncie um produto para ter novidades nessa aba.</p>
              <Link to="/anuncio" className="btn-acao-aba">
                Anunciar
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Loja;