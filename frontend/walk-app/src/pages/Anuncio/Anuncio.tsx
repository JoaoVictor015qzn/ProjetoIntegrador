import Walk from "../../assets/Walk.png";
import { Link } from "react-router-dom";
import "./Anuncio.css";
import { useState } from "react";

function Anuncio() {
  const [preco, setPreco] = useState("");
  const [erro, setErro] = useState("");
  const [modalTaxas, setModalTaxas] = useState(false);
  const comissao = 0.10;  
  const tarifaFixa = 4.00; 

  const precoNum = Number(preco);
  const valorComissao = precoNum * comissao;
  const valorReceber = precoNum - valorComissao - tarifaFixa;

  const handlePreco = (e: React.ChangeEvent<HTMLInputElement>) => {
  const valorDigitado = e.target.value;

  setPreco(valorDigitado);

  if (valorDigitado === "") {
    setErro("O preço é obrigatório.");
    return;
  }

  if (Number(valorDigitado) < 9) {
    setErro("O preço mínimo é R$9,00.");
    return;
  }

  setErro("");
  };

  const [showModal, setShowModal] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [semMarca, setSemMarca] = useState(false);

  const [peso, setPeso] = useState("");
  const [entrega, setEntrega] = useState("");
  const [erroPeso, setErroPeso] = useState("");
  const [erroEntrega, setErroEntrega] = useState("");

// FOTOS
  const [imagens, setImagens] = useState<(File | null)[]>([null, null, null, null, null]);
  const [preview, setPreview] = useState<(string | null)[]>([null, null, null, null, null]);

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
   index: number
   ) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const newImagens = [...imagens];
  newImagens[index] = file;

  const newPreview = [...preview];
  newPreview[index] = URL.createObjectURL(file);

  setImagens(newImagens);
  setPreview(newPreview);
  };


  const enviarProduto = () => {
    let temErro = false;

    if (!preco || Number(preco) < 9) {
      setErro("O preço é obrigatório e deve ser no mínimo R$ 9,00.");
      return;
    }

    if (peso === "") {
      setErroPeso("Selecione o peso do produto.");
      temErro = true;
    }

    if (entrega === "") {
      setErroEntrega("Selecione o tipo de entrega.");
      temErro = true;
    }

    if (temErro) return;

    // ----------------------------
    // BACKEND
    // Aqui você enviaria:
    // 1 - dados do produto
    // 2 - imagens no FormData()
    // ----------------------------

    alert("Produto enviado com sucesso!");
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

        <div className="form-anuncio">
        
          {/* FOTOS */}
          <div className="fotos-box">
            <label>fotos</label>

            <div className="foto-grid">

              {/* FOTO PRINCIPAL */}
              <label className="foto-principal">
                {preview[0] ? (
                  <img src={preview[0]} alt="Prévia" />
                ) : (
                  <span className="icon-foto">📷</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e, 0)}
                  className="input-file"
                />
              </label>

              {/* FOTOS MENORES */}
              {preview.slice(1).map((foto, i) => (
                <label key={i} className="foto-mini">
                  {foto ? <img src={foto} alt="Preview" /> : <span>📷</span>}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFile(e, i + 1)}
                    className="input-file"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* LADO DIREITO */}
          <div className="infos-box">

            {/* TÍTULO */}
            <div className="input-group">
              <label>título</label>
              <input type="text" placeholder='ex: "vestido branco rendado"...' />
            </div>

            {/* MARCA */}
            <div className="input-group marca-group">
              <label>marca</label>
              <div className="marca-row">
                <input
                  type="text"
                  placeholder="qual a marca do produto?"
                  disabled={semMarca}
                />
                <div className="marca-sem">
                  <input
                    type="checkbox"
                    checked={semMarca}
                    onChange={() => setSemMarca(!semMarca)}
                  />
                  <span>produto sem marca</span>
                </div>
              </div>
            </div>

            {/* DESCRIÇÃO */}
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

            {/* Tamanho */}
            <div className="input-group-lado">
              <div className="input-group">
                <label>Tamanho</label>
                  <select>
                      <option>Selecione</option>
                      <option>PP</option>
                      <option>P</option>
                      <option>M</option>
                      <option>G</option>
                      <option>GG</option>
                  </select>
              </div>

              {/* Cor */}
              <div className="input-group">
                <label>Cor</label>
                <input type="text" placeholder='ex: "Azul"...' />
              </div>
            </div>

            {/* ESTADO DO PRODUTO */}
            <div className="estado-produto">
              <label>é novo?</label>
              <div className="estado-opcoes">
                <label>
                  <input type="radio" name="estado" defaultChecked />
                  produto usado
                </label>

                <label>
                  <input type="radio" name="estado" />
                  produto novo
                </label>
              </div>
            </div>

            {/* CATEGORIA + PREÇO */}
            <div className="linha-seletor">

                {/* CATEGORIA */}
                <div className="input-group">
                    <label>categoria</label>
                    <select>
                        <option>Selecione</option>
                        <option>Roupas</option>
                        <option>Sapatos</option>
                        <option>Acessórios</option>
                    </select>
                </div>

                {/* PREÇO */}
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
                            className={erro ? "erro" : ""}
                        />
                    </div>

                    {/* ERRO (não empurra nada) */}
                    {erro && (
                        <span className="mensagem-erro">{erro}</span>
                    )}

                    {/* VALOR A RECEBER */}
                    {!erro && preco !== "" && (
                        <p className="receber-info">
                            você irá receber: <b>R$ {valorReceber.toFixed(2)}</b>
                        </p>
                    )}

                    {/* LINK MODAL */}
                    <p
                        className="link-receber"
                        onClick={() => setModalTaxas(true)}
                    >
                        entenda o valor a receber
                    </p>

                </div>
            </div>


                {/* MODAL */}
                {modalTaxas && (
                    <div className="modal-overlay">
                    <div className="modal">
                        <button className="fechar" onClick={() => setModalTaxas(false)}>
                        ×
                        </button>

                        <h1>valor a receber</h1>

                        <p>
                        <b>valor do produto</b>:  
                        <br />R$ {precoNum.toFixed(2)}
                        {"\n\n"}
                        <b>comissão ({comissao * 100}%)</b>:
                        <br />R$ {valorComissao.toFixed(2)}
                        {"\n\n"}
                        <b>tarifa fixa</b>:
                        <br />R$ {tarifaFixa.toFixed(2)}
                        {"\n\n"}
                        <b>receba até</b>:
                        <br />R$ {valorReceber.toFixed(2)}
                        {"\n\n"}
                        o valor a receber pode mudar caso você faça negociações,
                        aceite ofertas ou ofereça descontos.
                        {"\n\n"}
                        por ser uma loja iniciante, suas tarifas foram reduzidas para ajudar nas primeiras vendas.
                        </p>

                        <button onClick={() => setModalTaxas(false)}>
                        Ok
                        </button>
                    </div>
                    </div>
                )}
                   </div>
                </div>
              </div>
     
          {/* AVISO IMPORTANTE */}
          <div className="aviso-box">
            <strong>importante:</strong> para selecionar a opção correios ou transportadora,
            o seu produto deve ter até 6kg e estar dentro do limite de dimensões aceito pela
            entregadora. veja os 
            <button className="link-btn" onClick={() => setShowModal(true)}> termos aqui.</button>
          </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h1>Como funciona o envio do produto</h1>
               <p><strong>1 - escolha da transportadora: </strong>
                a escolha da transportadora é realizada automaticamente pelo sistema do Walk.
                o sistema leva em consideração a localização dos pontos mais próximos ao vendedor, o tempo de entrega para o comprador e a experiência final para ambos.
                </p>

                <p>
                <strong>2 - envio do produto: </strong>
                o vendedor deve seguir com o envio do produto através da etiqueta ou qr code disponível no menu  "minhas vendas"  "vendidos"  "aguardando envio". caso seja gerada uma etiqueta, o vendedor deverá fixá-la na embalagem do produto.
                </p>

                <p>
                <strong>3 - preparação da venda e embalagem: </strong>
                 todos os produtos vendidos em uma mesma sacolinha devem ser enviados dentro de uma única embalagem ou caixa.
                registre imagens e/ou vídeos do produto antes do envio e também da embalagem. como os itens não passam fisicamente por nós, essas evidências poderão ser solicitadas  em caso de análise de acareação.
                verifique as dimensões aceitas por nossos transportadores, o peso máximo é de 6kg, sendo que o peso máximo é o maior valor entre o peso aferido na balança e o peso cubado, que é calculado da seguinte forma: altura (cm) x comprimento (cm) x largura (cm) / 6000 (cm³/kg)
                utilize uma embalagem adequada, preferencialmente caixas de papelão que possam ser reutilizadas, ocultando qualquer logotipo.
                reforce o pacote se for enviar um item frágil, usando plástico bolha, jornal amassado ou outro material para proteção. sinalize na embalagem que se trata de um produto frágil.
                certifique-se de que a embalagem esteja bem fechada com fita adesiva.
                </p>

                <p>
                <strong>4 - despacho do produto: </strong>
                o vendedor deve se dirigir até o ponto da transportadora indicada para despachar o produto.
                guarde o comprovante de postagem até que a venda seja concluída. lembre-se que o comprovante de postagem pode ser físico ou via sms.
                caso os pontos de postagens indicados pelo enjoei não estejam disponíveis ou apresentem algum problema para realizar a postagem, orientamos que o usuário vendedor entre em contato com nossa central de ajuda clicando no botão “fale com a gente” para orientações.
                </p>

                <p>
                <strong>5 - entrega em mãos: </strong>
                caso a opção seja entrega em mãos, o comprador e o vendedor devem combinar um local de entrega via chat.
                para confirmar o recebimento de uma entrega em mãos, basta o comprador ir até o menu  minhas compras  em aberto.
                </p>
                

                <button onClick={() => setShowModal(false)}>Ok</button>
                </div>
            </div>
        )}

        {/* Peso e Tipo de Entrega */}
        <div className="linha-dupla">

        <div className="input-group">
            <label>peso do produto</label>
            <select
            value={peso}
            onChange={(e) => {
                setPeso(e.target.value);
                setErroPeso("");
            }}
            className={erroPeso ? "erro" : ""}
            >
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
            <select
            value={entrega}
            onChange={(e) => {
                setEntrega(e.target.value);
                setErroEntrega("");
            }}
            className={erroEntrega ? "erro" : ""}
            >
            <option value="">selecione</option>
            <option value="correios">Correios</option>
            <option value="transportadora">Transportadora</option>
            <option value="retirada">Retirada no local</option>
            </select>

            {erroEntrega && <span className="mensagem-erro">{erroEntrega}</span>}
        </div>

        </div>


        {/* BOTÃO FINAL */}
        <button className="btn-enviar" onClick={enviarProduto}>
        enviar produto
        </button>

    </>
  );
}

export default Anuncio;
