import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Bysykkelstativer</h1>
      <nav>
        <NavLink to="/">Listevisning</NavLink>
        <NavLink to="/kart">Kartvisning</NavLink>
      </nav>
    </header>
  );
};

export default Header;
