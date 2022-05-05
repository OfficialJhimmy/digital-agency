import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import "../../dashboard/dashboard.scss";
import squares from "../../../assets/SquaresFour.svg";
import bag from "../../../assets/BagSimple.svg";
import plus from "../../../assets/Plus.svg";
import user from "../../../assets/User.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import axios from "axios";

const MarketerEditProfile = () => {
  const history = useHistory;
  const [notification, setNotification] = useState([]);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const handleChange = (e) => {
    e.persist();
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("auth_token");
  const auth_id = localStorage.getItem("auth_id");
  const auth_name = localStorage.getItem("auth_name");
  const authAxios = axios.create({
    // baseURL: "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const formSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      email: profile.email,
    };

    const fetching = async () => {
      if (data.firstName !== "" && data.lastName !== "" && data.phone) {
        const postingData = await authAxios.put(
          `/api/admin/edit-profile/${auth_id}?firstName=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}&email=${data.email}`
        );

        const response = postingData.data;
        swal("Great!", "Profile Updated successfully!", "success");
        setProfile({ firstName: "", lastName: "", number: "", email: "" });
        console.log(response);
      }
    };
    fetching();
  };
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
        <div className="title-text">
          {/* <p>The Brand Hub</p>
                    <img src={caretDown} alt="" /> */}
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
            <div className="ads-wrapper mt-3">
              <div className="ads-heading">
                <h4>Profile</h4>
              </div>
              <div className="user-detail">
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
                          name="phone"
                          required
                          value={profile.phone}
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

export default MarketerEditProfile;
