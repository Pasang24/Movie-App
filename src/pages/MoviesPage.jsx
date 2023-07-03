import { useLocation } from "react-router-dom";
import AllShowList from "../components/AllShowList";

function MoviesPage() {
  const location = useLocation();
  const page = parseInt(location.search.split("=")[1]) || 1;

  return (
    <>
      <AllShowList page={page} mediaType="movie" />
    </>
  );
}

export default MoviesPage;
