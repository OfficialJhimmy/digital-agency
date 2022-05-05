import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import "../../dashboard/dashboard.scss";
import "../../dashboard/ads-history/ads-history.scss";
import "../../marketer/createBanner/createbanner.scss";
import logo from "../../../assets/image 1.png";
import user from "../../../assets/User.svg";
import Handshake from "../../../assets/Handshake.svg";
import squares from "../../../assets/SquaresFour.svg";
import bag from "../../../assets/BagSimple.svg";
import plus from "../../../assets/Plus.svg";
import signout from "../../../assets/SignOut.svg";
import axios from "axios";
import swal from "sweetalert";

// =========================================
// RECONSDIER HOW TO FILTER AVERTISERS BY FIRSTNAME
// =========================================

const CreateBanner = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [advertisers, setAdvertisers] = useState({
    advertiser: "",
    id: "",
  });
  const [title, setTitle] = useState("");
  const [adsList, setAdsList] = useState([]);
  const [advs, setAdvs] = useState([]);

  const [notification, setNotification] = useState([]);
  const [file, setFile] = useState(null);
  const [banner, setBanner] = useState({
    name: "",
    banner: "",
    width: "",
    height: "",
    description: "",
    url: "",
    userId: "",
    advert_id: "",
  });

  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
    // baseURL: "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const handleChange = (e) => {
    e.persist();
    setBanner({ ...banner, [e.target.name]: e.target.value });
  };
  const handleChange_2 = (e) => {
    e.persist();
    setAdvertisers({ ...advertisers, advertiser: e.target.value });
    const { value } = e.currentTarget;
    let targetItem = document.querySelector(`option[value="${value}"]`);
    if (targetItem) {
      const selectedId = targetItem.getAttribute("id");
      setBanner({ ...banner, userId: selectedId });
    }
  };
  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
    setBanner({ ...banner, name: e.target.value });
    const { value } = e.currentTarget;

    let option = document.querySelector(`option[value="${value}"]`);
    if (option) {
      const selectedId = option.getAttribute("id");
      setBanner({ ...banner, advert_id: selectedId });
    }
  };
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const allList = await authAxios.get("/api/admin/advertiser");
        const itemList = allList.data.data;
        const newArray = Object.values(itemList);
        setAdvs(newArray);

        const allAdverts = await authAxios.get("/api/admin/ads");
        const ads_data = allAdverts.data.data;
        setAdsList(ads_data.data);
      } catch (error) {
        console.log(error);
        swal("Failed", "Try Refresh the page to fetch data", "warning");
      }
    };
    fetchingData();
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();

    const finalTitle = `${title} ${banner.width}x${banner.height}`;

    setLoading(true);
    const newData = new FormData();
    newData.append("name", finalTitle);
    newData.append("banner", file);
    newData.append("width", banner.width);
    newData.append("height", banner.height);
    newData.append("description", banner.description);
    newData.append("url", banner.url);
    newData.append("advert_id", banner.advert_id);
    newData.append("user_id", banner.userId);

    authAxios
      .post("https://moovitapi.com/api/admin/banners", newData)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          swal("Great!", "Banner created successfully!", "success");
          setLoading(false);
          setBanner({
            name: "",
            banner: "",
            width: "",
            height: "",
            description: "",
            url: "",
            userId: "",
            advert_id: "",
          });
          setTitle("");
          setAdvertisers({ advertiser: "", id: "" });
        }
      })
      .catch((err) => {
        const errors = err.response.status;
        const errorArray = err.response.data.errors;
        const newArray = Object.values(errorArray);

        let errorMsg = "";
        newArray[0].forEach((item) => {
          errorMsg = item;
        });
        swal("Failed!", `${errorMsg}`, "error").then(() => {
          setLoading(false);
        });
        console.log(errorMsg);
      });
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

  let btnText = "";
  if (loading === true) {
    btnText = (
      <div className="spier" style={{ display: loading ? "block" : "none" }}>
        <Loader type="TailSpin" color="#ffffff" height={20} width={20} />
      </div>
    );
  } else if (loading === false) {
    btnText = <span className="text-white">Submit</span>;
  }

  console.log(banner);
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
                <h4>Upload new banner</h4>
              </div>
              <div className="support">
                <div className="row">
                  <div className="col-lg-5">
                    <form onSubmit={formSubmit}>
                      <div className="form-group">
                        <label htmlFor="">Title</label>
                        <input
                          list="data"
                          name="title"
                          value={title}
                          id="title-input"
                          onChange={handleTitle}
                        />
                        <datalist id="data">
                          {adsList.map(({ id, title }) => {
                            return (
                              <option
                                key={id}
                                id={id}
                                value={title}
                                className="target_child"
                              ></option>
                            );
                          })}
                        </datalist>
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Banner</label>
                        <input
                          type="file"
                          name="image"
                          onChange={(e) => setFile(e.target.files[0])}
                          onClick={(event) => {
                            event.target.value = null;
                          }}
                        />
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="">width</label>
                            <input
                              type="text"
                              name="width"
                              value={banner.width}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Height</label>
                            <input
                              type="text"
                              name="height"
                              value={banner.height}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Select Advertiser</label>
                        <input
                          list="data2"
                          name="advertiser"
                          value={advertisers.advertiser}
                          id="data-all"
                          onChange={handleChange_2}
                        />
                        <datalist id="data2">
                          {advs
                            .filter((item) => item.firstName != null)
                            .map(({ id, firstName, lastName }) => {
                              return (
                                <option
                                  key={id}
                                  id={id}
                                  value={`${firstName} ${lastName}`}
                                  className="target_child"
                                ></option>
                              );
                            })}
                        </datalist>
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Description</label>
                        <textarea
                          name="description"
                          id=""
                          cols="10"
                          rows="3"
                          placeholder="enter message here"
                          value={banner.description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor="">URL</label>
                        <input
                          type="text"
                          name="url"
                          value={banner.url}
                          onChange={handleChange}
                        />
                      </div>
                      <button
                        type="submit"
                        style={{ width: "180px", borderRadius: "3px" }}
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

export default CreateBanner;
