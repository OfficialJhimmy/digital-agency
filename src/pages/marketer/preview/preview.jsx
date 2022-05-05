import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "../../dashboard/dashboard.scss";
import "../preview/preview.scss";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import squares from "../../../assets/SquaresFour.svg";
import bag from "../../../assets/BagSimple.svg";
import plus from "../../../assets/Plus.svg";
import user from "../../../assets/User.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import banner from "../../../assets/Rectangle 69.png";
import tick from "../../../assets/Frame 338.svg";
import axios from "axios";
import logo from "../../../assets/image 1.png";
import icon4 from "../../../assets/Frame 3333.svg";
import { Link } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";

const MarketerPreview = () => {
  const [adsList, setAdslist] = useState([]);
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const targetId = localStorage.getItem("targetId");
  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
    // baseURL: "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const history = useHistory();
  useEffect(() => {
    const fetchingData = async () => {
      const allUsers = await authAxios.get("/api/admin/users");
      const users_data = allUsers.data;
      setUsers(users_data.data.data);

      const allAds = await authAxios.get("/api/admin/ads");
      const ads_data = allAds.data;
      const adsListData = ads_data.data.data;
      console.log(adsListData, "preview adsdata");
      const newArray = adsListData.filter((item) => item.id == targetId);
      setAdslist(newArray);

      const allNotifications = await authAxios.get("/api/admin/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);
    };
    fetchingData();
  }, []);
  const handleApprove = (e) => {
    e.preventDefault();
    setLoading(true);
    const { id } = e.currentTarget;
    const data = {
      approved: 1,
    };
    const approveAds = async () => {
      try {
        const query = await authAxios.put(`/api/admin/approve-ads/${id}`, data);
        const res = query.data;
        swal("Great!", "Ads Approved successfully!", "success");
        setLoading(false);
        window.location.reload();
      } catch (error) {
        swal("Failed!", "Request was unsuccessfully!", "success");
        setLoading(false);
      }
    };
    approveAds();
  };
  const handleReject = (e) => {
    e.preventDefault();
    setLoading2(true);
    const { id } = e.currentTarget;
    console.log(id);
    const data = {
      approved: 0,
    };
    const rejectAds = async () => {
      try {
        const query = await authAxios.put(`/api/admin/approve-ads/${id}`, data);
        const res = query.data;
        swal("Great!", "Ads Rejected successfully!", "success");
        setLoading2(false);
        window.location.reload();
        console.log(res);
      } catch (error) {
        swal("Failed!", "Request was unsuccessfully!", "success");
        setLoading2(false);
        console.log(error);
      }
    };
    rejectAds();
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
  console.log(adsList);

  let btnText = "";
  if (loading === true) {
    btnText = (
      <div className="spier" style={{ display: loading ? "block" : "none" }}>
        <Loader type="TailSpin" color="#ffffff" height={20} width={20} />
      </div>
    );
  } else if (loading === false) {
    btnText = <span className="text-white">Approve</span>;
  }
  let rejectText = "";
  if (loading2 === true) {
    rejectText = (
      <div className="spier" style={{ display: loading2 ? "block" : "none" }}>
        <Loader type="TailSpin" color="#ffffff" height={20} width={20} />
      </div>
    );
  } else if (loading2 === false) {
    rejectText = <span className="text-white">Reject</span>;
  }
  return (
    <div className="dashboard marketer-preview">
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
            <div className="preview-content">
              <div className="lower-btns">
                <Link to="/marketer/dashboard">
                  <BsArrowReturnLeft className="icon-back" />
                  Back
                </Link>
              </div>
              <div className="main-heading">
                <div className="welcome">
                  <h4>Ads details</h4>
                </div>
                <div className="smm">
                  <p>Assigned to you</p>
                  {/* <img src={banner} alt="" /> */}
                </div>
              </div>
              <div className="preview-wrapper">
                {adsList.map(
                  ({
                    id,
                    title,
                    approved,
                    content,
                    demographics,
                    ageRange,
                    interests,
                    start,
                    end,
                    area,
                    location,
                    budget_id,
                    image,
                    fb_page,
                    gender,
                    instagram,
                    linkedin,
                    createdBy,
                    awareness,
                    conversions,
                    Dimensions,
                    app_installs,
                    engagement,
                    sales,
                    reach,
                    target,
                    phone,
                  }) => {
                    // const target_region = area.split(",");

                    const age = ageRange.split(",");
                    const demoArray = demographics.split("=");
                    const interestArray = interests.split("=");
                    const allAreas = area.split("=");

                    const see = interestArray.filter((item) => item != "");
                    console.log(see);
                    let price = "";
                    if (budget_id == 1) {
                      price = "#20,000";
                    } else if (budget_id == 2) {
                      price = "#50,000";
                    } else if ((budget_id = 3)) {
                      price = "#150,000";
                    } else if ((budget_id = 4)) {
                      price = "#200,000";
                    } else if ((budget_id = 5)) {
                      price = "#500,000";
                    } else if ((budget_id = 6)) {
                      price = "#1,000,000";
                    }

                    let newDate = "";
                    const data_ = start.split("00");
                    newDate = data_[0];

                    let newDateEnd = "";
                    const data_2 = end.split("00");
                    newDateEnd = data_2[0];

                    const getuser = users.filter(
                      (item) => item.id == createdBy
                    );
                    console.log(getuser);
                    let userValue = "";
                    let user_email = "";
                    let user_phone = "";
                    getuser.map(({ firstName, lastName, email, phone, id }) => {
                      userValue = (
                        <span key={id}>
                          {firstName} {lastName}
                        </span>
                      );
                      user_email = email;
                      user_phone = phone;
                    });

                    let campaign_type = "";
                    if (awareness === 1) {
                      campaign_type = <span>Awareness</span>;
                    } else if (conversions == 1) {
                      campaign_type = <span>Conversions</span>;
                    } else if (app_installs == 1) {
                      campaign_type = <span>App Installs</span>;
                    } else if (engagement == 1) {
                      campaign_type = <span>Engagement</span>;
                    } else if (sales == 1) {
                      campaign_type = <span>Sales</span>;
                    } else if (reach == 1) {
                      campaign_type = <span>Reach</span>;
                    } else if (target == 1) {
                      campaign_type = <span>Traffic</span>;
                    }

                    const dimArr = Dimensions.replace(/\D+/g, "");
                    const newDimension = dimArr.split("");
                    console.log(newDimension);

                    let approvedBtn = "";
                    if (approved === 0) {
                      approvedBtn = (
                        <div className="approve-text d-flex align-item-center">
                          <img src={icon4} alt="" width="25px" />
                          <p className="reject">Rejected</p>
                        </div>
                      );
                    } else if (approved === 1) {
                      approvedBtn = (
                        <div className="approve-text d-flex align-item-center">
                          <img src={tick} alt="" width="15px" />
                          <p>Approved</p>
                        </div>
                      );
                    } else {
                      approvedBtn = (
                        <div className="row d-flex justify-content-between">
                          <div className="col-6">
                            <button
                              className="approve"
                              id={id}
                              onClick={handleApprove}
                            >
                              {btnText}
                            </button>
                          </div>
                          <div className="col-6">
                            <button id={id} onClick={handleReject}>
                              {rejectText}
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div className="prev-container" key={id}>
                        <div className="ads-detail">
                          <div className="title mb-4">
                            <h5>Title</h5>
                            <p>{title}</p>
                          </div>
                          <div className="descritpion mb-4">
                            <h5>Description</h5>
                            <p>{content}.</p>
                          </div>
                          <div className="campaign mb-4">
                            <h5>Campaign type</h5>
                            <div className="campaign-list">{campaign_type}</div>
                          </div>
                          <div className="budget mb-4">
                            <h5>Budget</h5>
                            <p>{price}</p>
                          </div>
                          <div className="dates mb-4">
                            <div className="start">
                              <h5>Start date</h5>
                              <p>{newDate}</p>
                            </div>
                            <div className="end">
                              <h5>End date</h5>
                              <p>{newDateEnd}</p>
                            </div>
                          </div>
                          <div className="dates mb-4">
                            <div className="start">
                              <h5>Age Range</h5>
                              <p>{`${age[0]} - ${age[1]}`}</p>
                            </div>
                            <div className="end">
                              <h5>Gender</h5>
                              <p>{gender}</p>
                            </div>
                          </div>
                          <div className="target-area mb-4">
                            <h5>Dimensions</h5>
                            {newDimension.map((item, index) => {
                              let renderDimension = "";
                              if (item == 1) {
                                renderDimension = "300 x 250";
                              } else if (item == 2) {
                                renderDimension = "300 x 50";
                              } else if (item == 3) {
                                renderDimension = "428 x 300";
                              } else if (item == 4) {
                                renderDimension = "468 x 60";
                              } else if (item == 5) {
                                renderDimension = "160 x 600";
                              } else if (item == 6) {
                                renderDimension = "300 x 50";
                              } else if (item == 7) {
                                renderDimension = "300 x 600";
                              } else if (item == 8) {
                                renderDimension = "728 x 50";
                              } else if (item == 9) {
                                renderDimension = "120 x 600";
                              }
                              return <p key={index}>{renderDimension}</p>;
                            })}
                          </div>
                          <div className="target-area mb-4">
                            <h5>Target Area</h5>
                            <p>{location}</p>
                          </div>
                          <div className="location mb-4">
                            <h5>Location</h5>
                            <div className="locations">
                              {allAreas.map((item, index) => {
                                // const newString = item.slice(1)
                                return <span key={index}>{item}</span>;
                              })}
                            </div>
                          </div>
                          <div className="social mb-4">
                            <div className="start">
                              <h5>Facebook Page</h5>
                              <p>{fb_page}</p>
                            </div>
                            <div className="end">
                              <h5>Linkedin Page</h5>
                              <p>{linkedin}</p>
                            </div>
                            <div className="start">
                              <h5>Instagram Page</h5>
                              <p>{instagram}</p>
                            </div>
                          </div>
                          <div className="target-area mb-4">
                            <h5>Demographics</h5>
                            <ul>
                              {demoArray.map((item, index) => {
                                const cleanData = item.replace(
                                  /(["",\/]+)/g,
                                  ""
                                );
                                return <li key={index}>{cleanData}</li>;
                              })}
                            </ul>
                          </div>
                          <div className="target-area mb-4">
                            <h5>Interest</h5>
                            <ul>
                              {interestArray.map((item, index) => {
                                const cleanData = item.replace(
                                  /(["",\/]+)/g,
                                  ""
                                );
                                return <li key={index}>{cleanData}</li>;
                              })}
                            </ul>
                          </div>
                        </div>
                        <div className="sender">
                          <div className="sender-profile">
                            <h5>Created by</h5>
                            <div className="sender-info">
                              <img src={banner} alt="" />
                              <p>{userValue}</p>
                            </div>
                            <p className="email">{user_email}</p>
                            <p>{phone}</p>
                          </div>
                          <div className="banner">
                            <h5>Upload Banner</h5>
                            <div className="banner-img">
                              {/* <a href="#" download="banner">
                                <img
                                  src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                  alt="banner"
                                />
                              </a> */}
                              {adsList.map((newarr) => (
                                <img src={newarr.image} alt="" />
                              ))}

                              <img src={image} alt="" />
                            </div>
                          </div>
                          <div className="action-btns mt-5">{approvedBtn}</div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              {/* <div className="lower-btns">
                <Link to="/marketer/dashboard">Back</Link>
                <button>Confirmed</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketerPreview;
