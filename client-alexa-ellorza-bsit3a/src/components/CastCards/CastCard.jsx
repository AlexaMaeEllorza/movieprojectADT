import './CastCard.css';

function CastCard({ cast }) {
  return (
        <div className="cast-card">
      <img src={cast.url} alt={cast.name} className="cast-card-image" />
      <div className="cast-card-overlay">
        <span>{cast.name} </span>
        <span> as </span>
        <span className="cast-card-title">{cast.characterName}</span>
      </div>
    </div>
  );
}

export default CastCard;