import BotaoTopo from "../../components/BotaoTopo";
import "./nopage.css";

const NoPage = () => {
  return (
    <>
      <main className="no-page">
        <h1>404 - Página não encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        <a href="/" className="back-home">
          Voltar ao início
        </a>
      </main>
      <BotaoTopo />
    </>
  );
};

export default NoPage;
