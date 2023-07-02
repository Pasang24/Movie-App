import { useState, useEffect } from "react";
import axios from "axios";
import "./SearchResultList.css";
import ShowList from "./ShowList";

function SearchResultList({ searchTerm }) {
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}search/multi`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          query: searchTerm,
        },
      })
      .then((res) => {
        setSearchList(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm]);

  const newList = searchList.filter(
    (searchTerm) =>
      searchTerm.media_type !== "person" && searchTerm?.poster_path !== null
  );
  return (
    <div className="search-result-container">
      <h2>Search results for "{searchTerm}"</h2>
      <ShowList showList={newList} />
    </div>
  );
}

export default SearchResultList;
