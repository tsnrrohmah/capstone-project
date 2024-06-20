import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './FormKategory.module.css';
import { useNavigate } from 'react-router-dom';

const FormKategory = ({ newLayanan, setNewLayanan, handleTutup }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_katagori: '',
    judul: '',
    lokasi: '',
    harga: '',
    gambar: null,
  });

  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (newLayanan.id_katagori) {
      setFormData({
        nama_katagori: newLayanan.nama_katagori,
        judul: newLayanan.judul,
        lokasi: newLayanan.lokasi,
        harga: newLayanan.harga,
        gambar: null, // Assume the image needs to be re-uploaded if changed
      });
    }
  }, [newLayanan]);

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
    data.append('nama_katagori', formData.nama_katagori);
    data.append('judul', formData.judul);
    data.append('lokasi', formData.lokasi);
    data.append('harga', formData.harga);
    if (formData.gambar) {
      data.append('gambar', formData.gambar);
    }

    try {
      let response;
      if (newLayanan.id_katagori) {
        // Update existing layanan
        response = await axios.put(`http://localhost:5000/kategori/${newLayanan.id_katagori}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Create new layanan
        response = await axios.post('http://localhost:5000/kategori', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      console.log('Response:', response.data);
      setIsFormVisible(false);
      setIsSubmitted(true);
      handleTutup();
      navigate('/dashboard/tambah-layanan');
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
            <label className={classes.label}>Nama Kategori:</label>
            <input type="text" name="nama_katagori" value={formData.nama_katagori} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Judul:</label>
            <input type="text" name="judul" value={formData.judul} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Lokasi:</label>
            <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Harga:</label>
            <input type="text" name="harga" value={formData.harga} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Gambar:</label>
            <input type="file" name="gambar" onChange={handleFileChange} />
            {newLayanan.gambar && !formData.gambar && (
              <div className={classes.imagePreview}>
                <img src={`http://localhost:5000/uploads/catagori/${newLayanan.gambar}`} 
                 alt="Gambar kategori"
                  style={{ width: '100px', height: '100px', marginTop: '10px' }} />
              </div>
            )}
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

export default FormKategory;