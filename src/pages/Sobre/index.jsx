import BotaoTopo from "../../components/BotaoTopo";
import Equipe from "../../components/Equipe";
import Banner from "../../components/Banner";
import Parceiros from "../../components/Parceiros";
import imagem from "../../assets/entrada-museu.jpeg";
import "./sobre.css";

const Sobre = () => {
  return (
    <main className="sobre-container">
      <Banner texto="Sobre o E-Museu" imagem={imagem} altura="40vh" />
      <BotaoTopo />
      <section className="sobre">
        <h2>Sobre o E-Museu</h2>
        <p>
          O Museu de Eletroeletrônicos do IFRS - Campus Sertão, ou E-Museu, foi
          criado em 2016 como uma das iniciativas do projeto de extensão{" "}
          <strong>
            E-Lixo: ações de descarte, reutilização e educação ambiental
          </strong>
          . Inicialmente itinerante, o museu conquistou um espaço fixo no
          campus, consolidando sua missão de preservar a memória tecnológica e
          conscientizar a população sobre o descarte correto de equipamentos
          eletrônicos.
        </p>
        <p>
          Com um acervo formado por peças arrecadadas nos mutirões de coleta
          realizados no município de Sertão-RS, em parceria com a Prefeitura
          Municipal, o museu virtual amplia seu alcance ao possibilitar que
          visitantes explorem sua coleção digitalmente. Dessa forma, une
          história, inovação e sustentabilidade, tornando o conhecimento
          acessível a todos.
        </p>
      </section>

      <section className="objetivos">
        <h2>Objetivos</h2>
        <p>
          👉🏽 Preservar a memória tecnológica, com equipamentos que marcaram
          época
        </p>
        <p>
          👉🏽 Conscientizar sobre o descarte do lixo eletrônico, incentivando
          práticas sustentáveis
        </p>
        <p>
          👉🏽 Oferecer um espaço dedicado à história e evolução dos
          eletroeletrônicos e seu impacto na sociedade
        </p>
      </section>

      <section className="equipe">
        <h2>Equipe</h2>
        <p>
          O E-Museu é mantido pela equipe do projeto E-Lixo, composta por
          professores, alunos e servidores do IFRS - Campus Sertão, que
          trabalham em conjunto para catalogar, preservar e divulgar o acervo do
          museu, além de promover ações educativas e eventos relacionados à
          tecnologia e sustentabilidade.
        </p>
        <p>
          Desde 2011, inúmeras pessoas já participaram e contribuíram com o
          projeto, motivo pelo qual o IFRS Campus - Sertão tem o maior carinho e
          gratidão. Atualmente, a equipe é composta pelos seguintes membros:
        </p>
        <Equipe />
      </section>

      <section className="parceiros">
        <h2>Parceiros</h2>
        <Parceiros />
      </section>
    </main>
  );
};

export default Sobre;
