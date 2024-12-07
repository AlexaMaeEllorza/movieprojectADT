import './PhotoCard.css';

function PhotoCard({ photo }) {
  return (
        <div className="photo-card">
      <img src={photo.url} alt={photo.name} className="photo-card-image" />
      <div className="photo-card-overlay">
        <span >{photo.description} </span>

      </div>
    </div>
  );
}

export default PhotoCard;