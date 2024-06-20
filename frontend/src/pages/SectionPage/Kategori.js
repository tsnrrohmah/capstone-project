import React from "react";
import KategoriCard from "../../components/KategoriCard";
import classes from './Kategori.module.css';

// Icon
import icon1 from '../../assets/ExampleIcon-1.svg';
import icon2 from '../../assets/ExampleIcon-2.svg';
import icon3 from '../../assets/ExampleIcon-3.png';
import icon4 from '../../assets/ExampleIcon-4.png';





import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";


const boxVariant = {
    visible: { opacity: 1, scale:1, transition: { duration: 0.4 } },
    hidden: { opacity: 0, scale: 0}
  };


const data = [
    { icon: icon1, title: 'Instalasi AC', desc: '99 Layanan Tersedia' },
    { icon: icon2, title: 'Service AC', desc: '99 Layanan Tersedia' },
    { icon: icon3, title: 'Ganti Freon AC', desc: '99 Layanan Tersedia' },
    { icon: icon4, title: 'Perbaikan AC', desc: '99 Layanan Tersedia' },
    { icon: icon4, title: 'Pemeliharaan Rutin', desc: '99 Layanan Tersedia' },
    { icon: icon3, title: 'Ganti Spare Part AC', desc: '99 Layanan Tersedia' },
    { icon: icon2, title: 'Optimasi AC', desc: '99 Layanan Tersedia' },
    { icon: icon1, title: 'Ganti Ductwork', desc: '99 Layanan Tersedia' },
];

function Kategori(){
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
        className={`${classes.kategori}`}
        ref={ref}
        variants={boxVariant}
        initial="hidden"
        animate={control}>
            <h4>Kategori Layanan Top</h4>
            <h2>Explore 100+ Layanan</h2>
            <div className={classes.kategoriContainer}>
                {data.map((item, index) => (
                    <KategoriCard 
                        key={index} 
                        icon={item.icon} 
                        title={item.title} 
                        desc={item.desc} 
                    />
                ))}
            </div>

        </motion.div>
    )
}

export default Kategori;
