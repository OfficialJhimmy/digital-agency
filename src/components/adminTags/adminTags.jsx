import React from "react";
import { Link, useHistory } from "react-router-dom";
import squares from "../../assets/SquaresFour.svg";
import axios from "axios";
import user from "../../assets/User.svg";
import Handshake from "../../assets/Handshake.svg";
import Envelope from "../../assets/EnvelopeSimple.svg";
import plus from "../../assets/Plus.svg";
import User from "../../assets/UserPlus.svg";
import Tag from "../../assets/Tag.svg";
import note from "../../assets/Note.svg";
import signout from "../../assets/SignOut.svg";

const AdminTags = ({ notification }) => {
  let notification_count = notification.length;
  const token = localStorage.getItem("auth_token");
  const history = useHistory();
  const authAxios = axios.create({
    // baseURL: "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
  return (
    <div>
      <div className="tab-item">
        <img src={squares} alt="" />
        <Link to="/admin">Dashboard</Link>
      </div>
      <div className="tab-item">
        <img src={User} alt="" />
        <Link to="/add-staff">Add staff</Link>
      </div>
      <div className="tab-item">
        <img src={Envelope} alt="" />
        <Link to="/admin/message">Messages</Link>
      </div>
      <div className="tab-item">
        <img src={plus} alt="" />
        <Link to="/new-ads-ticket">New ads ticket</Link>
      </div>
      <div className="tab-item">
        <img src={Tag} alt="" />
        <Link to="/new-budget">Budget</Link>
      </div>
      <div className="tab-item">
        <img src={note} alt="" />
        <Link to="/new-graphic">Templates</Link>
      </div>
      <div className="tab-item">
        <img src={user} alt="" />
        <Link to="/notification">
          Notification{" "}
          {/* <span style={{ display: notification_count < 1 ? "none" : "flex" }}>
            {notification_count}
          </span> */}
        </Link>
      </div>
      <div className="tab-item">
        <img src={Handshake} alt="" />
        <Link to="/admin/profile">Profile</Link>
        {/* <Link to="/marketer/profile">Profile</Link> */}
      </div>
      <div className="tab-item">
        <img src={signout} alt="" />
        <p onClick={handleLogout} className="logout">
          Logout
        </p>
      </div>
    </div>
  );
};

export default AdminTags;
