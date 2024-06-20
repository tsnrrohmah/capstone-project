// LayananDetail.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import classes from './LayananDetail.module.css';
import { FaLocationDot } from "react-icons/fa6";
import Navbar from '../components/Navbar';

const LayananDetail = () => {
  const location = useLocation();
  const { id_katagori, imageLayanan, title, location: layananLocation, price } = location.state || {};

  return (
    <div>
      <Navbar />
      <div className={classes.product}>
        <h1 className='mb-3'>{title}</h1>
        <div className={classes.imageProduct}>
          <img src={imageLayanan} alt={title} className={classes.image} />
        </div>
        <h3 className='mt-2'>Rp. {price.toLocaleString('de-DE')}</h3>
        <p className={classes.lokasi}><span><FaLocationDot /></span> {layananLocation}</p>
        <p className={classes.deskripsi}>Layanan jasa pembersihan AC secara umum, isi ulang freon untuk R-22 dan R-410, perbaikan kebocoran freon, AC berisik, dan masalah lainnya pada AC. Layanan ini tersedia untuk semua jenis dan merek unit AC. Tersedia garansi hingga 30 hari setelah waktu pengerjaan.</p>
        
        <Link to={`/formpembelian/`} className='d-grid text-decoration-none' state={{ id_katagori, price, title }}>
          <button className='btn btn-primary' style={{ backgroundColor: '#1D204F' }}>Beli Sekarang</button>
        </Link>
      </div>
    </div>
  );
};

export default LayananDetail;
