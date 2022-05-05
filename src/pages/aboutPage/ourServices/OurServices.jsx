import React from 'react';
import '../ourServices/OurServices.scss';
import icon3 from '../../../assets/icon 3.svg';
import icon2 from '../../../assets/icon 2.svg';
import icon5 from '../../../assets/icon 5.svg';
import wink from '../../../assets/wing.svg';
import smile from '../../../assets/smile.svg';

const OurServices = () => {
    return (
        <div className="our-services">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="content">
                            <img src={smile} alt="smile-icon" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="content">
                            <h3>Digital Advertisement</h3>
                            <p> What you need then is an internet marketing agency that can start by asking you the most important question: “How can we help you?” (and actually listen). Then refine your core goals and let the strategic internet marketing process unfold.</p>
                            <p>Our strategic marketing is structured to approach where we help you (the business owner or manager) clearly define what you are trying to accomplish, plan and implement specific action steps, then measure and analyze the results and repeat the process. So, it works to not only shorten the sales cycle, but maximize your business's return on investment by marketing with selective intent.
                            We help you get in front of potential clients. Get the most out of your online advertising budget with the right mix of creativity and hi-tech precision; we generate successful advertising campaigns for all types of businesses.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col second">
                        <div className="content text-center">
                            <img src={wink} alt="smile-icon" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="content">
                            <h3>Business Advisory</h3>
                            <p>Digital promotion is a quicker mode for organizations to successfully connect with their target market. Such promotion through digital media, allows organizations to meaningfully track and evaluate marketing campaigns as well.</p>
                            <p> In the absence of right digital strategy in place, the overall efforts through digital assets will turn out to planned wastage. We prepare plan to improve the benefits out of all digital assets as well as promotional strategies. As part of the digital advisory services, our team makes a thorough study of your business goals against digital media strategies adopted by competitors in the industry. Our digital marketing advisors deliver actionable plan of action aligned to your business objectives in the digital arena.</p>
                        </div>
                    </div>
                    <div className="col bottom">
                        <div className="content text-center">
                            <img src={icon3} alt="smile-icon" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="content">
                            <img src={icon2} alt="smile-icon" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="content">
                            <h3>Strategy Mapping</h3>
                            <p>Strategy is at the heart of every approach we take to a campaign, centered around the needs of the client. We use insights and data to construct deliverables that help our clients achieve their business objectives. We are dedicated to creating strategic solutions that deliver on the goals of every brand while being economically viable and visually exciting</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="content">
                            <h3>Social Media Management</h3>
                            <p>Our team has experience in creating and managing top-performing social media campaigns on networks such as Facebook, Instagram, LinkedIn and Google. Each campaign is uniquely designed to meet the goals of your business, save you time, and generate results.</p>
                            <p>Social media is a great way to build your brand's image and gain awareness in the marketplace. Additionally, social media activity is now included as a ranking factor in search engine optimization and can help your SEO efforts to rank high on Google and other search engines. That is why it is important to do social media right.</p>
                            <p>Our approach to social media management focuses on audience development by presenting a clear and coherent voice of the brand to grow your community over time with relevant content and dependable engagement.Grow your business with the influence and branding of social media, we make it easy to earn new engagement and build awareness.</p>
                            {/* <p>Our team of innovators brings skills above and beyond the ordinary to every project. Social Media is a critical medium for growth in modern marketing. Being able to reach people at any stage of their journeys.</p>
                            <p>Be what everyone’s talking about!</p> */}
                        </div>
                    </div>
                    <div className="col">
                        <div className="content text-center">
                            <img src={icon5} alt="smile-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurServices;
