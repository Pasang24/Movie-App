import { useParams } from "react-router-dom";
import VideoStreamer from "../components/custom_components/VideoStreamer.jsx";

function WatchMoviePage() {
  const { movieId } = useParams();

  console.log(movieId);

  return (
    <>
      <VideoStreamer showId={`movie-${movieId}`} />
    </>
  );
}

export default WatchMoviePage;
