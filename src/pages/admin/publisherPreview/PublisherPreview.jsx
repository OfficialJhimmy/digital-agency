import React, { useState, useEffect } from "react";
import "../../dashboard/dashboard.scss";
import "../../../pages/marketer/preview/preview.scss";
import AdminTags from "../../../components/adminTags/adminTags";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import logo from "../../../assets/image 1.png";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../allAdvertisers/advertiser.scss";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import tick from "../../../assets/Frame 338.svg";
import icon4 from "../../../assets/Frame 3333.svg";

const PublisherPreview = () => {
  const [adsList, setAdsList] = useState([]);
  const history = useHistory();
  const [publ, setPubl] = useState([]);
  const [banner, setBanner] = useState([]);
  const [publisherAds, setPublisherAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const ticketData = JSON.parse(localStorage.getItem("targetData"));
  const token = localStorage.getItem("auth_token");
  const auth_id = localStorage.getItem("auth_id");
  const tg_id = localStorage.getItem("tg_id");
  const authAxios = axios.create({
    baseURL: "https://test.canyousing.com.ng",
    // baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    const fetchingData = async () => {
      const allNotifications = await authAxios.get("/api/admin/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);

      const allList = await authAxios.get("/api/admin/publisher");
      const itemList = allList.data.data;
      setPubl(itemList.data);

      const publisherads = await authAxios.get("api/admin/all-script");
      const pub_res = publisherads.data;
      setPublisherAds(pub_res.data);

      const banners = await authAxios.get("/api/admin/all-banners");
      const res = banners.data;
      setBanner(res.data);

      const allAds = await authAxios.get("/api/admin/ads");
      const newData = allAds.data;
      setAdsList(newData.data.data);
    };
    fetchingData();
  }, []);
  const handleApprove = (e) => {
    e.preventDefault();
    setDisabled(true);
    setLoading(true);
    const { id } = e.currentTarget;
    console.log(id);
    const data = {
      approved: 1,
    };
    const approveAds = async () => {
      const query = await authAxios.put(`/api/admin/publisher/${id}`, data);
      const res = query.data;
      setLoading(false);
      swal("Great!", "Publisher Approved successfully!", "success").then(() => {
        window.location.reload();
      });
      console.log(res);
    };
    approveAds();
  };
  const handleReject = (e) => {
    e.preventDefault();
    setDisabled(false);
    setLoading(true);
    const { id } = e.currentTarget;
    console.log(id);
    const data = {
      approved: 0,
    };
    const rejectAds = async () => {
      const query = await authAxios.put(`/api/admin/publisher/${id}`, data);
      const res = query.data;
      setLoading(false);
      swal("Great!", "Publishers Rejected successfully!", "success").then(
        () => {
          window.location.reload();
        }
      );
      console.log(res);
    };
    rejectAds();
  };
  const deleteUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { id } = e.currentTarget;
    const query = await authAxios.post(`/api/admin/delete-user/${id}`);
    const res = query.data;
    setLoading(false);
    swal("Great!", "User Deleted successfully!", "success").then(() => {
      // window.location.reload();
      history.push("/admin/publisher");
    });
    console.log(res);
  };

  const exportPdf = (e) => {
    var doc = new jsPDF();
    doc.autoTable({ html: "#my-table" });
    doc.save("campaigns.pdf");
  };
  const val = Object.values(publ);
  const userScript = publisherAds.filter((item) => item.publisher_id == tg_id);
  console.log(publisherAds);
  console.log(userScript);

  return (
    <div className="dashboard marketer-preview preview">
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
          <div className="dashboard-main">
            <div className="preview-content">
              <div className="main-heading">
                <div className="welcome">
                  <h4>Publisher details</h4>
                </div>
                <div className="smm"></div>
              </div>
              <div className="preview-wrapper">
                {val
                  .filter((item) => item.id == tg_id)
                  .map(
                    ({
                      id,
                      firstName,
                      lastName,
                      email,
                      phone,
                      company,
                      website_timeline,
                      website,
                      business_bio,
                      approved,
                      average_visit,
                      industry,
                    }) => {
                      let link = "https://" + website;
                      let approvedBtn = "";
                      if (approved == 0) {
                        approvedBtn = (
                          <div className="approve-text d-flex align-item-center">
                            <p className="reject">Rejected</p>
                            <img src={icon4} alt="" width="15px" />
                          </div>
                        );
                      } else if (approved == 1) {
                        approvedBtn = (
                          <div className="approve-text d-flex align-item-center">
                            <p>Approved</p>
                            <img src={tick} alt="" width="15px" />
                          </div>
                        );
                      } else {
                        approvedBtn = (
                          <div className="row d-flex justify-content-between">
                            <div className="col-6">
                              <button
                                className="approve"
                                id={id}
                                onClick={handleApprove}
                                disabled={disabled}
                              >
                                Approve
                              </button>
                            </div>
                            <div className="col-6">
                              <button
                                id={id}
                                onClick={handleReject}
                                disabled={disabled}
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <>
                          <div className="prev-container" key={id}>
                            <div className="ads-detail">
                              <div className="title mb-4">
                                <h5>Name</h5>
                                <p>{`${firstName} ${lastName}`}</p>
                              </div>
                              <div className="descritpion mb-4">
                                <h5>Business Bio</h5>
                                <p>{business_bio}</p>
                              </div>
                              <div className="budget mb-4">
                                <h5>Company</h5>
                                <p>{company}</p>
                              </div>
                              <div className="dates mb-4">
                                <div className="start">
                                  <h5>Website</h5>
                                  <p>
                                    <a href={link} target="_blank">
                                      {website}
                                    </a>
                                  </p>
                                </div>
                                <div className="end">
                                  <h5>Website Timeline</h5>
                                  <p>{website_timeline}</p>
                                </div>
                              </div>
                              <div className="dates mb-4">
                                <div className="start">
                                  <h5>Average Visit</h5>
                                  <p>{average_visit}</p>
                                </div>
                                <div className="end">
                                  <h5>Industry</h5>
                                  <p>{industry}</p>
                                </div>
                              </div>
                            </div>
                            <div className="sender">
                              <div className="sender-profile">
                                <h5>Contact</h5>
                                <p className="email">{email}</p>
                                <p>{phone}</p>
                              </div>
                              <div className="action-btns mt-5">
                                {approvedBtn}
                              </div>
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
                            </div>
                          </div>
                          <div className="lower-btns d-block">
                            {/* <Link to='/admin/publisher'>Back</Link> */}
                            <button
                              style={{ marginLeft: "0px" }}
                              onClick={deleteUser}
                              id={id}
                            >
                              Delete Account
                            </button>
                          </div>
                        </>
                      );
                    }
                  )}
              </div>
              <div className="all-ads">
                <h4>All Publisher Ads</h4>
                <div className="history-table mb-5">
                  <table className="table admin-view">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Campaign Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Location</th>
                        <th scope="col">Bugdet</th>
                        <th scope="col">Impressions</th>
                        <th scope="col">Clicks</th>
                        <th scope="col">Publisher</th>
                        <th scope="col">status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userScript.map(
                        ({
                          id,
                          user_id,
                          impressions,
                          clicks,
                          banner_id,
                          publisher_id,
                          advert_id,
                        }) => {
                          const ads_id = advert_id;
                          const ban_id = banner_id;
                          const targetBanner = banner.filter(
                            (item) => item.user_id == user_id
                          );
                          const newPublisher = val.filter(
                            (item) => item.id == publisher_id
                          );

                          let publisherName = "";
                          newPublisher.map(({ company }) => {
                            publisherName = company;
                          });

                          let title = "";
                          let content_data = "";
                          let location_data = "";
                          let budget_data = "";
                          let status = "";
                          targetBanner.map(({ id, name, advert_id }) => {
                            // console.log(id, badss)
                            if (id == ban_id) {
                              title = name;
                            }
                          });
                          // console.log(title);
                          adsList.map(
                            ({
                              id,
                              title,
                              content,
                              location,
                              budget_id,
                              active,
                              approved,
                            }) => {
                              if (ads_id == id) {
                                content_data = content;
                                location_data = location;
                                if (budget_id == 1) {
                                  budget_data = "#10,000";
                                } else if (budget_id == 2) {
                                  budget_data = "#50,000";
                                } else if ((budget_id = 3)) {
                                  budget_data = "#100,000";
                                }
                                if (approved == 1) {
                                  status = "Running";
                                } else if (approved == 2) {
                                  status = "Approved";
                                } else {
                                  status = "Not Approved";
                                }
                              }
                            }
                          );
                          return (
                            <tr key={id} id={id}>
                              <th scope="row text-left">
                                <input type="checkbox" name="" id="" />
                              </th>
                              <td>{title}</td>
                              {/* <td>Publisher</td> */}
                              <td>{content_data}</td>
                              <td>{location_data}</td>
                              <td>{budget_data}</td>
                              <td className="text-center">{impressions}</td>
                              <td>{clicks}</td>
                              <td>{publisherName}</td>
                              <td>{status}</td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="row mb-4 text-center justify-content-center"
                style={{ marginTop: "-6rem", marginBottom: "4rem" }}
              >
                <div className="col-lg-4">
                  <button
                    className="export_btn"
                    style={{
                      padding: "7px 20px",
                      width: "100%",
                      borderRadius: "5px",
                      marginBottom: "2rem",
                    }}
                    onClick={exportPdf}
                  >
                    Export Pdf
                  </button>
                </div>
              </div>
              {/* <div className="lower-btns"> */}
              {/* <Link to='/admin/publisher'>Back</Link> */}
              {/* <button  onClick={deleteUser} id={id}>Delete Account</button> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherPreview;
