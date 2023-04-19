import { useCallback, useEffect, useState } from "react";
import StationCard from "./components/StationCard";
import { StationInformation, StationStatus } from "./types";

import "./index.css";
import BysykkelList from "./components/BysykkelList";

function App() {
  return <BysykkelList />;
}

export default App;
