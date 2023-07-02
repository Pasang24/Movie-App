import Show from "./Show";
import "./ShowList.css";

function ShowList({ showList, mediaType }) {
  const renderedList = showList.map((show, indx) => (
    <Show show={show} mediaType={mediaType} key={indx} />
  ));

  return <div className="show-list">{renderedList}</div>;
}

export default ShowList;
