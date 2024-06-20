// import React from 'react'
// import { Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Signup() {
//   return (
//     <div className=' template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1D204F' }}>
//         <div className='signup p-5 rounded bg-white'>
//         <form>
//             <h3 className='text-center '>Sign Up Admin</h3>
//             <div className='mb-2'>
//                 {/* <label htmlFor='fname'>First Name</label> */}
//                 <input type="text" placeholder='username' className='form-control'/>
//             </div>
//             <div className='mb-2'>
//                 {/* <label htmlFor='email'>Email</label> */}
//                 <input type="email" placeholder='email' className='form-control'/>
//             </div>
//             <div className='mb-2'>
//                 {/* <label htmlFor='lname'>Last Name</label> */}
//                 <input type="password" placeholder='password' className='form-control'/>
//             </div>
//             <div className='mb-2'>
//                 {/* <label htmlFor='password'>Password</label> */}
//                 <input type="text" placeholder='alamat' className='form-control'/>
//             </div>
//             <div className='mb-2'>
//                 {/* <label htmlFor='password'>Password</label> */}
//                 <input type="text" placeholder='no_hp' className='form-control'/>
//             </div>
//             <div className='d-grid'>
//             <Link to="/" className='d-grid text-decoration-none'><button className='btn btn-primary'style={{ backgroundColor: '#1D204F' }}>Daftar</button></Link>
//             </div>
//             <div className='text- mt-2'>
//             Sudah punya akun?<Link to="/login" className='ms-2 text-decoration-none'>Sign In</Link>
//             </div>
//         </form>
//         </div>
//     </div>
//   )
// }

// export default Signup

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    alamat: '',
    no_hp: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/login'); // Redirect ke halaman login setelah register sukses
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className=' template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1D204F' }}>
      <div className='signup p-5 rounded bg-white'>
        <form onSubmit={handleSubmit}>
          <h3 className='text-center '>Sign Up</h3>
          <div className='mb-2'>
            <input type="text" name="username" placeholder='Username' className='form-control' value={formData.username} onChange={handleInputChange} required />
          </div>
          <div className='mb-2'>
            <input type="email" name="email" placeholder='Email' className='form-control' value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className='mb-2'>
            <input type="password" name="password" placeholder='Password' className='form-control' value={formData.password} onChange={handleInputChange} required />
          </div>
          <div className='mb-2'>
            <input type="text" name="alamat" placeholder='Alamat' className='form-control' value={formData.alamat} onChange={handleInputChange} required />
          </div>
          <div className='mb-2'>
            <input type="text" name="no_hp" placeholder='Nomor HP' className='form-control' value={formData.no_hp} onChange={handleInputChange} required />
          </div>
          <div className='d-grid'>
            <button type="submit" className='btn btn-primary' style={{ backgroundColor: '#1D204F' }}>Daftar</button>
          </div>
          <div className='text- mt-2'>
            Sudah punya akun? <Link to="/login" className='ms-2 text-decoration-none'>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
