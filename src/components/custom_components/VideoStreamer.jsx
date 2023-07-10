import "./VideoStreamer.css";

function VideoStreamer({ showId }) {
  return (
    <div className="video-stream-wrapper">
      <iframe
        src={`https://movie.smashystream.xyz/#/media/tmdb-${showId}`}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoStreamer;
