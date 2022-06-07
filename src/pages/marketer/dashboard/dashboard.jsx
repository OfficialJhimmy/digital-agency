import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../dashboard/dashboard.scss";
import "../../admin/admin.scss";
import "./dashboard.scss";
import caretDown from "../../../assets/CaretDown.svg";
import squares from "../../../assets/SquaresFour.svg";
import bag from "../../../assets/BagSimple.svg";
import plus from "../../../assets/Plus.svg";
import user from "../../../assets/User.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import dots from "../../../assets/Dots.svg";
import frame1 from "../../../assets/Frame 233.svg";
import icon1 from "../../../assets/Frame 327.svg";
import icon2 from "../../../assets/Frame 331.svg";
import icon3 from "../../../assets/Frame 333.svg";
import icon4 from "../../../assets/Frame 3333.svg";
import frame2 from "../../../assets/Frame 232.svg";
import frame3 from "../../../assets/Frame 231.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../../assets/image 1.png";

const MarketerDashboard = () => {
  const history = useHistory();
  const [adsList, setAdsList] = useState([]);
  const [profile, setProfile] = useState([]);
  const [notification, setNotification] = useState([]);

  const token = localStorage.getItem("auth_token");
  const auth_id = localStorage.getItem("auth_id");
  const auth_name = localStorage.getItem("auth_name");
  const authAxios = axios.create({
    baseURL: "https://test.canyousing.com.ng",
    // baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const allAds = await authAxios.get("/api/admin/ads");
      const response = allAds.data;
      const adsListData = response.data.data;
      setAdsList(adsListData);

      const allNotifications = await authAxios.get("/api/admin/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);
    };
    fetchData();
  }, []);

  const declinedList = adsList.filter((item) => item.approved === 0);
  console.log(declinedList, "Decline List");
  const approvedList = adsList.filter((item) => item.approved === 1);
  console.log(approvedList, "Approved List");
  const pendingList = adsList.filter((item) => item.approved === null);
  console.log(pendingList, "Pending List");

  const handleLogout = (e) => {
    e.preventDefault();
    authAxios
      .post("https://test.canyousing.com.ng/api/admin/logout")
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          history.push("/admin-login");
        }
      })
      .catch((err) => console.log(err));
  };
  const newArray = adsList.filter((ele) => {
    return ele.assigned === auth_id;
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

  //   console.log(newArray);
  //   console.log(auth_id);
  //for previewing

  const handleClick_ = (e) => {
    const targetId = e.target.id;
    localStorage.setItem("targetId", targetId);
    // history.push(`/marketer/preview-advert`);
  };
  let notification_count = notification.length;
  //   console.log(adsList);
  return (
    <div className="dashboard">
      <div className="small-title">
        <div className="title-text justify-content-between">
          <div className="logo">
            <Link to="/home" rel="canonical">
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
                Notification
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
          {profile.firstName === "" ? (
            <div className="dashboard-main admin">
              <div className="main-heading">
                <div className="welcome welcome__secondary">
                  <p>Welcome Back</p>
                  <button className="btn-profile__setup heartbeat">
                    <Link to="/marketer/edit-profile">
                      Finish Profile Setup
                    </Link>
                  </button>
                </div>
                <div className="smm">
                  <input type="text" placeholder="search" />
                </div>
              </div>
              <div className="quick-stat">
                <h6>Quick stats</h6>
                <div className="row admin__row--parent">
                  <div className="col col__admin--child">
                    <div className="content">
                      <div className="left-content">
                        <img src={icon1} alt="" />
                        <div className="content-text">
                          {/* <h5>{newArray.length}</h5> */}
                          <h5>{adsList.length}</h5>
                          <p>All tickets</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col col__admin--child">
                    <div className="content">
                      <div className="left-content">
                        <img src={icon2} alt="" />
                        <div className="content-text">
                          {/* <h5>20</h5> */}
                          <h5>{pendingList.length}</h5>
                          <p>Pending tickets</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col col__admin--child">
                    <div className="content">
                      <div className="left-content">
                        <img src={icon3} alt="" />
                        <div className="content-text">
                          <h5>{approvedList.length}</h5>
                          <p>Approved tickets</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col col__admin--child">
                    <div className="content">
                      <div className="left-content">
                        <img src={icon4} alt="" />
                        <div className="content-text">
                          <h5>{declinedList.length}</h5>
                          <p>Declined tickets</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overall-info">
                <div className="row admin__row--parent">
                  <div className="col-5 admin__column">
                    <div className="marketers">
                      <div className="marketers-heading">
                        <h5>Marketers</h5>
                        <img src={dots} alt="" />
                      </div>

                      <div className="progress--main__cover">
                        <h3>Assigned</h3>
                        <div className="parent__progress">
                          <div className="child__progress u-assigned">
                            <span className="span__progress--text">
                              {Math.round(
                                (approvedList.length / adsList.length) * 100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="progress--main__cover">
                        <h3>Unassigned</h3>
                        <div className="parent__progress">
                          <div className="child__progress u-pending">
                            <span className="span__progress--text">
                              {Math.round(
                                (pendingList.length / adsList.length) * 100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="progress--main__cover">
                        <h3>Idle</h3>
                        <div className="parent__progress">
                          <div className="child__progress u-idle">
                            <span className="span__progress--text">
                              {Math.round(
                                (declinedList.length / adsList.length) * 100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* <Link to='#!'>view details</Link> */}
                    </div>
                  </div>
                  <div className="col-7  admin__column column-new">
                    <div className="tickets">
                      <div className="ticket-title">
                        <h5> My Tickets</h5>
                        <div className="btns">
                          <button>Unassigned</button>
                          <button>Assigned</button>
                        </div>
                      </div>
                      <div className="history-table">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">Title</th>
                              <th scope="col">Budget</th>
                              <th scope="col">Date</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {newArray
                              .filter((items, index) => index < 5)
                              .map(({ id, title, start, location }) => {
                                let newDate = "";
                                const data_ = start.split("00");
                                newDate = data_[0];
                                return (
                                  <tr key={id}>
                                    <th scope="row">
                                      <input type="checkbox" name="" id="" />
                                    </th>
                                    <td className="text-left">{title}</td>
                                    <td>Tier 2</td>
                                    <td>{newDate}</td>
                                    <td>{location}</td>
                                    <td onClick={handleClick_} id={id}>
                                      <Link
                                        to={"/marketer/preview-advert"}
                                        id={id}
                                        onClick={handleClick_}
                                      >
                                        Preview
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="dashboard-main admin">
              <div className="main-heading">
                <div className="welcome">
                  <p>Welcome Back</p>
                  <h4>{profile.firstName}</h4>
                </div>
                <div className="smm">
                  <input type="text" placeholder="search" />
                </div>
              </div>
              <div className="quick-stat">
                <h6>Quick stats</h6>
                <div className="row admin__row--parent">
                  <div className="col col__admin--child">
                    <div className="content">
                      <div className="left-content">
                        <img src={icon1} alt="" />
                        <div className="content-text">
                          <h5>{adsList.length}</h5>
                          <p>All tickets</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col col__admin--child">
                    <div className="content">
                      <div className="left-content">
                        <img src={icon2} alt="" />
                        <div className="content-text">
                          <h5>{pendingList.length}</h5>
                          <p>Pending tickets</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col col__admin--child">
                    <div className="content">
                      <div className="left-content">
                        <img src={icon3} alt="" />
                        <div className="content-text">
                          <h5>{approvedList.length}</h5>
                          <p>Approved tickets</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col col__admin--child">
                    <div className="content">
                      <div className="left-content">
                        <img src={icon4} alt="" />
                        <div className="content-text">
                          <h5>{declinedList.length}</h5>
                          <p>Declined tickets</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overall-info">
                <div className="row admin__row--parent">
                  <div className="col-5 admin__column">
                    <div className="marketers">
                      <div className="marketers-heading">
                        <h5>Marketers</h5>
                        <img src={dots} alt="" />
                      </div>
                      <div className="progress--main__cover">
                        <h3>Assigned</h3>
                        <div className="parent__progress">
                          <div className="child__progress u-assigned">
                            <span className="span__progress--text">
                              {Math.round(
                                (approvedList.length / adsList.length) * 100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="progress--main__cover">
                        <h3>Unassigned</h3>
                        <div className="parent__progress">
                          <div className="child__progress u-pending">
                            <span className="span__progress--text">
                              {Math.round(
                                (pendingList.length / adsList.length) * 100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="progress--main__cover">
                        <h3>Idle</h3>
                        <div className="parent__progress">
                          <div className="child__progress u-idle">
                            <span className="span__progress--text">
                              {Math.round(
                                (declinedList.length / adsList.length) * 100
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* <Link to='#!'>view details</Link> */}
                    </div>
                  </div>
                  <div className="col-7  admin__column column-new">
                    <div className="tickets">
                      <div className="ticket-title">
                        <h5> My Tickets</h5>
                        <div className="btns">
                          <button>Unassigned</button>
                          <button>Assigned</button>
                        </div>
                      </div>
                      <div className="history-table">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">Title</th>
                              <th scope="col">Budget</th>
                              <th scope="col">Date</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {newArray
                              .filter((items, index) => index < 5)
                              .map(({ id, title, start, location }) => {
                                let newDate = "";
                                const data_ = start.split("00");
                                newDate = data_[0];
                                return (
                                  <tr key={id}>
                                    <th scope="row">
                                      <input type="checkbox" name="" id="" />
                                    </th>
                                    <td className="text-left">{title}</td>
                                    <td>Tier 2</td>
                                    <td>{newDate}</td>
                                    <td>{location}</td>
                                    <td onClick={handleClick_} id={id}>
                                      <Link
                                        to={"/marketer/preview-advert"}
                                        id={id}
                                        onClick={handleClick_}
                                      >
                                        Preview
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketerDashboard;
