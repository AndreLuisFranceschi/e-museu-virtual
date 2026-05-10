import { FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";
import "./perfil.css";

const Perfil = ({ membro, onEditar, onExcluir }) => {
  const isLogado = localStorage.getItem("token") !== null;

  return (
    <div className="card-perfil">
      {membro.imagem ? (
        <img
          className="foto-perfil"
          src={`http://localhost:3001/uploads/${membro.imagem}`}
          alt={membro.nome}
        />
      ) : (
        <FaUserCircle size={70} color="#bbb" />
      )}
      <h3>{membro.nome}</h3>
      <p>{membro.cargo}</p>

      {isLogado && (
        <div className="acoes">
          <button
            className="btn-cadastrar"
            onClick={() => onEditar(membro)}
            aria-label="Editar perfil"
          >
            <FaEdit /> Editar
          </button>

          <button
            className="btn-excluir"
            onClick={() => onExcluir(membro.id_membro)}
          >
            <FaTrash /> Excluir
          </button>
        </div>
      )}
    </div>
  );
};

export default Perfil;
