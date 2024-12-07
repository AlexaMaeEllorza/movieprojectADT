import { useEffect, useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('accessToken');
    setAccessToken(null); // Update state to trigger re-render
    navigate('/'); // Redirect to the login page after logout
  }, [navigate]);

  useEffect(() => {
    if (!accessToken) {
      handleLogout(); // Ensure user is logged out if no accessToken
    }
  }, [accessToken, handleLogout]); // Include `handleLogout` as a dependency

  return (
    <div className='Main'>
      <div className='container'>
        <div className='navigation'>
          <ul>
            <li>
              <button onClick={() => navigate('/main')}>Movies</button> {/* Navigate to '/main' */}
            </li>
            {accessToken && (
              <li className='logout'>
                <button onClick={handleLogout}>Logout</button> {/* Trigger logout */}
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