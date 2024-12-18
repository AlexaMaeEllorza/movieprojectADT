import { Outlet, useNavigate } from 'react-router-dom'
import React from 'react'
import './Movie.css'

function Movie() {

  const navigate = useNavigate();

  return (
    <>
        <div className='movies-header-container'>
          <div className='movies-header' onClick={() => navigate('/main/movies')}>Movies</div>
        </div>
        <Outlet />
    </>
  )
}

export default Movie;
