import { useState, useEffect } from "react";
import axios from "axios";
import ShowList from "../show_components/ShowList.jsx";
import Pagination from "../custom_components/Pagination.jsx";
import "./SearchResultList.css";

function SearchResultList({ searchTerm, page }) {
  const [searchList, setSearchList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}search/multi`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          query: searchTerm,
          page: page,
        },
      })
      .then((res) => {
        setSearchList(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm, page]);

  const changeRoute = (path) => {
    location.href = path;
  };

  const handlePageChange = (newPage) => {
    changeRoute(`/search/${searchTerm}/?page=${newPage}`);
  };

  const newList = searchList.filter(
    (searchTerm) => searchTerm.media_type !== "person" //only filtering people and not poster for now
  );
  return (
    <div className="search-result-container">
      <h2>Search results for "{searchTerm}"</h2>
      {searchList.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
      <ShowList showList={newList} />
      {searchList.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default SearchResultList;
