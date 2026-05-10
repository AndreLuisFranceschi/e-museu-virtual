import { useNavigate } from "react-router-dom";
import "./itemAleatorio.css";

const ItemAleatorio = ({ item }) => {
  const navigate = useNavigate();
  if (!item) return null;

  return (
    <div
      className="item-aleatorio fade-in"
      onClick={() => navigate(`/exposicao/${item.id_equipamento}`)}
    >
      <img
        src={item.url}
        alt={`Imagem do item ${item.id_equipamento}`}
        loading="lazy"
      />
    </div>
  );
};

export default ItemAleatorio;
