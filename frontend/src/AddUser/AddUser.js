import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyledTambahUser } from "./StyledAddUser";
import classes from "./AddUser.module.css";
import FormUser from "../components/FormAddUser";

const TambahUser = () => {
  const [dataUser, setDataUser] = useState([]);
  const [newUser, setNewUser] = useState({
    id_user: "",
    username: "",
    email: "",
    password: "",
    gambar: null,
    alamat: "",
    no_hp: "",
  });
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setDataUser(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleShow = () => setShow(!show);

  const handleTutup = () => {
    setShow(false);
    setNewUser({
      id_user: "",
      username: "",
      email: "",
      password: "",
      gambar: null,
      alamat: "",
      no_hp: "",
    });
    window.location.reload(); // Refresh halaman
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then((response) => {
        setDataUser(dataUser.filter((user) => user.id_user !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEditUser = (id) => {
    const userToEdit = dataUser.find((user) => user.id_user === id);
    if (userToEdit) {
      setNewUser(userToEdit);
      setShow(true);
    }
  };

  const handleShowDetails = (id) => setShowDetails(id);

  const handleCloseDetails = () => setShowDetails(null);

  return (
    <StyledTambahUser>
      <h1>Tambah User</h1>
      {!show && (
        <button onClick={handleShow} className={classes.buttonEdit}>
          Tambah User Baru
        </button>
      )}

      {show && (
        <div className={classes.inputUser}>
          <FormUser newUser={newUser} setNewUser={setNewUser} />
          <div className={classes.buttonForm}>
            <button onClick={handleTutup} className={classes.buttonEdit}>
              Tutup
            </button>
          </div>
        </div>
      )}

      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama User</th>
            <th>Email User</th>
            <th>Gambar</th>
            <th>Alamat</th>
            <th>No HP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataUser.map((user) => (
            <tr key={user.id_user}>
              <td>{user.id_user}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.gambar ? (
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={`http://localhost:5000/uploads/users/${user.gambar}`}
                    alt="Gambar User"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{user.alamat}</td>
              <td>{user.no_hp}</td>
              <td>
                <button
                  onClick={() => handleShowDetails(user.id_user)}
                  className={classes.buttonShow}
                >
                  Details
                </button>
                <button
                  onClick={() => handleEditUser(user.id_user)}
                  className={classes.buttonEdit}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id_user)}
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
        <div className={classes.inputUser}>
          <h2>Detail User</h2>
          {dataUser
            .filter((user) => user.id_user === showDetails)
            .map((user) => (
              <div key={user.id_user}>
                <p>
                  <strong>ID:</strong> {user.id_user}
                </p>
                <p>
                  <strong>Nama:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Alamat:</strong> {user.alamat}
                </p>
                <p>
                  <strong>No HP:</strong> {user.no_hp}
                </p>
                <p>
                  <strong>Gambar:</strong>
                  {user.gambar ? (
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={`http://localhost:5000/uploads/users/${user.gambar}`}
                      alt="Gambar User"
                    />
                  ) : (
                    "No Image"
                  )}
                </p>
              </div>
            ))}
          <button onClick={handleCloseDetails} className={classes.buttonEdit}>
            Tutup
          </button>
        </div>
      )}
    </StyledTambahUser>
  );
};

export default TambahUser;
