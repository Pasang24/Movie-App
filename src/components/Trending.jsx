import { useState, useEffect } from "react";
import axios from "axios";
import ShowList from "./ShowList";
import "./Trending.css";

function Trending() {
  const [movieList, setMovieList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [showMovies, setShowMovies] = useState(true);

  const fetchList = () => {
    const options = (endpoint, page) => {
      return {
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}trending/${endpoint}/week`,
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: "en-US",
          page: page,
        },
      };
    };
    const getMovieList = axios.request(options("movie", 1));
    const getSeriesList = axios.request(options("tv", 1));

    axios.all([getMovieList, getSeriesList]).then((allData) => {
      setMovieList(allData[0].data.results);
      setSeriesList(allData[1].data.results);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="trending-container">
      <div className="trending-header">
        <h2>Trending</h2>
        <div>
          <span
            onClick={() => {
              if (!showMovies) setShowMovies(true);
            }}
            style={{ background: showMovies ? "rgb(53, 173, 53)" : "" }}
          >
            Movies
          </span>
          <span
            onClick={() => {
              if (showMovies) setShowMovies(false);
            }}
            style={{ background: !showMovies ? "rgb(53, 173, 53)" : "" }}
          >
            TV Shows
          </span>
        </div>
      </div>
      <ShowList showList={showMovies ? movieList : seriesList} />
    </div>
  );
}

export default Trending;
