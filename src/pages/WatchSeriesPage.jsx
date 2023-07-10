import { useParams } from "react-router-dom";
import SeriesPlayer from "../components/series_components/SeriesPlayer.jsx";

function DownloadSeriesPage() {
  const { seriesId } = useParams();
  const showId = seriesId.split("-").join("/");

  return (
    <>
      <SeriesPlayer seriesId={showId} />
    </>
  );
}

export default DownloadSeriesPage;
