import { useState, useEffect } from "react";
import axios from "axios";
import ShowList from "./ShowList.jsx";
import Pagination from "../custom_components/Pagination.jsx";
import "./AllShowList.css";

function AllShowList({ page, mediaType }) {
  const [showList, setShowList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  const changeRoute = (path) => {
    location.href = path;
  };

  const handlePageChange = (newPage) => {
    changeRoute(
      `/${mediaType === "movie" ? "movies" : "tv-show"}/?page=${newPage}`
    );
  };

  return (
    <>
      {!loading && (
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
      )}
    </>
  );
}

export default AllShowList;
