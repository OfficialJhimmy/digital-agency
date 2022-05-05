import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pricing from "../pricing/pricing";
import Tags from "../../../components/Tags/Tags";
import "../../dashboard/dashboard.scss";
import "../../dashboard/createAds/createAds.scss";
import "../SMM/smm.scss";
import hamburger from "../../../assets/hamburger.png";
import logo from "../../../assets/image 1.png";
import close from "../../../assets/close2.png";
import MobileTags from "../../../components/MobileTags/mobileTags";
import RequestForm from "../../../components/RequestForm/RequestForm";

const SMM = () => {
  const [style, setStyle] = useState({
    hide: false,
    transformArrow: false,
  });
  const [contactAgent, setContactAgent] = useState(false);
  const [ham, setHam] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setStyle({ hide: !style.hide, transformArrow: !style.transformArrow });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const toggler = (e) => {
    e.preventDefault();
    setHam(!ham);
  };
  return (
    <div className="dashboard create-ads smm">
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
            <form onSubmit={handleSubmit}>
              <Pricing
              // createAds={createAds}
              // setCreateAds={setCreateAds}
              />
              <div className="social-media-wrapper">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <h5>Business Name</h5>
                      <input type="text" placeholder="The Brand Hub" />
                    </div>
                    <div className="form-group">
                      <h5>Social Media Page</h5>
                      <input
                        type="text"
                        placeholder="www.facebook.com/comanyname"
                      />
                    </div>
                    <div className="form-group">
                      <h5>Social Media Page</h5>
                      <input
                        type="text"
                        placeholder="www.facebook.com/comanyname"
                      />
                    </div>
                  </div>
                </div>
                <button className="mt-5">Send Request</button>
              </div>
            </form>
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

export default SMM;
