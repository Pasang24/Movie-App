import { useEffect } from "react";
import "./TrailerModal.css";

function TrailerModal({ videoKey, onClose }) {
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

  return (
    <div className="trailer-container">
      <div className="trailer-wrapper">
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
