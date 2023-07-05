import { useParams, useLocation } from "react-router-dom";
import SearchResultList from "../components/SearchResultList";

function SearchPage() {
  const location = useLocation();
  const { searchTerm } = useParams();
  const page = parseInt(location.search.split("=")[1]) || 1;

  return (
    <>
      <SearchResultList searchTerm={searchTerm} page={page} />
    </>
  );
}

export default SearchPage;
