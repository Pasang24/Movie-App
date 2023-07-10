import { useState, useEffect } from "react";
import axios from "axios";
import VideoStreamer from "../custom_components/VideoStreamer";
import ShowList from "../show_components/ShowList";
import "./SeriesPlayer.css";

function SeriesPlayer({ seriesId }) {
  const [info, setInfo] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}tv/${seriesId.split("/")[0]}`, {
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
  }, [seriesId]);

  return (
    <>
      <VideoStreamer showId={`show-${seriesId}`} />
      <div className="series-small-info">
        <div className="series-small-image-preview">
          <img src={`https://image.tmdb.org/t/p/w400${info.poster_path}`} />
        </div>
        <div className="s-small-info">
          <h3>{info?.name}</h3>
          <span>
            Total Seasons:{" "}
            {info?.number_of_seasons ? `${info.number_of_seasons}` : "N/A"}
          </span>
          <span>
            Released: {info?.first_air_date ? info.first_air_date : "N/A"}
          </span>
        </div>
      </div>
      {info?.recommendations && info.recommendations.results.length > 0 && (
        <h2 className="s-recommendations-title">You may also like</h2>
      )}
      <div className="s-recommendations-list">
        <ShowList
          showList={info?.recommendations ? info.recommendations.results : []}
          mediaType="tv"
        />
      </div>
    </>
  );
}

export default SeriesPlayer;
