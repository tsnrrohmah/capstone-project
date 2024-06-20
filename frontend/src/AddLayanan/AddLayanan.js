import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyledTambahLayanan } from "./StyledAddLayanan";
import classes from "./AddLayanan.module.css";
import FormKategory from "../components/FormKategory";

const TambahLayanan = () => {
  const [dataLayanan, setDataLayanan] = useState([]);
  const [newLayanan, setNewLayanan] = useState({
    id_katagori: "",
    nama_katagori: "",
    judul: "",
    lokasi: "",
    harga: "",
  });
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/kategori")
      .then((response) => {
        setDataLayanan(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleShow = () => setShow(!show);

  const handleTutup = () => {
    setShow(false);
    setNewLayanan({
      id_katagori: "",
      nama_katagori: "",
      judul: "",
      lokasi: "",
      harga: "",
    });
    window.location.reload();
  };

  const deleteLayanan = (id) => {
    axios
      .delete(`http://localhost:5000/kategori/${id}`)
      .then((response) => {
        setDataLayanan(
          dataLayanan.filter((layanan) => layanan.id_katagori !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
      });
  };

  const handleEditLayanan = (id) => {
    const layananToEdit = dataLayanan.find(
      (layanan) => layanan.id_katagori === id
    );
    if (layananToEdit) {
      setNewLayanan(layananToEdit);
      setShow(true);
    }
  };

  const handleShowDetails = (id) => setShowDetails(id);

  const handleCloseDetails = () => setShowDetails(null);

  return (
    <StyledTambahLayanan>
      <h1>Tambah Layanan</h1>
      {!show && (
        <button onClick={handleShow} className={classes.buttonEdit}>
          Tambah Layanan Baru
        </button>
      )}

      {show && (
        <div className={classes.inputLayanan}>
          <FormKategory newLayanan={newLayanan} setNewLayanan={setNewLayanan} handleTutup={handleTutup} />
          <button onClick={handleTutup} className={classes.buttonEdit}>
            Tutup
          </button>
        </div>
      )}

      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kategori Layanan</th>
            <th>Gambar Layanan</th>
            <th>Judul Layanan</th>
            <th>Lokasi</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataLayanan.map((layanan) => (
            <tr key={layanan.id_katagori}>
              <td>{layanan.id_katagori}</td>
              <td>{layanan.nama_katagori}</td>
              <td>
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={`http://localhost:5000/uploads/catagori/${layanan.gambar}`}
                  alt="Gambar Layanan"
                />
              </td>
              <td>{layanan.judul}</td>
              <td>{layanan.lokasi}</td>
              <td>Rp.{layanan.harga}</td>
              <td>
                <button
                  onClick={() => handleShowDetails(layanan.id_katagori)}
                  className={classes.buttonShow}
                >
                  Detail
                </button>
                <button
                  onClick={() => handleEditLayanan(layanan.id_katagori)}
                  className={classes.buttonEdit}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteLayanan(layanan.id_katagori)}
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
        <div className={classes.inputLayanan}>
          <h2>Detail Layanan</h2>
          {dataLayanan
            .filter((layanan) => layanan.id_katagori === showDetails)
            .map((layanan) => (
              <div key={layanan.id_katagori}>
                <p>
                  <strong>ID:</strong> {layanan.id_katagori}
                </p>
                <p>
                  <strong>Kategori:</strong> {layanan.nama_katagori}
                </p>
                <p>
                  <strong>Judul:</strong> {layanan.judul}
                </p>
                <p>
                  <strong>Lokasi:</strong> {layanan.lokasi}
                </p>
                <p>
                  <strong>Harga:</strong> Rp.{layanan.harga}
                </p>
              </div>
            ))}
          <button onClick={handleCloseDetails} className={classes.buttonEdit}>
            Tutup
          </button>
        </div>
      )}
    </StyledTambahLayanan>
  );
};

export default TambahLayanan;