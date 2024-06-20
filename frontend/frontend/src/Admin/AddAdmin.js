import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyledTambahAdmin } from "./StyledAddAdmin";
import classes from "./AddAdmin.module.css";
import FormAdmin from "../components/FormAdmin";
import { Link } from "react-router-dom";

const TambahAdmin = () => {
  const [dataAdmin, setDataAdmin] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    id_admin: "",
    username: "",
    role: "",
    email: "",
    gambar: null,
    alamat: "",
    no_hp: "",
  });
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin")
      .then((response) => {
        setDataAdmin(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleShow = () => setShow(!show);

  const handleTutup = () => {
    setShow(false);
    setNewAdmin({
      id_admin: "",
      username: "",
      role: "",
      email: "",
      gambar: null,
      alamat: "",
      no_hp: "",
    });
    window.location.reload();
  };

  const deleteAdmin = (id) => {
    axios
      .delete(`http://localhost:5000/admin/${id}`)
      .then((response) => {
        setDataAdmin(
          dataAdmin.filter((admin) => admin.id_admin !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting admin:", error);
      });
  };

  const handleEditAdmin = (id) => {
    const adminToEdit = dataAdmin.find(
      (admin) => admin.id_admin === id
    );
    if (adminToEdit) {
      setNewAdmin(adminToEdit);
      setShow(true);
    }
  };

  const handleShowDetails = (id) => setShowDetails(id);

  const handleCloseDetails = () => setShowDetails(null);

  return (
    <StyledTambahAdmin>
      <h1>Tambah Admin</h1>
      {!show && (
        <Link to={`/signupadmin/`}>
        <button className={classes.buttonEdit}>
          Tambah Admin Baru
        </button>
        </Link>
        
      )}

      {show && (
        <div className={classes.inputAdmin}>
          <FormAdmin newAdmin={newAdmin} setNewAdmin={setNewAdmin} handleTutup={handleTutup} />
          <button onClick={handleTutup} className={classes.buttonEdit}>
            Tutup
          </button>
        </div>
      )}

      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
            <th>Alamat</th>
            <th>No. HP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataAdmin.map((admin) => (
            <tr key={admin.id_admin}>
              <td>{admin.id_admin}</td>
              <td>{admin.username}</td>
              <td>{admin.role}</td>
              <td>{admin.email}</td>
              <td>{admin.alamat}</td>
              <td>{admin.no_hp}</td>
              <td>
                <button
                  onClick={() => handleShowDetails(admin.id_admin)}
                  className={classes.buttonShow}
                >
                  Detail
                </button>
                <button
                  onClick={() => handleEditAdmin(admin.id_admin)}
                  className={classes.buttonEdit}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAdmin(admin.id_admin)}
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
        <div className={classes.inputAdmin}>
          <h2>Detail Admin</h2>
          {dataAdmin
            .filter((admin) => admin.id_admin === showDetails)
            .map((admin) => (
              <div key={admin.id_admin}>
                <p>
                  <strong>ID:</strong> {admin.id_admin}
                </p>
                <p>
                  <strong>Username:</strong> {admin.username}
                </p>
                <p>
                  <strong>Role:</strong> {admin.role}
                </p>
                <p>
                  <strong>Email:</strong> {admin.email}
                </p>
                <p>
                  <strong>Alamat:</strong> {admin.alamat}
                </p>
                <p>
                  <strong>No. HP:</strong> {admin.no_hp}
                </p>
              </div>
            ))}
          <button onClick={handleCloseDetails} className={classes.buttonEdit}>
            Tutup
          </button>
        </div>
      )}
    </StyledTambahAdmin>
  );
};

export default TambahAdmin;
