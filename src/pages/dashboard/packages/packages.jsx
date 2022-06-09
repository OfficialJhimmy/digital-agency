import React, { useState } from "react";
import "../../dashboard/dashboard.scss";
import "../../dashboard/createAds/createAds.scss";
import Tags from "../../../components/Tags/Tags";
import MobileTags from "../../../components/MobileTags/mobileTags";
import { Link } from "react-router-dom";
import hamburger from "../../../assets/hamburger.png";
import logo from "../../../assets/image 1.png";
import close from "../../../assets/close2.png";
import RequestForm from "../../../components/RequestForm/RequestForm";

const Packages = () => {
  const [style, setStyle] = useState({
    hide: false,
    transformArrow: false,
  });
  const [ham, setHam] = useState(false);
  const [contactAgent, setContactAgent] = useState(false);
  const toggler = (e) => {
    e.preventDefault();
    setHam(!ham);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setStyle({ hide: !style.hide, transformArrow: !style.transformArrow });
  };
  return (
    <div className="dashboard create-ads">
      <div className="small-title">
        <div className="title-text justify-content-between">
          <div className="logo">
            <img
              src={hamburger}
              alt="hamburger"
              width="25px"
              className="hamburger"
              onClick={toggler}
            />
            <Link to="/home" rel="canonical">
              <img src={logo} alt="moovit-logo" className="logo-img" />
            </Link>
            <div className="text d-flex align-items-center mobile">
              <p className="mt-1">Need help?</p>
              <button onClick={() => setContactAgent(true)}>
                Contact an agent
              </button>
            </div>
          </div>
          <div className="text d-flex align-items-center">
            <p className="mt-1">Need help?</p>
            <button onClick={() => setContactAgent(true)}>
              Contact an agent
            </button>
          </div>
        </div>
        <div className="dashboard-main-wrapper">
          <div className="tabs">
            <Tags style={style} handleClick={handleClick} />
          </div>
          <div className="mobile-tag">
            <MobileTags style={style} handleClick={handleClick} ham={ham} />
          </div>
          <div className="dashboard-main">
            <div className="content-form">
              <div className="row justify-content-center">
                <h5>Packages</h5>
                <div className="price-list">
                  <div className="tier">
                    <h6 className="title">Pepper Jollof </h6>
                    <h4>
                      #50,000<span>/month</span>
                    </h4>
                    <p>(#550,000/year)</p>
                    <ul>
                      <li>Social media strategy</li>
                      <li>Management of 4 Social Media Accounts</li>
                      <li>12 creative designs monthly</li>
                      <li>Monthly Custom Reports</li>
                      <li>Performance evaluation and recommendation</li>
                      <li>3 promoted on Facebook or Instagram</li>
                      <li>A recommendation call once a month</li>
                      <li>Audience Targeting</li>
                    </ul>
                    <h6>
                      This pack includes creative designs, update, situational
                      report and recommendation
                    </h6>
                  </div>
                  <div className="tier">
                    <h6 className="title">Sunday Jollof</h6>
                    <h4>
                      #170,000<span>/month</span>
                    </h4>
                    <p>(#1.9 million/year)</p>
                    <ul>
                      <li>Social media strategy</li>
                      <li>Management of 4 Social Media Accounts</li>
                      <li>20 creative designs monthly</li>
                      <li>Monthly Custom Reports</li>
                      <li>Performance evaluation and recommendation</li>
                      <li>1 week PPC (Pay Per Click) ads campaign</li>
                      <li>6 promoted on Facebook or Instagram</li>
                      <li>A recommendation call once a month</li>
                      <li>Audience Targeting</li>
                      <li>Content Calendar</li>
                      <li>Account Manager Customer care</li>
                    </ul>
                    <h6>
                      This pack includes creative designs, update, situational
                      reports, recommendation, promotion and an assigned account manager.
                    </h6>
                  </div>
                  <div className="tier">
                    <h6 className="title">Local Jollof</h6>
                    <h4>
                      #250,000<span>/month</span>
                    </h4>
                    <p>(#2.8 million/year)</p>
                    <ul>
                      <li>Social media strategy</li>
                      <li>Management of 4 Social Media Accounts</li>
                      <li>12 creative designs monthly</li>
                      <li>Monthly Custom Reports</li>
                      <li>Performance evaluation and recommendation</li>
                      <li>2 weeks PPC (Pay Per Click) ads campaign</li>
                      <li>6 Facebook/Instagram Ad campaign</li>
                      <li>A recommendation call once a month</li>
                      <li>Audience Targeting</li>
                      <li>250,000 CPM on publishers websites</li>
                      <li>Content Calendar</li>
                      <li>Account Manager Customer care</li>
                    </ul>
                    <h6>
                    This pack includes creative designs, update, situational reports, recommendation, promotions, an assigned account manager and advert on blogs and websites.
                    </h6>
                  </div>
                  <div className="tier">
                    <h6 className="title">Owambe Jollof </h6>
                    <h4>
                      #500,000<span>/month</span>
                    </h4>
                    <p>(#5.5 million/year)</p>
                    <ul>
                      <li>Management of 3 Social Media Accounts</li>
                      <li>20 creative designs monthly</li>
                      <li>Monthly Custom Reports</li>
                      <li>1 Custom Video Creation</li>
                      <li>Performance evaluation and recommendation</li>
                      <li>10 Facebook/Instagram campaign Ads</li>
                      <li>Lookalike Audience Targeting</li>
                      <li>Social Media Strategy </li>
                      <li>500,000 CPM on publishers websites</li>
                      <li>1000 real followers </li>
                      <li>Content Calendar</li>
                      <li>Account Manager Customer care</li>
                    </ul>
                    <h6>
                    This pack includes creative designs, update, situational reports, recommendation, promotions, an assigned account manager and advert on blogs and websites.
                    </h6>
                  </div>
                  <div className="tier">
                    <h6 className="title">Jollof Jollof </h6>
                    <h4>
                      #1.5 million<span>/month</span>
                    </h4>
                    <p>(#16 million/year)</p>
                    <ul>
                      <li>Management of 4 Social Media Accounts</li>
                      <li>Unlimited creative designs monthly</li>
                      <li>Monthly Custom Reports</li>
                      <li>Performance evaluation and recommendation</li>
                      <li>20 promoted on Facebook or Instagram</li>
                      <li>1 month PPC (Pay Per Click) ads campaign</li>
                      <li>Lookalike Audience Targeting</li>
                      <li>Social Media Strategy </li>
                      <li>Over 750,000 CPM on publishers websites</li>
                      <li>2 Custom Video Creation</li>
                      <li>1500 real followers </li>
                      <li>Content Calendar</li>
                      <li>Email marketing</li>
                      <li>Account Manager Customer care</li>
                    </ul>
                    <h6>
                    This pack includes creative designs, update, situational reports, recommendation, promotions, an assigned account manager and advert on blogs and websites.
                    </h6>
                  </div>
                  <div className="tier">
                    <h6 className="title">Pantry Jollof</h6>
                    <h4>
                      #2 million<span>/month</span>
                    </h4>
                    <p>(#11 million/year)</p>
                    <ul>
                      <li>Management of 4 Social Media Accounts</li>
                      <li>Unlimited creative designs monthly</li>
                      <li>Monthly Custom Reports</li>
                      <li>Performance evaluation and recommendation</li>
                      <li>20 promoted on Facebook or Instagram</li>
                      <li>1 month PPC (Pay Per Click) ads campaign</li>
                      <li>Lookalike Audience Targeting</li>
                      <li>Social Media Strategy </li>
                      <li>Over 1 million CPM on publishers websites</li>
                      <li>3 Custom Video Creation</li>
                      <li>2000 real followers </li>
                      <li>Comment Moderation</li>
                      <li>Content Calendar</li>
                      <li>Email marketing</li>
                      <li>Account Manager Customer care</li>
                    </ul>
                    <h6>
                    This pack includes creative designs, update, situational reports, recommendation, promotions, an assigned account manager and advert on blogs and websites.
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="contact-agent"
        style={{ display: contactAgent ? "block" : "none" }}
      >
        {/* <h5>Contact an agent</h5> */}
        <RequestForm />
        <div className="close" onClick={() => setContactAgent(false)}>
          <img src={close} alt="close btn" width="20px" height="20px" />
        </div>
      </div>
    </div>
  );
};

export default Packages;
