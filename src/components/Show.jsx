import { TbPlayerPlayFilled } from "react-icons/tb";
import "./Show.css";

function Show({ show, mediaType }) {
  const media_type = mediaType ? mediaType : show.media_type;
  const date = show?.first_air_date || show?.release_date;
  return (
    <div className="show-container">
      <div className="poster-container">
        <div className="poster-hovering">
          <TbPlayerPlayFilled size={40} />
        </div>
        <img
          src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
          alt={show?.title || show?.name}
          loading="lazy"
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
