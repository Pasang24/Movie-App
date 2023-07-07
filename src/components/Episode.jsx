import { useState, useEffect } from "react";
import { TbPlayerPlay } from "react-icons/tb";
import episodeImageHolder from "../assets/posterloader.jpg";
import "./Episode.css";

function Episode({ episode }) {
  const [showImageHolder, setShowImageHolder] = useState(false);

  useEffect(() => {
    setShowImageHolder(false);
  }, [episode]);

  const handleClick = () => {};

  return (
    <li className="episode" onClick={handleClick}>
      <div className="episode-image">
        <TbPlayerPlay className="player-logo" />
        {showImageHolder && <img src={episodeImageHolder} />}
        {!showImageHolder && (
          <img
            src={`https://image.tmdb.org/t/p/w400${episode.still_path}`}
            alt={episode.name}
            loading="lazy"
            onError={() => setShowImageHolder(true)}
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
