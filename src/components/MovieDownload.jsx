import { useState } from "react";
import { TbPlayerPlay } from "react-icons/tb";
import movieImageHolder from "../assets/posterloader.jpg";
import "./MovieDownload.css";

function MovieDownload({ movieInfo }) {
  const [showImageHolder, setShowImageHolder] = useState();

  const changeRoute = (path) => {
    location.href = path;
  };

  return (
    <div
      className="movie-download"
      onClick={() =>
        changeRoute(
          `/download-movie/${movieInfo.title
            .split(".")
            .join("_")}_${movieInfo.release_date.slice(0, 4)}`
        )
      }
    >
      <span className="movie-download-heading">Watch Now</span>
      <div className="movie-download-wrapper">
        <div className="movie-player-image">
          <TbPlayerPlay className="movie-player-logo" />
          {showImageHolder && <img src={movieImageHolder} />}
          {!showImageHolder && (
            <img
              src={`https://image.tmdb.org/t/p/w400${movieInfo.backdrop_path}`}
              alt={movieInfo.title}
              loading="lazy"
              onError={() => setShowImageHolder(true)}
            />
          )}
        </div>
        <div className="movie-content">
          <div className="mv-name">
            <h4>{movieInfo.title}</h4>
            <span>
              {movieInfo.overview.length > 35
                ? `${movieInfo.overview.slice(0, 35)}...`
                : movieInfo.overview}
            </span>
          </div>
          <div className="mv-release-date">
            <span>Released {movieInfo.release_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDownload;
