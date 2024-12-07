import { useEffect } from 'react';
import { useMovieContext } from '../../../../context/MovieContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CastCard from '../../../../components/CastCards/CastCard';
import './View.css';
import VideoCard from '../../../../components/VideoCard/VideoCard';
import PhotoCard from '../../../../components/PhotoCard/PhotoCard';

function View() {
  const { movie, setMovie } = useMovieContext();
  const list_cast_data = movie?.casts || [];
  const list_videos_data = movie?.videos || [];
  const list_photos_data = movie?.photos || [];
  console.log(list_cast_data);
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId !== undefined) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((e) => {
          console.log(e);
          navigate('/main/');
        });
    }
    return () => {};
  }, [movieId, navigate, setMovie]);

  return (
    <>
      {movie && (
        <>
          <div className="movie-container">
            <img className="Image-Movie-View" src={movie.posterPath} alt={movie.title} />
            <div className="movie-details">
              <div className="banner">
                <h1>{movie.title}</h1>
                <h3>{movie.overview}</h3>
              </div>
              
              <h3>POPULARITY: {movie.popularity}</h3>
              <h3>RELEASE DATE: {movie.releaseDate}</h3>
              <h3>VOTE: {movie.voteAverage}</h3>
            </div>
          </div>

          <h1>Cast & Crew</h1>
          <div className="slider-view">
            {list_cast_data.length > 0 ? (
              <div className="container-list-slider1">
                {list_cast_data.map((casts) => (
                  <CastCard key={casts.id} cast={casts} />
                ))}
              </div>
            ) : (
              <p>Not available</p>
            )}
          </div>

          <h1>Videos</h1>
          <div className="slider-view">
            {list_videos_data.length > 0 ? (
              <div className="container-list-slider1">
                {list_videos_data.map((videos) => (
                  <VideoCard key={videos.id} video={videos} />
                ))}
              </div>
            ) : (
              <p>Not available</p>
            )}
          </div>

          <h1>Photos</h1>
          <div className="slider-view">
            {list_photos_data.length > 0 ? (
              <div className="container-list-slider1">
                {list_photos_data.map((photos) => (
                  <PhotoCard key={photos.id} photo={photos} />
                ))}
              </div>
            ) : (
              <p>Not available</p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default View;
