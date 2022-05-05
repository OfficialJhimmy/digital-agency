import React, { useState } from "react";
import "../../dashboard/dashboard.scss";
import "../../dashboard/createAds/createAds.scss";
import "../approved/approved.scss";
import caretRight from "../../../assets/CaretRight.svg";
import { Link } from "react-router-dom";
import tick from "../../../assets/Frame 338.svg";
import ellipse2 from "../../../assets/Ellipse 28.svg";
import Tags from "../../../components/Tags/Tags";
import logo from "../../../assets/image 1.png";
import hamburger from "../../../assets/hamburger.png";
import MobileTags from "../../../components/MobileTags/mobileTags";

const SMMHISTORY = () => {
  const handleClick = (e) => {
    e.preventDefault();
    setStyle({ hide: !style.hide, transformArrow: !style.transformArrow });
  };
  const [style, setStyle] = useState({
    hide: false,
    transformArrow: false,
  });
  const [ham, setHam] = useState(false);
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
              <img src={logo} alt="moovit-logo" />
            </Link>
          </div>
          <div className="text d-flex align center"></div>
        </div>
        <div className="dashboard-main-wrapper">
          <div className="tabs">
            <Tags style={style} handleClick={handleClick} />
          </div>
          <div className="mobile-tag">
            <MobileTags style={style} handleClick={handleClick} ham={ham} />
          </div>
          <div className="dashboard-main">
            <div className="call-card">
              <div className="call-heading">
                <h5>SMM History</h5>
              </div>
              <div className="call-content">
                <h3>You do not have any SMM history</h3>
                {/* <p>Your do not have any SMM history</p> */}

                <div className="btn">
                  <button>
                    <Link to="/smm">Create SMM Package</Link>
                  </button>
                  <br></br>
                  <Link to="/dashboard/advertiser">Back to dashboard</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMMHISTORY;
