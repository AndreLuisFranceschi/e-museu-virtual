import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cadastroMembro.css";

const CadastroMembro = ({ onClose, onSuccess, membroEditando }) => {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  const isEdicao = Boolean(membroEditando);

  useEffect(() => {
    if (isEdicao) {
      setNome(membroEditando.nome || "");
      setCargo(membroEditando.cargo || "");
      // monta a URL completa da imagem atual
      const imgUrl = membroEditando.imagem
        ? `http://localhost:3001/uploads/${membroEditando.imagem}`
        : null;
      setPreview(imgUrl);
    } else {
      resetForm();
    }
  }, [membroEditando, isEdicao]);

  const resetForm = () => {
    setNome("");
    setCargo("");
    setImagem(null);
    setPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      const imgUrl = membroEditando?.imagem
        ? `http://localhost:3001/uploads/${membroEditando.imagem}`
        : null;
      setPreview(imgUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("cargo", cargo);
    formData.append("imagem", imagem || membroEditando?.imagem || "");

    const url = isEdicao
      ? `http://localhost:3001/membros/${membroEditando.id_membro}`
      : "http://localhost:3001/membros";

    try {
      const method = isEdicao ? "put" : "post";
      await axios[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(isEdicao ? "Membro atualizado!" : "Membro cadastrado!");
      resetForm();
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("Erro ao salvar membro:", error);
      alert("❌ Erro ao salvar membro");
    }
  };

  return (
    <div className="backdrop">
      <div className="modal">
        <h2 className="modal__title">
          {isEdicao ? "Atualizar membro" : "Adicionar novo membro"}
        </h2>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="modal__form"
        >
          <input
            className="input"
            type="text"
            name="nome"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
          />
          <label htmlFor="imagem" className="label">
            Imagem de perfil (opcional)
          </label>
          <input
            className="input"
            id="imagem"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && (
            <img src={preview} alt="Prévia" className="avatar-preview" />
          )}
          <div className="modal-buttons">
            <button
              type="submit"
              className="btn btn--primary"
              aria-label={isEdicao ? "Atualizar membro" : "Cadastrar membro"}
            >
              {isEdicao ? "Atualizar" : "Cadastrar"}
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

export default CadastroMembro;
