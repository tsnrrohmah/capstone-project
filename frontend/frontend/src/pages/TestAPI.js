import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddOrder = () => {
  const [orderData, setOrderData] = useState({
    id_admin: '',
    id_user: '',
    id_teknisi: '',
    id_katagori: '',
    tanggal_bayar: '',
    tanggal_pelayanan: '',
    total_harga: '',
    opsi_pembayaran: '',
    status: ''
  });
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [teknisi, setTeknisi] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminResponse = await axios.get('http://localhost:5000/admin');
        const userResponse = await axios.get('http://localhost:5000/users');
        const teknisiResponse = await axios.get('http://localhost:5000/teknisi');
        const kategoriResponse = await axios.get('http://localhost:5000/kategori');
        setAdmins(adminResponse.data.data);
        setUsers(userResponse.data.data);
        setTeknisi(teknisiResponse.data.data);
        setKategori(kategoriResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id_admin', orderData.id_admin);
    formData.append('id_user', orderData.id_user);
    formData.append('id_teknisi', orderData.id_teknisi);
    formData.append('id_katagori', orderData.id_katagori);
    formData.append('tanggal_bayar', orderData.tanggal_bayar);
    formData.append('tanggal_pelayanan', orderData.tanggal_pelayanan);
    formData.append('total_harga', orderData.total_harga);
    formData.append('opsi_pembayaran', orderData.opsi_pembayaran);
    formData.append('status', orderData.status);
    if (file) {
      formData.append('bukti_pembayaran', file);
    }

    console.log('FormData yang dikirim:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await axios.post('http://localhost:5000/order', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response dari server:', response.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat menambahkan data:', error);
      if (error.response) {
        console.error('Data error:', error.response.data);
        console.error('Status error:', error.response.status);
        console.error('Header error:', error.response.headers);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID Admin:
        <select name="id_admin" value={orderData.id_admin} onChange={handleChange} required>
          <option value="">Pilih Admin</option>
          {admins.map(admin => (
            <option key={admin.id_admin} value={admin.id_admin}>
              {admin.username}
            </option>
          ))}
        </select>
      </label>
      <label>
        ID User:
        <select name="id_user" value={orderData.id_user} onChange={handleChange} required>
          <option value="">Pilih User</option>
          {users.map(user => (
            <option key={user.id_user} value={user.id_user}>
              {user.username}
            </option>
          ))}
        </select>
      </label>
      <label>
        ID Teknisi:
        <select name="id_teknisi" value={orderData.id_teknisi} onChange={handleChange} required>
          <option value="">Pilih Teknisi</option>
          {teknisi.map(tech => (
            <option key={tech.id_teknisi} value={tech.id_teknisi}>
              {tech.nama}
            </option>
          ))}
        </select>
      </label>
      <label>
        ID Kategori:
        <select name="id_katagori" value={orderData.id_katagori} onChange={handleChange} required>
          <option value="">Pilih Kategori</option>
          {kategori.map(cat => (
            <option key={cat.id_katagori} value={cat.id_katagori}>
              {cat.nama_katagori}
            </option>
          ))}
        </select>
      </label>
      <label>
        Tanggal Bayar:
        <input type="datetime-local" name="tanggal_bayar" value={orderData.tanggal_bayar} onChange={handleChange} required />
      </label>
      <label>
        Tanggal Pelayanan:
        <input type="datetime-local" name="tanggal_pelayanan" value={orderData.tanggal_pelayanan} onChange={handleChange} required />
      </label>
      <label>
        Total Harga:
        <input type="text" name="total_harga" value={orderData.total_harga} onChange={handleChange} required />
      </label>
      <label>
        Opsi Pembayaran:
        <input type="text" name="opsi_pembayaran" value={orderData.opsi_pembayaran} onChange={handleChange} required />
      </label>
      <label>
        Bukti Pembayaran:
        <input type="file" name="bukti_pembayaran" onChange={handleFileChange} required />
      </label>
      <label>
        Status:
        <input type="text" name="status" value={orderData.status} onChange={handleChange} required />
      </label>
      <button type="submit">Tambah Order</button>
    </form>
  );
};

export default AddOrder;
