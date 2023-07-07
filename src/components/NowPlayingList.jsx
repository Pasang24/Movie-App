import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import NowPlayingShow from "./NowPlayingShow";
import "./NowPlayingList.css";

function NowPlayingList({ nowPlayingList }) {
  const renderedList = nowPlayingList.map((nowPlaying, indx) => (
    <NowPlayingShow nowPlaying={nowPlaying} key={indx} />
  ));

  const handleSlide = (slideDirection) => {
    const sliderContainer = document.querySelector("now-playing-wrapper");
    const slider = document.querySelector(".now-playing-list");

    const slideValue = Math.floor(slider.clientWidth / 210) || 1;

    if (slideDirection === "left") {
      slider.scrollTo(slider.scrollLeft - slideValue * 210, 0);
    } else if (slideDirection === "right") {
      slider.scrollTo(slider.scrollLeft + slideValue * 210, 0);
    }
  };

  return (
    <div className="now-playing-wrapper">
      {/* <div className="sliding-btns"> */}
      <button className="sliding-btn left-slide">
        <IoIosArrowBack onClick={() => handleSlide("left")} />
      </button>
      <button className="sliding-btn right-slide">
        <IoIosArrowForward onClick={() => handleSlide("right")} />
      </button>
      {/* </div> */}
      <div className="now-playing-list">{renderedList}</div>
    </div>
  );
}

export default NowPlayingList;
