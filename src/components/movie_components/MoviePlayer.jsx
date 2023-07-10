import { useState, useEffect } from "react";
import axios from "axios";
import VideoStreamer from "../custom_components/VideoStreamer";
import ShowList from "../show_components/ShowList";
import "./MoviePlayer.css";

function MoviePlayer({ movieId }) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}movie/${movieId}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          append_to_response: "recommendations",
        },
      })
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieId]);

  return (
    <>
      <VideoStreamer showId={`movie-${movieId}`} />
      <div className="movie-small-info">
        <div className="movie-small-image-preview">
          <img src={`https://image.tmdb.org/t/p/w400${info.poster_path}`} />
        </div>
        <div className="m-small-info">
          <h3>{info?.title}</h3>
          <span>Duration: {info?.runtime ? `${info.runtime}min` : "N/A"}</span>
          <span>
            Released: {info?.release_date ? info.release_date : "N/A"}
          </span>
        </div>
      </div>
      {info?.recommendations && info.recommendations.results.length > 0 && (
        <h2 className="recommendations-title">You may also like</h2>
      )}
      <div className="recommendations-list">
        <ShowList
          showList={info?.recommendations ? info.recommendations.results : []}
          mediaType="movie"
        />
      </div>
    </>
  );
}

export default MoviePlayer;
