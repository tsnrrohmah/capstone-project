import React from "react";
import classes from "./Footer.module.css";
import jasaku from "../../assets/jasaku.png";
import { Link } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";




function Footer(){
    return(
        <div className={`${classes.footer}`}>

            <div className={`${classes.containerIcon}`}>
                <div className={`${classes.icon}`}>
                    <img src={jasaku} alt="Icon Jasaku"></img>
                    <span>JasaKu</span>
                </div>

                <div className={`${classes.listFooter}`}>
                        <Link to="#" style={{ textDecoration: 'none', color: 'black' }}>Home</Link>
                        <Link to="/catalog" style={{ textDecoration: 'none', color: 'Black' }}>Layanan</Link>
                        <Link to="#" style={{ textDecoration: 'none', color: 'Black' }}>About Us</Link>
                        <Link to="#" style={{ textDecoration: 'none', color: 'Black' }}>Help</Link>
                        <Link to="#" style={{ textDecoration: 'none', color: 'Black' }}>Privacy</Link>
                </div>
                <div className={`${classes.social}`}>
                    <p>Follow Our Socials</p>
                    <div className={`${classes.containerSocial}`}>
                        <Link to="https://www.instagram.com/" className={classes.iconSocial}><AiFillInstagram /></Link>
                        <Link to="instagram.com" className={classes.iconSocial}><FaFacebook /></Link>
                        <Link to="instagram.com" className={classes.iconSocial}><FaSquareXTwitter /></Link>
                    </div>
                </div>
            </div>

            <div className={`${classes.containerCopyright}`}>
                <div className={`${classes.list}`}>
                    <Link to ="#" style={{ textDecoration: 'none', color: 'black' }}>Cookies</Link>
                    <Link to ="#" style={{ textDecoration: 'none', color: 'black' }}>Terms</Link>
                    <Link to ="#" style={{ textDecoration: 'none', color: 'black' }}>Privacy</Link>
                </div>
                <p>@ 2024 JasaKu. All Rights Reserved</p>
            </div>


        </div>
    )
}

export default Footer;