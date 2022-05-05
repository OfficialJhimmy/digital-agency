import React from 'react';
import { Link } from 'react-router-dom';
import '../email-verification/email-verification.scss';
import Header from '../../components/header/header';

const EmailVerification = ({navBackground}) => {

    const userEmail = localStorage.getItem("user-email");
    return (
        <div className="email-verification">
            <Header navBackground={navBackground}/>
            <h5>MoovIT</h5>
            <h3>Email Verification</h3>
            <p>We have sent a verification link to <span>{userEmail}</span> .</p>
            <p>I didn’t get a mail yet. <Link to='resend-verification'> Resend link</Link> </p>

            <Link to='/register'>Use a different email</Link>
        </div>
    )
}

export default EmailVerification;
