import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./cadastroImagem.css";

const CadastroImagem = ({ onClose, onSuccess }) => {
  const { id_equipamento } = useParams();
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagem) {
      alert("Selecione uma imagem antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("imagem", imagem);

    try {
      await axios.post(
        `http://localhost:3001/imagens/${id_equipamento}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Imagem cadastrada com sucesso!");
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("Erro ao salvar imagem:", error);
      alert("❌ Erro ao salvar imagem");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastrar imagem</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="imagem" className="label">
            Arquivo da imagem
          </label>
          <input
            className="input"
            id="imagem"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {preview && (
            <img src={preview} alt="Prévia" className="avatar-preview" />
          )}
          <div className="modal-buttons">
            <button
              type="submit"
              className="btn btn--primary"
              aria-label="Cadastrar imagem"
            >
              Cadastrar
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
              aria-label="Cancelar"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroImagem;
