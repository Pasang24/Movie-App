import { useParams } from "react-router-dom";
import VideoStreamer from "../components/VideoStreamer";

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
