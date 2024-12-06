import { useEffect , useCallback, useContext} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';
import { AuthContext } from '../../context/context'; 

function Main() {
  //get user info
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { clearAuthData } = useContext(AuthContext);


  const handleResetTab = () => {
    localStorage.setItem('tab', JSON.stringify('cast'));
  }

  const handleLogout = useCallback(() => {
    clearAuthData();
    navigate('/');
  }, [navigate, clearAuthData]);

  useEffect(() => {
    if (!auth.accessToken) {
      handleLogout();
    }
  }, [auth.accessToken, handleLogout]);

  return (
    <div className="Main">
      <div className="container">
        <div className="navigation">
          <ul>
            {/* <li>
              <button
                className="main-btn"
                onClick={() => navigate('/main/dashboard')}
              >
                Dashboard
              </button>
            </li> */}
            <div className="admin-info">
            <span className="user-info">
              <p className="role">{auth.user.role}:</p>
              <h1 className="name">{auth.user.firstName} {auth.user.lastName}</h1>
            </span>
          </div>
            <li>
            <button
                className="main-btn"
                onClick={() => {
                  handleResetTab();
                  navigate('/main/movies');
                }}
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
