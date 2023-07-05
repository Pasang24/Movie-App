import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import ShowList from "./ShowList";
import "./PopularShow.css";

function PopularShow() {
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestSeries, setLatestSeries] = useState([]);

  const fetchShow = () => {
    const options = (endpoint, page) => {
      return {
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}${endpoint}`,
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          language: "en-US",
          page: page,
        },
      };
    };
    const getMovieList = axios.request(options("movie/popular", 1));
    const getSeriesList = axios.request(options("trending/tv/week", 1));

    axios.all([getMovieList, getSeriesList]).then((allData) => {
      setLatestMovies(allData[0].data.results);
      setLatestSeries(allData[1].data.results);
    });
  };
  useEffect(() => {
    fetchShow();
  }, []);

  const changeRoute = (path) => {
    location.href = path;
  };

  return (
    <div className="popular-show-container">
      <div className="popular-show">
        <div className="popular-show-header">
          <h2>Popular Movies</h2>
          <div>
            <span onClick={() => changeRoute("/movies")}>View All</span>
            <IoIosArrowForward />
          </div>
        </div>
        <ShowList showList={latestMovies} mediaType="movie" />
      </div>
      <div className="popular-show">
        <div className="popular-show-header">
          <h2>Popular TV Shows</h2>
          <div>
            <span onClick={() => changeRoute("/tv-show")}>View All</span>
            <IoIosArrowForward />
          </div>
        </div>
        <ShowList showList={latestSeries} mediaType="tv" />
      </div>
    </div>
  );
}

export default PopularShow;
