import Search from "./Search";
import "./SearchList.css";

function SearchList({ searchList }) {
  const renderSearchList = searchList
    .filter(
      (searchTerm) =>
        searchTerm.media_type !== "person" && searchTerm?.poster_path !== null
    ) //filterng people from list
    .map((search, indx) => <Search search={search} key={indx} />);

  return <ul className="search-list">{renderSearchList}</ul>;
}

export default SearchList;
