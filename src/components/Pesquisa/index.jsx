import { useState } from "react";
import "./pesquisa.css";

const Pesquisa = ({ dados, onResultado }) => {
  const [termo, setTermo] = useState("");

  const handleChange = (e) => {
    const valor = e.target.value;
    setTermo(valor);

    const resultadoFiltrado = dados.filter((item) =>
      `${item.marca} ${item.modelo}`.toLowerCase().includes(valor.toLowerCase())
    );
    onResultado(resultadoFiltrado);
  };

  return (
    <section className="pesquisa">
      <input
        type="text"
        placeholder="Pesquisar..."
        value={termo}
        onChange={handleChange}
      />
    </section>
  );
};

export default Pesquisa;
