import React from "react";
import "../../steps/steps.scss";
import card from "../../../assets/card1.svg";
import publish from "../../../assets/Screen1.svg";
import banner from "../../../assets/cuate1.svg";
import approved from "../../../assets/bro1.svg";
import login from "../../../assets/Login1.svg";
import line1 from "../../../assets/Vector 68.svg";
import line2 from "../../../assets/Vector 69.svg";
import line3 from "../../../assets/Vector 70.svg";
import line4 from "../../../assets/Vector 71.svg";

const PublisherSteps = ({ active }) => {
  return (
    <div
      className="step-list publisher"
      style={{ display: active.publisher ? "block" : "none" }}
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
              Quickly set up an account with your detials in few simple steps
            </p>
          </div>
          <img src={line1} alt="" className="line1" />
        </div>
      </div>
      <div className="step_2 mb-5">
        <div className="wrapper">
          <img src={approved} alt="" width="200px" height="180px" />
          <div className="count">
            <p>STEP 2</p>
            <h5>Get approved</h5>
            <p>Get onboard after proper review of your request</p>
          </div>
        </div>
        <img src={line2} alt="" className="line2" />
      </div>
      <div className="step_3 mb-5">
        <div className="wrapper">
          <img src={banner} alt="" width="240px" height="180px" />
          <div className="count">
            <p>STEP 3</p>
            <h5>Receive ads banners</h5>
            <p>Get ads to run on your platform immediately</p>
          </div>
        </div>
        <img src={line3} alt="" className="line3" />
      </div>
      <div className="step_4 mb-5">
        <div className="wrapper">
          <img src={publish} alt="" width="200px" height="180px" />
          <div className="count">
            <p>STEP 4</p>
            <h5>Publish ads on site</h5>
            <p>Start running ads on your platform immediately</p>
          </div>
        </div>
        <img src={line4} alt="" className="line4" />
      </div>
      <div className="step_5 mb-5">
        <div className="wrapper">
          <img
            src={card}
            alt=""
            className="login"
            width="240px"
            height="180px"
          />
          <div className="count">
            <p>STEP 5</p>
            <h5>Get paid</h5>
            <p>Recieve payment for all ads running on your platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherSteps;
