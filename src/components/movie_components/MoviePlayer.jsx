import { useState, useEffect } from "react";
import axios from "axios";
import VideoStreamer from "../custom_components/VideoStreamer";
import ShowList from "../show_components/ShowList";
import posterLoader from "../../assets/posterLoader.jpg";
import posterNotAvailable from "../../assets/posterNotAvailable.png";
import "./MoviePlayer.css";

function MoviePlayer({ movieId }) {
  const [info, setInfo] = useState({});
  const [showImage, setShowImage] = useState(false);
  const [posterAvailable, setPosterAvailable] = useState(true);
  const [loading, setLoading] = useState(true);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movieId]);

  const handleImageLoad = () => {
    setTimeout(() => {
      setShowImage(true);
    }, 300);
  };

  return (
    <>
      <VideoStreamer showId={`movie-${movieId}`} />
      {!loading && (
        <div className="movie-small-info">
          <div className="movie-small-image-preview">
            <img
              src={posterLoader}
              alt={info?.title}
              className={`m-preview-img-loader ${
                showImage ? "remove-m-preview-img-loader" : ""
              }`}
            />
            {posterAvailable && (
              <img
                src={`https://image.tmdb.org/t/p/w400${info.poster_path}`}
                alt={info?.title}
                onLoad={handleImageLoad}
                onError={() => {
                  setPosterAvailable(false);
                  handleImageLoad();
                }}
                className={`m-preview-img ${
                  showImage ? "show-m-preview-img" : ""
                }`}
              />
            )}
            {!posterAvailable && (
              <img src={posterNotAvailable} alt={info?.title} />
            )}
          </div>
          <div className="m-small-info">
            <h3>{info?.title}</h3>
            <span>
              Duration: {info?.runtime ? `${info.runtime}` : "N/A"}min
            </span>
            <span>
              Released: {info?.release_date ? info.release_date : "N/A"}
            </span>
          </div>
        </div>
      )}
      {info?.recommendations && info.recommendations.results.length > 0 && (
        <h2 className="recommendations-title">You may also like</h2>
      )}
      <div className="recommendations-list">
        <ShowList
          showList={
            info?.recommendations
              ? info.recommendations.results.slice(0, 20)
              : []
          }
          mediaType="movie"
        />
      </div>
    </>
  );
}

export default MoviePlayer;
