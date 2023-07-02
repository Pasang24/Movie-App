import SearchBar from "./SearchBar";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-options">
        <div>Home</div>
        <div>Movies</div>
        <div>Series</div>
      </div>
      <SearchBar />
    </nav>
  );
}

export default NavBar;
