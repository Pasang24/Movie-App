import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchBar.css";
import SearchList from "./SearchList";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [showSearchList, setShowSearchList] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const el = document.querySelector(".search-bar");

    const handleClick = (event) => {
      if (!el.contains(event.target)) {
        setShowSearchList(false);
      }
    };

    document.body.addEventListener("click", handleClick, true);

    return () => document.body.removeEventListener("click", handleChange, true);
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const timer = setTimeout(() => {
        axios
          .get(`${import.meta.env.VITE_API_URL}search/multi`, {
            params: {
              api_key: import.meta.env.VITE_API_KEY,
              query: searchTerm,
              limit: 5,
            },
          })
          .then((res) => {
            setSearchList(res.data.results);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);

      return () => clearInterval(timer);
    } else if (searchTerm.length === 0) {
      setSearchList([]);
    }
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim().length === 0) return;

    navigate(`search/${searchTerm}`);

    document.querySelector(".search-input").blur(); //removing focus from searchbar input
    setSearchTerm("");
    setSearchList([]);
  };

  const newList = searchList.length > 5 ? searchList.slice(0, 5) : searchList;

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setShowSearchList(true)}
        className="search-input"
        type="text"
        placeholder="Search for a movie..."
      />
      <button type="submit">Search</button>
      {showSearchList && (
        <SearchList searchList={newList} handleSearchResult={handleSubmit} />
      )}
    </form>
  );
}

export default SearchBar;
