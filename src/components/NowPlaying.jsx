import { useState, useEffect } from "react";
import axios from "axios";
import NowPlayingList from "./NowPlayingList";
import "./NowPlaying.css";

function NowPlaying() {
  const [nowPlayingList, setNowPlayingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}movie/now_playing`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          page: 1,
        },
      })
      .then((res) => {
        setNowPlayingList(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addMovies = (page) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}movie/now_playing`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          page: page,
        },
      })
      .then((res) => {
        const newList = res.data.results;
        // need to look at this part again
        const checkDuplicate = newList.every((movie) => {
          return nowPlayingList.includes(movie);
        });
        if (!checkDuplicate) {
          setNowPlayingList([...nowPlayingList, ...newList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!loading && (
        <div className="now-playing-container">
          <h2>Now Playing</h2>
          <NowPlayingList
            nowPlayingList={nowPlayingList}
            addMovies={addMovies}
          />
        </div>
      )}
    </>
  );
}

export default NowPlaying;
