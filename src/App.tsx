import BysykkelList from "./components/BysykkelList";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="kart/" element={<p>Kart</p>} />
        <Route path="/" element={<BysykkelList />} />
      </Routes>
    </>
  );
}

export default App;
