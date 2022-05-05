import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../dashboard/dashboard.scss";
import "../../dashboard/ads-history/ads-history.scss";
import "../pb-support/style.scss";
import logo from "../../../assets/image 1.png";
import axios from "axios";
import squares from "../../../assets/SquaresFour.svg";
import megaphone from "../../../assets/MegaphoneSimple.svg";
import bag from "../../../assets/BagSimple.svg";
import Handshake from "../../../assets/Handshake.svg";
import signout from "../../../assets/SignOut.svg";
import creditCard from "../../../assets/CreditCard.svg";
import user from "../../../assets/User.svg";
import Loader from "react-loader-spinner";
import swal from "sweetalert";
import PublisherMobileTag from "../../../components/Pub-mobile-Tab/PubMobileTag";
import hamburger from "../../../assets/hamburger.png";

const PublisherSupport = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [ham, setHam] = useState(false);
  const [notification, setNotification] = useState([]);
  const token = localStorage.getItem("auth_token");
  const [support, setSupport] = useState({
    name: "",
    email: "",
    description: "",
    subject: "",
  });

  const handleChange = (e) => {
    e.persist();
    setSupport({ ...support, [e.target.name]: e.target.value });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: support.name,
      email: support.email,
      description: support.description,
      subject: support.subject,
    };

    const newData = new FormData();
    newData.append("name", data.name);
    newData.append("email", data.email);
    newData.append("subject", data.subject);
    newData.append("message", data.description);

    axios({
      url: "https://moovitapi.com/api/contact",
      method: "POST",
      data: newData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setLoading(false);
          swal("Great!", "Message sent successfully added!", "success");
          setSupport({ name: "", email: "", description: "", subject: "" });
        }
      })
      .catch((err) => console.log(err));
  };
  const handleLogout = (e) => {
    e.preventDefault();

    const authAxios = axios.create({
      baseURL: "https://moovitapi.com",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: false,
    });
    authAxios
      .post("/api/user/logout")
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
    <div className="dashboard support-wrapper">
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
          <div className="text d-flex align center">
            {/* <p>The Brand Hub</p>
                        <img src={caretDown} alt="" /> */}
          </div>
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
            <div className="ads-wrapper">
              <div className="ads-heading">
                <h4>Support</h4>
              </div>
              <div className="support">
                <h3>Create a ticket</h3>
                <p>Having an issues using our services? We are all ears.</p>
                <div className="row">
                  <div className="col-lg-5">
                    <form onSubmit={formSubmit}>
                      <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={support.name}
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={support.email}
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={support.subject}
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Description</label>
                        <textarea
                          name="description"
                          id=""
                          cols="10"
                          rows="3"
                          required
                          placeholder="enter message here"
                          value={support.description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <button type="submit">Send</button>
                      <div
                        className="spinner"
                        style={{ display: loading ? "block" : "none" }}
                      >
                        <Loader
                          type="TailSpin"
                          color="#EE315D"
                          height={30}
                          width={30}
                        />
                      </div>
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

export default PublisherSupport;
