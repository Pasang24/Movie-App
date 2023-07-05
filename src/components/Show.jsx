import { useState } from "react";
import { TbPlayerPlayFilled } from "react-icons/tb";
import posterLoader from "../assets/posterloader.jpg";
import "./Show.css";

function Show({ show, mediaType }) {
  const [showImage, setShowImage] = useState(false);

  const media_type = mediaType ? mediaType : show.media_type;
  const date = show?.first_air_date || show?.release_date;

  const handleImageLoad = () => {
    setTimeout(() => {
      setShowImage(true);
    }, 300);
  };

  const changeRoute = (path) => {
    location.href = path;
  };

  return (
    <div className="show-container">
      <div
        className="poster-container"
        onClick={() => {
          changeRoute(
            `${media_type === "movie" ? "/movie/" : "/tv/"}${show.id}`
          );
        }}
      >
        <img
          src={posterLoader}
          alt={show?.title || show?.name}
          className={`poster-loader ${showImage ? "remove-poster-loader" : ""}`}
        />
        <div className="poster-hovering">
          <TbPlayerPlayFilled size={40} />
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w400${show.poster_path}`}
          alt={show?.title || show?.name}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageLoad}
          className={`poster-image ${showImage ? "show-poster-image" : ""}`}
        />
      </div>
      <h4>{show?.title || show?.name}</h4>
      <div>
        <span>{date ? date.slice(0, 4) : date}</span>
        <span>•</span>
        <span>{media_type.toUpperCase()}</span>
      </div>
    </div>
  );
}

export default Show;
