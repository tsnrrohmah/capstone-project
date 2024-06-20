import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './FormKategory.module.css';

const FormPesanan = ({ order, onClose }) => {
  const [formData, setFormData] = useState({
    id_admin: '',
    id_user: '',
    id_teknisi: '',
    id_katagori: '',
    tanggal_bayar: '',
    tanggal_pelayanan: '',
    total_harga: '',
    opsi_pembayaran: '',
    bukti_pembayaran: null,  // Set to null initially
    status: '',
  });

  const [admins, setAdmins] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminsRes, techniciansRes] = await Promise.all([
          axios.get('http://localhost:5000/admin'),
          axios.get('http://localhost:5000/teknisi')
        ]);
        setAdmins(adminsRes.data.data);
        setTechnicians(techniciansRes.data.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();

    if (order) {
      setFormData({
        id_pesanan: order.id_pesanan,
        id_admin: order.id_admin,
        id_user: order.id_user,
        id_teknisi: order.id_teknisi,
        id_katagori: order.id_katagori,
        tanggal_bayar: order.tanggal_bayar ? new Date(order.tanggal_bayar).toISOString().split('T')[0] : '',
        tanggal_pelayanan: order.tanggal_pelayanan ? new Date(order.tanggal_pelayanan).toISOString().split('T')[0] : '',
        total_harga: order.total_harga,
        opsi_pembayaran: order.opsi_pembayaran,
        bukti_pembayaran: null, // Reset or set to null initially
        status: order.status,
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'bukti_pembayaran') {
      setFormData(prevState => ({
        ...prevState,
        bukti_pembayaran: files[0]  // Assign the file object directly
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {

      console.log(`Appending ${key}: ${formData[key]}`);

      data.append(key, formData[key]);
    }

    try {
      const response = await axios.put(`http://localhost:5000/order/${formData.id_pesanan}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Data updated:', response.data);
      onClose();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className={classes.label}>Admin ID:</label>
        <select name="id_admin" value={formData.id_admin} onChange={handleChange} className={classes.dropdown}>
          <option value="">Select Admin</option>
          {admins.map(admin => (
            <option key={admin.id_admin} value={admin.id_admin}>{admin.username}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={classes.label}>User ID:</label>
        <input type="text" name="id_user" value={formData.id_user} onChange={handleChange} />
      </div>
      <div>
        <label className={classes.label}>Technician ID:</label>
        <select name="id_teknisi" value={formData.id_teknisi} onChange={handleChange} className={classes.dropdown}>
          <option value="">Select Technician</option>
          {technicians.map(technician => (
            <option key={technician.id_teknisi} value={technician.id_teknisi}>{technician.nama}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={classes.label}>Category ID:</label>
        <input type="text" name="id_katagori" value={formData.id_katagori} onChange={handleChange} />
      </div>
      <div>
        <label className={classes.label}>Payment Date:</label>
        <input type="date" name="tanggal_bayar" value={formData.tanggal_bayar} onChange={handleChange} />
      </div>
      <div>
        <label className={classes.label}>Service Date:</label>
        <input type="date" name="tanggal_pelayanan" value={formData.tanggal_pelayanan} onChange={handleChange} />
      </div>
      <div>
        <label className={classes.label}>Total Price:</label>
        <input type="text" name="total_harga" value={formData.total_harga} onChange={handleChange} />
      </div>
      <div>
        <label className={classes.label}>Payment Option:</label>
        <input type="text" name="opsi_pembayaran" value={formData.opsi_pembayaran} onChange={handleChange} />
      </div>
      <div>
        <label className={classes.label}>Payment Proof:</label>
        <input type="file" name="bukti_pembayaran" onChange={handleChange} />
      </div>
      <div>
        <label className={classes.label}>Status:</label>
        <input type="text" name="status" value={formData.status} onChange={handleChange} />
      </div>
      
      <button type="submit" className={classes.buttonSubmit} onClick={() => window.location.reload()} >Simpan Perubahan</button>
      <button type="button" className={classes.buttonSubmit} onClick={onClose}>Tutup</button>
    </form>
  );
};

export default FormPesanan;
