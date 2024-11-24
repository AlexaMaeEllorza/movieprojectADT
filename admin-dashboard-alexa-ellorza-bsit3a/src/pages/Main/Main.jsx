import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (
      accessToken === undefined ||
      accessToken === '' ||
      accessToken === null
    ) {
      handleLogout();
    }
  }, []);

  return (
    <div className="Main">
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              <button
                className="main-btn"
                onClick={() => handleNavigation('/main/dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className="main-btn"
                onClick={() => handleNavigation('/main/Movies')}
              >
                Movies
              </button>
            </li>
            <li className="logout">
              <button onClick={handleLogout} className="main-btn">
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
