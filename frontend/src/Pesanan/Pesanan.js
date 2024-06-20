import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledPesanan } from "./StyledPesanan";
import classes from "./Pesanan.module.css";
import FormPesanan from '../components/FormPesanan';

const Pesanan = () => {
  const [dataPesanan, setDataPesanan] = useState([]);
  const [dataAdmin, setDataAdmin] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataTeknisi, setDataTeknisi] = useState([]);

  // Fetch data pesanan
  useEffect(() => {
    axios.get('http://localhost:5000/order')
      .then(response => {
        setDataPesanan(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  // Fetch data admin
  useEffect(() => {
    axios.get('http://localhost:5000/admin')
      .then(response => {
        setDataAdmin(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  // Fetch data user
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setDataUser(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  // Fetch data teknisi
  useEffect(() => {
    axios.get('http://localhost:5000/teknisi')
      .then(response => {
        setDataTeknisi(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const [newPesanan, setNewPesanan] = useState({
    id_admin: "",
    id_user: "",
    id_teknisi: "",
    tanggal_bayar: "",
    tanggal_pelayanan: "",
    total_harga: "",
    opsi_pesanan: "",
    status: "",
  });

  const [show, setShow] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const handleShow = () => {
    setShow(!show);
  };

  const handleAddPesanan = () => {
    const newId = dataPesanan.length ? dataPesanan[dataPesanan.length - 1].id_pesanan + 1 : 1;
    const pesananToAdd = { ...newPesanan, id_pesanan: newId };
    setDataPesanan([...dataPesanan, pesananToAdd]);
    setNewPesanan({
      id_admin: "",
      id_user: "",
      id_teknisi: "",
      tanggal_bayar: "",
      tanggal_pelayanan: "",
      total_harga: "",
      opsi_pesanan: "",
      status: "",
    });
    setShow(false);
  };

  const handleDeletePesanan = (id_pesanan) => {
    axios.delete(`http://localhost:5000/order/${id_pesanan}`)
      .then(response => {
        const updatedDataPesanan = dataPesanan.filter((pesanan) => pesanan.id_pesanan !== id_pesanan);
        setDataPesanan(updatedDataPesanan);
        console.log(response.data); // Log the response from the server
      })
      .catch(error => {
        console.error('There was an error deleting the order!', error);
      });
  };

  const handleEditPesanan = (id_pesanan) => {
    const pesananToEdit = dataPesanan.find((pesanan) => pesanan.id_pesanan === id_pesanan);
    setEditingId(id_pesanan);
    setNewPesanan(pesananToEdit);
    setShow(true);
  };

  const handleSaveEditPesanan = () => {
    const updatedDataPesanan = dataPesanan.map((pesanan) =>
      pesanan.id_pesanan === newPesanan.id_pesanan ? newPesanan : pesanan
    );
    setDataPesanan(updatedDataPesanan);
    setNewPesanan({
      id_admin: "",
      id_user: "",
      id_teknisi: "",
      tanggal_bayar: "",
      tanggal_pelayanan: "",
      total_harga: "",
      opsi_pesanan: "",
      status: "",
    });
    setEditingId(null);
    setShow(false);
  };

  const handleShowDetails = (id_pesanan) => {
    setShowDetails(id_pesanan);
  };

  const handleCloseDetails = () => {
    setShowDetails(null);
  };

  const findUsernameByIdAdmin = (idAdmin, data) => {
    const found = data.find(item => item.id_admin === idAdmin);
    return found ? found.username : 'Unknown';
  };
  const findUsernameByIdUser = (idUser, data) => {
    const found = data.find(item => item.id_user === idUser);
    return found ? found.username : 'Unknown';
  };

  const findNameByIdTeknisi = (idTeknisi, data) => {
    const found = data.find(item => item.id_teknisi === idTeknisi);
    return found ? found.nama : 'Unknown';
  };

  return (
    <StyledPesanan>
      <h1>Daftar Pesanan</h1>
      {!show && <button onClick={handleShow} className={classes.buttonEdit}>Tambah Pesanan Baru</button>}
      <div>
        {show && (
          <div className={classes.inputPesanan}>
            <FormPesanan
              newPesanan={newPesanan}
              setNewPesanan={setNewPesanan}
              isEditing={editingId !== null}
            />
            <div className={classes.buttonForm}>
              {editingId !== null ? (
                <button onClick={handleSaveEditPesanan} className={classes.buttonEdit}>Simpan Perubahan ini</button>
              ) : (
                <button onClick={handleAddPesanan} className={classes.buttonEdit}>Tambah Pesanan Baru</button>
              )}
              <button onClick={handleShow} className={classes.buttonEdit}>Tutup</button>
            </div>
          </div>
        )}
      </div>
      <table >
        <thead>
          <tr>
            <th>ID Pesanan</th>
            <th>Nama Admin</th>
            <th>Nama User</th>
            <th>Nama Teknisi</th>
            <th>Tanggal Bayar</th>
            <th>Tanggal Pelayanan</th>
            <th>Total Harga</th>
            <th>Opsi Pesanan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataPesanan.map((pesanan) => (
            <React.Fragment key={pesanan.id_pesanan}>
              <tr>
                <td>{pesanan.id_pesanan}</td>
                <td>{findUsernameByIdAdmin(pesanan.id_admin, dataAdmin)}</td>
                <td>{findUsernameByIdUser(pesanan.id_user, dataUser)}</td>
                <td>{findNameByIdTeknisi(pesanan.id_teknisi, dataTeknisi)}</td>
                <td>{pesanan.tanggal_bayar}</td>
                <td>{pesanan.tanggal_pelayanan}</td>
                <td>{pesanan.total_harga}</td>
                <td>{pesanan.opsi_pembayaran}</td>
                <td>{pesanan.status}</td>
                <td>
                  <button onClick={() => handleShowDetails(pesanan.id_pesanan)} className={classes.buttonShow}>Show</button>
                  <button onClick={() => handleEditPesanan(pesanan.id_pesanan)} className={classes.buttonEdit}>Edit</button>
                  <button onClick={() => handleDeletePesanan(pesanan.id_pesanan)} className={classes.buttonDanger}>Hapus</button>
                </td>
              </tr>
              {showDetails === pesanan.id_pesanan && (
                <div className={classes.inputLayanan}>
                  <h1>Detail Pesanan</h1>
                  <p><strong>ID Pesanan:</strong> {pesanan.id_pesanan}</p>
                  <p><strong>ID Admin:</strong> {findUsernameByIdAdmin(pesanan.id_admin, dataAdmin)}</p>
                  <p><strong>ID User:</strong> {findUsernameByIdUser(pesanan.id_user, dataUser)}</p>
                  <p><strong>ID Teknisi:</strong> {findNameByIdTeknisi(pesanan.id_teknisi, dataTeknisi)}</p>
                  <p><strong>Tanggal Bayar:</strong> {pesanan.tanggal_bayar}</p>
                  <p><strong>Tanggal Pelayanan:</strong> {pesanan.tanggal_pelayanan}</p>
                  <p><strong>Total Harga:</strong> {pesanan.total_harga}</p>
                  <p><strong>Opsi Pesanan:</strong> {pesanan.opsi_pesanan}</p>
                  <p><strong>Status:</strong> {pesanan.status}</p>
                  <button onClick={handleCloseDetails} className={classes.buttonEdit}>Tutup</button>
                </div>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </StyledPesanan>
  );
};

export default Pesanan;