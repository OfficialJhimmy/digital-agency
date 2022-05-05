import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import "../../dashboard/dashboard.scss";
import "../../dashboard/ads-history/ads-history.scss";
import logo from "../../../assets/image 1.png";
import Tags from "../../../components/Tags/Tags";

const EditProfile = () => {
  const history = useHistory();
  const [fetchProfile, setFetchProfile] = useState([]);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    loading: false,
  });
  //   const [profile, setProfile] = useState({
  //     firstName: fetchProfile.firstName,
  //     lastName: fetchProfile.lastName,
  //     number: fetchProfile.phone,
  //     email: fetchProfile.email,
  //     loading: false,
  //   });

  const handleChange = (e) => {
    e.persist();
    setProfile({ ...profile, [e.target.name]: e.target.value });
    // setProfile({ profile, [e.target.name]: e.target.value });
  };

  const id = localStorage.getItem("auth_id");
  const token = localStorage.getItem("auth_token");

  const authAxios = axios.create({
    // baseURL: "https://test.canyousing.com.ng",
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

  useEffect(() => {
    const fetching = async () => {
      const profileData = await authAxios.get("/api/user/profile");
      const result = profileData.data;
      setFetchProfile(result);
    };
    fetching();
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    setProfile({ ...profile, loading: true });
    const data = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.number,
      email: profile.email,
    };
    try {
      if (data.firstName !== "" && data.lastName !== "" && data.phone) {
        const postingData = await authAxios.put(
          `/api/user/edit-profile/${id}?firstName=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}&email=${data.email}`
        );
        const response = postingData.data;
        swal("Great!", "Profile Updated successfully!", "success");
        setProfile({
          firstName: "",
          lastName: "",
          number: "",
          email: "",
          loading: false,
        });
        history.push("/profile");
        console.log(response);
      } else if (data.firstName === "" && data.lastName === "" && data.phone) {
        return;
      }
    } catch (error) {
      console.log(error);
      setProfile({
        firstName: "",
        lastName: "",
        number: "",
        email: "",
        loading: false,
      });
      swal("Failed!", "Please try again!", "error");
    }
  };

  let btnText = "";
  if (profile.loading === true) {
    btnText = (
      <div
        className="spier"
        style={{ display: profile.loading ? "block" : "none" }}
      >
        <Loader type="TailSpin" color="#ffffff" height={20} width={20} />
      </div>
    );
  } else if (profile.loading === false) {
    btnText = <span className="text-white">Submit</span>;
  }
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
            <Tags style={style} handleClick={handleClick} />
          </div>
          <div className="dashboard-main">
            <div className="ads-wrapper">
              <div className="ads-heading">
                <h4>Edit Profile</h4>
              </div>
              <div className="user-detail">
                <div className="row">
                  <div className="col-md-5">
                    <form onSubmit={formSubmit}>
                      <div className="form-group">
                        <label htmlFor="">First Name</label>
                        <input
                          type="text"
                          placeholder={fetchProfile.firstName}
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
                          //   placeholder="John"
                          placeholder={fetchProfile.lastName}
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
                          placeholder={fetchProfile.email}
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
                          placeholder={fetchProfile.phone}
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
                      <button
                        type="submit"
                        className="btn btn-lg mt-4"
                        style={{ width: "180px" }}
                      >
                        {btnText}
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

export default EditProfile;
