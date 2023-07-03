import { useState, useEffect } from "react";
import axios from "axios";
import NowPlayingList from "./NowPlayingList";
import "./NowPlaying.css";

function NowPlaying() {
  const [nowPlayingList, setNowPlayingList] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}movie/now_playing`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          page: 1,
        },
      })
      .then((res) => {
        console.log(res.data.results);
        setNowPlayingList(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="now-playing-container">
      <h2>Now Playing</h2>
      <NowPlayingList nowPlayingList={nowPlayingList} />
    </div>
  );
}

export default NowPlaying;
