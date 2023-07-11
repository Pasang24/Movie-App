import { useParams } from "react-router-dom";
import MoviePlayer from "../components/movie_components/MoviePlayer.jsx";

function WatchMoviePage() {
  const { movieId } = useParams();

  return (
    <>
      <MoviePlayer movieId={movieId} />
    </>
  );
}

export default WatchMoviePage;
