import { useState, useRef, useCallback, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

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
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, [isShowPassword]);

  const handleOnChange = (event, type) => {
    setDebounceState(false);
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

  const handleLogin = async () => {
    const data = { email, password };
    setStatus('loading');
    setErrorMessage(''); // Clear any previous error messages

    try {
      const res = await axios.post('/user/login', data, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      console.log(res);
      localStorage.setItem('accessToken', res.data.access_token);
      navigate('/main/movies');
      setStatus('idle');
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid email or password'); // Set error message
      setStatus('idle');
    }
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className='Login'>
      <div className='loginmain-container'>
        <h3 className='h3-login'>LOGIN</h3>
        <form>
          <div className='loginform-container'>
            <div>
              <div className='loginform-group'>
                <label>E-mail:</label>
                <input
                  type='text'
                  name='email'
                  ref={emailRef}
                  onChange={(e) => handleOnChange(e, 'email')}
                  className="loginmodern-textbox"
                />
                {debounceState && isFieldsDirty && email === '' && (
                  <span className='loginerrors'>This field is required</span>
                )}
              </div>
            </div>
            <div>
              <div className='loginform-group'>
                <label>Password:</label>
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  name='password'
                  ref={passwordRef}
                  onChange={(e) => handleOnChange(e, 'password')}
                  className="loginmodern-textbox"
                />
                {debounceState && isFieldsDirty && password === '' && (
                  <span className='loginerrors'>This field is required</span>
                )}
              </div>
            </div>
            <div className='show-password' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            {/* Display error message if login fails */}
            {errorMessage && <div className='loginerrors'>{errorMessage}</div>}

            <div className='loginsubmit-container'>
              <button
                className="login-button"
                type='button'
                disabled={status === 'loading'}
                onClick={() => {
                  if (status === 'loading') {
                    return;
                  }
                  if (email && password) {
                    handleLogin();
                  } else {
                    setIsFieldsDirty(true);
                    if (email === '') {
                      emailRef.current.focus();
                    }
                    if (password === '') {
                      passwordRef.current.focus();
                    }
                  }
                }}
              >
                {status === 'idle' ? 'Login' : 'Loading'}
              </button>
            </div>
            <div className='register-container'>
              <a href='/register'>
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
