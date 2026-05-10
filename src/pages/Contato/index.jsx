import BotaoTopo from "../../components/BotaoTopo";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import "./contato.css";

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [comentarios, setComentarios] = useState([]);
  const isLogado = localStorage.getItem("token") !== null;
  const [mostrarRespondidos, setMostrarRespondidos] = useState(false);

  useEffect(() => {
    if (isLogado) {
      axios
        .get("http://localhost:3001/contato")
        .then((res) => setComentarios(res.data))
        .catch((err) => console.error("Erro ao carregar comentários:", err));
    }
  }, [isLogado]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/contato",
        formData
      );
      if (response.status === 200) {
        alert("Mensagem enviada com sucesso!");
        setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  const marcarComoRespondido = async (id_contato) => {
    try {
      await axios.put(`http://localhost:3001/contato/${id_contato}`, {
        respondida: 1,
      });
      setComentarios((prev) =>
        prev.map((c) =>
          c.id_contato === id_contato ? { ...c, respondida: 1 } : c
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      alert("Não foi possível marcar como respondido.");
    }
  };

  useEffect(() => {
    if (comentarios.some((c) => !c.respondida)) {
      localStorage.setItem("comentariosLidos", "true");
    }
  }, [comentarios]);

  const excluirComentario = async (id_contato) => {
    if (!window.confirm("Tem certeza que deseja excluir este comentário?"))
      return;

    try {
      await axios.delete(`http://localhost:3001/contato/${id_contato}`);
      setComentarios((prev) => prev.filter((c) => c.id_contato !== id_contato));
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Não foi possível excluir o comentário.");
    }
  };

  return (
    <main className="contato-container">
      <section className="contato-endereco">
        <p>
          Instituto Federal do Rio Grande do Sul – Campus Sertão | Rodovia RS
          135, Km 32,5 – Distrito Eng. Luiz Englert | CEP: 99170-000 – Sertão,
          RS | Caixa Postal 21 | Telefone: (54) 3345-8000
        </p>
      </section>

      <section className="contato-mapa">
        <h2>Como chegar</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605805.868516472!2d-52.27518553737258!3d-28.046022209296932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e2e5e264da7f39%3A0xd7748730de499f58!2sIFRS%20-%20Campus%20Sert%C3%A3o!5e0!3m2!1spt-BR!2sbr!4v1756434886347!5m2!1spt-BR!2sbr"
          width="100%"
          height="300px"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Mapa para o IFRS - Campus Sertão"
        ></iframe>
      </section>

      <section className="contato-conteudo">
        {!isLogado ? (
          <>
            <p>
              O E-Museu é um espaço colaborativo dedicado à preservação da
              memória tecnológica e à educação ambiental. Se você tiver dúvidas,
              sugestões ou quiser contribuir com o projeto, por favor preencha o
              formulário abaixo — sua participação é muito bem-vinda!
            </p>

            <form className="contato-formulario" onSubmit={handleSubmit}>
              <div className="campo-formulario">
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="campo-formulario">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="campo-formulario">
                <label htmlFor="assunto">Assunto:</label>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="campo-formulario">
                <label htmlFor="mensagem">Mensagem:</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows="5"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit">Enviar</button>
            </form>
          </>
        ) : (
          <>
            <h2>Comentários recebidos</h2>
            {comentarios.filter((c) => !c.respondida).length === 0 && (
              <p className="sem-comentarios">
                Nenhum novo comentário para responder no momento.
              </p>
            )}

            <ul className="lista-comentarios">
              {comentarios
                .filter((c) => !c.respondida)
                .map((c) => (
                  <li key={c.id_contato}>
                    <strong>{c.nome}</strong> ({c.email})<br />
                    <em>{c.assunto}</em>
                    <br />
                    <p>{c.mensagem}</p>
                    <p>
                      <strong>Enviado em:</strong>{" "}
                      {new Date(c.data_envio).toLocaleString("pt-BR")}
                    </p>
                    <div className="acoes">
                      <button
                        className="btn-cadastrar"
                        onClick={() => marcarComoRespondido(c.id_contato)}
                      >
                        Marcar como respondido
                      </button>
                      <button
                        className="btn-excluir"
                        onClick={() => excluirComentario(c.id_contato)}
                      >
                        <FaTrash /> Excluir
                      </button>
                    </div>
                  </li>
                ))}
            </ul>

            <button onClick={() => setMostrarRespondidos(!mostrarRespondidos)}>
              {mostrarRespondidos
                ? "Ocultar comentários respondidos / arquivados"
                : "Mostrar comentários respondidos / arquivados"}
            </button>

            {mostrarRespondidos && (
              <ul className="lista-comentarios">
                {comentarios
                  .filter((c) => c.respondida)
                  .map((c) => (
                    <li key={c.id_contato} className="respondido">
                      <strong>{c.nome}</strong> ({c.email})<br />
                      <em>{c.assunto}</em>
                      <br />
                      <p>{c.mensagem}</p>
                      <p>
                        <strong>Enviado em:</strong>{" "}
                        {new Date(c.data_envio).toLocaleString("pt-BR")}
                      </p>
                      <div className="acoes">
                        <button
                          className="btn-excluir"
                          onClick={() => excluirComentario(c.id_contato)}
                        >
                          <FaTrash /> Excluir
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </>
        )}
      </section>
      <BotaoTopo />
    </main>
  );
};

export default Contato;
