// LayananCard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './LayananCard.module.css';
import { FaLocationDot } from "react-icons/fa6";
import { PurchaseButton } from "./Button";

function LayananCard(props) {
  const { id_katagori, imageLayanan, title, location, price, isLoggedIn } = props;
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleCardClick = () => {
    if (isLoggedIn) {
      navigate(`/layanan/${id_katagori}`, { state: { id_katagori, imageLayanan, title, location, price } });
    } else {
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className={classes.layananCard} onClick={handleCardClick}>
        <div className={classes.imgContainer}>
          <img src={imageLayanan} alt="Gambar Service"></img>
        </div>
        <h4>{title}</h4>
        <p><span><FaLocationDot /></span> {location}</p>
        <h4>Rp. {price}</h4>
          <div className={classes.purchaseButton}>
            <PurchaseButton label="Pesan Layanan"></PurchaseButton>
          </div>
      </div>
      {showPopup && (
        <div className={classes.popupOverlay}>
          <div className={classes.popupContent}>
            <p>Login terlebih dahulu untuk memesan layanan ini.</p>
            <button onClick={handleClosePopup}>Tutup</button>
          </div>
        </div>
      )}
    </>
  );
}

export default LayananCard;
