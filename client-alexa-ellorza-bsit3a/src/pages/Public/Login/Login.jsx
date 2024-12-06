import { useContext, useState, useRef, useCallback, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';
import { AuthContext } from '../../../context/context'; // Ensure the import path is correct

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ email, password }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const context = useContext(AuthContext);
  const { auth, setAuthData } = context || {}; // Add fallback
  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, []);

  const handleOnChange = (event, type) => {
    setIsFieldsDirty(true);

    switch (type) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const apiEndpoint = window.location.pathname.includes('/admin') 
    ? '/admin/login' 
    : '/user/login';

  const handleLogin = async () => {
    const data = { email, password };
    setStatus('loading');

    try {
      const res = await axios.post(apiEndpoint, data, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });

      const { role } = res.data.user;
      localStorage.setItem('accessToken', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setAuthData?.({
        accessToken: res.data.access_token,
        user: res.data.user,
      });

      setAlertMessage(res.data.message || 'Login successful!');
      setIsError(false);

      setTimeout(() => {
        navigate(role === 'admin' ? '/main' : '/main');
        setStatus('idle');
      }, 3000);
    } catch (e) {
      setIsError(true);
      setAlertMessage(e.message || e.response?.data?.message || 'An error occurred.');
      setTimeout(() => {
        setAlertMessage('');
        setStatus('idle');
      }, 3000);
    }
  };

  useEffect(() => {
    console.log('Auth State Updated:', auth);
  }, [auth]);

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className="Login">
      <div className="loginmain-container">
        {/* Display success/error message above the form */}
        {alertMessage && (
          <div className={`alert-box ${isError ? 'error' : 'success'}`}>
            {alertMessage}
          </div>
        )}
        
        <form>
          <div className="loginform-container">
            <h3 className="h3-login">LOGIN</h3>
            <div>
              <div className="loginform-group">
                <label>E-mail:</label>
                <input
                  type="text"
                  name="email"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => handleOnChange(e, 'email')}
                  className="loginmodern-textbox"
                />
                {debounceState && isFieldsDirty && email === '' && (
                  <span className="loginerrors">This field is required</span>
                )}
              </div>
            </div>
            <div>
              <div className="loginform-group">
                <label>Password:</label>
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  name="password"
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => handleOnChange(e, 'password')}
                  className="loginmodern-textbox"
                />
                {debounceState && isFieldsDirty && password === '' && (
                  <span className="loginerrors">This field is required</span>
                )}
              </div>
            </div>
            <div className="show-password" onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>
    
            <div className="loginsubmit-container">
              <button
                className="login-button"
                type="button"
                disabled={status === 'loading'}
                onClick={() => {
                  if (email && password) {
                    handleLogin();
                  } else {
                    setIsFieldsDirty(true);
                    if (!email) emailRef.current.focus();
                    if (!password) passwordRef.current.focus();
                  }
                }}
              >
                {status === 'idle' ? 'Login' : 'Loading'}
              </button>
            </div>
            <div className="register-container">
              <a href="/register">
                <small>Register</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;