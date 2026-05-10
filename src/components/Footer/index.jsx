import logoIFRS from "../../assets/ifrs.png";
import { SocialIcon } from "react-social-icons";
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <section className="institucional">
          <h2>Instituto Federal do Rio Grande do Sul – Campus Sertão</h2>
          <address>
            Rodovia RS 135, Km 32,5 – Distrito Eng. Luiz Englert
            <br />
            CEP: 99170-000 – Sertão, RS
            <br />
            Caixa Postal 21
          </address>
          <p>
            Telefone:{" "}
            <a href="tel:+553433458000" aria-label="Ligar para IFRS Sertão">
              (54) 3345-8000
            </a>
          </p>
        </section>

        <section className="identidade">
          <a
            href="https://ifrs.edu.br/sertao/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Site IFRS Sertão"
          >
            <img src={logoIFRS} alt="Logo do IFRS Sertão" />
          </a>
          <div className="social-icons">
            <SocialIcon
              url="https://www.instagram.com/e_lixo.2025/"
              target="_blank"
              bgColor="#00510f"
              fgColor="#fff"
              style={{ marginRight: "0.5rem" }}
              aria-label="Instagram E-Lixo 2025"
            />
            <SocialIcon
              url="https://facebook.com/lixoeletronicoifrs"
              target="_blank"
              bgColor="#00510f"
              fgColor="#fff"
              aria-label="Facebook Lixo Eletrônico IFRS"
            />
          </div>
        </section>
      </div>

      <div className="ano">
        <p>{currentYear} ● E-Museu ● IFRS Sertão</p>
      </div>
    </footer>
  );
};

export default Footer;
