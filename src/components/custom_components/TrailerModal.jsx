import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import "./TrailerModal.css";

function TrailerModal({ videoList, onClose }) {
  useEffect(() => {
    const el = document.querySelector(".trailer-video");
    const bodyEl = document.body;
    const handleClick = (event) => {
      if (!el.contains(event.target)) {
        onClose();
      }
    };

    bodyEl.addEventListener("click", handleClick, true);
    bodyEl.classList.add("prevent-scroll");

    return () => {
      bodyEl.removeEventListener("click", handleClick, true);
      bodyEl.classList.remove("prevent-scroll");
    };
  }, []);

  let videoKey = "";
  if (videoList.length > 0) {
    const trailer = videoList.find((video) => video.type === "Trailer");
    if (trailer) videoKey = trailer.key;
  }
  if (!videoKey) videoKey = "";

  return (
    <div className="trailer-container">
      <div className="trailer-wrapper">
        <button>
          <RxCross2 size={24} />
        </button>
        <iframe
          className="trailer-video"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default TrailerModal;
