import React from "react";
import { PrimaryButton } from "../../components/Button";
import classes from './Hero.module.css';
import HeroImage from '../../assets/HeroImage.png';
import { Link } from 'react-router-dom';

function Hero (){
    return (
        <div className={`${classes.heroSection}`}>
            <div className={`${classes.heroText}`}>
                <h3><span>Jasaku</span> Semangatmu</h3>
                <h1>Ahli Pendingin Udara, Solusi Anda</h1>
                <p>Platform yang didedikasikan untuk memberikan layanan penyediaan, perbaikan, dan perawatan AC yang berkualitas dan handal.</p>
                <div className={`${classes.buttonContainer}`}>
                    <Link to ="/catalog">
                        <PrimaryButton>Lihat Layanan</PrimaryButton>
                    </Link>
                    <div className={classes.daftar}>
                        {/* <a href="#">Daftar Sekarang</a> */}
                        <Link to ="/signup">Daftar Sekarang</Link>
                    </div>

                </div>
            </div>
            <div className={`${classes.imageContainer}`}>
                  <img src={HeroImage} alt="Hero"></img>
            </div>
        </div>
    )
}

export default Hero;