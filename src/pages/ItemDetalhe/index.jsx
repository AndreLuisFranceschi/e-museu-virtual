import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./itemDetalhe.css";
import { FaTrash } from "react-icons/fa";

const ItemDetalhe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [equipamento, setEquipamento] = useState(null);
  const [categoriaNome, setCategoriaNome] = useState("");
  const [imagens, setImagens] = useState([]);
  const [imagemModal, setImagemModal] = useState(null);

  const isLogado = localStorage.getItem("token") !== null;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/exposicao/${id}`)
      .then((res) => setEquipamento(res.data))
      .catch((err) => console.error("Erro ao buscar equipamento:", err));
  }, [id]);

  useEffect(() => {
    if (equipamento?.id_categoria) {
      axios
        .get(`http://localhost:3001/categorias/${equipamento.id_categoria}`)
        .then((res) => setCategoriaNome(res.data.nome))
        .catch((err) =>
          console.error("Erro ao buscar nome da categoria:", err)
        );
    }
  }, [equipamento]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/imagens/${id}`)
      .then((res) => setImagens(res.data))
      .catch((err) => console.error("Erro ao buscar imagens:", err));
  }, [id]);

  const excluirImagem = async (idImagem) => {
    try {
      await axios.delete(`http://localhost:3001/imagens/${idImagem}`);
      setImagens((prev) => prev.filter((img) => img.id_imagem !== idImagem));
    } catch (err) {
      console.error("Erro ao excluir imagem:", err);
      alert("Não foi possível excluir a imagem.");
    }
  };

  if (!equipamento) return <p>Carregando informações do equipamento...</p>;

  return (
    <main className="itemDetalhe-container">
      <h2>
        {equipamento.marca} {equipamento.modelo}
      </h2>

      <section className="galeria-imagens">
        {imagens.length > 0 ? (
          <div className="imagens-grid">
            {imagens.map((img) => (
              <div key={img.id_imagem} className="imagem-item">
                <img
                  src={img.url}
                  alt={`Imagem enviada em ${img.data_upload}`}
                  onClick={() => setImagemModal(img.url)}
                  style={{ cursor: "pointer" }}
                />
                {isLogado && (
                  <>
                    <p className="data-upload">
                      Enviada em:{" "}
                      {new Date(img.data_upload).toLocaleDateString("pt-BR")}
                    </p>
                    <button
                      className="btn-excluir"
                      onClick={() => excluirImagem(img.id_imagem)}
                    >
                      <FaTrash /> Excluir
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>
            <em>Sem imagens adicionais enviadas.</em>
          </p>
        )}
      </section>

      <section className="info-equipamento">
        <p>
          <strong>Ano:</strong> {equipamento.ano}
        </p>
        <p>
          <strong>Preço:</strong>{" "}
          {equipamento.moeda === "US$"
            ? "US$"
            : equipamento.moeda === "€"
            ? "€"
            : equipamento.moeda === "Cr$"
            ? "Cr$"
            : "R$"}{" "}
          {parseFloat(equipamento.preco).toFixed(2)}
        </p>
        <p>
          <strong>Categoria:</strong>{" "}
          {categoriaNome || "Categoria não encontrada"}
        </p>
        <p>
          <strong>Descrição:</strong> {equipamento.descricao}
        </p>
        {equipamento.doador && (
          <p>
            <strong>Doador:</strong> {equipamento.doador}
          </p>
        )}

        {equipamento.mensagem_doador && (
          <p className="mensagem-doador">
            <em>"{equipamento.mensagem_doador}"</em>
          </p>
        )}
      </section>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button onClick={() => navigate("/exposicao")} className="btn-voltar">
          ⬅ Exposição
        </button>
      </div>

      {imagemModal && (
        <div className="modal-backdrop" onClick={() => setImagemModal(null)}>
          <div className="modal-imagem" onClick={(e) => e.stopPropagation()}>
            <img src={imagemModal} alt="Imagem em tela cheia" />
            <button
              className="fechar-modal"
              onClick={() => setImagemModal(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ItemDetalhe;
