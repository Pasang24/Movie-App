import { useState, useEffect } from "react";
import axios from "axios";
import SearchList from "./SearchList";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [showSearchList, setShowSearchList] = useState(false);

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

  const changeRoute = (path) => {
    location.href = path;
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim().length === 0) return;

    changeRoute(`/search/${searchTerm}`);
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
        placeholder="Search for a movie or series..."
      />
      <button type="submit">Search</button>
      {showSearchList && (
        <SearchList searchList={newList} handleSearchResult={handleSubmit} />
      )}
    </form>
  );
}

export default SearchBar;
