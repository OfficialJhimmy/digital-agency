import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../../dashboard/dashboard.scss";
import "../../dashboard/ads-history/ads-history.scss";
import squares from "../../../assets/SquaresFour.svg";
import bag from "../../../assets/BagSimple.svg";
import plus from "../../../assets/Plus.svg";
import user from "../../../assets/User.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import logo from "../../../assets/image 1.png";
import {
  FcPhone,
  FcAddressBook,
  FcFilingCabinet,
  FcBusinessman,
} from "react-icons/fc";

const MarketerProfile = () => {
  const history = useHistory();
  const [profile, setProfile] = useState([]);
  const [notification, setNotification] = useState([]);

  const token = localStorage.getItem("auth_token");

  const authAxios = axios.create({
    // baseURL: "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: false,
  });

  useEffect(() => {
    const fetching = async () => {
      const profileData = await authAxios.get("/api/admin/profile");
      const result = profileData.data;
      setProfile(result);

      const allNotifications = await authAxios.get("/api/user/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);
    };
    fetching();
  }, []);
  const handleLogout = (e) => {
    e.preventDefault();
    authAxios
      .post("https://moovitapi.com/api/admin/logout")
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          history.push("/admin-login");
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  let notification_count = notification.length;

  return (
    <div className="dashboard">
      <div className="small-title">
        <div className="title-text justify-content-between">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="moovit-logo" />
            </Link>
          </div>
          <div className="text d-flex align center">
            {/* <p>The Brand Hub</p>
                        <img src={caretDown} alt="" /> */}
          </div>
        </div>
        <div className="dashboard-main-wrapper">
          <div className="tabs">
            <div className="tab-item">
              <img src={squares} alt="" />
              <Link to="/marketer/dashboard">Dashboard</Link>
            </div>
            <div className="tab-item">
              <img src={bag} alt="" />
              <Link to="#">Message</Link>
            </div>
            <div className="tab-item">
              <img src={plus} alt="" />
              <Link to="/marketer/tickets">My Ticket</Link>
            </div>
            <div className="tab-item">
              <img src={user} alt="" />
              <Link to="/marketer/notification">
                Notification{" "}
                <span
                  style={{ display: notification_count < 1 ? "none" : "flex" }}
                >
                  {notification_count}
                </span>
              </Link>
            </div>
            <div className="tab-item">
              <img src={Handshake} alt="" />
              <Link to="/create-adcode">Create Adcode</Link>
            </div>
            <div className="tab-item">
              <img src={Handshake} alt="" />
              <Link to="/create-banner">Create Banner</Link>
            </div>
            <div className="tab-item">
              <img src={Handshake} alt="" />
              <Link to="/marketer/profile">Profile</Link>
            </div>
            <div className="tab-item">
              <img src={signout} alt="" />
              <p onClick={handleLogout} className="logout">
                Logout
              </p>
            </div>
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
                          <h5 className="u-align-items">
                            <FcBusinessman className="across__icons" /> First
                            Name
                          </h5>
                          <p>{profile.firstName}</p>
                        </div>
                        <div className="col">
                          <h5 className="u-align-items">
                            <FcBusinessman className="across__icons" /> Last
                            Name
                          </h5>
                          <p>{profile.lastName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="content">
                      <h5 className="u-align-items">
                        <FcAddressBook className="across__icons" /> Email
                      </h5>
                      <p>{profile.email}</p>
                    </div>
                    <div className="content">
                      <h5 className="u-align-items">
                        <FcFilingCabinet className="across__icons" /> Account
                        Type
                      </h5>
                      <p>{profile.role}</p>
                    </div>
                    <div className="content">
                      <h5 className="u-align-items">
                        <FcPhone className="across__icons" /> Phone Number
                      </h5>
                      <p>{profile.phone}</p>
                    </div>
                    <div className="content">
                      <h5 className="u-align-items">
                        <FcFilingCabinet className="across__icons" /> Company
                        Name
                      </h5>
                      <p>{profile.company}</p>
                    </div>
                  </div>
                  <div className="col-lg-3 text-right">
                    <button>
                      <Link to="/marketer/edit-profile">Edit Profile</Link>
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

export default MarketerProfile;
