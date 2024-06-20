import React from "react";
import Navbar from "../components/Navbar";
import Hero from "./SectionPage/Hero";
import AboutUs from "./SectionPage/AboutUs";
import Fitur from "./SectionPage/Fitur";
import Kategori from "./SectionPage/Kategori";
import Layanan from "./SectionPage/Layanan";
import Footer from "./SectionPage/Footers";


import "./LandingPage.css";



function LandingPage (){
    return (
        <>
        <Navbar></Navbar>
        <div className="landingPage">
            <Hero></Hero>  
            <AboutUs></AboutUs>  
            <Fitur></Fitur>  
            <Kategori></Kategori>  
            <Layanan></Layanan>  
             <Footer></Footer>
        </div>
        </>
    )
}

export default LandingPage;
