import React, { useState, useEffect } from "react";
import "../dashboard/dashboard.scss";
import "../admin/admin.scss";
import PuffLoader from "react-spinners/PuffLoader";
// import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import notificationIcon from "../../assets/notif.svg";
import share from "../../assets/Frame 239.svg";
import users from "../../assets/Frame 240.svg";
import dots from "../../assets/Dots.svg";
import frame1 from "../../assets/Frame 233.svg";
import frame2 from "../../assets/Frame 232.svg";
import frame3 from "../../assets/Frame 231.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminTags from "../../components/adminTags/adminTags";
import logo from "../../assets/image 1.png";

const Admin = () => {
  const [adsList, setAdsList] = useState([]);
  const [adsCount, setAdsCount] = useState(0);
  const [pubCount, setpubCount] = useState(0);
  const [staff, setStaff] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [notification, setNotification] = useState([]);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 4000);
  }, []);

  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
    baseURL: "https://test.canyousing.com.ng",
    // baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "applciation/json",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const allPublishers = await authAxios.get("/api/admin/publisher");
      const result = allPublishers.data;
      const pubData = result.data.data;
      const allPubCount = pubData.length;
      setpubCount(allPubCount);

      const allStaff = await authAxios.get("/api/admin/staff");
      const queryResponse = allStaff.data;
      const staffData = queryResponse.data.data.length;
      setStaff(staffData);

      const allNotifications = await authAxios.get("/api/admin/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array);

      const linkedinAds = await authAxios.get("/api/admin/linkedin");
      const res = linkedinAds.data;
    };

    authAxios.get("/api/admin/ads").then((response) => {
      if (response.status == 200) {
        const data = response.data;
        // console.log(data);
        const adsListData = data.data.data;
        setAdsList(adsListData);
      }
    });

    authAxios
      .get("/api/admin/advertiser")
      .then((res) => {
        const adsCount = res.data.data;
        const targetArray = adsCount.data;
        const allCount = targetArray.length;
        setAdsCount(allCount);
      })
      .catch((err) => console.log(err));
    fetchData().then(() => {
      setLoading(false);
    });
  }, []);

  const handleClick = (e) => {
    const targetId = e.target.id;
    const targetData = adsList.filter((ele) => {
      return ele.id == targetId;
    });
    localStorage.setItem("targetData", JSON.stringify(targetData));
    localStorage.setItem("targetId", targetId);
  };

  const declinedList = adsList.filter((item) => item.approved === 0);
  const approvedList = adsList.filter((item) => item.approved === 1);
  const pendingList = adsList.filter((item) => item.approved === null);
  // console.log(adsList);

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
            <AdminTags notification={notification} />
          </div>
          <div className="dashboard-main admin">
            {isLoading ? (
              <div className="admin-loader">
                <PuffLoader color={"#ee315d"} loading={loader} size={60} />
              </div>
            ) : (
              <>
                <div className="main-heading">
                  <div className="welcome">
                    <p>Welcome Back</p>
                    <h4>Admin</h4>
                  </div>
                  <div className="smm">
                    <input type="text" placeholder="search" />
                  </div>
                </div>
                <div className="quick-stat">
                  <h6>Quick stats</h6>
                  <div className="row admin__row--parent">
                    <div className="col col__admin--child">
                      <Link to="/admin/advertisers">
                        <div className="content">
                          <div className="left-content">
                            <img src={notificationIcon} alt="icoln" />
                            <div className="content-text">
                              <p>Total</p>
                              <h5>Advertisers</h5>
                            </div>
                          </div>
                          <p>{adsCount}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col col__admin--child">
                      <Link to="/admin/publisher">
                        <div className="content">
                          <div className="left-content">
                            <img src={share} alt="" />
                            <div className="content-text">
                              <p>Total</p>
                              <h5>Publishers</h5>
                            </div>
                          </div>
                          <p>{pubCount}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col col__admin--child">
                      <Link to="/admin/marketer">
                        <div className="content">
                          <div className="left-content">
                            <img src={users} alt="" />
                            <div className="content-text">
                              <p>Total</p>
                              <h5>Marketers</h5>
                            </div>
                          </div>
                          <p>{staff}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="overall-info">
                  <div className="row admin__row--parent">
                    <div className="col-5 admin__column">
                      <div className="marketers">
                        <div className="marketers-heading">
                          <h5>Marketers</h5>
                          <img src={dots} alt="" />
                        </div>

                        <div className="progress--main__cover">
                          <h3>Assigned</h3>
                          <div className="parent__progress">
                            <div className="child__progress u-assigned">
                              <span className="span__progress--text">
                                {Math.round(
                                  (approvedList.length / adsList.length) * 100
                                )}
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="progress--main__cover">
                          <h3>Unassigned</h3>
                          <div className="parent__progress">
                            <div className="child__progress u-pending">
                              <span className="span__progress--text">
                                {Math.round(
                                  (pendingList.length / adsList.length) * 100
                                )}
                                %
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="progress--main__cover">
                          <h3>Idle</h3>
                          <div className="parent__progress">
                            <div className="child__progress u-idle">
                              <span className="span__progress--text">
                                {Math.round(
                                  (declinedList.length / adsList.length) * 100
                                )}
                                %
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* <Link to=''>view details</Link> */}
                      </div>
                    </div>
                    <div className="col-7 admin__column column-new">
                      <div className="tickets">
                        <div className="ticket-title">
                          <h5>Tickets</h5>
                          {/* <div className="btns">
                                                        <button>Unassigned</button>
                                                        <button>Assigned</button>
                                                    </div> */}
                        </div>
                        <div className="history-table">
                          <table className="table admin-view">
                            <thead>
                              <tr>
                                <th scope="col"></th>
                                <th scope="col">Campaign</th>
                                <th scope="col">Budget</th>
                                <th scope="col">Date</th>
                                <th scope="col">Location</th>
                              </tr>
                            </thead>
                            <tbody>
                              {adsList
                                .filter((items, index) => index < 3)
                                .map(({ title, start, location, id }) => {
                                  let newDate = "";
                                  const data_ = start.split("00");
                                  newDate = data_[0];
                                  return (
                                    <tr key={id}>
                                      <th scope="row">
                                        <input type="checkbox" name="" id="" />
                                      </th>
                                      <td className="text-left">{title}</td>
                                      <td>Tier 2</td>
                                      <td className="text-left">{newDate}</td>
                                      <td className="text-left">{location}</td>
                                      <td>
                                        <Link
                                          to="/admin/preview"
                                          id={id}
                                          onClick={handleClick}
                                        >
                                          Preview
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
