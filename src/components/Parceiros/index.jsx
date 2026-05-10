import { useEffect, useState } from "react";
import { FaUserCircle, FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import CadastroParceiro from "../CadastroParceiro";
import axios from "axios";
import "./parceiros.css";

const Parceiros = () => {
  const [parceiros, setParceiros] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [parceiroEditando, setParceiroEditando] = useState(null);

  const isLogado = localStorage.getItem("token") !== null;

  useEffect(() => {
    atualizarLista();
  }, []);

  const atualizarLista = async () => {
    try {
      const res = await axios.get("http://localhost:3001/parceiros");
      setParceiros(res.data);
    } catch (err) {
      console.error("Erro ao carregar parceiros:", err);
    }
  };

  const abrirFormulario = () => {
    setParceiroEditando(null);
    setMostrarFormulario(true);
  };

  const editarParceiro = (parceiro) => {
    setParceiroEditando(parceiro);
    setMostrarFormulario(true);
  };

  const excluirParceiro = async (id) => {
    if (confirm("Tem certeza que deseja excluir este parceiro?")) {
      try {
        await axios.delete(`http://localhost:3001/parceiros/${id}`);
        atualizarLista();
      } catch (err) {
        console.error("Erro ao excluir parceiro:", err);
        alert("Erro ao excluir parceiro");
      }
    }
  };

  return (
    <div className="parceiros-links">
      {parceiros.map((parceiro, index) => (
        <div key={index} className="parceiro-item">
          <a
            href={parceiro.url_contato}
            target="_blank"
            rel="noopener noreferrer"
            title={parceiro.nome}
          >
            {parceiro.img_parceiro ? (
              <img src={parceiro.img_parceiro} alt={parceiro.nome} />
            ) : (
              <div className="icone-generico">
                <FaUserCircle size={70} color="#bbb" />
              </div>
            )}
          </a>

          {isLogado && (
            <div className="acoes">
              <button
                className="btn-cadastrar"
                onClick={() => editarParceiro(parceiro)}
              >
                <FaEdit /> Editar
              </button>

              <button
                className="btn-excluir"
                onClick={() => excluirParceiro(parceiro.id_parceiro)}
              >
                <FaTrash /> Excluir
              </button>
            </div>
          )}
        </div>
      ))}

      {isLogado && (
        <div className="card-perfil card-adicionar" onClick={abrirFormulario}>
          <FaPlusCircle size={70} />
          <h3>Adicionar parceiro</h3>
        </div>
      )}

      {mostrarFormulario && (
        <CadastroParceiro
          parceiroEditando={parceiroEditando}
          onClose={() => {
            setMostrarFormulario(false);
            setParceiroEditando(null);
          }}
          onSuccess={atualizarLista}
        />
      )}
    </div>
  );
};

export default Parceiros;
