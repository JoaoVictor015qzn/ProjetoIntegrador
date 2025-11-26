import { useState } from "react";
import Navbar from "../../components/UI/Navbar";
import Sidebar from "../../components/UI/Sidebar";
import "./Config.css";

function Config() {
  const [showCpf] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Navbar />

      <div className="app-layout">
        <Sidebar />

        <div className="main-content-wrapper">
          <div className="container">
            <div className="perfil-container">
              {/* Formulário */}
              <form>
                <h1 className="page-title"> Meu Perfil </h1>
                <div className="perfil">
                  <div className="field">
                    <label>Nome de Usuário:</label>
                    <input name="nomeUsuario" type="text" />
                  </div>

                  <div className="field">
                    <label>Nome:</label>
                    <input name="nome" type="text" />
                  </div>

                  <div className="field">
                    <label>Sobrenome:</label>
                    <input name="sobrenome" type="text" />
                  </div>

                  <div className="field">
                    <label>E-mail:</label>
                    <input name="email" type="text" />
                  </div>

                  <div className="field">
                    <label>Número de Telefone:</label>
                    <input name="telefone" type="number" />
                  </div>

                  <div className="field">
                    <label>Sexo:</label>
                    <div className="radios">
                      <label className="radio-option">
                        <input type="radio" name="sexo" /> Feminino
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="sexo" /> Masculino
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="sexo" /> Outros
                      </label>
                    </div>
                  </div>
                  <div className="field">
                    <label>CPF:</label>
                    <input name="cpf" type={showCpf ? "text" : "password"} />
                  </div>
                  <div className="excluir-conta">
                    <button type="button" onClick={() => setOpenModal(true)}>
                      Excluir Minha Conta
                    </button>
                  </div>
                </div>
              </form>

              {openModal && (
                <div className="modal-overlay">
                  <div className="modal-box">
                    <h2>Tem certeza que deseja excluir sua conta?</h2>
                    <p>Essa ação não tem volta!</p>

                    <div className="modal-actions">
                      <button
                        className="cancel"
                        onClick={() => setOpenModal(false)}
                      >
                        Cancelar
                      </button>

                      <button
                        className="confirm"
                        onClick={() => {
                          console.log("Conta excluída!");
                          setOpenModal(false);
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Foto de Perfil */}
              <div className="profile-photo-section">
                <div className="profile-photo-wrapper">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt="Foto do usuário"
                    className="profile-photo"
                  />
                </div>

                <label className="select-photo-btn">
                  Selecionar imagem
                  <input type="file" accept="image/*" hidden />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Config;
