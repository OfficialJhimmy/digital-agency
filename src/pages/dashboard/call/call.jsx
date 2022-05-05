import React, { useState, useEffect } from "react";
import "../../dashboard/dashboard.scss";
import "../../dashboard/createAds/createAds.scss";
import axios from "axios";
import caretRight from "../../../assets/CaretRight.svg";
import swal from "sweetalert";
// import check from '../../../assets/Progress Tick Done.svg';
// import ellipse1 from '../../../assets/Ellipse 27.svg';
import ellipse2 from "../../../assets/Ellipse 28.svg";
import tick from "../../../assets/Frame 338.svg";
import { Link, useHistory } from "react-router-dom";
import Tags from "../../../components/Tags/Tags";
import logo from "../../../assets/image 1.png";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import hamburger from "../../../assets/hamburger.png";
import MobileTags from "../../../components/MobileTags/mobileTags";

const Call = () => {
  const history = useHistory();
  const [updateNum, setUpdateNum] = useState("");

  const token = localStorage.getItem("auth_token");
  const current_id = localStorage.getItem("auth_id");

  const authAxios = axios.create({
    // baseUrl : "https://canyousing.com.ng",
    baseUrl: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  const handleChange = (e) => {
    e.persist();
    setUpdateNum(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateNum !== "") {
      const updatingNum = await authAxios.put(
        `/api/update-number/${current_id}?phone=${updateNum}`
      );
      const response = updatingNum.data;
      console.log(response);
      history.push("/review");
    }
  };
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
  console.log(updateNum);
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
              <form onSubmit={handleSubmit}>
                <div className="call-heading">
                  <h5>Have a call</h5>
                </div>
                <div className="call-content">
                  <h3>Speak with a digital marketer</h3>
                  <p>
                    You’ll receive a call from our representative to discuss
                    your choices and provide further guidiance
                  </p>
                  <div className="phone-wrapper">
                    <p>Confirm your phone number</p>
                    <IntlTelInput
                      containerClassName="intl-tel-input"
                      inputClassName="form-control"
                      preferredCountries={["ng"]}
                      format
                      onPhoneNumberChange={(
                        status,
                        value,
                        countryData,
                        number,
                        disabled
                      ) => {
                        const formatedNumber = value.replace(/\D+/g, "");
                        if (status === true) {
                          setUpdateNum(formatedNumber);
                          // setPhone(false)
                        } else if (value.length > 13) {
                          swal("wrong number");
                          // setPhone(true)
                        }
                      }}
                      fieldName="phone"
                      required
                    />
                    {/* <input type="text" placeholder="081 344 354 432" name="phone" value={updateNum} onChange={handleChange} required/> */}
                  </div>
                  <button type="submit">
                    <Link to="/review">Proceed to call</Link>
                  </button>
                  {/* <p>Not ready yet? <span>schedule for later</span></p> */}

                  <div className="notice">
                    <p>
                      Beware of scammers. Our representative will not ask for
                      your bank details, password or any confidential
                      information.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Call;
