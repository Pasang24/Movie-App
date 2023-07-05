import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchResultList.css";
import ShowList from "./ShowList";
import Pagination from "./Pagination";

function SearchResultList({ searchTerm, page }) {
  const [searchList, setSearchList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

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
        console.log(res.data);
        setSearchList(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm, page]);

  const handlePageChange = (newPage) => {
    navigate(`/search/${searchTerm}/?page=${newPage}`);
  };

  const newList = searchList.filter(
    (searchTerm) =>
      searchTerm.media_type !== "person" && searchTerm?.poster_path !== null
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
