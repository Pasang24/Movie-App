import { useEffect, useState } from "react";
import axios from "axios";
import posterLoader from "../assets/posterloader.jpg";
import DropDown from "./DropDown";
import "./ShowDownload.css";
import Episode from "./Episode";

function ShowDownload({ showId, totalSeasons }) {
  const [season, setSeason] = useState("Season 1");
  const [episodeList, setEpisodeList] = useState([]);
  const [showEp, setShowEp] = useState(true);

  const drops = [];

  for (let i = 1; i <= totalSeasons; i++) {
    drops.push(`Season ${i}`);
  }

  const renderEpisodeList = episodeList.map((episode, indx) => {
    return <Episode episode={episode} key={indx} />;
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
        // console.log(res.data);
        setEpisodeList(res.data.episodes);
      })
      .catch((err) => {
        console.log(err);
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
