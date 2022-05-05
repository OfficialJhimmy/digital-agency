import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../../dashboard/dashboard.scss";
import "../../dashboard/ads-history/ads-history.scss";
import "../../marketer/profile/profile-marketer.scss";
import Tags from "../../../components/Tags/Tags";
import logo from "../../../assets/image 1.png";
import MobileTags from "../../../components/MobileTags/mobileTags";
import hamburger from "../../../assets/hamburger.png";
import {
  FcPhone,
  FcAddressBook,
  FcFilingCabinet,
  FcBusinessman,
} from "react-icons/fc";

const Profile = () => {
  const [ham, setHam] = useState(false);
  const history = useHistory();
  const [profile, setProfile] = useState([]);

  const id = localStorage.getItem("auth_id");
  const token = localStorage.getItem("auth_token");

  const authAxios = axios.create({
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: false,
  });
  const [style, setStyle] = useState({
    hide: false,
    transformArrow: false,
  });
  const handleClick = (e) => {
    e.preventDefault();
    setStyle({ hide: !style.hide, transformArrow: !style.transformArrow });
  };
  const toggler = (e) => {
    e.preventDefault();
    setHam(!ham);
  };
  useEffect(() => {
    const fetching = async () => {
      const profileData = await authAxios.get("/api/user/profile");
      const result = profileData.data;
      setProfile(result);
    };
    fetching();
  }, []);
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
          <div className="text d-flex align center"></div>
        </div>
        <div className="dashboard-main-wrapper">
          <div className="tabs">
            <Tags style={style} handleClick={handleClick} />
          </div>
          <div className="mobile-tag">
            <MobileTags style={style} handleClick={handleClick} ham={ham} />
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
                      <Link to="/advertiser/edit-profile">Edit Profile</Link>
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

export default Profile;
