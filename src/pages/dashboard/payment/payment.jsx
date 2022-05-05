import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../dashboard/dashboard.scss";
import "../../dashboard/createAds/createAds.scss";
import "../../dashboard/payment/payment.scss";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import close from "../../../assets/close2.png";
// import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import caretRight from "../../../assets/CaretRight.svg";
import ellipse2 from "../../../assets/Ellipse 28.svg";
import fluttericon from "../../../assets/Frame 180.svg";
import { Link } from "react-router-dom";
import tick from "../../../assets/Frame 338.svg";
import RequestForm from "../../../components/RequestForm/RequestForm";

const Payment = ({
  createAds,
  setCreateAds,
  showNext4,
  showNext3,
  setShowNext3,
  setShowNext4,
  setShowNext5,
}) => {
  const token = "FLWPUBK_TEST-bf499654a1dba54578deb4fa57b26682-X";
  const history = useHistory();
  // const random_string = 'MV_'+Math.floor((Math.random()*100000000)+1);
  // console.log(random_string);
  const budgetId = localStorage.getItem("bd_ix");
  const [contactAgent, setContactAgent] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let budget = "";
  if (budgetId == 1) {
    budget = 20000;
  } else if (budgetId == 2) {
    budget = 50000;
  } else if (budgetId == 3) {
    budget = 150000;
  } else if (budgetId == 4) {
    budget = 200000;
  } else if (budgetId == 5) {
    budget = 500000;
  } else if (budgetId == 6) {
    budget = 1000000;
  }
  console.log(budget);

  const config = {
    public_key: token,
    tx_ref: Date.now(),
    amount: budget,
    // redirect_url : 'https://moovitdigital.com/request-call',
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: data.email,
      phonenumber: data.phone,
      name: data.name,
    },
    customizations: {
      title: "MoovIT Digital",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleOthers = (response) => {
    if (response.status === "successful") {
      setCreateAds({ ...createAds, amount: response.amount });
      setShowNext4("none");
      setShowNext5("block");
    } else {
      console.log("try again");
    }
  };

  const handleFlutterPayment = useFlutterwave(config);
  //   const fwConfig = {
  //     ...config,
  //     text: 'Pay Now',
  //     callback: (response) => {
  //        console.log(response);
  //       closePaymentModal() // this will close the modal programmatically
  //     },
  //     onClose: () => {},
  //   };
  return (
    <div className="dashboard__main" style={{ display: showNext4 }}>
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
          <img src={ellipse2} alt="ellipse1" />
          <p>Make payment</p>
        </div>
        <div className="item last">
          <img src={ellipse2} alt="ellipse1" />
          <p>Have a call</p>
        </div>
      </div>
      <div className="payment">
        <div className="pay-heading">
          <h5>Make payment</h5>
        </div>
        <div className="row">
          <div className="col">
            <div className="form_">
              <p>Payment method</p>
              <img src={fluttericon} alt="icon" />
              <div className="form-group">
                <label htmlFor=""> Full Name</label>
                <br></br>
                <input
                  type="text"
                  placeholder="John doe"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor=""> Email-address</label>
                <br></br>
                <input
                  type="email"
                  placeholder="John@doe.com"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor=""> Phone Number</label>
                <br></br>
                <input
                  type="text"
                  placeholder="081 345 667 231"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                />
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleFlutterPayment({
                    callback: (response) => {
                      handleOthers(response);
                      closePaymentModal();
                    },
                    onClose: () => {},
                  });
                }}
              >
                Payment
              </button>
              {/* <button type="submit">Pay Now</button> */}
              {/* <FlutterWaveButton {...fwConfig} /> */}
            </div>
          </div>
          <div className="col">
            <div className="content-form">
              <h5>Price List</h5>
              <div className="price">
                <div className="tier">
                  <p>Tier 2</p>
                  <h4>{`#${budget}`}</h4>
                  <ul>
                    <li>Realtime analytics</li>
                    <li>Get 1-on-1 advice from a marketer</li>
                    <li>Post ads on social media platforms</li>
                    <li>Post ads on blogs</li>
                    <li>Two location only</li>
                    {/* <button></button> */}
                  </ul>
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

export default Payment;
