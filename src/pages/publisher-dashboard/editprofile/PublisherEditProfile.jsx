import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../../dashboard/dashboard.scss";
import "../../dashboard/ads-history/ads-history.scss";
import logo from "../../../assets/image 1.png";
import squares from "../../../assets/SquaresFour.svg";
import megaphone from "../../../assets/MegaphoneSimple.svg";
import bag from "../../../assets/BagSimple.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import creditCard from "../../../assets/CreditCard.svg";
import swal from "sweetalert";
import user from "../../../assets/User.svg";
import hamburger from "../../../assets/hamburger.png";
import PublisherMobileTag from "../../../components/Pub-mobile-Tab/PubMobileTag";

const PublisherEditProfile = () => {
  const [ham, setHam] = useState(false);
  const history = useHistory();
  const [notification, setNotification] = useState([]);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
  });

  const handleChange = (e) => {
    e.persist();
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const id = localStorage.getItem("auth_id");
  const token = localStorage.getItem("auth_token");

  const authAxios = axios.create({
    // baseURL : "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: false,
  });
  useEffect(() => {
    const dataFetching = async () => {
      const allNotifications = await authAxios.get("/api/user/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);
    };
    dataFetching();
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
  const formSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.number,
      email: profile.email,
    };
    if (data.firstName !== "" && data.lastName !== "" && data.phone) {
      const postingData = await authAxios.put(
        `/api/user/edit-profile/${id}?firstName=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}&email=${data.email}`
      );
      const response = postingData.data;
      swal("Great!", "Profile Updated successfully!", "success");
      setProfile({ firstName: "", lastName: "", number: "", email: "" });
      console.log(response);
    } else if (data.firstName === "" && data.lastName === "" && data.phone) {
    }
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
                <h4>Edit Profile</h4>
              </div>
              <div className="user-detail">
                {/* <div className="profile-img">
                                    <img src={profileImage} alt="avatar" />
                                </div> */}
                <div className="row">
                  <div className="col-md-5">
                    <form onSubmit={formSubmit}>
                      <div className="form-group">
                        <label htmlFor="">First Name</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          name="firstName"
                          required
                          value={profile.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Last Name</label>
                        <input
                          type="text"
                          placeholder="John"
                          name="lastName"
                          required
                          value={profile.lastName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Email Address</label>
                        <input
                          type="email"
                          placeholder="John@doe.com"
                          name="email"
                          required
                          value={profile.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Phone Number</label>
                        <input
                          type="text"
                          placeholder="+234 8169 1140 01"
                          name="number"
                          required
                          value={profile.number}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="password">
                        <p>Password</p>
                        <Link to="/forget-password">Change password</Link>
                      </div>
                      <button type="submit" className="btn btn-lg mt-4">
                        Submit
                      </button>
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

export default PublisherEditProfile;
