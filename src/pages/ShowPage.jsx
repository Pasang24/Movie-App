import ShowInfo from "../components/show_components/ShowInfo.jsx";
import { useParams } from "react-router-dom";

function ShowPage() {
  const { tvShowId } = useParams();

  return (
    <>
      <ShowInfo showId={tvShowId} mediaType="tv" />
    </>
  );
}

export default ShowPage;
