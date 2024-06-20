import React from 'react';
import axios from 'axios';
import classes from './FormKategory.module.css';
import { useNavigate } from 'react-router-dom';

const FormPesanan = ({ newPesanan, setNewPesanan, isEditing }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPesanan(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewPesanan(prevData => ({
      ...prevData,
      bukti_pembayaran: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('id_admin', newPesanan.id_admin);
    data.append('id_user', newPesanan.id_user);
    data.append('id_teknisi', newPesanan.id_teknisi);
    data.append('id_katagori', newPesanan.id_katagori);
    data.append('tanggal_bayar', newPesanan.tanggal_bayar);
    data.append('tanggal_pelayanan', newPesanan.tanggal_pelayanan);
    data.append('total_harga', newPesanan.total_harga);
    data.append('opsi_pembayaran', newPesanan.opsi_pembayaran);
    if (newPesanan.bukti_pembayaran) {
      data.append('bukti_pembayaran', newPesanan.bukti_pembayaran);
    }
    data.append('status', newPesanan.status);

    try {
      const response = await axios.post('http://localhost:5000/order', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      navigate('/dashboard/pesanan');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={classes.label}>Admin ID:</label>
          <input type="text" name="id_admin" value={newPesanan.id_admin} onChange={handleChange} />
        </div>
        <div>
          <label className={classes.label}>User ID:</label>
          <input type="text" name="id_user" value={newPesanan.id_user} onChange={handleChange} />
        </div>
        <div>
          <label className={classes.label}>Technician ID:</label>
          <input type="text" name="id_teknisi" value={newPesanan.id_teknisi} onChange={handleChange} />
        </div>
        <div>
          <label className={classes.label}>Category ID:</label>
          <input type="text" name="id_katagori" value={newPesanan.id_katagori} onChange={handleChange} />
        </div>
        <div>
          <label className={classes.label}>Payment Date:</label>
          <input type="date" name="tanggal_bayar" value={newPesanan.tanggal_bayar} onChange={handleChange} />
        </div>
        <div>
          <label className={classes.label}>Service Date:</label>
          <input type="date" name="tanggal_pelayanan" value={newPesanan.tanggal_pelayanan} onChange={handleChange} />
        </div>
        <div>
          <label className={classes.label}>Total Price:</label>
          <input type="text" name="total_harga" value={newPesanan.total_harga} onChange={handleChange} />
        </div>
        <div>
          <label className={classes.label}>Payment Option:</label>
          <input type="text" name="opsi_pembayaran" value={newPesanan.opsi_pembayaran} onChange={handleChange} />
        </div>
        <div>
          <label className={classes.label}>Payment Proof:</label>
          <input type="file" name="bukti_pembayaran" onChange={handleFileChange} />
        </div>
        <div>
          <label className={classes.label}>Status:</label>
          <input type="text" name="status" value={newPesanan.status} onChange={handleChange} />
        </div>
        <button type="submit" className={classes.buttonSubmit}>
          {isEditing ? 'Simpan Perubahan 123' : 'Tambah Pesanan Baru'}
        </button>
      </form>
    </>
  );
};

export default FormPesanan;