import Search from "./Search.jsx";
import "./SearchList.css";

function SearchList({ searchList, handleSearchResult }) {
  const renderSearchList = searchList
    .filter(
      (searchTerm) =>
        searchTerm.media_type !== "person" && searchTerm?.poster_path !== null
    ) //filterng people from list
    .map((search, indx) => <Search search={search} key={indx} />);

  if (renderSearchList.length > 0) {
    renderSearchList.push(
      <li
        onClick={handleSearchResult}
        className="search-results-btn"
        key={renderSearchList.length}
      >
        <span>View All Results</span>
      </li>
    );
  }

  return <ul className="search-list">{renderSearchList}</ul>;
}

export default SearchList;
