import { useParams } from "react-router-dom";
import MoviePlayer from "../components/movie_components/MoviePlayer.jsx";

function WatchMoviePage() {
  const { movieId } = useParams();

  console.log(movieId);

  return (
    <>
      <MoviePlayer movieId={movieId} />
    </>
  );
}

export default WatchMoviePage;
