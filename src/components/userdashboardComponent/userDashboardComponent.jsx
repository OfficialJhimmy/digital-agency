import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import EmptyData from "../../assets/empty-data.svg";
import ChartComp from "../Chart/Chart";
import "./userDashboardComponent.scss";

const UserDashboardComponent = ({ adsCount, impressionCount, clickCount }) => {
  const current_user = localStorage.getItem("auth_name");
  return (
    <div>
      <div className="main-heading">
        <div className="welcome">
          <p>Welcome Back</p>
          <h4>{current_user}</h4>
        </div>
        <div className="smm">
          <Link to="/smm">Purchase SMM Package</Link>
        </div>
      </div>
      <div className="main-records">
        <div className="funds-wrapper">
          <div className="fund-balance">
            <p>All Records</p>
            {/* <h3>#00.00 <span>TOP-UP</span></h3> */}
          </div>
          <div className="create-ads-btn">
            <button>
              <span>+</span>
              <Link to="/create-ads">Create an Ad</Link>
            </button>
          </div>
        </div>

        <div className="ads-records">
          <div className="total">
            <h4>{adsCount}</h4>
            <p>Total Campaign</p>
          </div>
          <div className="impression">
            <h4>{impressionCount}</h4>
            <p>Impressions</p>
          </div>
          <div className="clicks">
            <h4>{clickCount}</h4>
            <p>Total Clicks</p>
          </div>
          <div className="clicks">
            <h4>0</h4>
            <p>Running Ads</p>
          </div>
        </div>
      </div>

      <div className="ads-stats">
        <div className="ads-graph">
          <div className="graph-heading">
            <p>Ads chart</p>
          </div>
          <div className="graph-view">
            <ChartComp />
          </div>
        </div>
        <div className="smm-package">
          <div className="smm-heading">
            <div className="item">
              <Link to="/smm-history"> SMM Package</Link>
              <h5>Premium</h5>
            </div>
            <div className="cancel-plan">{/* <p>Cancel plan</p> */}</div>
          </div>
          <div className="running-smm">
            <img src={EmptyData} alt="Empty Data" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardComponent;
