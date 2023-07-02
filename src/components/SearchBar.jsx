import { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";
import SearchList from "./SearchList";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 2) {
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
            console.log(res.data);
            setSearchList(res.data.results);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);

      return () => clearInterval(timer);
    } else {
      setSearchList([]);
    }
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const newList = searchList.length > 5 ? searchList.slice(0, 5) : searchList;

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        onChange={handleChange}
        type="text"
        placeholder="Search for a movie..."
      />
      <button type="submit">Search</button>
      <SearchList searchList={newList} />
    </form>
  );
}

export default SearchBar;
