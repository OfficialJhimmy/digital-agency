import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../../dashboard/dashboard.scss";
import "../../dashboard/ads-history/ads-history.scss";
import squares from "../../../assets/SquaresFour.svg";
import megaphone from "../../../assets/MegaphoneSimple.svg";
import bag from "../../../assets/BagSimple.svg";
import creditCard from "../../../assets/CreditCard.svg";
import user from "../../../assets/User.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import logo from "../../../assets/image 1.png";
import hamburger from "../../../assets/hamburger.png";
import PublisherMobileTag from "../../../components/Pub-mobile-Tab/PubMobileTag";

const PublisherPaymentHistory = () => {
  const [ham, setHam] = useState(false);
  const [notification, setNotification] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  useEffect(() => {
    const fetching = async () => {
      const allNotifications = await authAxios.get("/api/user/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);
    };
    fetching();
  }, []);
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
                <Link to="/publisher/notifications">Notifications</Link>
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
            <div className="ads-wrapper">
              <div className="ads-heading">
                <h4>Payment History</h4>
              </div>
              <div className="history-wrapper">
                <div className="text-right"></div>

                <div className="text-left mt-4">
                  <input type="text" placeholder="search" />
                </div>
              </div>
              <div className="history-table">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                      <th scope="col">Payment Link</th>
                      <th scope="col">Invoice</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                                    <tr>
                                        <th scope="row">
                                            <input type="checkbox" name="" id="" />
                                        </th>
                                        <td>21/10/2021</td>
                                        <td>50,000</td>
                                        <td>Paid</td>
                                        <td></td>
                                        <td className="invoice">view now</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <input type="checkbox" name="" id="" />
                                        </th>
                                        <td>18/10/2021</td>
                                        <td>50,000</td>
                                        <td>Paid</td>
                                        <td>-</td>
                                        <td className="invoice">view now</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <input type="checkbox" name="" id="" />
                                        </th>
                                        <td>11/10/2021</td>
                                        <td>10,000</td>
                                        <td>Paid</td>
                                        <td>-</td>
                                        <td className="invoice">view now</td>
                                    </tr>
                                </tbody> */}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherPaymentHistory;
