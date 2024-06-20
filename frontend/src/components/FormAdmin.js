import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './FormAdmin.module.css';
import { useNavigate } from 'react-router-dom';

const FormAdmin = ({ newAdmin, setNewAdmin, handleTutup }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    alamat: '',
    no_hp: '',
    role: '',
    gambar: null,
  });

  useEffect(() => {
    if (newAdmin.id_admin) {
      setFormData({
        username: newAdmin.username,
        email: newAdmin.email,
        password: '',
        alamat: newAdmin.alamat,
        no_hp: newAdmin.no_hp,
        role: newAdmin.role,
        gambar: null,
      });
    }
  }, [newAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      gambar: e.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submissionData = new FormData();
    submissionData.append('username', formData.username);
    submissionData.append('email', formData.email);
    submissionData.append('alamat', formData.alamat);
    submissionData.append('no_hp', formData.no_hp);
    submissionData.append('role', formData.role);
    if (formData.gambar) {
      submissionData.append('gambar', formData.gambar);
    }

    try {
      const response = await axios.put(`http://localhost:5000/admin/${newAdmin.id_admin}`, submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Admin updated:', response.data);
      handleTutup();
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className={classes.label}>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div>
        <label className={classes.label}>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      {!newAdmin.id_admin && (
        <div>
          <label className={classes.label}>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
      )}
      <div>
        <label className={classes.label}>Alamat:</label>
        <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} />
      </div>
      <div>
        <label className={classes.label}>No HP:</label>
        <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} />
      </div>
      <div>
        <label className={classes.label}>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="admin">admin</option>
          <option value="superadmin">superadmin</option>
        </select>
      </div>
      <div>
        <label className={classes.label}>Gambar:</label>
        <input type="file" name="gambar" onChange={handleFileChange} />
        {newAdmin.gambar && !formData.gambar && (
          <div className={classes.imagePreview}>
            <img src={`http://localhost:5000/uploads/admin/${newAdmin.gambar}`} 
                 alt="Gambar admin"
                 style={{ width: '100px', height: '100px', marginTop: '10px' }} />
          </div>
        )}
      </div>
      <button type="submit" className={classes.buttonSubmit}>Submit</button>
    </form>
  );
};

export default FormAdmin;
