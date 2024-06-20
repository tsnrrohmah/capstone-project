//

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/auth/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    console.log('API Response:', data); // Debugging: log respons dari API


    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.admin.role); // Menyimpan peran pengguna
      localStorage.setItem('username', data.admin.username); // Menyimpan peran pengguna
      console.log('Logged in as:', data.admin.role); // Debugging: memastikan peran disimpan dengan benar

      navigate('/dashboard');
      window.location.reload(); // Refresh halaman setelah navigasi

    } else {
      alert(data.error);
    }
  };
  

  return (
    <div className='template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1D204F' }}>
        <div className='signin p-5 rounded bg-white'>
        <form onSubmit={handleLogin}>
            <h3 className='text-center'>Admin Sign In</h3>
            <div className='mb-2'>
                <input type="email" placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className='mb-2'>
                <input type="password" placeholder='Enter Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className='d-grid'>
                <button type='submit' className='btn btn-primary' style={{ backgroundColor: '#1D204F' }}>Login</button>
            </div>
            
        </form>
        </div>
    </div>
  );
}

export default AdminLogin;
