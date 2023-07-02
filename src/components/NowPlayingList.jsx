import "./NowPlayingList.css";
import NowPlayingShow from "./NowPlayingShow";

function NowPlayingList({ nowPlayingList }) {
  const renderedList = nowPlayingList.map((nowPlaying) => (
    <NowPlayingShow nowPlaying={nowPlaying} />
  ));

  return <div className="now-playing-list">{renderedList}</div>;
}

export default NowPlayingList;
