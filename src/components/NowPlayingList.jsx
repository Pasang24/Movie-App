import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import NowPlayingShow from "./NowPlayingShow";
import LineLoader from "./LineLoader";
import "./NowPlayingList.css";

function NowPlayingList({ nowPlayingList, addMovies }) {
  const [showLoader, setShowLoader] = useState(false);

  const renderedList = nowPlayingList.map((nowPlaying, indx) => (
    <NowPlayingShow nowPlaying={nowPlaying} key={indx} />
  ));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 500);
    const slider = document.querySelector(".now-playing-list");

    const handleScroll = () => {
      const scrollValue = Math.floor(slider.scrollLeft);
      const totalScrollValue = slider.scrollWidth - slider.clientWidth;
      console.log(scrollValue, totalScrollValue);

      const pageLength = Math.ceil(nowPlayingList.length / 20);

      if (scrollValue === totalScrollValue && pageLength < 3) {
        setShowLoader(true);
        addMovies(pageLength + 1);
      }
    };

    slider.addEventListener("scroll", handleScroll);

    return () => {
      // clearTimeout(timer);
      slider.removeEventListener("scroll", handleScroll);
    };
  }, [addMovies]);

  const handleSlide = (slideDirection) => {
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
      <button
        onClick={() => handleSlide("left")}
        className="sliding-btn left-slide "
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={() => handleSlide("right")}
        className="sliding-btn right-slide"
      >
        <IoIosArrowForward />
      </button>
      {showLoader && (
        <div className="loader-wrapper">
          <LineLoader />
        </div>
      )}
      <div className="now-playing-list">{renderedList}</div>
    </div>
  );
}

export default NowPlayingList;
