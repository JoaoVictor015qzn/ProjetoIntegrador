// src/pages/Config/Config.tsx
import { useState, useEffect } from "react";
import Navbar from "../../components/UI/Navbar";
import Sidebar from "../../components/UI/Sidebar";
import "./Config.css";
import { useNavigate } from "react-router-dom";

function Config() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  // Estados do formulário
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [sexo, setSexo] = useState("");
  const [cpf, setCpf] = useState("");

  // Foto
  const [fotoPreview, setFotoPreview] = useState<string>(
    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
  );
  const [fotoArquivo, setFotoArquivo] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Função para formatar Telefone (Fixo ou Celular)
  const formatarTelefone = (valor: string) => {
    if (!valor) return "";
    
    // Remove tudo que não é dígito
    valor = valor.replace(/\D/g, "");
    
    // Limita a 11 dígitos
    valor = valor.slice(0, 11);

    // Adiciona parênteses: (11) 9...
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    
    // Adiciona o hífen dinamicamente (funciona para 8 ou 9 dígitos + DDD)
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");

    return valor;
  };

  const formatarCPF = (valor: string) => {
    valor = valor.replace(/\D/g, "").slice(0, 11);
    if (valor.length > 9) return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    if (valor.length > 6) return valor.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
    if (valor.length > 3) return valor.replace(/(\d{3})(\d{3})/, "$1.$2");
    return valor;
  };

  // Carregar dados do usuário logado
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setNomeUsuario(data.username || "");
          setNome(data.firstName || "");
          setSobrenome(data.lastName || "");
          setEmail(data.email || "");
          // Aplica formatação ao carregar do banco
          setTelefone(formatarTelefone(data.phone || ""));
          setCpf(formatarCPF(data.cpf || ""));
          setSexo(data.gender || "");
          if (data.photoUrl) setFotoPreview(data.photoUrl);
        }
      } catch {
        console.log("Erro ao carregar perfil");
      }
    };

    loadUser();
  }, []);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoArquivo(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Você precisa estar logado");

      const formData = new FormData();
      formData.append("username", nomeUsuario);
      formData.append("firstName", nome);
      formData.append("lastName", sobrenome);
      formData.append("email", email);
      
      // Limpa a máscara antes de enviar para a API (envia apenas números)
      formData.append("phone", telefone.replace(/\D/g, ""));
      formData.append("gender", sexo);
      formData.append("cpf", cpf.replace(/\D/g, ""));

      if (fotoArquivo) {
        formData.append("photo", fotoArquivo);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Erro ao salvar perfil");
      }

      alert("Perfil atualizado com sucesso! 🎉");
    } catch (error) {
      let errorMessage = "Erro ao salvar";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = (error as { message: string }).message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <div className="main-content-wrapper">
          <div className="container">
            <div className="perfil-container">
              <form onSubmit={handleSave}>
                <h1 className="page-title">Meu Perfil</h1>

                <div className="perfil">
                  <div className="field">
                    <label>Nome de Usuário:</label>
                    <input
                      type="text"
                      maxLength={15}
                      value={nomeUsuario}
                      onChange={(e) => setNomeUsuario(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="field">
                    <label>Nome:</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="field">
                    <label>Sobrenome:</label>
                    <input
                      type="text"
                      value={sobrenome}
                      onChange={(e) => setSobrenome(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="field">
                    <label>E-mail:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="field">
                    <label>Número de Telefone:</label>
                    <input
                      type="tel" // Mudado para type="tel" para abrir teclado numérico no mobile
                      maxLength={15} // (11) 99999-9999 tem 15 caracteres
                      value={telefone}
                      placeholder="(99) 99999-9999"
                      onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                      disabled={loading}
                    />
                  </div>

                  <div className="field">
                    <label>Sexo:</label>
                    <div className="radios">
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="sexo"
                          value="Feminino"
                          checked={sexo === "Feminino"}
                          onChange={(e) => setSexo(e.target.value)}
                          disabled={loading}
                        />
                        Feminino
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="sexo"
                          value="Masculino"
                          checked={sexo === "Masculino"}
                          onChange={(e) => setSexo(e.target.value)}
                          disabled={loading}
                        />
                        Masculino
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="sexo"
                          value="Outros"
                          checked={sexo === "Outros"}
                          onChange={(e) => setSexo(e.target.value)}
                          disabled={loading}
                        />
                        Outros
                      </label>
                    </div>
                  </div>

                  <div className="field">
                    <label>CPF:</label>
                    <input
                      type="text"
                      maxLength={14}
                      value={cpf}
                      onChange={(e) => setCpf(formatarCPF(e.target.value))}
                      disabled={loading}
                    />
                  </div>

                  <button className="save-btn" type="submit" disabled={loading}>
                    {loading ? "Salvando..." : "Salvar alterações"}
                  </button>

                  <div className="excluir-conta">
                    <button type="button" onClick={() => setOpenModal(true)} disabled={loading}>
                      Excluir Minha Conta
                    </button>
                  </div>
                </div>
              </form>

              {/* Foto de Perfil */}
              <div className="profile-photo-section">
                <div className="profile-photo-wrapper">
                  <img src={fotoPreview} alt="Foto do usuário" className="profile-photo" />
                </div>
                <label className="select-photo-btn">
                  Selecionar imagem
                  <input type="file" accept="image/*" hidden onChange={handleFotoChange} disabled={loading} />
                </label>
              </div>
            </div>

            {error && <div className="error-box mt-6">{error}</div>}
          </div>
        </div>
      </div>

      {/* Modal de exclusão */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Tem certeza que deseja excluir sua conta?</h2>
            <p>Essa ação não tem volta!</p>
            <div className="modal-actions">
              <button className="cancel" onClick={() => setOpenModal(false)}>
                Cancelar
              </button>
              <button
                className="confirm"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Config;