import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './FormTeknisi.module.css'; // Pastikan Anda memiliki file CSS ini
import { useNavigate } from 'react-router-dom';

const FormTeknisi = ({ newTeknisi, setNewTeknisi }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_teknisi: newTeknisi.id_teknisi || '',
    nama: newTeknisi.nama || '',
    alamat_cabang: newTeknisi.alamat_cabang || '',
    no_hp: newTeknisi.no_hp || '',
    gambar: null,
    gambarURL: newTeknisi.gambar || '',
    status: newTeknisi.status || '',
  });

  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nama', formData.nama);
    data.append('alamat_cabang', formData.alamat_cabang);
    data.append('no_hp', formData.no_hp);
    data.append('status', formData.status);
    if (formData.gambar) {
      data.append('gambar', formData.gambar);
    }

    try {
      const response = formData.id_teknisi
        ? await axios.put(`http://localhost:5000/teknisi/${formData.id_teknisi}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        : await axios.post('http://localhost:5000/teknisi', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

      console.log('Response:', response.data);
      setIsFormVisible(false);
      setIsSubmitted(true);
      navigate('/dashboard/tambah-teknisi');
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
            <label className={classes.label}>Nama:</label>
            <input type="text" name="nama" value={formData.nama} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Alamat Cabang:</label>
            <input type="text" name="alamat_cabang" value={formData.alamat_cabang} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>No HP:</label>
            <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Gambar:</label>
            <input type="file" name="gambar" onChange={handleFileChange} />
            {formData.gambarURL && !formData.gambar && (
              <div>
                <img
                  src={`http://localhost:5000/uploads/technician/${formData.gambarURL}`}
                  alt="Gambar Teknisi"
                  style={{ width: '100px', height: '100px', marginTop: '10px' }}
                />
              </div>
            )}
          </div>
          <div>
            <label className={classes.label}>Status:</label>
            <select type="text" name="status" value={formData.status} onChange={handleChange}>
            <option value="{formData.status}">{formData.status}</option>
            <option value="Bersedia">Bersedia</option>
            <option value="Bertugas">Bertugas</option>
            <option value="Libur">Libur</option>
        </select>
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

export default FormTeknisi;
