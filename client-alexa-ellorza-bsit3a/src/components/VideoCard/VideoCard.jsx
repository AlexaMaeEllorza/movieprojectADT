import './VideoCard.css';

function VideoCard({ video }) {
  return (
    <div className="video-card">
      <iframe
        src={video.url}
        allowFullScreen
        title={video.name}
        className="video-card-video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <div className="video-card-overlay">
        <span className="video-card-title">{video.name}</span>
      </div>
    </div>
  );
}

export default VideoCard;