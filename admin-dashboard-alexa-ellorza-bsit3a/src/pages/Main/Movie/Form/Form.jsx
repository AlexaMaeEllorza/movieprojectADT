import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let { movieId } = useParams();
  const navigate = useNavigate();

  // Fetch movie details if in edit mode
  useEffect(() => {
    if (movieId) {
      const fetchMovie = async () => {
        try {
          const response = await axios.get(`/movies/${movieId}`);
          setSelectedMovie({
            id: response.data.tmdbId,
            title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            poster_path: response.data.posterPath,
            release_date: response.data.releaseDate,
            vote_average: response.data.voteAverage,
          });
        } catch (err) {
          setError('Error fetching movie details. Please try again later.');
          console.error(err);
        }
      };
      fetchMovie();
    }
  }, [movieId]);

  // Handle movie search
  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual token
        },
      });
      if (response.data.results.length === 0) {
        setNotFound(true);
        setSearchedMovieList([]);
      } else {
        setSearchedMovieList(response.data.results);
        setNotFound(false);
      }
    } catch (err) {
      setError('Error fetching movies. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  // Handle movie selection
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  // Handle saving or updating movie details
  const handleSave = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!selectedMovie) {
      alert('Please search and select a movie.');
      return;
    }
    
    const data = {
      tmdbId: selectedMovie.id,
      title: selectedMovie.title,
      overview: selectedMovie.overview,
      popularity: selectedMovie.popularity,
      releaseDate: selectedMovie.release_date,
      voteAverage: selectedMovie.vote_average,
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: 0,
    };

    try {
      if (movieId) {
        await axios.patch(`/movies/${movieId}`, data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        alert('Update Success');
      } else {
        await axios.post('/movies', data, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        alert('Save Success');
      }
      navigate('/main/movies');
    } catch (err) {
      setError('Error saving movie. Please try again later.');
      console.error(err);
    }
  };

  return (
    <>
      <h1>{movieId ? 'Edit ' : 'Create '} Movie</h1>
      {error && <p className="text-danger">{error}</p>}
      
      {!movieId && (
        <div className='search-container'>
          Search Movie:{' '}
          <input type='text' onChange={(event) => { 
            setQuery(event.target.value); 
            setNotFound(false); 
            setSearchedMovieList([]); 
            setSelectedMovie(undefined); 
          }} />
          <button className='search-button' type='button' onClick={handleSearch}>
            Search
          </button>
          <div className='searched-movie'>
            {isLoading ? (
              <p>Searching...</p>
            ) : notFound ? (
              <p>Movie not found</p>
            ) : (
              searchedMovieList.map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))
            )}
          </div>
        </div>
      )}

      <hr />
      
      <div className='display-movie'>
        <form>
          {selectedMovie && (
            <>
              <img
                className='poster-image'
                src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
              />
              <div className='field'>
                Title:
                <input
                  type='text'
                  value={selectedMovie.title}
                  onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })}
                />
              </div>
              <div className='field'>
                Overview:
                <textarea
                  rows={10}
                  value={selectedMovie.overview}
                  onChange={(e) => setSelectedMovie({ ...selectedMovie, overview: e.target.value })}
                />
              </div>
              <div className='field'>
                Popularity:
                <input
                  type='text'
                  value={selectedMovie.popularity}
                  onChange={(e) => setSelectedMovie({ ...selectedMovie, popularity: e.target.value })}
                />
              </div>
              <div className='field'>
                Release Date:
                <input
                  type='text'
                  value={selectedMovie.release_date}
                  onChange={(e) => setSelectedMovie({ ...selectedMovie, release_date: e.target.value })}
                />
              </div>
              <div className='field'>
                Vote Average:
                <input
                  type='text'
                  value={selectedMovie.vote_average}
                  onChange={(e) => setSelectedMovie({ ...selectedMovie, vote_average: e.target.value })}
                />
              </div>
            </>
          )}
        </form>
      </div>
      
      <button className='save-button' type='button' onClick={handleSave}>
        {movieId ? 'Update' : 'Save'}
      </button>
    </>
  );
};

export default Form;