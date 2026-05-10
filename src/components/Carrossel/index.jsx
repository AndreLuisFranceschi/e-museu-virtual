import "./carrossel.css";

const Carrossel = ({ items }) => {
  return (
    <div className="carrossel-container">
      {items.map((item, index) => (
        <div key={index} className="carrossel-item">
          <img src={item.url} alt={item.titulo} />
          <p>{item.titulo}</p>
        </div>
      ))}
    </div>
  );
};

export default Carrossel;
