import { TbPlayerPlayFilled } from "react-icons/tb";
import "./NowPlayingShow.css";

function NowPlayingShow({ nowPlaying }) {
  return (
    <div className="now-playing">
      <div className="poster-div">
        <div className="poster-hover">
          <TbPlayerPlayFilled size={50} />
        </div>
        <img
          src={`https://image.tmdb.org/t/p/original${nowPlaying.poster_path}`}
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
