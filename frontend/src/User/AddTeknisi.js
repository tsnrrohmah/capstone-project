import React, { useState } from "react";
import { StyledTambahTeknisi } from "./StyledAddTeknisi";
import classes from "./AddTeknisi.module.css";

const TambahTeknisi = () => {
  const [dataTeknisi, setDataTeknisi] = useState([
    {
      id: 1,
      kategory: "Service AC",
      judul: "Service AC Murah Meriah",
      lokasi: "Semarang",
      harga: 500000,
    },
    {
      id: 2,
      kategory: "Ganti Freon AC",
      judul: "Ganti Freon AC Terpercaya",
      lokasi: "Surakarta",
      harga: 900000,
    },
    {
      id: 3,
      kategory: "Pembersihan AC",
      judul: "Pembersihan AC Kinclong",
      lokasi: "Jakarta",
      harga: 300000,
    },
  ]);

  const [newTeknisi, setNewTeknisi] = useState({
    id: "",
    kategory: "",
    judul: "",
    lokasi: "",
    harga: "",
  });

  const [show, setShow] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleShow = () => {
    setShow(!show);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeknisi({ ...newTeknisi, [name]: value });
  };

  const handleAddTeknisi = () => {
    const newId = dataTeknisi.length
      ? dataTeknisi[dataTeknisi.length - 1].id + 1
      : 1;
    const TeknisiToAdd = {
      ...newTeknisi,
      id: newId,
      harga: parseInt(newTeknisi.harga),
    };
    setDataTeknisi([...dataTeknisi, TeknisiToAdd]);
    setNewTeknisi({ id: "", kategory: "", judul: "", lokasi: "", harga: "" });
  };

  const handleDeleteTeknisi = (id) => {
    const updatedDataTeknisi = dataTeknisi.filter((Teknisi) => Teknisi.id !== id);
    setDataTeknisi(updatedDataTeknisi);
  };

  const handleEditTeknisi = (id) => {
    const TeknisiToEdit = dataTeknisi.find((Teknisi) => Teknisi.id === id);
    setEditingId(id);
    setNewTeknisi(TeknisiToEdit);
    setShow(true);
  };

  const handleSaveEditTeknisi = () => {
    const updatedDataTeknisi = dataTeknisi.map((Teknisi) =>
      Teknisi.id === newTeknisi.id ? newTeknisi : Teknisi
    );
    setDataTeknisi(updatedDataTeknisi);
    setNewTeknisi({ id: "", kategory: "", judul: "", lokasi: "", harga: "" });
    setEditingId(null);
    setShow(false);
  };

  return (
    <StyledTambahTeknisi>
      <h1>Tambah Teknisi</h1>
      {!show && <button onClick={handleShow} className={classes.buttonEdit}>Tambah Teknisi Baru</button>}

      <div>
        {show && (
          <div className={classes.inputTeknisi}>
            <h1>Form Teknisi AC</h1>
            <label>Masukkan Kategory</label>
            <input
              type="text"
              name="kategory"
              value={newTeknisi.kategory}
              onChange={handleInputChange}
              placeholder="Kategory Teknisi"
            />
            <label>Masukkan Judul Teknisi</label>
            <input
              type="text"
              name="judul"
              value={newTeknisi.judul}
              onChange={handleInputChange}
              placeholder="Judul Teknisi"
            />
            <label>Masukkan Lokasi</label>
            <input
              type="text"
              name="lokasi"
              value={newTeknisi.lokasi}
              onChange={handleInputChange}
              placeholder="Lokasi"
            />
            <label>Masukkan Harga</label>
            <input
              type="number"
              name="harga"
              value={newTeknisi.harga}
              onChange={handleInputChange}
              placeholder="Harga"
            />
            <div className={classes.buttonForm}>
              {editingId !== null ? (
                <button onClick={handleSaveEditTeknisi} className={classes.buttonEdit}>Simpan Perubahan</button>
              ) : (
                <button onClick={handleAddTeknisi} className={classes.buttonEdit}>Tambah Teknisi Baru</button>
              )}
              <button onClick={handleShow} className={classes.buttonEdit}>Tutup</button>
            </div>
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kategory Teknisi</th>
            <th>Gambar Teknisi</th>
            <th>Judul Teknisi</th>
            <th>Lokasi</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataTeknisi.map((Teknisi) => (
            <tr key={Teknisi.id}>
              <td>{Teknisi.id}</td>
              <td>{Teknisi.kategory}</td>
              <td>Gambar</td>
              <td>{Teknisi.judul}</td>
              <td>{Teknisi.lokasi}</td>
              <td>Rp.{Teknisi.harga}</td>
              <td>
                <button className={classes.buttonShow}>Show</button>
                <button onClick={() => handleEditTeknisi(Teknisi.id)} className={classes.buttonEdit}>Edit</button>
                <button onClick={() => handleDeleteTeknisi(Teknisi.id)} className={classes.buttonDanger}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTambahTeknisi>
  );
};

export default TambahTeknisi;
