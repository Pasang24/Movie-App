import { useState } from "react";
import { TbPlayerPlay } from "react-icons/tb";
import thumbNailNotAvailable from "../../assets/backdropNotAvailable.jpg";
import movieImageHolder from "../../assets/posterloader.jpg";
import "./MovieDownload.css";

function MovieDownload({ movieInfo }) {
  const [showImage, setShowImage] = useState(false);
  const [imageNotAvailable, setImageNotAvailable] = useState(false);

  const changeRoute = (path) => {
    location.href = path;
  };

  const removeImageHolder = () => {
    setTimeout(() => {
      setShowImage(true);
    }, 300);
  };

  return (
    <div className="movie-download">
      <span className="movie-download-heading">Watch Now</span>
      <div
        className="movie-download-wrapper"
        onClick={() => changeRoute(`/watch-movie/${movieInfo.id}`)}
      >
        <div className="movie-player-image">
          <img
            src={movieImageHolder}
            className={`movie-image-holder ${
              showImage ? "remove-movie-image-holder" : ""
            }`}
          />
          <TbPlayerPlay className="movie-player-logo" />
          {imageNotAvailable && <img src={thumbNailNotAvailable} />}
          {!imageNotAvailable && (
            <img
              src={`https://image.tmdb.org/t/p/w400${movieInfo.backdrop_path}`}
              alt={movieInfo.title}
              loading="lazy"
              onLoad={removeImageHolder}
              onError={() => {
                setImageNotAvailable(true);
                removeImageHolder();
              }}
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
