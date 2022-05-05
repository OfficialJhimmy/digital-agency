import React from 'react';
import '../AdvertiserPage/advertiserPage.scss';
import { Link } from 'react-router-dom';
import phone from '../../assets/smartphone.png';
import coin from '../../assets/naira.png';
import stand from '../../assets/stand.svg';
import tablet from '../../assets/tablet.png';
import desktop from '../../assets/desktop.png';
import network from '../../assets/jale.png';
import smile from '../../assets/smile.svg';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const PublisherPage = ({navBackground}) => {
    return (
        <div className="advertiser publisher">
            <Header navBackground={navBackground} />
            <h2 style={{paddingTop: "120px"}}>Publisher</h2>
            <div className="our-services">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="content">
                                <img src={stand} alt="smile-icon" className='stand' />
                            </div>
                        </div>
                        <div className="col">
                            <div className="content">
                                <h3>Got a Website? Lets Make Money!</h3>
                                <div className="row cpc">
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="inner-wrapper">
                                            <h4> Register For Free</h4>
                                            <p>You are 3 easy steps away from your successful monetization.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="inner-wrapper">
                                            <h4>Add Website</h4>
                                            <p>Submit your website for approval and start monetizing today.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row cpc">
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="inner-wrapper">
                                            <h4>Place Ad Codes</h4>
                                            <p>Simply add a few lines of code to your website to start earning.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-12">
                                        <div className="inner-wrapper">
                                            <h4> Start Monetizing</h4>
                                            <p>Monetize your website traffic with our highest paying ad network.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row note">
                        <div className="col">
                            <div className="content text-center">
                                <h3 className="why">We are One of the Highest Paying Ad Network For Publishers</h3>
                                <p>Start monetizing your website traffic by placing our ad codes from your publisher account, we are the highest paying CPC ad network and CPM ad network for publishers across the globe.</p>
                                <p>Moovit is an online cpm/cpc ad network for publishers that pays you for every valid click/impression on your website. Our system ensures that the highest-bidder ads are displayed on your websites, ensuring the best possible revenue at any given time. Ad codes are available as html one line ad code that can be used to display banner ads, text ads, mobile ads, and pop ads on your website.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="place row">
                <div className="container">
                    <div className="content">
                        <h2>Why Choose Us?</h2>
                        <img src={smile} alt="" className='smile'/>
                        <p>Moovit is one of the leading highest paying ads network and gives publishers complete control over their audience, equipping them with technology that allows them to engage and keep people, make revenue from direct advertisers, and develop monetization strategies based on extensive data.</p>
                    </div>
                </div>
            </div>
            <div className="container where-wrapper">
                <div className="row align-items-center justify-content-center">
                    <div className="col">
                        <div className="content where">
                            <h4 className=''>CPC & CPM Ad Network</h4>
                            <p>Our platform serves ads in two models CPM & CPC ada and there are a few fundamental pricing methods for online ads. CPC and CPM ad network are one of the most popular. CPC (Cost-Per-Click) ad pays you for each click your visitors make on our advertising ads. CPM (Cost-Per-Thousand-Impressions) ad pays you for every impression your visitors viewed of our advertiser ads.</p>

                            <div className="type d-flex, align-center justify-content-between">
                                <div className="content">
                                    <img src={coin} alt="naira coin" />
                                    <p>CPC ADS</p>
                                </div>
                                <div className="content">
                                    <img src={coin} alt="naira coin" />
                                    <p>CPM ADS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="content">
                            <img src={network} alt="smile-icon" className='big-img' />
                    </div>
                        </div>
                </div>
            </div>
            
            <div className="container ">
                <h4>Types Of Ads Format:</h4>
                <div className="advertising w-full">
                    <div className="row-content">
                        <div className="img-wrap" style={{background : "#33C0CE"}}>
                            <img src={desktop} alt="" />
                        </div>
                        <h5>Desktop Ads</h5>
                    </div>
                    <div className="row-content">
                        <div className="img-wrap" style={{background : "#FCB415"}}>
                            <img src={phone} alt="" />
                        </div>
                        <h5>Mobile Ads</h5>
                    </div>
                    <div className="row-content">
                        <div className="img-wrap" style={{background : "#EE315D"}}>
                            <img src={tablet} alt="" className="" />
                        </div>
                        <h5>Native Ads</h5>
                    </div>
                    <div className="row-content">
                        <div className="img-wrap" style={{background : "#EE315D"}}>
                            <img src={tablet} alt="" className="" />
                        </div>
                        <h5>Pop Ads</h5>
                    </div>
                </div>
                <div className="place pbtn">
                    <div className="content">
                        <button>
                            <Link to='/register'>Start Monetizing Now!</Link>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PublisherPage;
