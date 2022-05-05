import React from 'react';
import './about.scss';
import AboutHero from './aboutHero/aboutHero';
import Affilations from './affilations/affilations';
import Moovit from './moovit/moovit';
import OurServices from './ourServices/OurServices';
import Story from './story/story';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const About =({navBackground} ) => {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
    return(
        <div className="about">
            <Header navBackground={navBackground}/>
            <AboutHero />
            <Story />
            <Moovit />
            <OurServices />
            <Affilations />
            <Footer />
        </div>
    )
}

export default About;