import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null); // Update state to trigger re-render
  };

  useEffect(() => {
    if (!accessToken) {
      handleLogout(); // Ensure user is logged out if no accessToken
    }
  }, [accessToken]); // Dependency array ensures it reacts to changes in accessToken

  return (
    <div className='Main'>
      <div className='container'>
        <div className='navigation'>
          <ul>
            <li>
              <a href="/main" onClick={() => navigate('/main')}>Movies</a>
            </li>
            {accessToken && (
              <li className='logout'>
                <a href="/" onClick={handleLogout}>Logout</a>
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
