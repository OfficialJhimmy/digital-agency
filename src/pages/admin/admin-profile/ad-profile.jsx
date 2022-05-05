import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../dashboard/dashboard.scss";
import "../../dashboard/ads-history/ads-history.scss";
import swal from "sweetalert";
import logo from "../../../assets/image 1.png";
import AdminTags from "../../../components/adminTags/adminTags";
import profileImage from "../../../assets/Userprofile.svg";
import axios from "axios";

const AdminProfile = () => {
  // const [file_, setFile_] = useState(null);
  const [notification, setNotification] = useState([]);
  const [fetchProfile, setFetchProfile] = useState([]);

  const [profile_update, setProfile_update] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const handleChange = (e) => {
    e.persist();
    setProfile_update({ ...profile_update, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem("auth_token");
  const id = localStorage.getItem("auth_id");

  const authAxios = axios.create({
    // baseURL: "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  const updateFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName: profile_update.firstName,
      lastName: profile_update.lastName,
      phone: profile_update.phone,
    };

    const newForm = new FormData();
    newForm.append("firstName", data.firstName);
    newForm.append("lastName", data.lastName);
    newForm.append("phone", data.phone);
    authAxios
      .put(
        `/api/admin/edit-profile/${id}?firstName=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          swal("Great!", "Profile Updated successfully!", "success");
          setProfile_update({ firstName: "", lastName: "", phone: "" });
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const fetching = async () => {
      const allNotifications = await authAxios.get("/api/admin/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);
    };
    fetching();
  }, []);

  useEffect(() => {
    const fetching = async () => {
      // const profileData = await authAxios.get("/api/user/profile");
      const profileData = await authAxios.get("/api/admin/profile");
      const result = profileData.data;
      setFetchProfile(result);
    };
    fetching();
  }, []);

  // console.log(profile_update);
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
            <div className="ads-wrapper mt-3">
              <div className="ads-heading">
                <h4>Edit Profile</h4>
              </div>
              <div className="user-detail">
                <div className="profile-img">
                  <img src={profileImage} alt="avatar" />
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <form onSubmit={updateFormSubmit}>
                      <div className="form-group">
                        <label htmlFor="">First Name</label>
                        <input
                          type="text"
                          //   placeholder="John"
                          placeholder={fetchProfile.firstName}
                          name="firstName"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Last Name</label>
                        <input
                          type="text"
                          placeholder={fetchProfile.lastName}
                          name="lastName"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Phone Number</label>
                        <input
                          type="text"
                          placeholder={fetchProfile.phone}
                          name="phone"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="password">
                        <p>Password</p>
                        <Link to="/forget-password">Change password</Link>
                      </div>
                      <button type="submit">Submit</button>
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

export default AdminProfile;
