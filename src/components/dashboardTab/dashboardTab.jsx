import React from 'react';
import caretDown from '../../assets/CaretDown.svg';
import caretDown2 from '../../assets/CaretDown2.svg';
import squares from '../../assets/SquaresFour.svg';
import megaphone from '../../assets/MegaphoneSimple.svg';
import bag from '../../assets/BagSimple.svg';
import creditCard from '../../assets/CreditCard.svg';
import user from '../../assets/User.svg';
import Handshake from '../../assets/Handshake.svg';
import signout from '../../assets/SignOut.svg';

const DashboardTab = () => {
    return (
        <div className="dashboard-tab">
            <div className="tabs">
                <div className="tab-item">
                    <img src={squares} alt="" />
                    <p>Dashboard</p>
                </div>
                <div className="tab-ads">
                    <div className="tab-item">
                        <img src={megaphone} alt="" />
                        <p>Ads Management</p>
                        <img src={caretDown2} alt="" />
                    </div>
                    <div className="sub-track">
                        <p>Create an Ad</p>
                        <p>Ad History</p>
                    </div>
                </div>
                <div className="tab-item">
                    <img src={bag} alt="" />
                    <p>Packages</p>
                </div>
                <div className="tab-item">
                    <img src={creditCard} alt="" />
                    <p>Payment History</p>
                </div>
                <div className="tab-item">
                    <img src={user} alt="" />
                    <p>Profile</p>
                </div>
                <div className="tab-item">
                    <img src={Handshake} alt="" />
                    <p>Support</p>
                </div>
                <div className="tab-item">
                    <img src={signout} alt="" />
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardTab
