import React, { useState, useEffect } from "react";
import "../../dashboard/dashboard.scss";
import "../../../pages/marketer/preview/preview.scss";
import AdminTags from "../../../components/adminTags/adminTags";
import swal from "sweetalert";
import banner from "../../../assets/Rectangle 69.png";
import axios from "axios";
import { Link } from "react-router-dom";
import icon4 from "../../../assets/Frame 3333.svg";
import logo from "../../../assets/image 1.png";
import tick from "../../../assets/Frame 338.svg";
import { findByLabelText } from "@testing-library/react";
import { BsArrowReturnLeft } from "react-icons/bs";

const AdminPreview = () => {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState([]);
  const ticketData = JSON.parse(localStorage.getItem("targetData"));
  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
    baseURL: "https://test.canyousing.com.ng",
    // baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    const fetchingData = async () => {
      const allUsers = await authAxios.get("/api/admin/users");
      const users_data = allUsers.data;
      setUsers(users_data.data.data);

      const allNotifications = await authAxios.get("/api/admin/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);
    };
    fetchingData();
  }, []);
  const handleApprove = (e) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const data = {
      approved: 1,
    };
    const approveAds = async () => {
      const query = await authAxios.put(`/api/admin/approve-ads/${id}`, data);
      const res = query.data;
      swal("Great!", "Ads Approved successfully!", "success");
      console.log(res);
    };
    approveAds();
  };
  const handleReject = (e) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const data = {
      approved: 0,
    };
    const rejectAds = async () => {
      const query = await authAxios.put(`/api/admin/approve-ads/${id}`, data);
      const res = query.data;
      swal("Great!", "Ads Rejected successfully!", "success");
      console.log(res);
    };
    rejectAds();
  };
  console.log(ticketData);
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
            <AdminTags notification={notification} />
          </div>
          <div className="dashboard-main">
            <div className="preview-content">
              <div className="lower-btns">
                <Link to="/admin">
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
                  <img src={banner} alt="" />
                </div>
              </div>
              <div className="preview-wrapper">
                {ticketData.map(
                  ({
                    id,
                    title,
                    gender,
                    content,
                    Dimensions,
                    ageRange,
                    start,
                    end,
                    area,
                    location,
                    budget_id,
                    image,
                    approved,
                    createdBy,
                    fb_page,
                    instagram,
                    linkedin,
                    awareness,
                    demographics,
                    interests,
                    conversions,
                    app_installs,
                    engagement,
                    sales,
                    reach,
                    target,
                    phone,
                  }) => {
                    const age = ageRange.split(",");
                    const demoArray = demographics.split("=");
                    const interestArray = interests.split("=");
                    const allAreas = area.split("=");

                    // const  dimArr = Dimensions.replace(/\D+/g, '');
                    // const newDimension = dimArr.split('');

                    let price = "";
                    if (budget_id == 1) {
                      price = "#20,000";
                    } else if (budget_id == 2) {
                      price = "#50,000";
                    } else if (budget_id == 3) {
                      price = "#150,000";
                    } else if (budget_id == 4) {
                      price = "#200,000";
                    } else if (budget_id == 5) {
                      price = "#500,000";
                    } else if (budget_id == 6) {
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
                    let userValue = "";
                    let user_email = "";
                    let user_phone = "";
                    getuser.map(({ firstName, lastName, email, phone }) => {
                      userValue = (
                        <span>
                          {firstName} {lastName}
                        </span>
                      );
                      user_email = email;
                      user_phone = phone;
                    });

                    let campaign_type = "";
                    if (awareness == 1) {
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
                    let approvedBtn = "";
                    if (approved == 0) {
                      approvedBtn = (
                        <div className="approve-text d-flex align-item-center">
                          <p className="reject">Rejected</p>
                          <img src={icon4} alt="" width="15px" />
                        </div>
                      );
                    } else if (approved == 1) {
                      approvedBtn = (
                        <div className="approve-text d-flex align-item-center">
                          <p>Approved</p>
                          <img src={tick} alt="" width="15px" />
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
                              Approve
                            </button>
                          </div>
                          <div className="col-6">
                            <button id={id} onClick={handleReject}>
                              Reject
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
                            <p>{content}</p>
                          </div>
                          <div className="dates mb-4">
                            <div className=" campaign start">
                              <h5>Campaign type</h5>
                              <div className="campaign-list">
                                {campaign_type}
                              </div>
                            </div>
                            <div className="end">
                              <h5>Budget</h5>
                              <p>{price}</p>
                            </div>
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
                            <h5>Target Country Location</h5>
                            <p>{location}</p>
                          </div>
                          <div className="target-area mb-4">
                            <h5>Dimensions</h5>
                            <p>{Dimensions}</p>
                          </div>
                          <div className="location mb-4">
                            <h5>Target Area</h5>
                            <div className="locations">
                              {allAreas.map((item) => {
                                return <span>{item}</span>;
                              })}
                            </div>
                            <img src={image} alt="" />
                          </div>
                          <div className="text d-flex align-items-center justify-content-between mb-4">
                            <div className="start">
                              <h5>Facebook Page</h5>
                              <p>{fb_page}</p>
                            </div>
                            <div className="start">
                              <h5>Linkedin Page</h5>
                              <p>{linkedin}</p>
                            </div>
                          </div>
                          <div className="target-area mb-4">
                            <h5>Instagram Account</h5>
                            <p>{instagram}</p>
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
                              <a href="#" download="banner">
                                <img
                                  src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                  alt="banner"
                                />
                              </a>

                              <img src={banner} alt="" />
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
                <Link to="/admin">Back</Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPreview;

{
  /* <div className="lower-btns">
  <Link to="/marketer/dashboard">
    <BsArrowReturnLeft className="icon-back" />
    Back
  </Link>
</div>; */
}
