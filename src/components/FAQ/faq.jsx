import React, {useState} from 'react';
import '../FAQ/faq.scss';
import ArrowDown from '../../assets/CaretDown.svg';

const Faq = () => {

    const [active, setActive] = useState({
        advertiser : true,
        publisher : false
    });

    // const [state, setState] = useState({
    //     show : false,
    //     show1 : false,
    //     show2 : false,
    //     show3 : false,
    //     show4 : false,
    //     show5 : false,
    //     show6 : false,
    //     show7 : false,
    //     show8 : false,
    //     show9 : false,
    //     show10 : false,
    //     show11 : false,
    //     show12 : false,
    //     show13 : false,
    //     show14 : false,
    // })
    const [show, setstate] = useState(false);
    const [show1, setstate1] = useState(false);
    const [show2, setstate2] = useState(false);
    const [show3, setstate3] = useState(false);
    const [show4, setstate4] = useState(false);
    const [show5, setstate5] = useState(false);
    const [show6, setstate6] = useState(false);
    const [show7, setstate7] = useState(false);
    const [show8, setstate8] = useState(false);
    const [show9, setstate9] = useState(false);
    const [show10, setstate10] = useState(false);
    const [show11, setstate11] = useState(false);
    const [show12, setstate12] = useState(false);
    const [show13, setstate13] = useState(false);
    const [show14, setstate14] = useState(false);

    const handleAdvertiser = (e) => {
        e.preventDefault();
        setActive({advertiser : true, publisher : false});
    }

    const handlePublisher = (e) => {
        e.preventDefault();
        setActive({advertiser : false, publisher : true});
    }
    return (
        <div className="faq">
            <div className="container">
                <h3 className="text-center">Frequently Asked Questions(FAQs)</h3>
                <div className="captions text d-flex justify-content-between align-items-center">
                    <button onClick={handleAdvertiser} style={{background : active.advertiser ? "#333333" : "transparent", color : active.advertiser ? "white" : "#333333"}}>Advertiser</button>
                    <button onClick={handlePublisher} style={{background : active.publisher ? "#333333" : "transparent", color : active.publisher ? "white" : "#333333" }}>Publisher</button>
                </div>
                <div className="row justify-content-center" style={{display : active.advertiser ? "block" : "none"}}>
                    <div className="col-lg-8 col-sm-12" style={{margin : "auto"}}>
                        <div className="questions">
                            <div className="item">
                                <div className="text">
                                    <h5>What is Digital Marketing?</h5>
                                    <p style={{display : show ? "block" : "none"}}>Moovit Digital Advertising platform allows your firm/company to expand/grow its business globally while spending very little money. The biggest benefit of advertising with Moovit Digital is that you may target the exact audience for your ad.</p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px"  onClick={() => setstate(!show) } style={{transform : show ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>What are the sizes available?</h5>
                                    <div style={{display : show1 ? "block" : "none"}}>The following are the advertising sizes available:
                                        <ul>
                                            <li>Display Ads: 728×90,468×60, 300×250, 160×600, 120×600 & 300×600</li>
                                            <li>Text Ads: All Sizes</li>
                                            <li>Mobile Ads: 300×250, Video Ads</li>
                                        </ul>
                                    </div>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={ () => setstate1(!show1)} style={{transform : show1 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>What are the targeting options?</h5>
                                    <div style={{display : show2 ? "block" : "none"}}>
                                    Advertisers can choose from a variety of targeting choices to show their ads to the correct target audience.
                                        <ul>
                                            <li>Category Targeting</li>
                                            <li>Device Targeting</li>
                                            <li>Location Targeting</li>
                                        </ul>
                                    </div>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={ () => setstate2(!show2)} style={{transform : show2 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>How can I create an Ad?</h5>
                                    <p style={{display : show3 ? "block" : "none"}}>Creating an ad on our ads platform is incredibly very easy, your ads will go live in just a few simple steps.Its almost like you are doing nothing.</p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={ () => setstate3(!show3)} style={{transform : show3 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>Where can I see my reports?</h5>
                                    <p style={{display : show4 ? "block" : "none"}}>Tabular representations will be available on the main screen of your advertiser account. You can track the performance of your ads there. </p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={ () => setstate4(!show4)} style={{transform : show4 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>Is the reporting real-time?</h5>
                                    <p style={{display : show5 ? "block" : "none"}}>Yes, with a one-hour delay, the reports are updated in real-time. </p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={ () => setstate5(!show5)} style={{transform : show5 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>What is the minimum amount to start?</h5>
                                    <p style={{display : show6 ? "block" : "none"}}>To start a campaign at Moovit Ads you just need to pay as little as N20,000.</p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down"  width="20px" height="20px" onClick={ () => setstate6(!show6)} style={{transform : show6 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>How I am billed for my campaign?</h5>
                                    <p style={{display : show7 ? "block" : "none"}}>We provide two types of advertising model i.e. CPC (Cost-Per-Click) & CPM (Cost-Per-1000 Impression).</p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={ () => setstate7(!show7)} style={{transform : show7 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center" style={{display : active.publisher ? "block" : "none"}}>
                    <div className="col-lg-8 col-sm-12" style={{margin : "auto"}}>
                        <div className="questions">
                            <div className="item">
                                <div className="text">
                                    <h5>Who are publishers and how much does it cost to join?</h5>
                                    <p style={{display : show8 ? "block" : "none"}}>MoovitDigital  Publisher allows you to join and make money by displaying our advertiser ads on your website/blog. It’s completely free and you do not have to pay anything.</p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={() => setstate8(!show8) } style={{transform : show8 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>What type of ads do you provide?</h5>
                                    <p style={{display : show9 ? "block" : "none"}}> We offer a wide range of ad types in various formats. Like: Banner Ads Text Ads, Mobile Ads and Video Ads. </p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={ () => setstate9(!show9)} style={{transform : show9 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>How many ads can I put on a single page?</h5>
                                    <p style={{display : show10 ? "block" : "none"}}>A maximum of four ad units can be placed on a single page.</p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={ () => setstate10(!show10)} style={{transform : show10 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>Is the reporting real-time?</h5>
                                    <p style={{display : show11 ? "block" : "none"}}>Yes, with a one-hour delay, the reports are updated in real-time.</p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={ () => setstate11(!show11)} style={{transform : show11 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>How can I increase my eCPM and make more money?</h5>
                                    <p style={{display : show12 ? "block" : "none"}}>In order to raise your ecpm or maximize your earnings. Ensure that our advertising appear “Above the Fold” on the website in order to boost CTR (Click-Through-Rate). For example, the more quality and unique impressions/clicks are rendered, the higher the ecpm and the better our system optimizes your account.</p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={ () => setstate12(!show12)} style={{transform : show12 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>Can I use multiple accounts for different domain?</h5>
                                    <p style={{display : show13 ? "block" : "none"}}>No, you cannot use different accounts for different domains; however, you can use the same account for several domains. All you have to do now is log into your account and submit your new site.</p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={ () => setstate13(!show13)} style={{transform : show13 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                            </div>
                            <div className="item">
                                <div className="text">
                                    <h5>Are there any restrictions?</h5>
                                    <p style={{display : show14 ? "block" : "none"}}>We adhere a strict rule for publishers promoting our ads in the following sites, if we found that your account is violating our rules than your account will be suspended permanently and earnings will be blocked. 
                                        <span>No Drugs Related Sites</span><br></br>
                                        <span>No Gambling/Hacking Sites </span>
                                    </p>
                                </div>
                                <img src={ArrowDown} alt="Arrow Down" width="20px" height="20px" onClick={ () => setstate14(!show14)} style={{transform : show14 ? "rotate(180deg)" : "rotate(0deg)"}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faq;