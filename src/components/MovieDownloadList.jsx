import { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload, FaMagnet } from "react-icons/fa";
import "./MovieDownloadList.css";

function MovieDownloadList({ movieName, releaseDate }) {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_TORRENT_API}yts/${movieName}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data?.error) {
        } else {
          setMovieData(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderMovieData = movieData
    .filter(
      (movie) =>
        movieName === movie.Name && releaseDate === parseInt(movie.ReleasedDate)
    )
    .map((movie) => {
      return movie.Files.map((file, indx) => {
        return (
          <li className="movie-download-links-wrapper" key={indx}>
            <div className="movie-download-quality">
              <h4>{movie.Name}</h4>
              <span>
                {file.Quality}.{file.Type} {file.Size}
              </span>
            </div>
            <div className="movie-download-links">
              <a className="movie-torrent-link" href={file.Torrent}>
                <FaDownload />
              </a>
              <a className="movie-magnet-link" href={file.Magnet}>
                <FaMagnet />
              </a>
            </div>
          </li>
        );
      });
    });
  return (
    <div className="movie-download-list-wrapper">
      <h2>Available Links</h2>
      {!loading && <ul>{renderMovieData}</ul>}
      {loading && <h3 style={{ textAlign: "center" }}>Loading...</h3>}
    </div>
  );
}

export default MovieDownloadList;
