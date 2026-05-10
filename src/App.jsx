import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RoutesApp from "./routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="app">
          <RoutesApp />
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
