import NowPlaying from "../components/NowPlaying";
import PopularShow from "../components/PopularShow";
import Trending from "../components/Trending";

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
