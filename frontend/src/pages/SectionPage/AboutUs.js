import React from "react";
import { PrimaryButton } from "../../components/Button";
import classes from './AboutUs.module.css';
import AboutImage from '../../assets/AboutImage.png'
import { Link } from 'react-router-dom';


import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const boxVariant = {
    visible: { opacity: 1, scale:1, transition: { duration: 0.4 } },
    hidden: { opacity: 0, scale: 0}
  };


function AboutUs(){
    const control = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
          control.start("visible");
        } else {
          control.start("hidden");
        }
      }, [control, inView]);

    return (
        <motion.div 
        className={`${classes.cointainerAboutUs}`}
        ref={ref}
        variants={boxVariant}
        initial="hidden"
        animate={control}>
            <div className={`${classes.textAboutUs}`}>
                <h3>Selamat Datang di <span>JasaKu</span></h3>
                <h2>Tingkatkan Kesejukan dengan AC Berkualitas</h2>
                <p>Kami adalah mitra terpercaya Anda dalam menjaga kenyamanan dan kesejukan di rumah atau tempat kerja. Dengan tim ahli yang berpengalaman dan layanan berkualitas tinggi, kami menyediakan solusi lengkap untuk instalasi, perbaikan, dan perawatan AC.</p>
                <Link to="/about"><PrimaryButton>Baca Selengkapnya</PrimaryButton></Link>
            </div>
            <div className={`${classes.imgContainer}`}>
                <img src={AboutImage} alt="About US"></img>
            </div>
        </motion.div>
    )
}

export default AboutUs;