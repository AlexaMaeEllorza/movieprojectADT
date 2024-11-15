import { Outlet } from 'react-router-dom';

const Movie = () => {
  return (
    <>
      <h1>MOVIE</h1>
      <Outlet />
    </>
  );
};

export default Movie;
