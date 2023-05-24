import BysykkelList from "./components/BysykkelList";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Map from "./components/map/Map";
import useBysykkelApi from "./hooks/useBysykkelApi";
import "./index.css";

function App() {
  const { stations, statusLookup, isLoading, hasError } = useBysykkelApi();

  if (hasError) {
    return (
      <div>
        <p className="error">Noe gikk galt! Prøv igjen senere.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="kart/"
          element={<Map stations={stations} statusLookup={statusLookup} />}
        />
        <Route
          path="/"
          element={
            <BysykkelList
              stations={stations}
              statusLookup={statusLookup}
              isLoading={isLoading}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
