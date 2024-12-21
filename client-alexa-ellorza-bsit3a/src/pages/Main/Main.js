import { useEffect, useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('accessToken');
    setAccessToken(null); 
    navigate('/'); 
  }, [navigate]);

  useEffect(() => {
    if (!accessToken) {
      handleLogout(); 
    }
  }, [accessToken, handleLogout]); 

  return (
    <div className='Main'>
      <div className='container'>
        <div className='navigation'>
          <ul>
            <li>
              <button onClick={() => navigate('/main')}>Movies</button> 
            </li>
            {accessToken && (
              <li className='logout'>
                <button onClick={handleLogout}>Logout</button> 
              </li>
            )}
          </ul>
        </div>
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;