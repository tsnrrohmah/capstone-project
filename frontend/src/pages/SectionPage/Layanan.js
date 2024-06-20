import React, { useContext} from "react";
import LayananCard from "../../components/LayananCard";
import ExampleLayanan from "../../assets/ExampleLayanan.png";
import { AuthContext } from '../../AuthContext';

import { PrimaryButton } from "../../components/Button";
import classes from "./Layanan.module.css";
import { Link } from 'react-router-dom';

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";


const boxVariant = {
    visible: { opacity: 1, scale:1, transition: { duration: 0.4 } },
    hidden: { opacity: 0, scale: 0}
  };

const layananData = [
    {
        imageLayanan: ExampleLayanan,
        title: 'Services AC Termurah',
        location: 'Semarang',
        price: 500000
    },
    {
        imageLayanan: ExampleLayanan,
        title: 'Ganti Freon AC',
        location: 'Salatiga',
        price: 600000
    },
    {
        imageLayanan: ExampleLayanan,
        title: 'Pembersihan AC Murah',
        location: 'Demak',
        price: 560000
    }
];

function Layanan(){
    const control = useAnimation();
    const [ref, inView] = useInView();
    const { isLoggedIn } = useContext(AuthContext);


    useEffect(() => {
        if (inView) {
          control.start("visible");
        } else {
          control.start("hidden");
        }
      }, [control, inView]);


    return(
        <motion.div className={classes.layanan}
        ref={ref}
        variants={boxVariant}
        initial="hidden"
        animate={control}>
            <div className={`${classes.containerText}`}>
                <div className={`${classes.text}`}>
                    <h2>Layanan Tersedia</h2>
                    <p>Layanan yang tersedia dijamin aman dan murah.  Layanan yang tersedia dijamin aman dan murah. </p>
                </div>

                <Link to ="/catalog" className={classes.noUnderline}>
                    <div className={`${classes.button1}`}>
                        <PrimaryButton>Layanan Lainnya</PrimaryButton>
                    </div>
                </Link>

            </div>

            

            <div className={`${classes.containerLayanan}`}>
                {layananData.map((layanan, index) => (
                <LayananCard
                    key={index}
                    imageLayanan={layanan.imageLayanan}
                    title={layanan.title}
                    location={layanan.location}
                    price={layanan.price.toLocaleString('de-DE')}
                    isLoggedIn={isLoggedIn} // Pass isLoggedIn to LayananCard


                />
            ))}

           </div>

           <Link to ="/catalog" className={classes.noUnderline}>
                <div className={`${classes.button2}`}>
                    <PrimaryButton>Layanan Lainnya</PrimaryButton>
                </div>
            </Link>

        </motion.div>
    )
}

export default Layanan;

// <div className={`${classes.layanan}`}>
            
// </div>