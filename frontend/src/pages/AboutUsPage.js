import React from "react";
import classes from './AboutUsPage.module.css'
import Navbar from "../components/Navbar";
import AboutUs from "./AboutUs/AboutUs";
import Fitur from "./SectionPage/Fitur";
import DetailAboutUs from "./AboutUs/DetailAbout";
import Footers from "./SectionPage/Footers";

function AboutUsPage(){
    return (
        <div>
            <Navbar></Navbar>
            <div className={classes.marginAboutUs}>
                <DetailAboutUs></DetailAboutUs>
                <Fitur></Fitur>
                <AboutUs></AboutUs>
                <Footers></Footers>
            </div>

        </div>
    );
}

export default AboutUsPage;