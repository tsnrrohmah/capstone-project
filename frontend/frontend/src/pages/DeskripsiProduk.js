import React from 'react'
import service from "../assets/img/service.png"
import "../style/pembelian.css"
import { Link } from 'react-router-dom'


function DeskripsiProduk() {
  return (
    <div className="product ">
        <h1 className='mb-3'>Service AC</h1>
        <p>289 layanan</p>
        <img src={service} alt="service" className="images " />
        <h3 className='mt-2'>Rp.60.000</h3>
        <p className='mt-2'>Layanan jasa pembersihan AC secara umum, isi ulang freon untuk R-22 dan R-410, perbaikan kebocoran freon, AC berisik, dan masalah lainnya pada AC. Layanan ini tersedia untuk semua jenis dan merek unit AC. Tersedia garansi hingga 30 hari setelah waktu pengerjaan.</p>
        
        <Link to="/formpembelian" className='d-grid text-decoration-none'><button className='btn btn-primary'style={{ backgroundColor: '#1D204F' }}>Beli Sekarang</button></Link>
      </div>
  )
}

export default DeskripsiProduk;