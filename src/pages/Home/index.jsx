import BotaoTopo from "../../components/BotaoTopo";
import Banner from "../../components/Banner/";
import ItemAleatorio from "../../components/ItemAleatorio/index.jsx";
import Carrossel from "../../components/Carrossel/index.jsx";
import imagem from "../../assets/campus-aereo.jpg";
import { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const buscarImagensAleatorias = async () => {
      try {
        const res = await fetch("http://localhost:3001/imagens/aleatorias/5");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Erro ao buscar imagens aleatórias:", err);
      }
    };

    buscarImagensAleatorias();
  }, []);

  if (items.length < 5) {
    return (
      <p
        style={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Carregando itens do acervo...
      </p>
    );
  }

  return (
    <main>
      <Banner
        texto='"To create the future, we must understand the past."'
        imagem={imagem}
        altura="60vh"
      />

      <section className="info-section">
        <div className="text-block">
          <h2>Apresentação</h2>
          <p>
            Criado em 2016, o E-Museu é uma das iniciativas do Projeto de
            Extensão{" "}
            <strong>
              E-Lixo: ações de descarte, reutilização e educação ambiental
            </strong>{" "}
            do Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande
            do Sul - Campus Sertão.
          </p>
          <p>
            Contando atualmente com um acervo com mais de 150 itens, o Museu se
            dedicada à preservação e valorização da história da informática e
            dos eletroeletrônicos, conectando o público ao passado da
            tecnologia.
          </p>
        </div>
        {items && (
          <div className="image-block">
            <ItemAleatorio item={items[1]} />
          </div>
        )}
      </section>

      <section className="info-section">
        {items && (
          <div className="image-block">
            <ItemAleatorio item={items[3]} />
          </div>
        )}
        <div className="text-block">
          <h2>Público-alvo</h2>
          <p>
            O E-Museu é destinado a todos os públicos, especialmente estudantes,
            professores, pesquisadores e entusiastas da tecnologia.
          </p>
          <p>
            Enquanto recurso pedagógico para o ensino da história e evolução da
            computação, conteúdo que integra o currículo dos cursos de
            informática do campus, o museu busca promover a educação ambiental e
            a conscientização sobre o descarte adequado dos eletroeletrônicos.
          </p>
        </div>
      </section>

      <Link to="/exposicao">
        <div className="carrossel">
          <Carrossel items={items} />
        </div>
      </Link>

      <div className="instagram-embed">
        <iframe
          src="https://www.instagram.com/e_lixo.2025/embed"
          frameBorder="0"
          scrolling="no"
          allowtransparency="true"
          title="Instagram E-Museu IFRS"
        ></iframe>
      </div>

      <BotaoTopo />
    </main>
  );
};

export default Home;
