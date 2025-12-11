// src/pages/Loja.tsx
import { useState } from "react";
import Navbar from "../../components/UI/Navbar";
import "./Loja.css";
import { Link } from "react-router-dom";

function Loja() {
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

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
    alert("Alterações salvas! (Integração backend futura)");
  };

  const [abaAtiva, setAbaAtiva] = useState("venda");

  return (
    <>
      <Navbar />

      <div className="loja-container">
        {/* Banner */}
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

        {/* Infos */}
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
            <p className="local-loja">Cidade, UF</p>
          </div>

          <button className="btn-salvar-loja" onClick={handleSave}>
            Salvar alterações
          </button>
        </div>

        {/* Abas */}
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

        {/* Conteúdo */}
        <div className="conteudo-aba">
          {abaAtiva === "venda" && (
            <div className="aba-vazia">
              <h2>Anuncie um produto</h2>
              <p>Anuncie um produto para ter novidades nessa aba.</p>
              <Link to="/anuncio" className="btn-acao-aba">Anunciar</Link>
            </div>
          )}
          {abaAtiva === "vendidos" && (
            <div className="aba-vazia">
              <h2>Você ainda não vendeu nenhum produto</h2>
              <p>Comece anunciando algo para aparecer aqui.</p>
              <Link to="/anuncio" className="btn-acao-aba">Anunciar</Link>
            </div>
          )}
          {["favoritos", "seguidores", "seguindo"].includes(abaAtiva) && (
            <div className="aba-vazia">
              <h2>{abaAtiva === "favoritos" ? "Nenhum produto favoritado" : abaAtiva === "seguidores" ? "Nenhum seguidor ainda" : "Você não está seguindo ninguém"}</h2>
              <p>{abaAtiva === "favoritos" ? "Os produtos que você favoritar aparecerão aqui." : abaAtiva === "seguidores" ? "Quando alguém seguir sua loja, aparecerá aqui." : "As lojas que você seguir aparecerão aqui."}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Loja;