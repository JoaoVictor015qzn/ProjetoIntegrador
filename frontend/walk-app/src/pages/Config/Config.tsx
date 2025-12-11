import { useState } from "react";
import Navbar from "../../components/UI/Navbar";
import Sidebar from "../../components/UI/Sidebar";
import "./Config.css";

function Config() {
  const [openModal, setOpenModal] = useState(false);

  const [nomeUsuario, setNomeUsuario] = useState("");

  const [cpf, setCpf] = useState("");

  // --- FOTO ---
  const [fotoPreview, setFotoPreview] = useState<string>(
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  );
  const [fotoArquivo, setFotoArquivo] = useState<File | null>(null);

  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFotoArquivo(file); // arquivo real para enviar
    setFotoPreview(URL.createObjectURL(file)); // preview imediato
  }

  // --- SALVAR ---
  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    if (fotoArquivo) {
      formData.append("foto", fotoArquivo);
    }

    console.log("Foto enviada para o backend:", fotoArquivo);

    alert("Alterações salvas com sucesso!");
  }

  function formatarCPF(valor: string) {
    valor = valor.replace(/\D/g, "");
    valor = valor.slice(0, 11);

    if (valor.length > 9) {
      return valor.replace(
        /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
        "$1.$2.$3-$4"
      );
    } else if (valor.length > 6) {
      return valor.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (valor.length > 3) {
      return valor.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }

    return valor;
  }

  return (
    <>
      <Navbar />

      <div className="app-layout">
        <Sidebar />

        <div className="main-content-wrapper">
          <div className="container">
            <div className="perfil-container">
              {/* Formulário */}
              <form onSubmit={handleSave}>
                <h1 className="page-title"> Meu Perfil </h1>

                <div className="perfil">
                  <div className="field">
                    <label>Nome de Usuário:</label>
                    <input
                      name="nomeUsuario"
                      type="text"
                      maxLength={15}
                      value={nomeUsuario}
                      onChange={(e) => setNomeUsuario(e.target.value)}
                    />
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
                    <input
                      name="cpf"
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(formatarCPF(e.target.value))}
                    />
                  </div>

                  {/* Botão de salvar */}
                  <button className="save-btn" type="submit">
                    Salvar alterações
                  </button>

                  {/* Botão excluir conta */}
                  <div className="excluir-conta">
                    <button type="button" onClick={() => setOpenModal(true)}>
                      Excluir Minha Conta
                    </button>
                  </div>
                </div>
              </form>

              {/* Modal */}
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
                    src={fotoPreview}
                    alt="Foto do usuário"
                    className="profile-photo"
                  />
                </div>

                <label className="select-photo-btn">
                  Selecionar imagem
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFotoChange}
                  />
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