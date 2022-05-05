import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../dashboard/dashboard.scss";
import "../../dashboard/ads-history/ads-history.scss";
// import swal from "sweetalert";
import logo from "../../../assets/image 1.png";
import AdminTags from "../../../components/adminTags/adminTags";
// import profileImage from "../../../assets/Userprofile.svg";
import {
  FcPhone,
  FcAddressBook,
  FcFilingCabinet,
  FcBusinessman,
} from "react-icons/fc";
import axios from "axios";

const AdminProfile = () => {
  const [profile, setProfile] = useState([]);
  const [notification, setNotification] = useState([]);

  const token = localStorage.getItem("auth_token");
  // const id = localStorage.getItem("auth_id");

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
      console.log(result);
      setProfile(result);

      const allNotifications = await authAxios.get("/api/user/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);
    };
    fetching();
  }, []);

  // useEffect(() => {
  //   const fetching = async () => {
  //     const profileData = await authAxios.get("/api/user/profile");
  //     const result = profileData.data;
  //     setFetchProfile(result);
  //   };
  //   fetching();
  // }, []);
  // let notification_count = notification.length;

  return (
    <div className="dashboard">
      <div className="small-title">
        <div className="title-text justify-content-between">
          <div className="logo">
            <Link to="/home" rel="canonical">
              <img src={logo} alt="moovit-logo" />
            </Link>
          </div>
          <div className="text d-flex align-center"></div>
        </div>
        <div className="dashboard-main-wrapper">
          <div className="tabs">
            <AdminTags notification={notification} />
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
                      <h5>Phone Number</h5>
                      <p>{profile.phone}</p>
                    </div>
                    {/* <div className="content">
                      <h5>Company Name</h5>
                      <p>{profile.company}</p>
                    </div> */}
                  </div>
                  <div className="col-lg-3 text-right">
                    <button>
                      <Link to="/admin/update">Edit Profile</Link>
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

export default AdminProfile;
