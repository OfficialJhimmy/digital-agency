import React from 'react';
import '../../components/MobileTags/mobile-tags.scss';
import { Link } from 'react-router-dom';
import squares from '../../assets/SquaresFour.svg';
import megaphone from '../../assets/MegaphoneSimple.svg';
import bag from '../../assets/BagSimple.svg';
import creditCard from '../../assets/CreditCard.svg';
import user from '../../assets/User.svg';
import Handshake from '../../assets/Handshake.svg';
import signout from '../../assets/SignOut.svg';

const PublisherMobileTags = ({ ham, handleLogout, notification_count }) => {
    return (
        <div className="mobile-tags" style={{display : ham ? "block" : "none"}}>
            <div className="tab-item">
                <img src={squares} alt="" />
                    <Link to='/dashboard/publisher'>Dashboard</Link>
                </div>
                <div className="tab-ads">
                    <div className="tab-item">
                        <img src={megaphone} alt="" />
                        <p>
                            <Link to='/publisher-ads-history'>Ads History</Link>
                        </p>
                    </div>
                </div>
                <div className="tab-item">
                    <img src={bag} alt="" />
                    <Link to='/publisher/adcode'>Adcodes</Link>
                </div>
                <div className="tab-item">
                    <img src={bag} alt="" />
                    <p>
                        <Link to='/publisher/notifications'>Notifications <span style={{display
            : notification_count < 1 ? "none" : "flex"}}>{notification_count}</span></Link>
                    </p>
                </div>
                <div className="tab-item">
                    <img src={creditCard} alt="" />
                    <Link to='/publisher-payment-history'>Finance</Link>
                </div>
                <div className="tab-item">
                    <img src={creditCard} alt="" />
                    <Link to='/publisher/withdraw'>Request Withdrawal</Link>
                </div>
                <div className="tab-item">
                    <img src={user} alt="" />
                    <Link to='/publisher/profile'>Profile</Link>
                </div>
                <div className="tab-item">
                    <img src={Handshake} alt="" />
                    <Link to='/publisher/support'>Support</Link>
                </div>
                <div className="tab-item">
                    <img src={signout} alt="" />
                    <p onClick={handleLogout} className="logout">Logout</p>
                </div>
        </div>
    )
}

export default PublisherMobileTags;
