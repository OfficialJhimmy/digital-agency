import React, { useState, useEffect } from "react";
import "../../dashboard/dashboard.scss";
import "../../dashboard/createAds/createAds.scss";
import caretRight from "../../../assets/CaretRight.svg";
import ellipse2 from "../../../assets/Ellipse 28.svg";
import logo from "../../../assets/image 1.png";
import hamburger from "../../../assets/hamburger.png";
import { Link } from "react-router-dom";
import Tags from "../../../components/Tags/Tags";
import MobileTags from "../../../components/MobileTags/mobileTags";
import tick from "../../../assets/Frame 338.svg";
import RequestForm from "../../../components/RequestForm/RequestForm";
import close from "../../../assets/close2.png";

const Review = () => {
  const [contactAgent, setContactAgent] = useState(false);
  const [style, setStyle] = useState({
    hide: false,
    transformArrow: false,
  });
  const [ham, setHam] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setStyle({ hide: !style.hide, transformArrow: !style.transformArrow });
  };
  const toggler = (e) => {
    e.preventDefault();
    setHam(!ham);
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
            <div className="pages-link">
              <Link to="#">Home</Link>
              <img src={caretRight} alt="caret right" />
              <Link to="#">Create an Ad</Link>
            </div>
            <div className="page-progress">
              <div className="item first">
                <img src={tick} alt="ellipse1" />
                <p>Select a budget</p>
              </div>
              <div className="item">
                <img src={tick} alt="ellipse1" />
                <p>Ads details</p>
              </div>
              <div className="item">
                <img src={tick} alt="ellipse1" />
                <p>Pick a template</p>
              </div>
              <div className="item ">
                <img src={tick} alt="ellipse 1" />
                <p>Make payment</p>
              </div>
              <div className="item last">
                <img src={ellipse2} alt="ellipse1" />
                <p>Have a call</p>
              </div>
            </div>
            <div className="call-card">
              <div className="call-heading">
                <h5>Have a call</h5>
              </div>
              <div className="call-content">
                <h3>Your request is under review</h3>
                <p>
                  We ensure that contents are up to standard and is not
                  misleading. This will only take a few moment.
                </p>

                <div className="btns">
                  <button>
                    <Link to="/dashboard/advertiser">Back to dashboard</Link>
                  </button>
                  <button>
                    <Link to="/create-ads">Create another ad</Link>
                  </button>
                </div>

                <div className="notice">
                  <p>Your ad has been saved and can be viewed in ads history</p>
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

export default Review;
