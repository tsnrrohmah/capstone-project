import React from "react";
import classes from './AboutUs.module.css';
import AboutImage from '../../assets/AboutImage.png'

function AboutUs(){
    return (
        <div className={`${classes.cointainerAboutUs}`}>
            <div className={`${classes.textAboutUs}`}>
                <h3>Selamat Datang di <span>JasaKu</span></h3>
                <h2>Tingkatkan Kesejukan dengan AC Berkualitas</h2>
                <p>Kami adalah mitra terpercaya Anda dalam menjaga kenyamanan dan kesejukan di rumah atau tempat kerja. Dengan tim ahli yang berpengalaman dan layanan berkualitas tinggi, kami menyediakan solusi lengkap untuk instalasi, perbaikan, dan perawatan AC.</p>
            </div>
            <div className={`${classes.imgContainer}`}>
                <img src={AboutImage} alt="About US"></img>
            </div>
        </div>
    )
}

export default AboutUs;