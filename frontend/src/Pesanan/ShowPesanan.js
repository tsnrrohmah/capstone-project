import React from "react";
import classes from "./Pesanan.module.css";

const ShowPesanan = ({ order, onClose }) => {
  return (
    <div className={classes.showpesanan}>
      <h2>Detail Pesanan : </h2>
      <p>ID Pesanan: {order.id_pesanan}</p>
      <p>ID Admin: {order.id_admin}</p>
      <p>ID User: {order.id_user}</p>
      <p>ID Teknisi: {order.id_teknisi}</p>
      <p>ID Kategori: {order.id_katagori}</p>
      <p>Tanggal Bayar: {order.tanggal_bayar}</p>
      <p>Tanggal Pelayanan: {order.tanggal_pelayanan}</p>
      <p>Total Harga: {order.total_harga}</p>
      <p>Opsi Pembayaran: {order.opsi_pembayaran}</p>
      <p>Bukti Pembayaran: {order.bukti_pembayaran}</p>
      <p>Status: {order.status}</p>
      <button onClick={onClose}>Tutup</button>
    </div>
  );
};

export default ShowPesanan;
