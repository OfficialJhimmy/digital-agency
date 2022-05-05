import React, { useState } from 'react';
import '../accountType/accountType.scss';
import image from '../../assets/image 1.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/header/header';

const AccountType = ({navBackground}) => {

    return (
        <div className="account-type">
            <Header navBackground={navBackground}/>
            <div className="small-wrapper">
                <img src={image} alt="logo" className="mb-2"/>
                <p>Choose an account type</p>

                <button>
                    <Link to='/user-registration'>Continue as an advertiser</Link>
                </button>
                <button className="thin">
                    <Link to='/publisher-form'>Continue as a publisher</Link>
                </button>

                <p>Don’t know yet? <span>Request a call now!</span></p>
            </div>
        </div>
    )
}

export default AccountType;
