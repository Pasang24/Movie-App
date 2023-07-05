import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { PiVideoCameraFill } from "react-icons/pi";
import TrailerModal from "./TrailerModal";
import ShowList from "./ShowList";
import backdropLoader from "../assets/backdropLoader.jpg";
import posterLoader from "../assets/posterloader.jpg";
import "./ShowInfo.css";

function ShowInfo({ showId, mediaType }) {
  const [showInfo, setShowInfo] = useState({});
  const [showBackdropImage, setShowBackdropImage] = useState(false);
  const [showPosterImage, setShowPosterImage] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [showId]);

  const handleBackdropLoad = () => {
    setTimeout(() => {
      setShowBackdropImage(true);
    }, 300);
  };

  const handlePosterLoad = () => {
    setTimeout(() => {
      setShowPosterImage(true);
    }, 300);
  };
  return (
    <>
      <div className="show-info-container">
        <div className="backdrop-poster">
          <img
            className={`backdrop-loader ${
              showBackdropImage ? "remove-loader" : ""
            }`}
            src={backdropLoader}
          />
          <img
            src={`https://image.tmdb.org/t/p/original/${showInfo?.backdrop_path}`}
            className={`show-detail-image ${
              showBackdropImage ? "visible-show-image" : ""
            }`}
            onLoad={handleBackdropLoad}
            onError={handleBackdropLoad}
          />
        </div>
        <div className="show-info">
          <div className="show-image">
            <img
              className={`show-image-loader ${
                showPosterImage ? "remove-loader" : ""
              }`}
              src={posterLoader}
            />
            <img
              src={`https://image.tmdb.org/t/p/w400/${showInfo?.poster_path}`}
              alt={showInfo?.title}
              className={`show-detail-image ${
                showBackdropImage ? "visible-show-image" : ""
              }`}
              onLoad={handlePosterLoad}
              onError={handlePosterLoad}
            />
            <div className="votings">
              <span>Rating: {showInfo?.vote_average} / 10</span>
              <div className="ratings">
                <div
                  className="total-ratings"
                  style={{
                    width: showInfo?.vote_average
                      ? `${showInfo.vote_average * 10}%`
                      : "100%",
                  }}
                ></div>
              </div>
              <div className="voting-btn like"> Like</div>
              <div className="voting-btn dislike">Dislike</div>
            </div>
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
        {!loading && (
          <ShowList
            showList={showInfo.recommendations.results || []}
            mediaType={mediaType}
          />
        )}
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
