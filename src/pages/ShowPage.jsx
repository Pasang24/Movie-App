import ShowInfo from "../components/ShowInfo";
import { useParams } from "react-router-dom";

function ShowPage() {
  const { tvShowId } = useParams();
  console.log(tvShowId);

  return (
    <>
      <ShowInfo showId={tvShowId} mediaType="tv" />
    </>
  );
}

export default ShowPage;
