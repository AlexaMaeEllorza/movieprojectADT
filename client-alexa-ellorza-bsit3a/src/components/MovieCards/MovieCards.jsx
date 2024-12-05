import './MovieCards.css';

function MovieCards({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <img src={movie.posterPath} alt={movie.title} className="movie-card-image" />
      <div className="movie-card-overlay">
        <span className="movie-card-title">{movie.title}</span>
      </div>
    </div>
  );
}

export default MovieCards;
