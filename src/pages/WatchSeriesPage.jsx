import { useParams } from "react-router-dom";
import VideoStreamer from "../components/custom_components/VideoStreamer.jsx";

function DownloadSeriesPage() {
  const { seriesId } = useParams();
  const showId = seriesId.split("-").join("/");

  return (
    <>
      <VideoStreamer showId={`show-${showId}`} />
    </>
  );
}

export default DownloadSeriesPage;
