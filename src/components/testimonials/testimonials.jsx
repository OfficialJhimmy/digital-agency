import React from 'react';
import '../testimonials/testimonials.scss';
import user from '../../assets/Ellipse 1.png';
import star from '../../assets/Star.svg';

const Testimonials = () =>{
    return(
        <div className="testimonial">
            <div className="container">
                <h3>Testimonials</h3>
                <p><div></div> Here is what our clients are saying about us</p>

                <div className="testimony">
                    <div className="item">
                        <div className="user-profile">
                            <div className="profile-top">
                                <img src={user} alt="" />
                                <div className="name">
                                    <h5>John Bellon</h5>
                                    <img src={star} alt="user star ratings" />
                                    <img src={star} alt="user star ratings" />
                                    <img src={star} alt="user star ratings" />
                                    <img src={star} alt="user star ratings" />
                                    <img src={star} alt="user star ratings" />
                                </div>
                            </div>
                            <div className="comment">
                                <p>"Wow what great service, I love it! It's is the most valuable business resource we have EVER purchased. We can't understand how we've been living without it."</p>
                            </div>
                            <p className="publisher">-Publisher, Lagos</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="user-profile">
                            <div className="profile-top">
                                <img src={user} alt="" />
                                <div className="name">
                                    <h5>John Bellon</h5>
                                    <img src={star} alt="user star ratings" />
                                    <img src={star} alt="user star ratings" />
                                    <img src={star} alt="user star ratings" />
                                    <img src={star} alt="user star ratings" />
                                    <img src={star} alt="user star ratings" />
                                </div>
                            </div>
                            <div className="comment">
                                <p>"Wow what great service, I love it! It's is the most valuable business resource we have EVER purchased. We can't understand how we've been living without it."</p>
                            </div>
                            <p className="publisher">-Publisher, Lagos</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="user-profile">
                            <div className="profile-top">
                                <img src={user} alt="" />
                                <div className="name">
                                    <h5>John Bellon</h5>
                                    <img src={star} alt="user star ratings" />
                                    <img src={star} alt="user star ratings" />
                                    <img src={star} alt="user star ratings" />
                                    <img src={star} alt="user star ratings" />
                                    <img src={star} alt="user star ratings" />
                                </div>
                            </div>
                            <div className="comment">
                                <p>"Wow what great service, I love it! It's is the most valuable business resource we have EVER purchased. We can't understand how we've been living without it."</p>
                            </div>
                            <p className="publisher">-Publisher, Lagos</p>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Testimonials;