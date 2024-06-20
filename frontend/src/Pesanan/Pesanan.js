import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyledPesanan } from "./StyledPesanan";
import classes from "./Pesanan.module.css";
import FormPesanan from "../components/FormPesanan";
import ShowPesanan from "./ShowPesanan";

const Pesanan = () => {
  //  Definisikan Variabel
  const [dataPesanan, setDataPesanan] = useState([]);
  const [dataAdmin, setDataAdmin] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataTeknisi, setDataTeknisi] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isShowVisible, setIsShowVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch data pesanan
  const fetchData = (url, setData) => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(
          `There was an error fetching the data from ${url}!`,
          error
        );
      });
  };
  useEffect(() => {
    fetchData("http://localhost:5000/order", setDataPesanan);
    fetchData("http://localhost:5000/admin", setDataAdmin);
    fetchData("http://localhost:5000/users", setDataUser);
    fetchData("http://localhost:5000/teknisi", setDataTeknisi);
  }, []);

  // Menemukan Nama Admin, Nama User, dan Nama Teknisi
  const findAdminNameById = (id) => {
    const admin = dataAdmin.find((admin) => admin.id_admin === id);
    return admin ? admin.username : "Unknown";
  };
  const findUserNameById = (id) => {
    const user = dataUser.find((user) => user.id_user === id);
    return user ? user.username : "Unknown";
  };
  const findTeknisiNameById = (id) => {
    const teknisi = dataTeknisi.find((teknisi) => teknisi.id_teknisi === id);
    return teknisi ? teknisi.nama : "Unknown";
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsFormVisible(true);
    setIsShowVisible(false);
  };
  const handleCloseForm = () => {
    setIsFormVisible(false);
    setIsShowVisible(false);
  };
  const handleShowClick = (order) => {
    setSelectedOrder(order);
    setIsShowVisible(true);
    setIsFormVisible(false);
  };
  const handleCloseShow = () => {
    setIsShowVisible(false);
  };

  const handleDeletePesanan = (id_pesanan) => {
    axios
      .delete(`http://localhost:5000/order/${id_pesanan}`)
      .then((response) => {
        console.log("Order deleted:", response.data);
        setDataPesanan((prevData) =>
          prevData.filter((pesanan) => pesanan.id_pesanan !== id_pesanan)
        );
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Backend returned status:", error.response.status);
          console.error("Response body:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error", error.message);
        }
      });
  };

  return (
    <StyledPesanan>
      <h1>Daftar Pesanan</h1>
      <div>
        {isFormVisible && (
          <div className={classes.inputPesanan}>
            <FormPesanan order={selectedOrder} onClose={handleCloseForm} />
          </div>
        )}
      </div>

      {isShowVisible && (
        <div>
          <ShowPesanan order={selectedOrder} onClose={handleCloseShow} />
        </div>
      )}

      <table className={classes.table}>
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
          {dataPesanan.map((order) => (
            <React.Fragment key={order.id_pesanan}>
              <tr>
                <td>{order.id_pesanan}</td>
                <td>{findAdminNameById(order.id_admin)}</td>
                <td>{findUserNameById(order.id_user)}</td>
                <td>{findTeknisiNameById(order.id_teknisi)}</td>
                <td>{new Date(order.tanggal_bayar).toLocaleDateString()}</td>
                <td>
                  {new Date(order.tanggal_pelayanan).toLocaleDateString()}
                </td>
                <td>{order.total_harga}</td>
                <td>{order.opsi_pembayaran}</td>
                <td>{order.status}</td>
                <td>
                  <button className={classes.buttonShow} onClick={() => handleShowClick(order)}>Details</button>
                  <button
                    className={classes.buttonEdit}
                    onClick={() => handleEditClick(order)}
                  >
                    Edit
                  </button>
                  <button className={classes.buttonDanger} onClick={() => handleDeletePesanan(order.id_pesanan)}>Hapus</button>
                  </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </StyledPesanan>
  );
};

export default Pesanan;
