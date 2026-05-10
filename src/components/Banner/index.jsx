import "./banner.css";

const Banner = ({ texto, imagem, altura }) => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imagem})`,
        height: altura,
      }}
    >
      {texto}
    </div>
  );
};

export default Banner;
