import { useState, useEffect } from "react";
import { TbPlayerPlay } from "react-icons/tb";
import thumbnailNotAvailable from "../../assets/backdropNotAvailable.jpg";
import episodeImageHolder from "../../assets/posterloader.jpg";
import "./Episode.css";

function Episode({ showId, seasonId, episode }) {
  const [showImage, setShowImage] = useState(false);
  const [imageNotAvailable, setImageNotAvailable] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setShowImage(false);
    setImageNotAvailable(false);

    return () => clearTimeout(timer);
  }, [episode]);

  const changeRoute = (path) => {
    location.href = path;
  };

  const removeImageHolder = () => {
    setTimer(
      setTimeout(() => {
        setShowImage(true);
      }, 300)
    );
  };

  return (
    <li
      className="episode"
      onClick={() =>
        changeRoute(`/watch-tv/${showId}-${seasonId}-${episode.id}`)
      }
    >
      <div className="episode-image">
        <img
          src={episodeImageHolder}
          className={`ep-image-holder ${
            showImage ? "remove-ep-image-holder" : ""
          }`}
        />
        <TbPlayerPlay className="player-logo" />
        {imageNotAvailable && (
          <img
            src={thumbnailNotAvailable}
            className={`ep-image ${showImage ? "show-ep-image" : ""}`}
          />
        )}
        {!imageNotAvailable && (
          <img
            src={`https://image.tmdb.org/t/p/w400${episode.still_path}`}
            alt={episode.name}
            loading="lazy"
            onLoad={removeImageHolder}
            onError={() => {
              setImageNotAvailable(true);
              removeImageHolder();
            }}
            className={`ep-image ${showImage ? "show-ep-image" : ""}`}
          />
        )}
      </div>
      <div className="episode-content">
        <div className="ep-name">
          <h4>Episode {episode.episode_number}</h4>
          <span>
            {episode.name.length > 35
              ? `${episode.name.slice(0, 35)}...`
              : episode.name}
          </span>
        </div>
        <div className="ep-release-date">
          <span>Released {episode.air_date || "N/A"}</span>
        </div>
      </div>
    </li>
  );
}

export default Episode;
