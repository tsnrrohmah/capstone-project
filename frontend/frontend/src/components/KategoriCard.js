import React from "react";
import classes from './KategoriCard.module.css';


function KategoriCard (props){
    const {icon, title, desc } = props;
    return (
        <div className={`${classes.kategoriCard}`}>
            <div>
                <div className={`${classes.icon}`}>
                    <img src={icon} alt="Gambar Kategori"></img>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default KategoriCard;