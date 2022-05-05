import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../../dashboard/dashboard.scss";
import "../../dashboard/ads-history/ads-history.scss";
import "../../publisher-dashboard/pb-profile/style.scss";
import logo from "../../../assets/image 1.png";
import squares from "../../../assets/SquaresFour.svg";
import megaphone from "../../../assets/MegaphoneSimple.svg";
import bag from "../../../assets/BagSimple.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import creditCard from "../../../assets/CreditCard.svg";
import user from "../../../assets/User.svg";
import hamburger from "../../../assets/hamburger.png";
import PublisherMobileTag from "../../../components/Pub-mobile-Tab/PubMobileTag";

const PublisherProfile = () => {
  const history = useHistory();
  const [profile, setProfile] = useState([]);
  const [ham, setHam] = useState(false);
  const [notification, setNotification] = useState([]);

  const token = localStorage.getItem("auth_token");

  const authAxios = axios.create({
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: false,
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
  useEffect(() => {
    const fetching = async () => {
      const profileData = await authAxios.get("/api/user/profile");
      const result = profileData.data;
      setProfile(result);

      const allNotifications = await authAxios.get("/api/user/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);
    };
    fetching();
  }, []);
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
          <div className="text d-flex align-center"></div>
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
                <h4>Profile</h4>
              </div>
              <div className="user-detail">
                <div className="row justify-content-between align-item-top">
                  <div className="col-md-5">
                    <div className="content">
                      <div className="row">
                        <div className="col">
                          <h5>First Name</h5>
                          <p>{profile.firstName}</p>
                        </div>
                        <div className="col">
                          <h5>Last Name</h5>
                          <p>{profile.lastName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="content">
                      <h5>Email</h5>
                      <p>{profile.email}</p>
                    </div>
                    <div className="content">
                      <h5>Account Type</h5>
                      <p>{profile.role}</p>
                    </div>
                    <div className="content">
                      <h5>Phone Number</h5>
                      <p>{profile.phone}</p>
                    </div>
                    <div className="content">
                      <h5>Company Name</h5>
                      <p>{profile.company}</p>
                    </div>
                  </div>
                  <div className="col-lg-3 text-right">
                    <button>
                      <Link to="/publisher/edit-profile">Edit Profile</Link>
                    </button>
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

export default PublisherProfile;
