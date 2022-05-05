import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../dashboard/dashboard.scss";
import "../../marketer/adcode/adcode.scss";
import "../../dashboard/ads-history/ads-history.scss";
import "../../marketer/createBanner/createbanner.scss";
import axios from "axios";
import Loader from "react-loader-spinner";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import squares from "../../../assets/SquaresFour.svg";
import bag from "../../../assets/BagSimple.svg";
import plus from "../../../assets/Plus.svg";
import logo from "../../../assets/image 1.png";
import usericon from "../../../assets/User.svg";
import swal from "sweetalert";

//work on user_id

const Adcodes = () => {
  const [data_id, setData_id] = useState({
    banner: "",
    advertiser: "",
    publisher: "",
  });
  const [advertisers, setAdvertisers] = useState({
    advertiser: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const [advs, setAdvs] = useState([]);
  const [notification, setNotification] = useState([]);
  const [adcode, setAdcode] = useState({
    publisher: "",
    banner: "",
  });
  const [show, setShow] = useState(false);
  const [banner, setBanner] = useState([]);
  const [value_, setValue] = useState({
    publishers: "",
    banner: "",
    userId: "",
    advertid: "",
  });
  const [sendAdcode, setSendAdcode] = useState({
    publisher_sent: "",
    adcode_sent: "",
  });
  const [pub_l, setPub_l] = useState({
    publisher_sent: "",
    adcode_sent: "",
  });
  const [adsList, setAdsList] = useState([]);
  const [allPublisher, setPublisher] = useState([]);
  const handleChange_1 = (e) => {
    e.persist();
    setValue({ ...value_, [e.target.name]: e.target.value });
    setAdcode({ ...adcode, [e.target.name]: e.target.value });
    const { value } = e.currentTarget;

    let option = document.querySelector(`option[value="${value}"]`);
    if (option) {
      const selectedId = option.getAttribute("id");
      setData_id({ ...data_id, banner: selectedId });
    }
  };

  const handleChange__2 = (e) => {
    e.persist();
    setAdvertisers({ ...advertisers, [e.target.name]: e.target.value });
    const { value } = e.currentTarget;

    let option = document.querySelector(`option[value="${value}"]`);
    if (option) {
      const selectedId = option.getAttribute("id");
      setData_id({ ...data_id, advertiser: selectedId });
    }
  };
  const handleChange_2 = (e) => {
    e.persist();
    setPub_l({ ...pub_l, [e.target.name]: e.target.value });
    setSendAdcode({ ...sendAdcode, [e.target.name]: e.target.value });
    const { value } = e.currentTarget;

    let option = document.querySelector(`option[value="${value}"]`);
    if (option) {
      const selectedId = option.getAttribute("id");
      setData_id({ ...data_id, publisher: selectedId });
    }
  };

  const handleChange = (e) => {
    setSendAdcode({ ...sendAdcode, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
    // baseURL: "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const allBanners = await authAxios.get("/api/admin/all-banners");
        const banners_data = allBanners.data;
        setBanner(banners_data.data);

        const allPublishers = await authAxios.get("/api/admin/publisher");
        const pub_data = allPublishers.data.data;
        const value_data = Object.values(pub_data);
        setPublisher(value_data);

        const allAdverts = await authAxios.get("/api/admin/ads");
        const ads_data = allAdverts.data.data;
        setAdsList(ads_data.data);

        const allList = await authAxios.get("/api/admin/advertiser");
        const itemList = allList.data;
        console.log(itemList);
        setAdvs(itemList.data);

        const allNotifications = await authAxios.get(
          "/api/admin/notifications"
        );
        const notification_array = allNotifications.data;
        setNotification(notification_array.data);
      } catch (error) {
        const errors = error.response.status;
        const errorArray = error.response.data.errors;
        const newArray = Object.values(errorArray);

        let errorMsg = "";
        newArray[0].forEach((item) => {
          errorMsg = item;
        });
        swal("Failed!", `${errorMsg}`, "error").then(() => {
          setLoading(false);
        });
        console.log(errorMsg);
      }
    };
    fetchingData();
  }, []);
  const advertiserList = Object.values(advs);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      script: sendAdcode.adcode_sent,
    };

    const newForm = new FormData();
    newForm.append("publisher_id", data_id.publisher);
    newForm.append("script", data.script);
    newForm.append("user_id", data_id.advertiser);
    newForm.append("banner_id", data_id.banner);
    newForm.append("advert_id", value_.advertid);
    authAxios
      .post("/api/admin/publisher-ads", newForm)
      .then((res) => {
        swal("Great!", "Adcode sent successfully!", "success");
        setLoading(false);
        console.log(res.data);
        setValue({
          publishers: "",
          banner: "",
          userId: "",
          advertid: "",
        });
        setAdcode({
          publisher: "",
          banner: "",
        });
        setSendAdcode({
          publisher_sent: "",
          adcode_sent: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(true);
    banner
      .filter((item) => item.id == data_id.banner)
      .map(({ advert_id }) => {
        setValue({ ...value_, advertid: advert_id });
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
    btnText = <span className="text-white">Send Adcode</span>;
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
              <Link to="/#">Message</Link>
            </div>
            <div className="tab-item">
              <img src={plus} alt="" />
              <Link to="/marketer/tickets">My Ticket</Link>
            </div>
            <div className="tab-item">
              <img src={usericon} alt="" />
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
                <h4>Generate Adcode</h4>
              </div>
              <div className="support">
                <div className="row justify-content-between align-items-top">
                  <div className="col-lg-5">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="">Select Banner</label>
                        <input
                          list="data"
                          name="banner"
                          value={adcode.banner}
                          onChange={handleChange_1}
                        />
                        <datalist id="data">
                          {banner.map(({ id, name, banner, width }) => {
                            return (
                              <option
                                key={id}
                                value={name}
                                id={id}
                                className="banner-id"
                              ></option>
                            );
                          })}
                        </datalist>
                      </div>

                      <div className="row">
                        {banner
                          .filter((item) => item.id == data_id.banner)
                          .map(({ width, height, id }) => {
                            return (
                              <div className="row" key={id}>
                                <div className="col">
                                  <div className="form-group">
                                    <label htmlFor="">Banner Height</label>
                                    <input
                                      type="text"
                                      name="password"
                                      defaultValue={height}
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label htmlFor="">Banner Width</label>
                                    <input
                                      type="text"
                                      name="password"
                                      defaultValue={width}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <div className="row">
                        <div className="form-group">
                          <label htmlFor="">Select Advertiser</label>
                          <input
                            list="data1"
                            name="advertiser"
                            value={advertisers.advertiser}
                            onChange={handleChange__2}
                          />
                          <datalist id="data1">
                            {advertiserList.map(
                              ({ id, firstName, lastName }) => {
                                return (
                                  <option
                                    key={id}
                                    id={id}
                                    value={`${firstName} ${lastName}`}
                                    className="target_child"
                                  ></option>
                                );
                              }
                            )}
                          </datalist>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group">
                          <label htmlFor="">Publisher to send Adcode</label>
                          <input
                            list="data2"
                            name="publisher_sent"
                            value={sendAdcode.publisher_sent}
                            onChange={handleChange_2}
                          />
                          <datalist id="data2">
                            {allPublisher.map(({ id, firstName, lastName }) => (
                              <option
                                key={id}
                                id={id}
                                value={`${firstName} ${lastName}`}
                                className="target_child"
                              ></option>
                            ))}
                          </datalist>
                        </div>
                        <button className="generate_btn" onClick={handleClick}>
                          Generate Adcode
                        </button>

                        <div className="send-adcode">
                          <h3>Send Adcode to Publisher</h3>
                          <div className="form-group">
                            <label htmlFor="">Paste Adcode here</label>
                            <textarea
                              name="adcode_sent"
                              id=""
                              cols="30"
                              rows="7"
                              onChange={handleChange}
                              value={sendAdcode.adcode_sent}
                              style={{ border: "1px solid #e5e5e5" }}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        style={{ width: "180px", borderRadius: "3px" }}
                      >
                        {btnText}
                      </button>
                    </form>
                  </div>
                  <div
                    className="col-lg-5"
                    style={{ display: show ? "block" : "none" }}
                  >
                    {banner
                      .filter((item) => item.id == data_id.banner)
                      .map(({ width, height, id }) => {
                        let publisher_id = data_id.publisher;
                        let code = `<div id="ad">
                                                        <iframe
                                                        src="https://test.canyousing.com.ng/adcode/${id}
                                                        &0&2&${width}&7&59&${height}&${publisher_id}"
                                                        scrolling="no"
                                                        allowtransparency="true"
                                                        width = "${width}px"
                                                        height= "${height}px"
                                                        style="border:0;">
                                                        </iframe>
                                                    </div>`;
                        return (
                          <div
                            className="codes"
                            style={{ border: "1px solid #e5e5e5" }}
                          >
                            <p>{code}</p>
                          </div>
                        );
                      })}
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
export default Adcodes;
