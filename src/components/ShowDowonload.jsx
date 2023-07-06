import { useEffect, useState } from "react";
import axios from "axios";
import DropDown from "./DropDown";
import posterLoader from "../assets/backdropLoader.jpg";
import "./ShowDownload.css";

function ShowDownload({ showId, totalSeasons }) {
  const [season, setSeason] = useState("Season 1");
  const [episodeList, setEpisodeList] = useState([]);
  const [showEp, setShowEp] = useState(true);
  const [showImage, setShowImage] = useState(false);

  const drops = [];

  for (let i = 1; i <= totalSeasons; i++) {
    drops.push(`Season ${i}`);
  }

  useEffect(() => {
    setShowImage(false);
  }, [season]);

  const handleImageLoad = () => {
    setShowImage(true);
  };

  const renderEpisodeList = episodeList.map((episode, indx) => {
    return (
      <li key={indx} className="episode">
        <div className="episode-image">
          <img
            className={`ep-image-loader ${
              showImage ? "remove-ep-image-loader" : ""
            }`}
            src={posterLoader}
          />
          <img
            src={`https://image.tmdb.org/t/p/w200${episode.still_path}`}
            alt={episode.name}
            onLoad={handleImageLoad}
            onError={handleImageLoad}
          />
        </div>
        <div className="episode-content">
          <div className="ep-name">
            <h4>Episode {episode.episode_number}</h4>
            <span>{episode.name}</span>
          </div>
          <div className="ep-release-date">
            <span>Released {episode.air_date}</span>
          </div>
        </div>
      </li>
    );
  });

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}tv/${showId}${`/season/${
          season.split(" ")[1]
        }`}`,
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setEpisodeList(res.data.episodes);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, [season]);

  return (
    <div className="show-downloads">
      <DropDown
        selectedDrop={season}
        setSelectedDrop={setSeason}
        drops={drops}
        setShowEp={() => setShowEp((prev) => !prev)}
      />
      {showEp && <ul className="episode-list">{renderEpisodeList}</ul>}
    </div>
  );
}

export default ShowDownload;
