import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../dashboard/dashboard.scss";
import "../../admin/notifications/notifications.scss";
import avatar from "../../../assets/Ellipse 51.png";
import Trash from "../../../assets/Trash.svg";
import squares from "../../../assets/SquaresFour.svg";
import megaphone from "../../../assets/MegaphoneSimple.svg";
import bag from "../../../assets/BagSimple.svg";
import creditCard from "../../../assets/CreditCard.svg";
import user from "../../../assets/User.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import logo from "../../../assets/image 1.png";
import Tags from "../../../components/Tags/Tags";
import { Link, useHistory } from "react-router-dom";

const AdvertiserNotifications = () => {
  const history = useHistory();
  const [notification, setNotification] = useState([]);
  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
    // baseURL : "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [style, setStyle] = useState({
    hide: false,
    transformArrow: false,
  });
  // const handleChange = (e) => {
  //     e.persist();
  //     setData({...data, [e.target.name] : e.target.value});
  // }
  const handleClick = (e) => {
    e.preventDefault();
    setStyle({ hide: !style.hide, transformArrow: !style.transformArrow });
  };
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
  console.log(notification);
  let notification_count = notification.length;
  return (
    <div className="dashboard notification">
      <div className="small-title">
        <div className="title-text justify-content-between">
          <div className="logo">
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
          <div className="dashboard-main ">
            <div className="notification-wrapper">
              <h3>Notifications</h3>
              <div className="notification-list">
                {notification.map(
                  ({ id, type, notifiable_id, data, created_at }) => {
                    console.log(created_at);
                    const date_ = created_at.split("T")[0];
                    const time_ = created_at.split("T")[1];
                    const time_value = time_.split(".")[0];
                    let dynamic_text = "";
                    if ((type = "AppNotificationsNewAdvertNotification")) {
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
                              {date_} | {time_value}
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

export default AdvertiserNotifications;
