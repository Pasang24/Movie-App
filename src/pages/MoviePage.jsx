import ShowInfo from "../components/show_components/ShowInfo.jsx";
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
