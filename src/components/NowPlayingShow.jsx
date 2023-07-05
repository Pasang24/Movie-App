import { useState } from "react";
import { TbPlayerPlayFilled } from "react-icons/tb";
import posterLoader from "../assets/posterloader.jpg";
import "./NowPlayingShow.css";

function NowPlayingShow({ nowPlaying }) {
  const [showImage, setShowImage] = useState(false);

  const handleImageLoad = () => {
    setTimeout(() => {
      setShowImage(true);
    }, 300);
  };

  const changeRoute = (path) => {
    location.href = path;
  };

  return (
    <div className="now-playing">
      <div
        className="poster-div"
        onClick={() => changeRoute(`/movie/${nowPlaying.id}`)}
      >
        <img
          src={posterLoader}
          className={`now-playing-poster-loader ${
            showImage ? "remove-now-playing-poster-loader" : ""
          }`}
        />
        <div className="poster-hover">
          <TbPlayerPlayFilled size={50} />
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w400${nowPlaying.poster_path}`}
          alt={nowPlaying?.title || nowPlaying?.name}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageLoad}
          className={`now-playing-poster-image ${
            showImage ? "show-now-playing-poster-image" : ""
          }`}
        />
      </div>
      <h4>{nowPlaying?.title || nowPlaying?.name}</h4>
      <div>
        <span>
          {(nowPlaying?.first_air_date || nowPlaying?.release_date).slice(0, 4)}
        </span>
        <span>•</span>
        <span>MOVIE</span>
      </div>
    </div>
  );
}

export default NowPlayingShow;
