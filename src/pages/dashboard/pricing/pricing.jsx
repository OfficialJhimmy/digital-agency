import React, { useState, useEffect } from "react";
import "../../dashboard/dashboard.scss";
import "../../dashboard/createAds/createAds.scss";
import caretRight from "../../../assets/CaretRight.svg";
import ellipse1 from "../../../assets/Ellipse 27.svg";
import ellipse2 from "../../../assets/Ellipse 28.svg";
import { Link } from "react-router-dom";
import tick from "../../../assets/Frame 338.svg";

const Pricing = ({
  createAds,
  budget_id,
  setCreateAds,
  showNext,
  setShowNext,
  setShowNext2,
}) => {
  const [select, setSelect] = useState(false);
  const [select1, setSelect1] = useState(false);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);
  const [select4, setSelect4] = useState(false);
  const [select5, setSelect5] = useState(false);
  const [outline, setOutline] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
    box5: false,
    box6: false,
  });

  const handleClick = (e) => {
    e.preventDefault();
    const targetId = Number(e.target.id);
    localStorage.setItem("bd_ix", targetId);
    setCreateAds({ ...createAds, budget_id: targetId });
    if (targetId == 1) {
      setOutline({
        box1: true,
        box2: false,
        box3: false,
        box4: false,
        box5: false,
        box6: false,
      });
    } else if (targetId == 2) {
      setOutline({
        box1: false,
        box2: true,
        box3: false,
        box4: false,
        box5: false,
        box6: false,
      });
    } else if (targetId == 3) {
      setOutline({
        box1: false,
        box2: false,
        box3: true,
        box4: false,
        box5: false,
        box6: false,
      });
    } else if (targetId == 4) {
      setOutline({
        box1: false,
        box2: false,
        box3: false,
        box4: true,
        box5: false,
        box6: false,
      });
    } else if (targetId == 5) {
      setOutline({
        box1: false,
        box2: false,
        box3: false,
        box4: false,
        box5: true,
        box6: false,
      });
    } else if (targetId == 6) {
      setOutline({
        box1: false,
        box2: false,
        box3: false,
        box4: false,
        box5: false,
        box6: true,
      });
    }
    // const parent = e.target.parentElement.parentElement;
    // parent.classList.add("styling");
    setShowNext("none");
    setShowNext2("block");
    scrollToTop2();
  };

  const scrollToTop2 = () => {
    document.getElementById("wrapper").scrollIntoView(0, 0);
  };
  // const nextPage = (e) => {
  //     setShowNext("none");
  //     setShowNext2("block")
  //     scrollToTop2()
  // }
  return (
    <div style={{ display: showNext }}>
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
          <img src={ellipse1} alt="ellipse1" />
          <p>Ads details</p>
        </div>
        <div className="item">
          <img src={ellipse2} alt="ellipse1" />
          <p>Pick a template</p>
        </div>
        <div className="item ">
          <img src={ellipse2} alt="ellipse1" />
          <p>Make payment</p>
        </div>
        <div className="item last">
          <img src={ellipse2} alt="ellipse1" />
          <p>Have a call</p>
        </div>
      </div>
      <div className="content-form">
        <div className="row justify-content-center">
          <h5>Pick a budget</h5>
          <div className="price-list">
            <div
              className="tier"
              style={{
                background: select ? "#F0F0F0" : "white",
                border: outline.box1 ? "1px solid grey" : "1px solid #f1efef",
              }}
            >
              <h6 className="title">SMM Starter Pack </h6>
              <h4>
                #20,000<span>/month</span>
              </h4>
              <p>(#220,000/year)</p>
              <ul>
                <li>Management of 2 Social Media Accounts</li>
                <li>6 creative designs monthly</li>
                <li>Monthly Custom Reports</li>
                <li>Performance evaluation and recommendation</li>
              </ul>
              <h6>
                This pack includes creative designs, update, situational report
                and recommendation
              </h6>
              <div className="btn-wrapper">
                <button id="1" onClick={handleClick}>
                  Choose budget
                </button>
              </div>
            </div>
            <div
              className="tier"
              style={{
                background: select1 ? "#F0F0F0" : "white",
                border: outline.box2 ? "1px solid grey" : "1px solid #f1efef",
              }}
            >
              <h6 className="title">SMM Brand Pack</h6>
              <h4>
                #50,000<span>/month</span>
              </h4>
              <p>(#550,000/year)</p>
              <ul>
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
                reports, recommendation and promotion.{" "}
              </h6>
              <div className="btn-wrapper">
                <button id="2" onClick={handleClick}>
                  Choose budget
                </button>
              </div>
            </div>
            <div
              className="tier"
              style={{
                background: select2 ? "#F0F0F0" : "white",
                border: outline.box3 ? "1px solid grey" : "1px solid #f1efef",
              }}
            >
              <h6 className="title">SMM Professional Pack</h6>
              <h4>
                #150,000<span>/month</span>
              </h4>
              <p>(#1.7 million/year)</p>
              <ul>
                <li>Management of 4 Social Media Accounts</li>
                <li>20 creative designs monthly</li>
                <li>Monthly Custom Reports</li>
                <li>Performance evaluation and recommendation</li>
                <li>6 promoted on Facebook or Instagram</li>
                <li>A recommendation call once a month</li>
                <li>Audience Targeting</li>
                <li>DM Customer Care</li>
                <li>Comment Moderation</li>
                <li>Content Calendar</li>
              </ul>
              <h6>
                This pack includes creative designs, update, situational
                reports, recommendation, promotion and an assigned account
                manager.{" "}
              </h6>
              <div className="btn-wrapper">
                <button id="3" onClick={handleClick}>
                  Choose budget
                </button>
              </div>
            </div>
            <div
              className="tier"
              style={{
                background: select3 ? "#F0F0F0" : "white",
                border: outline.box4 ? "1px solid grey" : "1px solid #f1efef",
              }}
            >
              <h6 className="title">BRAND XTRA </h6>
              <h4>
                #200,000<span>/month</span>
              </h4>
              <p>(#2.2 million/year)</p>
              <ul>
                <li>Management of 4 Social Media Accounts</li>
                <li>12 creative designs monthly</li>
                <li>Monthly Custom Reports</li>
                <li>Performance evaluation and recommendation</li>
                <li>6 promoted on Facebook or Instagram</li>
                <li>A recommendation call once a month</li>
                <li>Audience Targeting</li>
                <li>Social Media Strategy </li>
                <li>DM Customer Care</li>
                <li>250,000 CPM on publishers websites</li>
                <li>Comment Moderation</li>
                <li>Content Calendar</li>
              </ul>
              <h6>
                This pack includes creative designs, update, situational
                reports, recommendation, promotions, an assigned account manager
                and advert on blogs and websites.
              </h6>
              <div className="btn-wrapper">
                <button id="4" onClick={handleClick}>
                  Choose budget
                </button>
              </div>
            </div>
            <div
              className="tier"
              style={{
                background: select4 ? "#F0F0F0" : "white",
                border: outline.box5 ? "1px solid grey" : "1px solid #f1efef",
              }}
            >
              <h6 className="title">PROFESSIONAL XTRA </h6>
              <h4>
                #500,000<span>/month</span>
              </h4>
              <p>(#5.5 million/year)</p>
              <ul>
                <li>Management of 3 Social Media Accounts</li>
                <li>20 creative designs monthly</li>
                <li>Monthly Custom Reports</li>
                <li>Performance evaluation and recommendation</li>
                <li>10 promoted on Facebook or Instagram</li>
                <li>A recommendation call once a month</li>
                <li>Lookalike Audience Targeting</li>
                <li>Social Media Strategy </li>
                <li>DM Customer Care</li>
                <li>500,000 CPM on publishers websites</li>
                <li>1 Custom Video Creation</li>
                <li>1000 real followers </li>
                <li>Comment Moderation</li>
                <li>Content Calendar</li>
              </ul>
              <h6>
                This pack includes creative designs, update, situational
                reports, recommendation, promotions, an assigned account manager
                and advert on blogs and websites.{" "}
              </h6>
              <div className="btn-wrapper">
                <button id="5" onClick={handleClick}>
                  Choose budget
                </button>
              </div>
            </div>
            <div
              className="tier"
              style={{
                background: select5 ? "#F0F0F0" : "white",
                border: outline.box6 ? "1px solid grey" : "1px solid #f1efef",
              }}
            >
              <h6 className="title">CHERRY COMBO </h6>
              <h4>
                #1 million<span>/month</span>
              </h4>
              <p>(#11 million/year)</p>
              <ul>
                <li>Management of 4 Social Media Accounts</li>
                <li>Unlimited creative designs monthly</li>
                <li>Monthly Custom Reports</li>
                <li>Performance evaluation and recommendation</li>
                <li>20 promoted on Facebook or Instagram</li>
                <li>Recommendation calls</li>
                <li>Lookalike Audience Targeting</li>
                <li>Social Media Strategy </li>
                <li>DM Customer Care</li>
                <li>Over 1 million CPM on publishers websites</li>
                <li>2 Custom Video Creation</li>
                <li>1500 real followers </li>
                <li>Comment Moderation</li>
                <li>Content Calendar</li>
              </ul>
              <h6>
                This pack includes creative designs, update, situational
                reports, recommendation, promotions, an assigned account manager
                and advert on blogs and websites.
              </h6>
              <div className="btn-wrapper">
                <button id="6" onClick={handleClick}>
                  Choose budget
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="lower_btn text-center mt-5">
          <button className="btn btn-large" onClick={nextPage}>
            Proceed
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Pricing;
