import "./Show.css";

function Show({ show, mediaType }) {
  const media_type = mediaType ? mediaType : show.media_type;
  return (
    <div className="show-container">
      <img src={`https://image.tmdb.org/t/p/original${show.poster_path}`} />
      <h4>{show?.title || show?.name}</h4>
      <div>
        <span>{(show?.first_air_date || show?.release_date).slice(0, 4)}</span>
        <span>•</span>
        <span>{media_type.toUpperCase()}</span>
      </div>
    </div>
  );
}

export default Show;
