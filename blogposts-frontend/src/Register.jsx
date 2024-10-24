import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import backdrop from './assets/backdrop.jpg';
import styles from './App.module.css'

function Register() {
  const [ username, setUsername ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/register`, { username, email, password })
      if ( response ) {
        console.log('Register successful:', response.data);
        navigate('/login');
      }; 
    } catch (err) {
        console.error('Error registering:', err.response.data.message);
        alert(err.response.data.message);
    };
   
  };

  const handleRegisterClick = () => {
    const form = document.querySelector('form');
    form.requestSubmit();
  };

  return (
    <>
      <img className={styles['login-bg']} src={backdrop} alt='cool backdrop' />
    
      <form onSubmit={handleSubmit}>
        <div className={styles['main-container']}>
          
          <div className={styles['title-container']}><span className={styles['bold']}>Register</span></div>
          
          <div className={styles['input-container']}>
            <input type='text' placeholder='Username' className={styles['login-input']} onChange={handleUsername}/>
            <i className='ri-user-line'></i>
          </div>

          <div className={styles['input-container']}>
            <input type='email' placeholder='Email ID' className={styles['login-input']} onChange={handleEmail}/>
            <i className="ri-mail-line"></i>
          </div>

          <div className={styles['input-container']}>
            <input type='password' placeholder='Password' className={styles['login-input']} onChange={handlePassword}/>
            <i className="ri-lock-2-line"></i>
          </div>

          <div className={styles['login-button']} onClick={handleRegisterClick}>
            Register
          </div>

          <div>
            <Link to='/login'>
              <span className={styles['lighter-bold']} style={{fontSize: '9.888px'}}>Go back to login page</span>
            </Link>
          </div>

        </div>
      </form>
    </>
  )
}

export default Register
