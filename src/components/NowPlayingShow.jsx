import "./NowPlayingShow.css";

function NowPlayingShow({ nowPlaying }) {
  return (
    <div className="now-playing">
      <img
        src={`https://image.tmdb.org/t/p/original${nowPlaying.poster_path}`}
      />
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
