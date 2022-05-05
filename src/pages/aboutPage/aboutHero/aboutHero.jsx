import React from 'react';
import '../aboutHero/aboutHero.scss';
import image1 from '../../../assets/Frame 463.svg';
import image2 from '../../../assets/Frame 462.svg';
import image3 from '../../../assets/Frame 475.svg';

const AboutHero = () => {
    return (
        <div className="about-hero">
            <div className="container_">
                <div className="content">
                <h1>We bring <span className="highlight">solutions</span> through <span>infinite possibilities</span> to move you <span className="forward">forward</span> </h1>
                    
                    <div className="images">
                        <img src={image1} alt="" className="image1" />
                        <img src={image2} alt="" className="image2" />
                        <img src={image3} alt="" className="image3" />
                        {/* <img src={} alt="" /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutHero
