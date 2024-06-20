import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyledTambahTeknisi } from "./StyledAddTeknisi"; // Pastikan Anda punya StyledTambahTeknisi
import classes from "./AddTeknisi.module.css"; // Pastikan Anda punya file CSS ini
import FormTeknisi from "../components/FormTeknisi"; // Pastikan Anda punya FormTeknisi

const TambahTeknisi = () => {
  const [dataTeknisi, setDataTeknisi] = useState([]);
  const [newTeknisi, setNewTeknisi] = useState({
    id_teknisi: "",
    nama: "",
    alamat_cabang: "",
    no_hp: "",
    gambar: "",
    status: "",
  });
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/teknisi")
      .then((response) => {
        setDataTeknisi(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleShow = () => setShow(!show);

  const handleTutup = () => {
    setShow(false);
    setNewTeknisi({
      id_teknisi: "",
      nama: "",
      alamat_cabang: "",
      no_hp: "",
      gambar: "",
      status: "",
    });
    window.location.reload(); // Refresh halaman
  };

  const deleteTeknisi = (id) => {
    axios
      .delete(`http://localhost:5000/teknisi/${id}`)
      .then((response) => {
        setDataTeknisi(
          dataTeknisi.filter((teknisi) => teknisi.id_teknisi !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting technician:", error);
      });
  };

  const handleEditTeknisi = (id) => {
    const teknisiToEdit = dataTeknisi.find(
      (teknisi) => teknisi.id_teknisi === id
    );
    if (teknisiToEdit) {
      setNewTeknisi(teknisiToEdit);
      setShow(true);
    }
  };

  const baseURL = 'http://localhost:5000'; // Base URL backend Anda
  const handleShowDetails = (id) => setShowDetails(id);

  const handleCloseDetails = () => setShowDetails(null);

  return (
    <StyledTambahTeknisi>
      <h1>Tambah Teknisi</h1>
      {!show && (
        <button onClick={handleShow} className={classes.buttonEdit}>
          Tambah Teknisi Baru
        </button>
      )}

      {show && (
        <div className={classes.inputTeknisi}>
          <FormTeknisi newTeknisi={newTeknisi} setNewTeknisi={setNewTeknisi} />
          <button onClick={handleTutup} className={classes.buttonEdit}>
            Tutup
          </button>
        </div>
      )}

      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Alamat Cabang</th>
            <th>No HP</th>
            <th>Gambar</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataTeknisi.map((teknisi) => (
            <tr key={teknisi.id_teknisi}>
              <td>{teknisi.id_teknisi}</td>
              <td>{teknisi.nama}</td>
              <td>{teknisi.alamat_cabang}</td>
              <td>{teknisi.no_hp}</td>
              <td>
              <img style={{ width: "50px", height: "50px" }}
                      src={`${baseURL}/uploads/technician/${teknisi.gambar}`}
                      alt="Gambar Teknisi"
                    />
              </td>
              <td>{teknisi.status}</td>
              <td>
                <button
                  onClick={() => handleShowDetails(teknisi.id_teknisi)}
                  className={classes.buttonShow}
                >
                  Detail
                </button>
                <button
                  onClick={() => handleEditTeknisi(teknisi.id_teknisi)}
                  className={classes.buttonEdit}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTeknisi(teknisi.id_teknisi)}
                  className={classes.buttonDanger}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDetails && (
        <div className={classes.inputTeknisi}>
          <h2>Detail Teknisi</h2>
          {dataTeknisi
            .filter((teknisi) => teknisi.id_teknisi === showDetails)
            .map((teknisi) => (
              <div key={teknisi.id_teknisi}>
                <p>
                  <strong>ID:</strong> {teknisi.id_teknisi}
                </p>
                <p>
                  <strong>Nama:</strong> {teknisi.nama}
                </p>
                <p>
                  <strong>Alamat Cabang:</strong> {teknisi.alamat_cabang}
                </p>
                <p>
                  <strong>No HP:</strong> {teknisi.no_hp}
                </p>
                <p>
                  <strong>Status:</strong> {teknisi.status}
                </p>
              </div>
            ))}
          <button onClick={handleCloseDetails} className={classes.buttonEdit}>
            Tutup
          </button>
        </div>
      )}
    </StyledTambahTeknisi>
  );
};

export default TambahTeknisi;
