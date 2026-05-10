import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Exposicao from "./pages/Exposicao";
import ItemDetalhe from "./pages/ItemDetalhe";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/exposicao" element={<Exposicao />} />
      <Route path="/exposicao/:id" element={<ItemDetalhe />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NoPage />} />
    </Routes>
  );
}
