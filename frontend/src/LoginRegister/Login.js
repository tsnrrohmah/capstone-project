// Login.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import classes from './Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    const [showPopup, setShowPopup] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('username', data.user.username); // Menyimpan peran pengguna
                localStorage.setItem('no_hp', data.user.no_hp); 
                localStorage.setItem('id_user', data.user.id_user); 
                console.log('Logged in as:', data.user); // Debugging: memastikan peran disimpan dengan benar
                // Menyimpan peran pengguna
                setIsLoggedIn(true);
                navigate('/'); // Redirect after successful login
            } else {
                setShowPopup(true); // Show popup on login failure
            }
        } catch (error) {
            console.error('Error during login:', error);
            setShowPopup(true); // Show popup on error
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className='template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1D204F' }}>
            <div className='signin p-5 rounded bg-white'>
                <form onSubmit={handleLogin}>
                    <h3 className='text-center'>Sign In</h3>
                    <div className='mb-2'>
                        <input type="email" placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <input type="password" placeholder='Enter Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='d-grid'>
                        <button type="submit" className='btn btn-primary' style={{ backgroundColor: '#1D204F' }}>Login</button>
                    </div>
                    <div className='mt-2 text-center'>
                        Don't have an account? <Link to="/signup" className='ms-2 text-decoration-none'>Sign up</Link>
                    </div>
                </form>
                {showPopup && (
                    <div className={classes.popupOverlay}>
                        <div className={classes.popupContent}>
                            <p>Sorry, incorrect email or password.</p>
                            <button onClick={handleClosePopup}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
