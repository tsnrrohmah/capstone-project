import React from "react";
import classes from './DetailAbout.module.css';
import ServiceImage from '../../assets/ServiceImage.jpg';
import TeknisiImage from '../../assets/TeknisiImage.jpg';

function DetailAboutUs(){
    return (
        <div className={classes.container}>
            <div className={classes.detail1}>
                <div className={classes.textDetail}>
                    <h1>Nikmati Layanan Bersama <span>JasaKu</span> Sepuasnya!
                    </h1>
                    <p>Selamat datang di JasaKu, mitra terpercaya Anda untuk semua kebutuhan service AC! Kami memahami betapa pentingnya AC yang berfungsi dengan baik untuk kenyamanan Anda, baik di rumah maupun di tempat kerja. Oleh karena itu, kami hadir untuk memberikan layanan berkualitas tinggi yang bisa Anda nikmati sepuasnya.</p>
                </div>
                <div className={classes.imageDetail}>
                    <img src={ServiceImage} alt="Gambar Service"></img>
                </div>
            </div>
            <div className={classes.detail2}>
                <div className={classes.textDetail}>
                    <h1>Nikmati Layanan Dengan Teknisi Berkualitas
                    </h1>
                    <p>Tim kami terdiri dari teknisi berpengalaman yang telah terlatih dan tersertifikasi dalam menangani berbagai merek dan tipe AC. Kami memastikan setiap pekerjaan dilakukan dengan teliti dan profesional.</p>
                </div>
                <div className={classes.imageDetail}>
                    <img src={TeknisiImage} alt="Gambar Service"></img>

                </div>
            </div>
        </div>
    )
}

export default DetailAboutUs;