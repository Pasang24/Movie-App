import { useLocation } from "react-router-dom";
import AllShowList from "../components/AllShowList";

function SeriesPage() {
  const location = useLocation();
  const page = parseInt(location.search.split("=")[1]) || 1;

  return (
    <>
      <AllShowList page={page} mediaType="tv" />
    </>
  );
}

export default SeriesPage;
