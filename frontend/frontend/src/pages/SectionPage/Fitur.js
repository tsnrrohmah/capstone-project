import React from "react";
import classes from './Fitur.module.css'

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const boxVariant = {
    visible: { opacity: 1, scale:1, transition: { duration: 0.3 } },
    hidden: { opacity: 0, scale: 0 }
  };


function SingleFitur (props){
    const {title, deskripsi} = props;
    return(
        <div className={`${classes.singleFitur}`}>
            <div className={`${classes.text}`}>
                <h4>{title}</h4>
                 <p>{deskripsi}</p>
            </div>
        </div>
    )
}

function Fitur (){

    const control = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
          control.start("visible");
        } else {
          control.start("hidden");
        }
      }, [control, inView]);

    return(
        <motion.div 
        className={`${classes.fitur}`}
        ref={ref}
        variants={boxVariant}
        initial="hidden"
        animate={control}>

            <div className={`${classes.textFitur}`}>
                <h3>Fitur Andalan Kami</h3>
                <h2>Fitur Unggulan <span>JasaKu</span></h2>
                <p><span>JasaKu</span> menyediakan serangkaian fitur unggulan yang dirancang untuk memastikan pengalaman pengguna yang optimal.</p>
            </div>

            <div className={`${classes.containerFitur}`}>
                <div className={`${classes.twoFitur}`}>
                    <SingleFitur
                        title = "Ahli Terdekat"
                        deskripsi = "Temukan Ahli Terdekat dengan Mudah"
                    ></SingleFitur>
                    <SingleFitur
                        title = "Jadwal Fleksibel"
                        deskripsi = "Atur Waktu Layanan Sesuai Keinginan Anda"
                    ></SingleFitur>
                </div>
                <div className={`${classes.twoFitur}`}>
                    <SingleFitur
                        title = "Pembayaran Aman"
                        deskripsi = "Transaksi Mudah dan Aman"
                    ></SingleFitur>
                    <SingleFitur
                        title = "Layanan 24/7"
                        deskripsi = "Lyanan yang Tersedia Sepanjang Waktu"
                    ></SingleFitur>
                </div>
            </div>
        </motion.div>
    )
};





export default Fitur;