import React from 'react';
import ContactForm from '../../components/contact-form/contact-form';
import ContactHero from '../../components/contactHero/contact-hero';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const Contact = ({navBackground}) => {
    return (
        <div className="contact">
            <Header navBackground={navBackground}/>
            <ContactHero />
            <ContactForm />
            <Footer />
        </div>
    )
}

export default Contact;
