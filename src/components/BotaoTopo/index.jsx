import { useState, useEffect } from "react";

const BotaoTopo = () => {
  const [visivel, setVisivel] = useState(false);

  const verificarScroll = () => {
    if (window.scrollY > 0) {
      setVisivel(true);
    } else {
      setVisivel(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", verificarScroll);
    return () => window.removeEventListener("scroll", verificarScroll);
  }, []);

  const voltarAoTopo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={voltarAoTopo}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 15px",
        fontSize: "16px",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        color: "#000",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
        cursor: "pointer",
        backdropFilter: "blur(5px)",
        display: visivel ? "block" : "none",
      }}
    >
      ↑
    </button>
  );
};

export default BotaoTopo;
