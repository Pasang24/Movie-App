import { useParams } from "react-router-dom";
import SearchResultList from "../components/SearchResultList";

function SearchPage() {
  const { searchTerm } = useParams();

  return (
    <>
      <SearchResultList searchTerm={searchTerm} />
    </>
  );
}

export default SearchPage;
