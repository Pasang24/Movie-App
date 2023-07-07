import { useState, useEffect } from "react";
import { TbPlayerPlay } from "react-icons/tb";
import episodeImageHolder from "../assets/posterloader.jpg";
import "./Episode.css";

function Episode({ episode }) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(false);
  }, [episode]);

  return (
    <li className="episode">
      <div className="episode-image">
        <TbPlayerPlay className="player-logo" />
        {showLoader && <img src={episodeImageHolder} />}
        {!showLoader && (
          <img
            src={`https://image.tmdb.org/t/p/w200${episode.still_path}`}
            alt={episode.name}
            loading="lazy"
            onError={() => setShowLoader(true)}
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
          <span>Released {episode.air_date}</span>
        </div>
      </div>
    </li>
  );
}

export default Episode;
