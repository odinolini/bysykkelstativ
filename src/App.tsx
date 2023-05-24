import BysykkelList from "./components/BysykkelList";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="kart/" element={<p>Kart</p>} />
        <Route path="/" element={<BysykkelList />} />
      </Routes>
    </div>
  );
}

export default App;
