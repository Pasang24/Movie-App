import "./Search.css";

function Search({ search }) {
  const date = search?.release_date || search?.first_air_date;

  return (
    <li className="search-item">
      <img
        src={`https://image.tmdb.org/t/p/original${search.poster_path}`}
        alt="Poster"
      />
      <div className="movie-overview">
        <h4>{search?.title || search?.name}</h4>
        <div>
          <span>{date ? date.slice(0, 4) : date}</span>
          <span>•</span>
          <span>{search.media_type.toUpperCase()}</span>
        </div>
      </div>
    </li>
  );
}

export default Search;
