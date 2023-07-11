import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { PiVideoCameraFill } from "react-icons/pi";
import TrailerModal from "../custom_components/TrailerModal.jsx";
import ShowList from "./ShowList.jsx";
import ShowDownload from "../series_components/ShowDowonload.jsx";
import MovieDownload from "../movie_components/MovieDownload.jsx";
import backdropLoader from "../../assets/backdropLoader.jpg";
import posterLoader from "../../assets/posterloader.jpg";
import posterNotAvailable from "../../assets/posterNotAvailable.png";
import backdropNotAvailable from "../../assets/backdropNotAvailable.jpg";
import "./ShowInfo.css";

function ShowInfo({ showId, mediaType }) {
  const [showInfo, setShowInfo] = useState({});
  const [showBackdropImage, setShowBackdropImage] = useState(false);
  const [showPosterImage, setShowPosterImage] = useState(false);
  const [posterAvailable, setPosterAvailable] = useState(true);
  const [backdropAvailable, setBackdropAvailable] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}${mediaType}/${showId}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          append_to_response: "videos,recommendations,credits",
        },
      })
      .then((res) => {
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
      {!loading && (
        <div className="show-info-container">
          <div className="backdrop-poster">
            <img
              className={`backdrop-loader ${
                showBackdropImage ? "remove-loader" : ""
              }`}
              src={backdropLoader}
            />
            {backdropAvailable && (
              <img
                src={`https://image.tmdb.org/t/p/original/${showInfo?.backdrop_path}`}
                className={`show-detail-image ${
                  showBackdropImage ? "visible-show-image" : ""
                }`}
                alt={showInfo?.title || showInfo?.name}
                onLoad={handleBackdropLoad}
                onError={() => {
                  setBackdropAvailable(false);
                  handleBackdropLoad();
                }}
              />
            )}
            {!backdropAvailable && (
              <img
                src={backdropNotAvailable}
                alt={showInfo?.title || showInfo?.name}
              />
            )}
          </div>
          <div className="show-overview">
            <div className="show-info">
              <div className="show-image">
                <img
                  className={`show-image-loader ${
                    showPosterImage ? "remove-loader" : ""
                  }`}
                  src={posterLoader}
                />
                {posterAvailable && (
                  <img
                    src={`https://image.tmdb.org/t/p/w400/${showInfo?.poster_path}`}
                    alt={showInfo?.title || showInfo?.name}
                    className={`show-detail-image ${
                      showBackdropImage ? "visible-show-image" : ""
                    }`}
                    onLoad={handlePosterLoad}
                    onError={() => {
                      setPosterAvailable(false);
                      handlePosterLoad();
                    }}
                  />
                )}
                {!posterAvailable && (
                  <img
                    src={posterNotAvailable}
                    alt={showInfo?.title || showInfo?.name}
                  />
                )}
                <div className="votings">
                  <span>Rating: {showInfo?.vote_average.toFixed(1)} / 10</span>
                  <div className="ratings">
                    <div
                      className="total-ratings"
                      style={{
                        width: showInfo?.vote_average
                          ? `${showInfo.vote_average * 10}%`
                          : "0%",
                      }}
                    ></div>
                  </div>
                  <div className="voting-btn like"> Like</div>
                  <div className="voting-btn dislike">Dislike</div>
                </div>
              </div>
              <div className="show-details">
                <span className="show-title">
                  {showInfo?.title || showInfo?.name}
                </span>
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
                  <span>
                    Original Title:{" "}
                    {showInfo?.original_title || showInfo?.original_name}
                  </span>
                  <span>
                    Released:{" "}
                    {showInfo?.release_date ||
                      showInfo?.first_air_date ||
                      "N/A"}
                  </span>
                  <span>
                    Genre:{" "}
                    {showInfo?.genres &&
                      (showInfo.genres.map((genre) => genre.name).join(", ") ||
                        "N/A")}
                  </span>
                  <span>
                    Casts:{" "}
                    {showInfo?.credits &&
                      (showInfo.credits.cast
                        .slice(0, 5)
                        .map((cast) => cast.name)
                        .join(", ") ||
                        "N/A")}
                  </span>
                  <span>
                    Duration:{" "}
                    {showInfo?.runtime || showInfo?.episode_run_time || "N/A"}
                    min
                  </span>
                  <span>
                    Country:{" "}
                    {showInfo?.production_countries &&
                      (showInfo.production_countries
                        .map((country) => country.name)
                        .join(", ") ||
                        "N/A")}
                  </span>
                  <span>
                    Production:{" "}
                    {showInfo?.production_companies &&
                      (showInfo.production_companies
                        .map((company) => company.name)
                        .join(", ") ||
                        "N/A")}
                  </span>
                </div>
              </div>
            </div>
            {mediaType === "tv" ? (
              <ShowDownload
                showId={showId}
                totalSeasons={showInfo?.number_of_seasons}
                name={showInfo?.name}
              />
            ) : (
              <MovieDownload movieInfo={showInfo} />
            )}
          </div>
        </div>
      )}
      {!loading && (
        <div className="recommendation">
          {showInfo.recommendations.results.length > 0 && (
            <h2>You may also like</h2>
          )}
          <ShowList
            showList={showInfo.recommendations.results.slice(0, 20) || []}
            mediaType={mediaType}
          />
        </div>
      )}
      {showTrailer &&
        createPortal(
          <TrailerModal
            videoList={showInfo.videos.results}
            onClose={() => setShowTrailer(false)}
          />,
          document.getElementById("trailer-div")
        )}
    </>
  );
}

export default ShowInfo;
