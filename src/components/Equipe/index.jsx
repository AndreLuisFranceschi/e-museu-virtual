import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Perfil from "../Perfil";
import CadastroMembro from "../CadastroMembro";
import axios from "axios";
import "./equipe.css";

const Equipe = () => {
  const [membros, setMembros] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [membroEditando, setMembroEditando] = useState(null);

  const isLogado = localStorage.getItem("token") !== null;

  useEffect(() => {
    axios
      .get("http://localhost:3001/membros")
      .then((res) => setMembros(res.data))
      .catch((err) => console.error("Erro ao buscar membros:", err));
  }, []);

  const abrirFormulario = () => setMostrarFormulario(true);

  const atualizarLista = () => {
    axios
      .get("http://localhost:3001/membros")
      .then((res) => setMembros(res.data))
      .catch((err) => console.error("Erro ao atualizar membros:", err));
  };

  const excluirMembro = async (id) => {
    if (confirm("Tem certeza que deseja excluir este membro?")) {
      try {
        await axios.delete(`http://localhost:3001/membros/${id}`);
        atualizarLista();
      } catch (err) {
        console.error("Erro ao excluir membro:", err);
        alert("Erro ao excluir membro");
      }
    }
  };

  const editarMembro = (membro) => {
    setMembroEditando(membro);
    setMostrarFormulario(true);
  };

  return (
    <div className="membros">
      {membros.map((membro) => (
        <Perfil
          key={membro.id_membro}
          membro={membro}
          onEditar={editarMembro}
          onExcluir={excluirMembro}
        />
      ))}
      {isLogado && (
        <div
          className="card-perfil card-adicionar"
          onClick={() => abrirFormulario()}
        >
          <FaPlusCircle size={70} />
          <h3>Adicionar membro</h3>
        </div>
      )}
      {mostrarFormulario && (
        <CadastroMembro
          membroEditando={membroEditando}
          onClose={() => {
            setMostrarFormulario(false);
            setMembroEditando(null);
          }}
          onSuccess={atualizarLista}
        />
      )}
    </div>
  );
};

export default Equipe;
