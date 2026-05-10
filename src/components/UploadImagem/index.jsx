import { useState } from "react";
import axios from "axios";
import "./uploadImagem.css";

const UploadImagens = ({ id_equipamento, onClose }) => {
  const [arquivo, setArquivo] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleUpload = async () => {
    if (!arquivo) {
      alert("Selecione uma imagem antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("imagem", arquivo);
    formData.append("id_equipamento", id_equipamento);

    setEnviando(true);

    try {
      await axios.post("http://localhost:3001/imagens/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Imagem enviada com sucesso!");
      onClose();
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
      alert("Erro ao enviar imagem.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="upload-container">
      <h3>Upload de Imagem</h3>

      <label htmlFor="upload" className="upload-label">
        Clique ou arraste para selecionar uma imagem
      </label>
      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={(e) => setArquivo(e.target.files[0])}
      />

      {arquivo && (
        <img
          src={URL.createObjectURL(arquivo)}
          alt="Preview"
          className="preview-imagem"
        />
      )}

      <div className="botoes-upload">
        <button onClick={handleUpload} disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar"}
        </button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default UploadImagens;
