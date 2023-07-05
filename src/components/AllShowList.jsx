import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllShowList.css";
import ShowList from "./ShowList";
import Pagination from "./Pagination";

function AllShowList({ page, mediaType }) {
  const [showList, setShowList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}${
          mediaType === "movie" ? "movie/popular" : "trending/tv/week"
        }`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
            language: "en-US",
            page: page,
          },
        }
      )
      .then((res) => {
        setShowList(res.data.results);
        setTotalPages(500);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    navigate(
      `/${mediaType === "movie" ? "movies" : "tv-show"}/?page=${newPage}`
    );
  };

  return (
    <div className="all-list-container">
      <h2>Popular {mediaType === "movie" ? "Movies" : "Series"}</h2>
      {showList.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
      <ShowList showList={showList} mediaType={mediaType} />
      {showList.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default AllShowList;
