import "./NowPlayingList.css";
import NowPlayingShow from "./NowPlayingShow";

function NowPlayingList({ nowPlayingList }) {
  const renderedList = nowPlayingList.map((nowPlaying, indx) => (
    <NowPlayingShow nowPlaying={nowPlaying} key={indx} />
  ));

  return <div className="now-playing-list">{renderedList}</div>;
}

export default NowPlayingList;
