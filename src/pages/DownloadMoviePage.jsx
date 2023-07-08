import { useParams } from "react-router-dom";
import MovieDownloadList from "../components/MovieDownloadList";

function DownloadMoviePage() {
  const { movieInfo } = useParams();

  const lastIndex = movieInfo.lastIndexOf("_");
  const realMovieName = movieInfo.slice(0, lastIndex).split("_").join(".");
  const releaseDate = parseInt(movieInfo.slice(lastIndex + 1)) || 0;
  console.log(realMovieName, releaseDate);

  return (
    <>
      {
        <MovieDownloadList
          movieName={realMovieName}
          releaseDate={releaseDate}
        />
      }
    </>
  );
}

export default DownloadMoviePage;
