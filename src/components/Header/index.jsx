import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import axios from "axios";
import "./header.css";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [pendentes, setPendentes] = useState(0);
  const jaLeu = localStorage.getItem("comentariosLidos") === "true";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const verificarPendentes = () => {
      axios.get("http://localhost:3001/contato").then((res) => {
        const novos = res.data.filter((c) => !c.respondida).length;
        setPendentes(novos);
        if (novos > 0) {
          localStorage.setItem("comentariosLidos", "false");
        }
      });
    };

    verificarPendentes();
    const intervalo = setInterval(verificarPendentes, 30000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <header>
      <div className="logo">
        <Link to="/">E-Museu</Link>
      </div>
      <button className="hamburguer" onClick={() => setMenuAberto(!menuAberto)}>
        ☰
      </button>

      <nav className={menuAberto ? "aberto aberto" : "menu"}>
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/sobre">Sobre</Link>
          </li>
          <li>
            <Link to="/exposicao">Exposição</Link>
          </li>
          <li className="menu-item">
            <Link to="/contato">
              Contato
              {token && pendentes > 0 && !jaLeu && (
                <span className="badge">{pendentes}</span>
              )}
            </Link>
          </li>

          {!token ? (
            <li>
              <Link to="/login" className="icon-link" title="Login">
                <FiLogIn size={20} />
              </Link>
            </li>
          ) : (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className="icon-link"
                  title="Sair"
                >
                  <FiLogOut size={20} />
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
