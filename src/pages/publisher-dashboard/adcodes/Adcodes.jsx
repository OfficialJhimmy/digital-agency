import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../dashboard/dashboard.scss";
import "../../marketer/adcode/adcode.scss";
import axios from "axios";
import squares from "../../../assets/SquaresFour.svg";
import megaphone from "../../../assets/MegaphoneSimple.svg";
import bag from "../../../assets/BagSimple.svg";
import creditCard from "../../../assets/CreditCard.svg";
import user from "../../../assets/User.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import logo from "../../../assets/image 1.png";
import hamburger from "../../../assets/hamburger.png";
import PublisherMobileTag from "../../../components/Pub-mobile-Tab/PubMobileTag";

const PublisherAdcode = () => {
  const [adcodes, setAdcodes] = useState([]);
  const [banner, setBanner] = useState([]);
  const [ham, setHam] = useState(false);
  const [notification, setNotification] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
    // baseURL : "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    const dataFetching = async () => {
      const fetching_all_adcodes = await authAxios.get("/api/user/scripts");
      const fetched_data = fetching_all_adcodes.data;
      if (fetched_data !== null) {
        setAdcodes(fetched_data.data);
      }

      const banners = await authAxios.get("/api/user/all-banners");
      const res = banners.data;
      setBanner(res.data);

      const allNotifications = await authAxios.get("/api/user/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);
    };
    dataFetching();
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
  const toggler = (e) => {
    e.preventDefault();
    setHam(!ham);
  };

  let notification_count = notification.length;

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
            <div className="tab-item">
              <img src={squares} alt="" />
              <Link to="/dashboard/publisher">Dashboard</Link>
            </div>
            <div className="tab-ads">
              <div className="tab-item">
                <img src={megaphone} alt="" />
                <p>
                  <Link to="/publisher-ads-history">Ads History</Link>
                </p>
              </div>
            </div>
            <div className="tab-item">
              <img src={bag} alt="" />
              <Link to="/publisher/adcode">Adcodes</Link>
            </div>
            <div className="tab-item">
              <img src={bag} alt="" />
              <p>
                <Link to="/publisher/notifications">Notifications</Link>
              </p>
            </div>
            <div className="tab-item">
              <img src={creditCard} alt="" />
              <Link to="/publisher-payment-history">Finance</Link>
            </div>
            <div className="tab-item">
              <img src={creditCard} alt="" />
              <Link to="/publisher/withdraw">Request Withdrawal</Link>
            </div>
            <div className="tab-item">
              <img src={user} alt="" />
              <Link to="/publisher/profile">Profile</Link>
            </div>
            <div className="tab-item">
              <img src={Handshake} alt="" />
              <Link to="/publisher/support">Support</Link>
            </div>
            <div className="tab-item">
              <img src={signout} alt="" />
              <p onClick={handleLogout} className="logout">
                Logout
              </p>
            </div>
          </div>
          <div className="mobile-tag">
            <PublisherMobileTag
              ham={ham}
              notification_count={notification_count}
              handleLogout={handleLogout}
            />
          </div>
          <div className="dashboard-main">
            <div className="ads-wrapper mt-3 mt--3">
              <div className="ads-heading">
                <h4>My Adcode</h4>
              </div>
              <div className="support">
                <div className="row">
                  {adcodes.map(({ id, script, created_at }) => {
                    const adcode_id = id;
                    let validDate = created_at.split("T");
                    let validTime = validDate[1].split(".");

                    return (
                      <div className="col-lg-4 col-md-6 mb-5" key={adcode_id}>
                        <div className="form-group">
                          <div className="code-wrapper">
                            {banner.map(({ id, name, banner }) => {
                              if (id == adcode_id) {
                                return (
                                  <p
                                    style={{
                                      color: "#484848",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {name}
                                  </p>
                                );
                              }
                            })}
                            <p
                              style={{
                                color: "#484848",
                                fontSize: "12px",
                                marginBottom: ".6rem",
                              }}
                            >
                              Created At : {validDate[0]} | {validTime[0]}
                            </p>
                            <textarea
                              style={{
                                border: "1px solid #e1e1e1",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                              }}
                              name=""
                              id=""
                              cols="30"
                              rows="10"
                              defaultValue={script}
                            ></textarea>
                          </div>
                        </div>
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
  );
};

export default PublisherAdcode;
