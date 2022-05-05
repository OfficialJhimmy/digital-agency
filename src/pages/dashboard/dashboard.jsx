import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../dashboard/dashboard.scss";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import UserDashboardComponent from "../../components/userdashboardComponent/userDashboardComponent";
import Tags from "../../components/Tags/Tags";
import logo from "../../assets/image 1.png";
import close from "../../assets/close2.png";
import hamburger from "../../assets/hamburger.png";
import MobileTags from "../../components/MobileTags/mobileTags";
import RequestForm from "../../components/RequestForm/RequestForm";

const Dashboard = () => {
  let impressionCount = 0;
  let clickCount = 0;
  const [style, setStyle] = useState({
    hide: false,
    transformArrow: false,
  });
  const [contactAgent, setContactAgent] = useState(false);
  const [ham, setHam] = useState(false);
  const [userAds, setUserAds] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [publisherAds, setPublisherAds] = useState([]);
  const current_id = localStorage.getItem("auth_id");
  const token = localStorage.getItem("auth_token");

  const authAxios = axios.create({
    // baseURL: "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    setStyle({ hide: !style.hide, transformArrow: !style.transformArrow });
  };
  useEffect(() => {
    const fetchData = async () => {
      const allUserAds = await authAxios.get("/api/user/user-ads");
      const response = allUserAds.data;
      const adsListData = response.data.data;
      const newArray = adsListData.filter((ele) => {
        return ele.createdBy == current_id;
      });
      setUserAds(newArray);

      const publisherads = await authAxios.get("api/user/script/users");
      const pub_res = publisherads.data;
      setPublisherAds(pub_res.data);
    };
    fetchData();
    setLoading(false);
  }, []);

  const toggler = (e) => {
    e.preventDefault();
    setHam(!ham);
  };
  //ALL IMPRESSIONS AND CLICKS

  // const arr = [1,3,4]
  // let ite = 0;
  // arr.forEach(item => ite += item)
  // console.log(ite)
  publisherAds.forEach(({ impressions, clicks }) => {
    impressionCount = impressionCount += impressions;
    clickCount = clickCount += clicks;
  });

  const adsCount = userAds.length;
  console.log(userAds);
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
              <img src={logo} alt="moovit-logo" className="logo-img" />
            </Link>
            <div className="text d-flex align-items-center mobile">
              <p className="mt-1">Need help?</p>
              <button onClick={() => setContactAgent(true)}>
                Contact an agent
              </button>
            </div>
          </div>
          <div className="text d-flex align-items-center">
            <p className="mt-1">Need help?</p>
            <button onClick={() => setContactAgent(true)}>
              Contact an agent
            </button>
          </div>
        </div>
        <div className="dashboard-main-wrapper">
          <div className="tabs">
            <Tags style={style} handleClick={handleClick} />
          </div>
          <div className="mobile-tag">
            <MobileTags style={style} handleClick={handleClick} ham={ham} />
          </div>
          <div className="dashboard-main">
            {isLoading ? (
              <Loader type="Bars" color="#EE315D" height={30} width={40} />
            ) : (
              <UserDashboardComponent
                adsCount={adsCount}
                impressionCount={impressionCount}
                clickCount={clickCount}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className="contact-agent"
        style={{ display: contactAgent ? "block" : "none" }}
      >
        {/* <h5>Contact an agent</h5> */}
        <RequestForm />
        <div className="close" onClick={() => setContactAgent(false)}>
          <img src={close} alt="close btn" width="20px" height="20px" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
