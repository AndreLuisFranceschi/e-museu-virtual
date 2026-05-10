import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BotaoTopo from "../../components/BotaoTopo";
import Banner from "../../components/Banner";
import imagem from "../../assets/sala-emuseu.jpeg";
import Pesquisa from "../../components/Pesquisa";
import CadastroEquipamento from "../../components/CadastroEquipamento";
import CadastroCategoria from "../../components/CadastroCategoria";
import UploadImagens from "../../components/UploadImagem";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import axios from "axios";
import "./exposicao.css";

const Exposicao = () => {
  const [resultadoPesquisa, setResultadoPesquisa] = useState(null);
  const [equipamentos, setEquipamentos] = useState([]);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [mostrarCadastroCategoria, setMostrarCadastroCategoria] =
    useState(false);
  const [equipamentoEditando, setEquipamentoEditando] = useState(null);
  const [mostrarUpload, setMostrarUpload] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);

  const isLogado = localStorage.getItem("token") !== null;

  const buscarEquipamentos = () => {
    axios
      .get("http://localhost:3001/exposicao")
      .then((response) => {
        setEquipamentos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar equipamentos:", error);
      });
  };

  useEffect(() => {
    buscarEquipamentos();
  }, []);

  const listaExibida =
    resultadoPesquisa !== null ? resultadoPesquisa : equipamentos;

  const equipamentosPorCategoria = listaExibida.reduce((acc, eq) => {
    const categoria = eq.nome_categoria || "Sem categoria";
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(eq);
    return acc;
  }, {});

  return (
    <main className="exposicao-container">
      <Banner texto="Exposição Virtual" imagem={imagem} altura="40vh" />

      <section className="exposicao-header">
        {isLogado && (
          <div
            className="adicionar-equipamento"
            onClick={() => setMostrarCadastro(true)}
          >
            <FaPlusCircle size={40} />
            <h3>Adicionar equipamento</h3>
          </div>
        )}
        {mostrarCadastro && (
          <div className="modal-cadastro">
            <CadastroEquipamento
              onClose={() => setMostrarCadastro(false)}
              onCadastrado={buscarEquipamentos}
            />
          </div>
        )}

        {isLogado && (
          <div
            className="adicionar-equipamento"
            onClick={() => setMostrarCadastroCategoria(true)}
          >
            <FaPlusCircle size={40} />
            <h3>Adicionar categoria</h3>
          </div>
        )}
        {mostrarCadastroCategoria && (
          <div className="modal-cadastro">
            <CadastroCategoria
              onClose={() => setMostrarCadastroCategoria(false)}
            />
          </div>
        )}

        {equipamentoEditando && (
          <div className="modal-cadastro">
            <CadastroEquipamento
              equipamento={equipamentoEditando}
              onClose={() => setEquipamentoEditando(null)}
              onCadastrado={() => {
                buscarEquipamentos();
                setEquipamentoEditando(null);
              }}
            />
          </div>
        )}

        {mostrarUpload && equipamentoSelecionado && (
          <div className="modal-overlay">
            <div className="modal-content">
              <UploadImagens
                id_equipamento={equipamentoSelecionado.id_equipamento}
                onClose={() => {
                  setMostrarUpload(false);
                  setEquipamentoSelecionado(null);
                }}
              />
            </div>
          </div>
        )}
      </section>

      <Pesquisa dados={equipamentos} onResultado={setResultadoPesquisa} />

      <section className="cards-container">
        {listaExibida.length > 0 ? (
          Object.entries(equipamentosPorCategoria)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([categoria, equipamentos]) => (
              <div key={categoria} className="categoria-bloco">
                <h2 className="titulo-categoria">{categoria}</h2>
                <div className="cards-container">
                  {equipamentos.map((eq) => (
                    <div
                      key={eq.id_equipamento}
                      className="card-exposicao-wrapper"
                    >
                      <Link
                        to={`/exposicao/${eq.id_equipamento}`}
                        className="card-exposicao"
                      >
                        <div className="card-imagem">
                          {eq.imagem ? (
                            <img
                              src={eq.imagem}
                              alt={eq.marca + " " + eq.modelo}
                            />
                          ) : (
                            <span role="img" aria-label="Sem imagem">
                              ∅
                            </span>
                          )}
                        </div>
                        <h3 title={eq.marca + " " + eq.modelo}>
                          {eq.marca + " " + eq.modelo}
                        </h3>
                      </Link>

                      {isLogado && (
                        <div className="acoes">
                          <button
                            className="btn-cadastrar"
                            onClick={() => setEquipamentoEditando(eq)}
                          >
                            <FaEdit /> Editar
                          </button>
                          <button
                            className="btn-excluir"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Deseja realmente deletar este equipamento?"
                                )
                              ) {
                                axios
                                  .delete(
                                    `http://localhost:3001/exposicao/${eq.id_equipamento}`
                                  )
                                  .then(() => buscarEquipamentos())
                                  .catch(() =>
                                    alert("Erro ao deletar equipamento")
                                  );
                              }
                            }}
                          >
                            <FaTrash /> Excluir
                          </button>
                          <button
                            className="btn-upload"
                            onClick={() => {
                              setEquipamentoSelecionado(eq);
                              setMostrarUpload(true);
                            }}
                          >
                            <FaPlusCircle /> Adicionar Imagem
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <p
            style={{
              textAlign: "center",
              fontStyle: "italic",
              margin: "2rem 0",
            }}
          >
            Nenhum equipamento encontrado.
          </p>
        )}
      </section>

      <BotaoTopo />
    </main>
  );
};

export default Exposicao;
