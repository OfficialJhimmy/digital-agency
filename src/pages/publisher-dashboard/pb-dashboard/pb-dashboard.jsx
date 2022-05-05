import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../dashboard/dashboard.scss";
import PublisherMobileTag from "../../../components/Pub-mobile-Tab/PubMobileTag";
import squares from "../../../assets/SquaresFour.svg";
import megaphone from "../../../assets/MegaphoneSimple.svg";
import bag from "../../../assets/BagSimple.svg";
import creditCard from "../../../assets/CreditCard.svg";
import user from "../../../assets/User.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import { Link } from "react-router-dom";
import hamburger from "../../../assets/hamburger.png";
import logo from "../../../assets/image 1.png";

const PublisherDashboard = () => {
  const current_user = localStorage.getItem("auth_name");
  const token = localStorage.getItem("auth_token");

  const history = useHistory();
  const [ham, setHam] = useState(false);
  const [notification, setNotification] = useState([]);
  const [adsScript, setAdscript] = useState([]);
  const authAxios = axios.create({
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      const allNotifications = await authAxios.get("/api/user/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);

      const fetching_all_adcodes = await authAxios.get("/api/user/scripts");
      const fetched_data = fetching_all_adcodes.data;
      setAdscript(fetched_data.data);
    };
    fetchData();
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
  const count = adsScript.length;

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
                <Link to="/publisher/notifications">
                  Notifications{" "}
                  <span
                    style={{
                      display: notification_count < 1 ? "none" : "flex",
                    }}
                  >
                    {notification_count}
                  </span>
                </Link>
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
            <div className="main-heading">
              <div className="welcome">
                <p>Welcome Back</p>
                <h4>{current_user}</h4>
              </div>
            </div>
            <div className="main-records">
              <div className="funds-wrapper">
                <div className="fund-balance">
                  <p>Available Funds</p>
                  <h3>0.00</h3>
                </div>
              </div>
              <div className="ads-records">
                <div className="total">
                  <h4>0.00</h4>
                  <p>Amount earned</p>
                </div>
                <div className="impression">
                  <h4>0</h4>
                  <p>Amount recieved</p>
                </div>
                <div className="clicks">
                  <h4>0</h4>
                  <p>Running Ads</p>
                </div>
                <div className="clicks">
                  <h4>{count}</h4>
                  <p>Total Ads</p>
                </div>
              </div>
            </div>

            <div className="ads-stats">
              <div className="ads-graph">
                <div className="graph-heading">
                  <p>Ads chart</p>
                  {/* <p><span></span>RUNNING</p> */}
                </div>
                <div className="graph-view"></div>
              </div>
              <div className="smm-package">
                <div className="smm-heading">
                  <div className="item">
                    <p>SMM Package</p>
                    {/* <h5>Premium <span>View details</span></h5> */}
                  </div>
                  <div className="cancel-plan">{/* <p>Cancel plan</p> */}</div>
                </div>
                <div className="running-smm">
                  <p>Instagram Account- the_Brand_Hub</p>
                  <p>Twitter Account- TheBrandHubng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherDashboard;
