import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import backdrop from './assets/backdrop.jpg';
import styles from './App.module.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/login`, { email, password })
      if ( response.data.accessToken ) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/home');
      }
    } catch (err) {
        console.error('Login failed:', err.response.data.message);
        alert(err.response.data.message);
    };

  };

  const handleLoginClick = () => {
    const form = document.querySelector('form');
    form.requestSubmit();
  };

  return (
    <>
        <img className={styles['login-bg']} src={backdrop} alt='cool backdrop' />
      
        <form onSubmit={handleSubmit}>
            <div className={styles['main-container']}>
                
                <div className={styles['title-container']}>
                  <span className={styles['bold']}>Login</span>
                </div>
                
                <div className={styles['input-container']}>
                  <input type='email' placeholder='Email ID' className={styles['login-input']} value={email} onChange={handleEmail}/>
                  <i className="ri-mail-line"></i>
                </div>

                <div className={styles['input-container']}>
                  <input type='password' placeholder='Password' className={styles['login-input']} value={password} onChange={handlePassword}/>
                  <i className="ri-lock-2-line"></i>
                </div>

                <div className={styles['forgot-pass-container']}>
                    <span className={`${styles['lighter-bold']} ${styles['hover-pointer']}`}>Forgot Password?</span>
                </div>

                <div className={styles['login-button']} onClick={handleLoginClick}>Login</div>

                <div className={styles['register-container']}>
                    <span>Don't have an account? <Link to='/register'><span className={styles['lighter-bold']}>Register</span></Link></span>
                </div>

            </div>
        </form>
    </>
  )
}

export default Login
