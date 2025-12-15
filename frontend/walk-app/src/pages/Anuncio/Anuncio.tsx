// src/pages/Anuncio/Anuncio.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Walk from "../../assets/Walk.png";
import "./Anuncio.css";

const Anuncio = () => {
  const navigate = useNavigate();

  const [preco, setPreco] = useState<string>("");
  const [erroPreco, setErroPreco] = useState<string>("");
  const [modalTaxas, setModalTaxas] = useState<boolean>(false);
  const [showModalTermos, setShowModalTermos] = useState<boolean>(false);

  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [marca, setMarca] = useState<string>("");
  const [semMarca, setSemMarca] = useState<boolean>(false);
  const [tamanho, setTamanho] = useState<string>("");
  const [cor, setCor] = useState<string>("");
  const [novo, setNovo] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<string>("");
  const [peso, setPeso] = useState<string>("");
  const [entrega, setEntrega] = useState<string>("");
  const [erroPeso, setErroPeso] = useState<string>("");
  const [erroEntrega, setErroEntrega] = useState<string>("");

  // Fotos
  const [imagens, setImagens] = useState<(File | null)[]>([null, null, null, null, null]);
  const [preview, setPreview] = useState<(string | null)[]>([null, null, null, null, null]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const comissao = 0.10;
  const tarifaFixa = 4.00;
  const precoNum = Number(preco.replace(",", "."));
  const valorComissao = precoNum * comissao;
  const valorReceber = precoNum - valorComissao - tarifaFixa;

  const handlePreco = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(",", ".");
    setPreco(valor);
    if (!valor) {
      setErroPreco("O preço é obrigatório.");
    } else if (precoNum < 9) {
      setErroPreco("O preço mínimo é R$9,00.");
    } else {
      setErroPreco("");
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newImagens = [...imagens];
    newImagens[index] = file;
    setImagens(newImagens);

    const newPreview = [...preview];
    newPreview[index] = URL.createObjectURL(file);
    setPreview(newPreview);
  };

  const handleSubmit = async () => {
    let temErro = false;

    if (!preco || precoNum < 9) {
      setErroPreco("O preço é obrigatório e deve ser no mínimo R$9,00.");
      temErro = true;
    }

    if (!peso) {
      setErroPeso("Selecione o peso do produto.");
      temErro = true;
    }

    if (!entrega) {
      setErroEntrega("Selecione o tipo de entrega.");
      temErro = true;
    }

    if (!titulo.trim()) {
      setError("O título é obrigatório");
      temErro = true;
    }

    if (!categoria) {
      setError("Selecione uma categoria");
      temErro = true;
    }

    if (imagens.filter((img): img is File => img !== null).length === 0) {
      setError("Adicione pelo menos uma foto");
      temErro = true;
    }

    if (temErro) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Você precisa estar logado");
        navigate("/");
        return;
      }

      const formData = new FormData();
      formData.append("name", titulo.trim());
      formData.append("description", descricao.trim());
      formData.append("price", precoNum.toString());
      formData.append("stock", "50");

      formData.append("brand", semMarca ? "Sem marca" : marca.trim());
      formData.append("size", tamanho);
      formData.append("color", cor.trim());
      formData.append("isNew", novo.toString());
      formData.append("category", categoria);

      imagens.forEach((img) => {
        if (img) formData.append("images", img);
      });

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Erro ao anunciar produto");
      }

      alert("Produto anunciado com sucesso! 🎉");
      navigate("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado ao anunciar");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="anuncio-nav">
        <Link to="/home">
          <img src={Walk} alt="Logo" className="logo" />
        </Link>
        <span>Roupas sustentáveis e com melhor qualidade!</span>
      </nav>

      <div className="anuncio-container">
        <h1>Venda seus produtos aqui!</h1>
        <h2>Tire boas fotos e tenha uma boa descrição!</h2>

        {error && <div className="error-box">{error}</div>}

        <div className="form-anuncio">
          {/* FOTOS */}
          <div className="fotos-box">
            <label>fotos</label>
            <div className="foto-grid">
              <label className="foto-principal">
                {preview[0] ? <img src={preview[0]} alt="Prévia" /> : <span className="icon-foto">📷</span>}
                <input type="file" accept="image/*" onChange={(e) => handleFile(e, 0)} className="input-file" />
              </label>
              {preview.slice(1).map((foto, i) => (
                <label key={i} className="foto-mini">
                  {foto ? <img src={foto} alt="Preview" /> : <span>📷</span>}
                  <input type="file" accept="image/*" onChange={(e) => handleFile(e, i + 1)} className="input-file" />
                </label>
              ))}
            </div>
          </div>

          {/* INFORMAÇÕES */}
          <div className="infos-box">
            <div className="input-group">
              <label>título</label>
              <input
                type="text"
                placeholder='ex: "vestido branco rendado"...'
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div className="input-group marca-group">
              <label>marca</label>
              <div className="marca-row">
                <input
                  type="text"
                  placeholder="qual a marca do produto?"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  disabled={semMarca}
                />
                <div className="marca-sem">
                  <input type="checkbox" checked={semMarca} onChange={() => setSemMarca(!semMarca)} />
                  <span>produto sem marca</span>
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>descrição</label>
              <textarea
                maxLength={350}
                placeholder="ex: blusa de manga longa de lã..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <div className="contador">{descricao.length} de 350</div>
            </div>

            <div className="input-group-lado">
              <div className="input-group">
                <label>Tamanho</label>
                <select value={tamanho} onChange={(e) => setTamanho(e.target.value)}>
                  <option value="">Selecione</option>
                  <option>PP</option>
                  <option>P</option>
                  <option>M</option>
                  <option>G</option>
                  <option>GG</option>
                </select>
              </div>
              <div className="input-group">
                <label>Cor</label>
                <input type="text" placeholder='ex: "Azul"...' value={cor} onChange={(e) => setCor(e.target.value)} />
              </div>
            </div>

            <div className="estado-produto">
              <label>é novo?</label>
              <div className="estado-opcoes">
                <label>
                  <input type="radio" name="estado" checked={!novo} onChange={() => setNovo(false)} />
                  produto usado
                </label>
                <label>
                  <input type="radio" name="estado" checked={novo} onChange={() => setNovo(true)} />
                  produto novo
                </label>
              </div>
            </div>

            <div className="linha-seletor">
              <div className="input-group">
                <label>categoria</label>
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  <option value="">Selecione</option>
                  <option>Roupas</option>
                  <option>Sapatos</option>
                  <option>Acessórios</option>
                </select>
              </div>

              <div className="preco-group">
                <label className="preco-label"><b>preço</b></label>
                <div className="preco-box">
                  <span className="prefixo">R$</span>
                  <input
                    type="number"
                    value={preco}
                    onChange={handlePreco}
                    placeholder="0,00"
                    min="9"
                    className={erroPreco ? "erro" : ""}
                  />
                </div>
                {erroPreco && <span className="mensagem-erro">{erroPreco}</span>}
                {!erroPreco && preco !== "" && precoNum >= 9 && (
                  <p className="receber-info">
                    você irá receber: <b>R$ {valorReceber.toFixed(2)}</b>
                  </p>
                )}
                <p className="link-receber" onClick={() => setModalTaxas(true)}>
                  entenda o valor a receber
                </p>
              </div>
            </div>

            <div className="linha-dupla">
              <div className="input-group">
                <label>peso do produto</label>
                <select value={peso} onChange={(e) => { setPeso(e.target.value); setErroPeso(""); }} className={erroPeso ? "erro" : ""}>
                  <option value="">selecione</option>
                  <option value="0.5kg">até 0.5kg</option>
                  <option value="1kg">até 1kg</option>
                  <option value="2kg">até 2kg</option>
                  <option value="6kg">até 6kg</option>
                </select>
                {erroPeso && <span className="mensagem-erro">{erroPeso}</span>}
              </div>
              <div className="input-group">
                <label>tipo de entrega</label>
                <select value={entrega} onChange={(e) => { setEntrega(e.target.value); setErroEntrega(""); }} className={erroEntrega ? "erro" : ""}>
                  <option value="">selecione</option>
                  <option value="correios">Correios</option>
                  <option value="transportadora">Transportadora</option>
                  <option value="retirada">Retirada no local</option>
                </select>
                {erroEntrega && <span className="mensagem-erro">{erroEntrega}</span>}
              </div>
            </div>

            <div className="aviso-box">
              <strong>importante:</strong> para selecionar a opção correios ou transportadora,
              o seu produto deve ter até 6kg e estar dentro do limite de dimensões aceito pela
              entregadora. veja os
              <button className="link-btn" onClick={() => setShowModalTermos(true)}> termos aqui.</button>
            </div>

            <button className="btn-enviar" onClick={handleSubmit} disabled={loading}>
              {loading ? "Anunciando..." : "enviar produto"}
            </button>
          </div>
        </div>

        {/* Modal Taxas */}
        {modalTaxas && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="fechar" onClick={() => setModalTaxas(false)}>×</button>
              <h1>valor a receber</h1>
              <p>
                <b>valor do produto</b>:<br />R$ {precoNum.toFixed(2)}<br /><br />
                <b>comissão ({comissao * 100}%)</b>:<br />R$ {valorComissao.toFixed(2)}<br /><br />
                <b>tarifa fixa</b>:<br />R$ {tarifaFixa.toFixed(2)}<br /><br />
                <b>receba até</b>:<br />R$ {valorReceber.toFixed(2)}<br /><br />
                o valor a receber pode mudar caso você faça negociações, aceite ofertas ou ofereça descontos.<br /><br />
                por ser uma loja iniciante, suas tarifas foram reduzidas para ajudar nas primeiras vendas.
              </p>
              <button onClick={() => setModalTaxas(false)}>Ok</button>
            </div>
          </div>
        )}

        {/* Modal Termos */}
        {showModalTermos && (
          <div className="modal-overlay">
            <div className="modal">
              <h1>Como funciona o envio do produto</h1>
              <p><strong>1 - escolha da transportadora:</strong> a escolha é automática pelo sistema Walk.</p>
              <p><strong>2 - envio do produto:</strong> use a etiqueta ou QR code em "minhas vendas".</p>
              <p><strong>3 - preparação:</strong> embalagem adequada, até 6kg, peso cubado: (altura × largura × comprimento) / 6000.</p>
              <p><strong>4 - despacho:</strong> leve ao ponto da transportadora.</p>
              <p><strong>5 - entrega em mãos:</strong> combine local via chat.</p>
              <button onClick={() => setShowModalTermos(false)}>Ok</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Anuncio;