import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { PiVideoCameraFill } from "react-icons/pi";
import "./ShowInfo.css";
import TrailerModal from "./TrailerModal";
import ShowList from "./ShowList";

function ShowInfo({ showId, mediaType }) {
  const [showInfo, setShowInfo] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}${mediaType}/${showId}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          append_to_response: "videos,recommendations",
        },
      })
      .then((res) => {
        console.log(res.data);
        setShowInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showId]);
  return (
    <>
      <div className="show-info-container">
        <div className="backdrop-poster">
          <img
            src={`https://image.tmdb.org/t/p/original/${showInfo?.backdrop_path}`}
          />
        </div>
        <div className="show-info">
          <div className="show-image">
            <img
              src={`https://image.tmdb.org/t/p/w400/${showInfo?.poster_path}`}
            />
          </div>
          <div className="show-details">
            <span className="show-title">{showInfo?.title}</span>
            <div className="show-options">
              <button
                className="trailer-btn"
                onClick={() => setShowTrailer(true)}
              >
                <PiVideoCameraFill />
                <span>Trailer</span>
              </button>
              <span className="imdb-rating">IMDB: N/A</span>
            </div>
            <p>{showInfo?.overview}</p>
            <div className="more-details">
              <span>Original Title: {showInfo?.original_title}</span>
              <span>Released: {showInfo?.release_date}</span>
              <span>
                Genre:{" "}
                {showInfo?.genres &&
                  showInfo.genres.map((genre) => genre.name).join(", ")}
              </span>
              <span>Duration: {showInfo?.runtime}min</span>
              <span>
                Country:{" "}
                {showInfo?.production_countries &&
                  showInfo.production_countries
                    .map((country) => country.name)
                    .join(", ")}
              </span>
              <span>
                Production:{" "}
                {showInfo?.production_companies &&
                  showInfo.production_companies
                    .map((company) => company.name)
                    .join(", ")}
              </span>
              <span>Budget: ${showInfo?.budget}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="recommendation">
        <h2>You may also like</h2>
        <ShowList
          showList={
            showInfo?.recommendations ? showInfo.recommendations.results : []
          }
          mediaType={mediaType}
        />
      </div>
      {showTrailer &&
        createPortal(
          <TrailerModal
            videoKey={showInfo.videos.results[0].key}
            onClose={() => setShowTrailer(false)}
          />,
          document.getElementById("trailer-div")
        )}
    </>
  );
}

export default ShowInfo;
