import { useState } from "react";
import Navbar from "../../components/UI/Navbar";
import "./Loja.css";

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
    console.log("AQUI você vai enviar pro backend:");
    console.log("Banner:", bannerPreview);
    console.log("Foto:", fotoPreview);

    alert("Salvar integração backend depois!");
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
            backgroundImage: `url(${
              bannerPreview ||
              "https://img.pikbest.com/backgrounds/20190319/original-square-rhombus-pure-black-banner-background_2752217.jpg!w700wp"
            })`,
          }}
        >
          {/* Input do banner - invisível */}
          <label className="editar-banner">
            Alterar banner
            <input type="file" accept="image/*" onChange={handleBannerChange} />
          </label>
        </div>

        {/* Infos */}
        <div className="info-loja-container">
          {/* Foto do perfil */}
          <div className="foto-wrapper">
            <img
              src={
                fotoPreview ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              className="foto-perfil-loja"
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
        </div>

        {/* Botão salvar */}
        <button className="btn-salvar-loja" onClick={handleSave}>
          Salvar alterações
        </button>

        {/* Abas */}
        <div className="abas-loja">
          <button
            className={`aba ${abaAtiva === "venda" ? "ativa" : ""}`}
            onClick={() => setAbaAtiva("venda")}
          >
            À venda (0)
          </button>

          <button
            className={`aba ${abaAtiva === "vendidos" ? "ativa" : ""}`}
            onClick={() => setAbaAtiva("vendidos")}
          >
            Vendidos (0)
          </button>

          <button
            className={`aba ${abaAtiva === "favoritos" ? "ativa" : ""}`}
            onClick={() => setAbaAtiva("favoritos")}
          >
            Favoritados (0)
          </button>

          <button
            className={`aba ${abaAtiva === "seguidores" ? "ativa" : ""}`}
            onClick={() => setAbaAtiva("seguidores")}
          >
            Seguidores (0)
          </button>

          <button
            className={`aba ${abaAtiva === "seguindo" ? "ativa" : ""}`}
            onClick={() => setAbaAtiva("seguindo")}
          >
            Seguindo (0)
          </button>
        </div>
        <div className="conteudo-aba">
          {abaAtiva === "venda" && (
            <>
              <h2>Anuncie um produto</h2>
              <p>Anuncie um produto para ter novidades nessa aba.</p>
              <button className="btn-acao-aba">Anunciar</button>
            </>
          )}

          {abaAtiva === "vendidos" && (
            <>
              <h2>Você ainda não vendeu nenhum produto</h2>
              <p>Comece anunciando algo para aparecer aqui.</p>
              <button className="btn-acao-aba">Anunciar</button>
            </>
          )}

          {abaAtiva === "favoritos" && (
            <>
              <h2>Nenhum produto favoritado</h2>
              <p>Os produtos que você favoritar aparecerão aqui.</p>
            </>
          )}

          {abaAtiva === "seguidores" && (
            <>
              <h2>Nenhum seguidor ainda</h2>
              <p>Quando alguém seguir sua loja, aparecerá aqui.</p>
            </>
          )}

          {abaAtiva === "seguindo" && (
            <>
              <h2>Você não está seguindo ninguém</h2>
              <p>As lojas que você seguir aparecerão aqui.</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Loja;
