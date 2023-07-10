import NowPlaying from "../components/movie_components/NowPlaying.jsx";
import PopularShow from "../components/show_components/PopularShow.jsx";
import Trending from "../components/show_components/Trending.jsx";

function HomePage() {
  return (
    <>
      <NowPlaying />
      <Trending />
      <PopularShow />
    </>
  );
}

export default HomePage;
