import React, { useState } from "react";
import axios from "axios";
import "./cadastroCategoria.css";

const initialFormState = {
  nome: "",
};

const CadastroCategoria = ({ onClose, onCadastrado }) => {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/categorias", form);
      alert("Categoria cadastrada com sucesso!");
      resetForm();
      onCadastrado?.();
      onClose?.();
    } catch (err) {
      console.error("Erro ao cadastrar categoria:", err);
      alert("Erro ao cadastrar categoria.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastrar Categoria</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="nome"
            placeholder="Nome da Categoria"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <div className="modal-buttons">
            <button className="btn btn--primary" type="submit">
              Cadastrar
            </button>
            <button
              className="btn btn--secondary"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroCategoria;
