import React from 'react';
import arrow from "../../assets/ContactImage.svg";
import frame from "../../assets/Frame 473.svg";
import '../contactHero/contact-hero.scss';
import Header from '../header/header';

const ContactHero = () => {
    return (
        <div className="contact-hero">
            <div className="container">
                <div className="row align-center">
                    <div className="col left">
                        <h1 className="get-in">Get in</h1>
                        <h1 className="touch">touch.</h1>
                        <p>Your feedback is important to us. Reach our representatives on our social media platforms</p>
                    </div>
                    <div className="col right">
                        <img src={arrow} alt="" />
                    </div>
                </div>
            </div>
            <div className="wire">
                <img src={frame} alt="" />
            </div>
        </div>
    )
}

export default ContactHero;
