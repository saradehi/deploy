import React from 'react';
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css'
import video from "./img/dogs3.mp4"

const LandingPage = () => {
    return (
        <div className={`${style.body}`}>
            <video autoPlay={true} loop={true} muted={true} playsInline={true} className={`${style.back_video}`}>
                <source src={video} type='video/mp4' />
            </video>
            <div className={`${style.div}`}>
                <p>Welcome to my Dog APP</p>
                <Link to='/home'>
                    <button className={`${style.home}`}>Home</button>
                </Link>
                <h1>ENJOY IT!</h1>
                <p className={`${style.maker}`}>Made by: Sarahi del Moro</p>
            </div>
        </div>
    ) 

};

export default LandingPage;