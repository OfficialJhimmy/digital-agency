import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../dashboard/dashboard.scss";
import squares from "../../../assets/SquaresFour.svg";
import megaphone from "../../../assets/MegaphoneSimple.svg";
import bag from "../../../assets/BagSimple.svg";
import creditCard from "../../../assets/CreditCard.svg";
import user from "../../../assets/User.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import Loader from "react-loader-spinner";
import swal from "sweetalert";
import axios from "axios";
import logo from "../../../assets/image 1.png";
import hamburger from "../../../assets/hamburger.png";
import PublisherMobileTag from "../../../components/Pub-mobile-Tab/PubMobileTag";

const Withdraw = () => {
  const history = useHistory;
  const [ham, setHam] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const [data, setData] = useState({
    fullName: "",
    bankName: "",
    account: "",
    amount: "",
  });
  const handleChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const FormSubmit = (e) => {
    e.preventDefault();

    const data_group = {
      firstName: data.fullName,
      bankName: data.bankName,
      amount: data.amount,
      account: data.account,
    };

    const newForm = new FormData();
    newForm.append("bankName", data_group.firstName);
    newForm.append("bank", data_group.bankName);
    newForm.append("amount", data_group.amount);
    newForm.append("accountNumber", data_group.account);

    const authAxios = axios.create({
      baseURL: "https://moovitapi.com",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "applciation/json",
      },
    });
    authAxios
      .post("/api/user/withdraw", newForm)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          swal("Great!", "Request has been sent successfully", "success").then(
            () => {
              setData({ fullName: "", amount: "", bankName: "", account: "" });
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allNotifications = await authAxios.get("/api/user/notifications");
        const notification_array = allNotifications.data;
        setNotification(notification_array.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    authAxios
      .post("https://moovitapi.com/api/user/logout")
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          history.push("/home");
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const toggler = (e) => {
    e.preventDefault();
    setHam(!ham);
  };
  let notification_count = notification.length;

  return (
    <div className="dashboard">
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
            <div className="tab-item">
              <img src={squares} alt="" />
              <Link to="/dashboard/publisher">Dashboard</Link>
            </div>
            <div className="tab-ads">
              <div className="tab-item">
                <img src={megaphone} alt="" />
                <p>
                  <Link to="/publisher-ads-history">Ads History</Link>
                </p>
              </div>
            </div>
            <div className="tab-item">
              <img src={bag} alt="" />
              <Link to="/publisher/adcode">Adcodes</Link>
            </div>
            <div className="tab-item">
              <img src={bag} alt="" />
              <p>
                <Link to="/publisher/notifications">
                  Notifications{" "}
                  <span
                    style={{
                      display: notification_count < 1 ? "none" : "flex",
                    }}
                  >
                    {notification_count}
                  </span>
                </Link>
              </p>
            </div>
            <div className="tab-item">
              <img src={creditCard} alt="" />
              <Link to="/publisher-payment-history">Finance</Link>
            </div>
            <div className="tab-item">
              <img src={creditCard} alt="" />
              <Link to="/publisher/withdraw">Request Withdrawal</Link>
            </div>
            <div className="tab-item">
              <img src={user} alt="" />
              <Link to="/publisher/profile">Profile</Link>
            </div>
            <div className="tab-item">
              <img src={Handshake} alt="" />
              <Link to="/publisher/support">Support</Link>
            </div>
            <div className="tab-item">
              <img src={signout} alt="" />
              <p onClick={handleLogout} className="logout">
                Logout
              </p>
            </div>
          </div>
          <div className="mobile-tag">
            <PublisherMobileTag
              ham={ham}
              notification_count={notification_count}
              handleLogout={handleLogout}
            />
          </div>
          <div className="dashboard-main">
            <div className="ads-wrapper mt-3 mt--3">
              <div className="ads-heading">
                <h4>Withdrawal Request form</h4>
              </div>
              <div className="user-detail">
                <div className="row">
                  <div className="col-md-5">
                    <form onSubmit={FormSubmit}>
                      <div className="form-group">
                        <label htmlFor="">Full Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          name="fullName"
                          value={data.fullName}
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Bank Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          name="bankName"
                          value={data.bankName}
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Bank Number</label>
                        <input
                          type="text"
                          placeholder="0032444100"
                          name="account"
                          value={data.account}
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Amount</label>
                        <input
                          type="text"
                          placeholder="#50,000"
                          name="amount"
                          value={data.amount}
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <button type="submit">Submit</button>
                      <div
                        className="spinner"
                        style={{ display: loading ? "block" : "none" }}
                      >
                        <Loader
                          type="TailSpin"
                          color="#EE315D"
                          height={30}
                          width={30}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
