import { useState, useEffect } from "react";
import { TbPlayerPlay } from "react-icons/tb";
import episodeImageHolder from "../../assets/posterloader.jpg";
import "./Episode.css";

function Episode({ showId, seasonId, episode }) {
  const [showImageHolder, setShowImageHolder] = useState(false);

  useEffect(() => {
    setShowImageHolder(false);
  }, [episode]);

  const changeRoute = (path) => {
    location.href = path;
  };

  return (
    <li
      className="episode"
      onClick={() =>
        changeRoute(`/watch-tv/${showId}-${seasonId}-${episode.id}`)
      }
    >
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
          <span>Released {episode.air_date || "N/A"}</span>
        </div>
      </div>
    </li>
  );
}

export default Episode;
