import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-options">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Movies
        </NavLink>
        <NavLink
          to="/series"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Series
        </NavLink>
      </div>
      <SearchBar />
    </nav>
  );
}

export default NavBar;
