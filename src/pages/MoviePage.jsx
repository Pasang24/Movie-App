import ShowInfo from "../components/ShowInfo";
import { useParams } from "react-router-dom";

function MoviePage() {
  const { movieId } = useParams();
  return (
    <>
      <ShowInfo showId={movieId} mediaType="movie" />
    </>
  );
}

export default MoviePage;
