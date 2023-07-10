import SearchBar from "../search_components/SearchBar.jsx";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-options">
        <a href="/">Home</a>
        <a href="/movies">Movies</a>
        <a href="/tv-show">Series</a>
      </div>
      <SearchBar />
    </nav>
  );
}

export default NavBar;
