import React from 'react';
import '../AdvertiserPage/advertiserPage.scss';
import '../../pages/aboutPage/ourServices/OurServices.scss';
import { Link } from 'react-router-dom';
import multiple from '../../assets/Frame 478.svg';
import target from '../../assets/Frame 479.svg';
import realtime from '../../assets/Frame 480.svg';
import organic from '../../assets/Frame 481.svg';
import phone from '../../assets/smartphone.png';
import icon2 from '../../assets/icon 2.svg';
import tablet from '../../assets/tablet.png';
import desktop from '../../assets/desktop.png';
import smile from '../../assets/wing.svg';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const AdvertiserPage = ({navBackground}) => {
    return (
        <div className="advertiser">
            <Header navBackground={navBackground} />
            <h2 style={{paddingTop: "120px"}}>Advertiser</h2>
            <div className="our-services">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="content">
                                <img src={smile} alt="smile-icon" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="content">
                                <h3>Buy Website Traffic At Low Cost!</h3>
                                <p> Buy website traffic online at our advertising network platform and boost website traffic at low cost. Create CPM/CPC display ads in the format of banner, text and pop ads. Reach the targeted audience with our multiple targeting options.</p>
                                <div className="row cpc">
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="inner-wrapper">
                                            <h4>CPC Advertising</h4>
                                            <p>CPC Advertising is the price you pay for every click made on any of your CPC ads.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="inner-wrapper">
                                            <h4>CPM Advertising</h4>
                                            <p>CPM Advertising means you pay for every 1000 impressions as the ad appears.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="content mr-4">
                                <h3 className="why">Why Choose Us?</h3>
                                <h5 className='mt-3 mb-3'>Leading Online CPC/CPM/PPC Advertising Network</h5>
                                <p>Moovit online advertising platform provides the ability for your firm/company to expand & grow your business worldwide with little capital. The best way to increase your website traffic is to advertise with Moovit, as you can create CPC & CPM Ads using our ads network platform with variety types of ads like banner, text and pop advertising. Generate high quality leads to your websites.</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="point-wrapper">
                                <div className="outlines">
                                    <img src={multiple} alt="" width="50px" height="50px" />
                                    <p>Multiple Ad Formats</p>
                                </div>
                                <div className="outlines">
                                    <img src={target} alt="" width="50px" height="50px"/>
                                    <p>Target Right Audience</p>
                                </div>
                                <div className="outlines">
                                    <img src={realtime} alt="" width="50px" height="50px"/>
                                    <p>Realtime Reporting</p>
                                </div>
                                <div className="outlines">
                                    <img src={organic} alt="" width="50px" height="50px"/>
                                    <p>100% Human Quality Traffic</p>
                                </div>
                                {/* <div className="bullets">
                                    <p>Start Campaign At Just #20,000</p>
                                    
                                    
                                    
                                    
                                </div> */}
                            </div>
                        </div>
                        {/* <div className="col bottom">
                            <div className="content text-center">
                                <img src={icon3} alt="smile-icon" />
                            </div>
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="content">
                                <img src={icon2} alt="smile-icon" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="content where">
                                <h3 className=''>Where My Ads Are Shown?</h3>
                                <h5>DISPLAYS IN TOP PUBLISHER SITES</h5>
                                <p>Your ads will be shown in top publisher sites in our network with the filtration you set while creating a campaign.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container ">
                <div className="advertising">
                    <div className="row-content">
                        <div className="img-wrap" style={{background : "#33C0CE"}}>
                            <img src={desktop} alt="" />
                        </div>
                        <h5>Desktop Advertising</h5>
                        <p>Desktop ppc/cpc/cpm advertising means that your ads will be shown in all our publishers website visitors who access from desktop or laptop device.</p>
                    </div>
                    <div className="row-content">
                        <div className="img-wrap" style={{background : "#FCB415"}}>
                            <img src={phone} alt="" />
                        </div>
                        <h5>Mobile Advertising</h5>
                        <p>Mobile ppc/cpm/cpc advertising means that your ads will be shown in all our publishers website visitors who access from mobile device either android or ios.</p>
                    </div>
                    <div className="row-content">
                        <div className="img-wrap" style={{background : "#EE315D"}}>
                            <img src={tablet} alt="" className="" />
                        </div>
                        <h5>Tablet Advertising</h5>
                        <p>Tablet cpc/cpm/ppc advertising means that your ads will be shown to all the users who browse articles or category pages and access from tablet device.</p>
                    </div>
                </div>
            </div>
            <div className="place row">
                <div className="container">
                    <div className="content">
                        <h2>Place ads today! & reach millions of users worldwide!</h2>
                        <button>
                            <Link to='/register'>Create Ads Campaign Now!</Link>
                        </button>
                        <p>Grow your conversions and engagement using our vast affilations, digital marketing insights and in-depth analytics</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdvertiserPage;
