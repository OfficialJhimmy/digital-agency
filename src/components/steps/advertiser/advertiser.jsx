import React from "react";
import "../../steps/steps.scss";
import login from "../../../assets/Login.svg";
import login1 from "../../../assets/brafiki.svg";
import login2 from "../../../assets/pana.svg";
import login3 from "../../../assets/Group 10.svg";
import login4 from "../../../assets/db.svg";
import line1 from "../../../assets/Vector 68.svg";
import line2 from "../../../assets/Vector 69.svg";
import line3 from "../../../assets/Vector 70.svg";
import line4 from "../../../assets/Vector 71.svg";

const AdvertiserSteps = ({ active }) => {
  return (
    <div
      className="step-list"
      style={{ display: active.advertiser ? "block" : "none" }}
    >
      <div className="step_1 mb-5">
        <div className="wrapper">
          <img
            src={login}
            alt=""
            width="200px"
            height="180px"
            className="login"
          />
          <div className="count">
            <p>STEP 1</p>
            <h5>Create an account</h5>
            <p>
              Quickly set up an account with your details in few simple steps.
            </p>
          </div>
          <img src={line1} alt="" className="line1" />
        </div>
      </div>
      <div className="step_2 mb-5">
        <div className="wrapper">
          <img src={login1} alt="" width="200px" height="180px" />
          <div className="count">
            <p>STEP 2</p>
            <h5>Choose a budget</h5>
            <p>
              Choose a budget that best suit your business need/advert campaign.
            </p>
          </div>
        </div>
        <img src={line2} alt="" className="line2" />
      </div>
      <div className="step_3 mb-5">
        <div className="wrapper align-center">
          <img src={login2} alt="" width="240px" height="180px" />
          <div className="count">
            <p>STEP 3</p>
            <h5>Pick a template</h5>
            <p>Select a template design that fit the campaign type you want.</p>
          </div>
        </div>
        <img src={line3} alt="" className="line3" />
      </div>
      <div className="step_4 mb-5">
        <div className="wrapper">
          <img src={login3} alt="" width="200px" height="180px" />
          <div className="count">
            <p>STEP 4</p>
            <h5>Make payment</h5>
            <p>Choose payment option suitable.</p>
          </div>
        </div>
        <img src={line4} alt="" className="line4" />
      </div>
      <div className="step_5 mb-5">
        <div className="wrapper">
          <img
            src={login4}
            alt=""
            width="240px"
            height="180px"
            className="login"
          />
          <div className="count">
            <p>STEP 5</p>
            <h5>Publish advert</h5>
            <p>Your adverts can now be seen by your intended audience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserSteps;
