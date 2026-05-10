import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cadastroEquipamento.css";

const initialFormState = {
  id_categoria: "",
  modelo: "",
  marca: "",
  ano: "",
  moeda: "",
  preco: "",
  descricao: "",
  doador: "",
  mensagem_doador: "",
};

const CadastroEquipamento = ({ onClose, onCadastrado, equipamento }) => {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (equipamento) {
      setForm({
        id_categoria: equipamento.id_categoria || "",
        modelo: equipamento.modelo || "",
        marca: equipamento.marca || "",
        ano: equipamento.ano || "",
        moeda: equipamento.moeda || "",
        preco: equipamento.preco || "",
        descricao: equipamento.descricao || "",
        doador: equipamento.doador || "",
        mensagem_doador: equipamento.mensagem_doador || "",
      });
    }
  }, [equipamento]);

  useEffect(() => {
    const listarCategorias = async () => {
      try {
        const res = await axios.get("http://localhost:3001/categorias");
        const ordenadas = res.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setCategorias(ordenadas);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    };
    listarCategorias();
  }, []);

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
      if (equipamento) {
        await axios.put(
          `http://localhost:3001/exposicao/${equipamento.id_equipamento}`,
          form
        );
        alert("Equipamento atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:3001/exposicao", form);
        alert("Equipamento cadastrado com sucesso!");
      }

      resetForm();
      onCadastrado?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar equipamento.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{equipamento ? "Editar Equipamento" : "Cadastrar Equipamento"}</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-row">
            <input
              type="text"
              name="modelo"
              placeholder="Modelo"
              value={form.modelo}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="marca"
              placeholder="Marca"
              value={form.marca}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="number"
              name="ano"
              placeholder="Ano"
              value={form.ano}
              onChange={handleChange}
              required
            />
            <select name="moeda" value={form.moeda} onChange={handleChange}>
              <option value="">Moeda</option>
              <option value="€">€</option>
              <option value="US$">US$</option>
              <option value="R$">R$</option>
              <option value="Cr$">Cr$</option>
            </select>
            <input
              type="number"
              step="0.01"
              name="preco"
              placeholder="Preço"
              value={form.preco}
              onChange={handleChange}
            />
          </div>

          <select
            name="id_categoria"
            value={form.id_categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a categoria</option>
            {categorias.map(({ id_categoria, nome }) => (
              <option key={id_categoria} value={id_categoria}>
                {nome}
              </option>
            ))}
          </select>

          <textarea
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <input
              type="text"
              name="doador"
              placeholder="Nome do doador (opcional)"
              value={form.doador}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="mensagem_doador"
            placeholder="Mensagem do doador (opcional)"
            value={form.mensagem_doador}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button className="btn btn--primary" type="submit">
              {equipamento ? "Atualizar" : "Cadastrar"}
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

export default CadastroEquipamento;
