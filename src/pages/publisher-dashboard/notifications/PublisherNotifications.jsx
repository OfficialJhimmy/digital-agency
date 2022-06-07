import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../dashboard/dashboard.scss";
import "../../admin/notifications/notifications.scss";
import avatar from "../../../assets/Ellipse 51.png";
import squares from "../../../assets/SquaresFour.svg";
import megaphone from "../../../assets/MegaphoneSimple.svg";
import bag from "../../../assets/BagSimple.svg";
import creditCard from "../../../assets/CreditCard.svg";
import user from "../../../assets/User.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import logo from "../../../assets/image 1.png";
import { Link, useHistory } from "react-router-dom";
import hamburger from "../../../assets/hamburger.png";
import PublisherMobileTag from "../../../components/Pub-mobile-Tab/PubMobileTag";

const PublisherNotifications = () => {
  const history = useHistory();
  const [ham, setHam] = useState(false);
  const [notification, setNotification] = useState([]);
  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
    baseURL: "https://test.canyousing.com.ng",
    // baseURL: "moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const allNotifications = await authAxios.get("/api/user/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);
    };
    fetchData();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    authAxios
      .post("https://test.canyousing.com.ng/api/user/logout")
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
  console.log(notification);
  return (
    <div className="dashboard notification">
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
          <div className="dashboard-main ">
            <div className="notification-wrapper">
              <h3>Notifications</h3>
              <div className="notification-list">
                {notification.map(
                  ({ id, type, notifiable_id, data, created_at }) => {
                    console.log(created_at);
                    const date_ = Date.parse(created_at.split("T")[0]);
                    const newDate_ = new Date(date_).toDateString();
                    const time_ = created_at.split("T")[1];
                    const time_value = time_.split(".")[0];
                    let dynamic_text = "";
                    if (type === "AppNotificationsNewAdvertNotification") {
                      dynamic_text = "new ads";
                    }
                    console.log(dynamic_text);
                    return (
                      <div className="notif-inner-wrapper" key={id}>
                        <div className="notification-card">
                          <img src={avatar} alt="" />
                          <div className="list-text">
                            <h5>
                              {data.firstName} requested to put up a{" "}
                              {dynamic_text}
                            </h5>
                            <p>
                              {newDate_} | {time_value}
                            </p>
                          </div>
                        </div>
                        <div className="actions">
                          <button>Mark as read</button>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherNotifications;
