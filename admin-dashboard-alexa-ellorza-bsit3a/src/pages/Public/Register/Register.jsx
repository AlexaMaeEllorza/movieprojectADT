import { useState, useRef } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    contactNo: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    contactNo: false,
  });

  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const contactNoRef = useRef();
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  const handleOnChange = (event, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
    if (field === 'email') {
      setEmailError(''); // Reset email error when user types
    }
  };

  const validateForm = () => {
    const errors = {
      email: !formData.email,
      password: !formData.password,
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      contactNo: !formData.contactNo,
    };
    setFormErrors(errors);
    return !Object.values(errors).some((hasError) => hasError);
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    const registerData = {
      ...formData,
      role: 'admin',
    };

    try {
      const res = await axios.post('/user/register', registerData);
      console.log(res.data); // Log the server response to check if the role is correct
      navigate('/');
    } catch (e) {
      console.error(e);
      setStatus('idle');
      if (e.response && e.response.status === 409) {
        setEmailError('Email already exists. Please use a different email.');
      } else {
        setEmailError('An unexpected error occurred. Please try again later.');
      }
    }
    
  };

  return (
    <div className='register-main-container'>
      <div className='register-form-container'>
        <h3 className='h3-register'>REGISTER</h3>
        <form>
          <div className='form-container-register'>
            {/* Email */}
            <div className='register-form-group'>
              <label>Email:</label>
              <input
                type='text'
                name='email'
                ref={emailRef}
                className='register-modern-textbox'
                onChange={(e) => handleOnChange(e, 'email')}
              />
              {formErrors.email && <span className='register-errors'>This field is required</span>}
              {emailError && <span className='register-errors'>{emailError}</span>}
            </div>

            {/* Password */}
            <div className='register-form-group'>
              <label>Password:</label>
              <input
                type='password'
                name='password'
                ref={passwordRef}
                className='register-modern-textbox'
                onChange={(e) => handleOnChange(e, 'password')}
              />
              {formErrors.password && <span className='register-errors'>This field is required</span>}
            </div>

            {/* First Name */}
            <div className='register-form-group'>
              <label>First Name:</label>
              <input
                type='text'
                name='firstName'
                ref={firstNameRef}
                className='register-modern-textbox'
                onChange={(e) => handleOnChange(e, 'firstName')}
              />
              {formErrors.firstName && <span className='register-errors'>This field is required</span>}
            </div>

            {/* Middle Name (Optional) */}
            <div className='register-form-group'>
              <label>Middle Name:</label>
              <input
                type='text'
                name='middleName'
                className='register-modern-textbox'
                onChange={(e) => handleOnChange(e, 'middleName')}
              />
            </div>

            {/* Last Name */}
            <div className='register-form-group'>
              <label>Last Name:</label>
              <input
                type='text'
                name='lastName'
                ref={lastNameRef}
                className='register-modern-textbox'
                onChange={(e) => handleOnChange(e, 'lastName')}
              />
              {formErrors.lastName && <span className='register-errors'>This field is required</span>}
            </div>

            {/* Contact No */}
            <div className='register-form-group'>
              <label>Contact No:</label>
              <input
                type='text'
                name='contactNo'
                ref={contactNoRef}
                className='register-modern-textbox'
                onChange={(e) => handleOnChange(e, 'contactNo')}
              />
              {formErrors.contactNo && <span className='register-errors'>This field is required</span>}
            </div>

            {/* Submit Button */}
            <div className='register-submit-container'>
              <button
                className="register-button"
                type='button'
                disabled={status === 'loading'}
                onClick={handleRegister}
              >
                {status === 'idle' ? 'Register' : 'Loading'}
              </button>
            </div>
            <div className='register-login-container'>
              <a href='/'><small>Already have an account? Login</small></a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
