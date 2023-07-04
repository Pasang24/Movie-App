import { useNavigate } from "react-router-dom";
import { TbPlayerPlayFilled } from "react-icons/tb";
import "./NowPlayingShow.css";

function NowPlayingShow({ nowPlaying }) {
  const navigate = useNavigate();

  return (
    <div className="now-playing">
      <div
        className="poster-div"
        onClick={() => navigate(`movie/${nowPlaying.id}`)}
      >
        <div className="poster-hover">
          <TbPlayerPlayFilled size={50} />
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w400${nowPlaying.poster_path}`}
          alt={nowPlaying?.title || nowPlaying?.name}
          loading="lazy"
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
