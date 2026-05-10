import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cadastroParceiro.css";

const CadastroParceiro = ({ onClose, onSuccess, parceiroEditando }) => {
  const [nome, setNome] = useState("");
  const [urlContato, setUrlContato] = useState("");
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  const isEdicao = parceiroEditando !== null;

  useEffect(() => {
    if (parceiroEditando) {
      setNome(parceiroEditando.nome || "");
      setUrlContato(parceiroEditando.url_contato || "");
      setPreview(parceiroEditando.img_parceiro || null);
    } else {
      setNome("");
      setUrlContato("");
      setPreview(null);
    }
  }, [parceiroEditando]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(parceiroEditando?.img_parceiro || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("url_contato", urlContato);
    formData.append("imagem", imagem || parceiroEditando?.img_parceiro || "");

    const url = isEdicao
      ? `http://localhost:3001/parceiros/${parceiroEditando.id_parceiro}`
      : "http://localhost:3001/parceiros";

    try {
      const method = isEdicao ? "put" : "post";
      await axios[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(isEdicao ? "Parceiro atualizado!" : "Parceiro cadastrado!");
      setNome("");
      setUrlContato("");
      setImagem(null);
      setPreview(null);
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("Erro ao salvar parceiro:", error);
      alert("❌ Erro ao salvar parceiro");
    }
  };

  return (
    <div className="backdrop">
      <div className="modal">
        <h2 className="modal__title">
          {isEdicao ? "Atualizar parceiro" : "Adicionar novo parceiro"}
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
            name="urlContato"
            placeholder="URL de contato"
            value={urlContato}
            onChange={(e) => setUrlContato(e.target.value)}
            required
          />
          <label htmlFor="imagem" className="label">
            Imagem do parceiro (opcional)
          </label>
          <input
            className="input"
            id="imagem"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && (
            <img src={preview} alt="Prévia" className="image-preview" />
          )}
          <div className="modal-buttons">
            <button
              type="submit"
              className="btn btn--primary"
              aria-label={
                isEdicao ? "Atualizar parceiro" : "Cadastrar parceiro"
              }
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

export default CadastroParceiro;
