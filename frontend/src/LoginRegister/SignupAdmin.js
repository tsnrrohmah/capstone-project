//

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminSignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    alamat: '',
    no_hp: '',
    role: '' 
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/auth/admin/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (response.ok) {
      navigate('/LoginAdmin');
    } else {
      alert(data.error);
    }
  };

  return (
    <div className='template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1D204F' }}>
      <div className='signin p-5 rounded bg-white'>
        <form onSubmit={handleRegister}>
          <h3 className='text-center'>Admin Sign Up</h3>
          <div className='mb-2'>
            <input type="text" placeholder='Enter Username' name="username" className='form-control' value={formData.username} onChange={handleInputChange} required />
          </div>
          <div className='mb-2'>
            <input type="email" placeholder='Enter Email' name="email" className='form-control' value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className='mb-2'>
            <input type="password" placeholder='Enter Password' name="password" className='form-control' value={formData.password} onChange={handleInputChange} required />
          </div>
          <div className='mb-2'>
            <input type="text" placeholder='Enter Address' name="alamat" className='form-control' value={formData.alamat} onChange={handleInputChange} required />
          </div>
          <div className='mb-2'>
            <input type="text" placeholder='Enter Phone Number' name="no_hp" className='form-control' value={formData.no_hp} onChange={handleInputChange} required />
          </div>
          <div className='mb-2'>
            <select name="role" className='form-control' value={formData.role} onChange={handleInputChange} required>
              <option value="">-- Pilih Role --</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>
          <div className='d-grid'>
            <button type='submit' className='btn btn-primary' style={{ backgroundColor: '#1D204F' }}>Sign Up</button>
          </div>
          <div className='text-center mt-2'>
            Already have an account? <Link to="/admin/login" className='ms-2 text-decoration-none'>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSignUp;
