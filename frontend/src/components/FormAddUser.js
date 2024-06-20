import React, { useState } from 'react';
import axios from 'axios';
import classes from './FormKategory.module.css'; // Pastikan Anda memiliki file CSS ini
import { useNavigate } from 'react-router-dom';

const FormUser = ({ newUser, setNewUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_user: newUser.id_user || '',
    username: newUser.username || '',
    email: newUser.email || '',
    password: newUser.password || '',
    gambar: null,
    gambarURL: newUser.gambar || '',
    alamat: newUser.alamat || '',
    no_hp: newUser.no_hp || '',
  });

  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gambar: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('alamat', formData.alamat);
    data.append('no_hp', formData.no_hp);
    if (formData.gambar) {
      data.append('gambar', formData.gambar);
    }

    try {
      const response = formData.id_user
        ? await axios.put(`http://localhost:5000/users/${formData.id_user}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        : await axios.post('http://localhost:5000/users', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

      console.log('Response:', response.data);
      setIsFormVisible(false);
      setIsSubmitted(true);
      navigate('/dashboard/kelola-user');
    } catch (error) {
      console.error('Error posting data:', error);
      setErrorMessage('Gagal mengirim data, coba lagi nanti.');
    }
  };

  return (
    <>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <label className={classes.label}>Nama User:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Email User:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Gambar:</label>
            <input type="file" name="gambar" onChange={handleFileChange} />
            {formData.gambarURL && !formData.gambar && (
              <div>
                <img
                  src={`http://localhost:5000/uploads/user/${formData.gambarURL}`}
                  alt="Gambar User"
                  style={{ width: '100px', height: '100px', marginTop: '10px' }}
                />
              </div>
            )}
          </div>
          <div>
            <label className={classes.label}>Alamat:</label>
            <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>No HP:</label>
            <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} />
          </div>
          <button type="submit" className={classes.buttonSubmit}>Submit</button>
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        </form>
      )}
      {isSubmitted && (
        <>
          <p>Form submitted successfully!</p>
        </>
      )}
    </>
  );
};

export default FormUser;
