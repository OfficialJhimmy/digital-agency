import React, { useState, useEffect } from "react";
import "../../dashboard/dashboard.scss";
import "../../../pages/marketer/preview/preview.scss";
import AdminTags from "../../../components/adminTags/adminTags";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import logo from "../../../assets/image 1.png";
import "../allAdvertisers/advertiser.scss";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import tick from "../../../assets/Frame 338.svg";
import icon4 from "../../../assets/Frame 3333.svg";

const MarketerActivity = () => {
  let totalImpressions = 0;
  let totalClicks = 0;
  const [staff, setStaff] = useState([]);
  const [publisherAds, setPublisherAds] = useState([]);
  const [adsList, setAdsList] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [banner, setBanner] = useState([]);
  const ticketData = JSON.parse(localStorage.getItem("targetData"));
  const token = localStorage.getItem("auth_token");
  const auth_id = localStorage.getItem("auth_id");
  const tg_idx = localStorage.getItem("targetId");
  const authAxios = axios.create({
    // baseURL : "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    const fetchingData = async () => {
      const allNotifications = await authAxios.get("/api/admin/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);

      const allStaff = await authAxios.get("/api/admin/staff");
      const staffData = allStaff.data.data;
      setStaff(staffData.data);

      const allAds = await authAxios.get("/api/admin/ads");
      const response = allAds.data;
      const adsListData = response.data.data;
      setAdsList(adsListData);

      const publisherads = await authAxios.get("api/admin/all-script");
      const pub_res = publisherads.data;
      setPublisherAds(pub_res.data);

      // const banners = await authAxios.get('/api/admin/all-banners')
      // const res = banners.data;
      // setBanner(res.data)
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
  // const handleReject = (e) => {
  //     e.preventDefault();
  //     setDisabled(false);
  //     setLoading(true)
  //     const { id } = e.currentTarget;
  //     console.log(id)
  //     const data = {
  //         approved : 0
  //     }
  //     const rejectAds = async () => {
  //         const query = await authAxios.put(`/api/admin/publisher/${id}`, data);
  //         const res = query.data;
  //         setLoading(false);
  //         swal("Great!", "Publishers Rejected successfully!", "success")
  //         .then(() => {
  //             window.location.reload()
  //         })
  //         console.log(res);
  //     }
  //     rejectAds();
  // }
  const deleteUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { id } = e.currentTarget;
    const query = await authAxios.post(`/api/admin/delete-staff/${id}`);
    const res = query.data;
    setLoading(false);
    swal("Great!", "User Deleted successfully!", "success").then(() => {
      // window.location.reload();
      history.push("/admin/publisher");
    });
    console.log(res);
  };
  console.log(adsList);
  console.log(publisherAds);

  const arr = adsList.filter((item) => item.assigned == tg_idx);
  // arr.map(({id, title}) => {
  //     const target_id = id;
  //     const newArray = publisherAds.filter(item => item.advert_id == id);
  //     console.log(newArray)
  //     newArray.forEach(({advert_id, impressions, clicks}) => {
  //         // console.log(id)
  //         if(advert_id == target_id){
  //             totalImpressions = totalImpressions += impressions
  //             totalClicks = totalClicks += clicks
  //         }
  //     })
  // })

  // const newArray = publisherAds.filter(item => item.advert_id == valid_id);
  // console.log(newArray)
  // const arr = adsList.filter(item => item.assigned == tg_idx)
  // console.log(totalImpressions)
  // console.log(totalClicks)

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
                  <h4>Marketer details</h4>
                </div>
                <div className="smm"></div>
              </div>
              <div className="preview-wrapper">
                {staff
                  .filter((item) => item.id == tg_idx)
                  .map(
                    ({
                      id,
                      firstName,
                      lastName,
                      email,
                      phone,
                      role,
                      image,
                      created_at,
                    }) => {
                      const date_ = created_at.split("T")[0];
                      const time_ = created_at.split("T")[1];
                      const time_value = time_.split(".")[0];
                      return (
                        <>
                          <div className="prev-container" key={id}>
                            <div className="ads-detail">
                              <div className="title mb-4">
                                <h5>Name</h5>
                                <p>{`${firstName} ${lastName}`}</p>
                              </div>
                              {/* <div className="descritpion mb-4">
                                                        <h5>Business Bio</h5>
                                                        <p>{business_bio}</p>
                                                    </div> */}
                              <div className="budget mb-4">
                                <h5>Role</h5>
                                <p>{role}</p>
                              </div>

                              <div className="dates mb-4">
                                <div className="start">
                                  <h5>Created At</h5>
                                  <p>
                                    {date_} | {time_value}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="sender">
                              <div className="sender-profile">
                                <h5>Contact</h5>
                                <p className="email">{email}</p>
                                <p>{phone}</p>
                              </div>
                              {/* <div className="action-btns mt-5">
                                                        {approvedBtn}
                                                    </div> */}
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
                            <button style={{ marginLeft: "0px" }} id={id}>
                              Delete Account
                            </button>
                          </div>
                        </>
                      );
                    }
                  )}
              </div>
              <div className="all-ads">
                <h4>All Tasks</h4>
                <div className="history-table mb-5">
                  <table className="table admin-view">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Campaign Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Campaign Type</th>
                        <th scope="col">Location</th>
                        <th scope="col">Bugdet</th>
                        <th scope="col">Impressions</th>
                        <th scope="col">Clicks</th>
                        <th scope="col">Phone</th>
                        <th scope="col">status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        adsList
                          .filter((item) => item.assigned == tg_idx)
                          .map(
                            ({
                              id,
                              title,
                              content,
                              conversions,
                              app_installs,
                              engagement,
                              sales,
                              reach,
                              awareness,
                              target,
                              impressions,
                              location,
                              clicks,
                              phone,
                              budget_id,
                              approved,
                            }) => {
                              const target_id = id;

                              let price = "";
                              if (budget_id == 1) {
                                price = "#10,000";
                              } else if (budget_id == 2) {
                                price = "#50,000";
                              } else if ((budget_id = 3)) {
                                price = "#100,000";
                              }
                              let campaign_type = "";
                              if (awareness == 1) {
                                campaign_type = <span>Awareness</span>;
                              } else if (conversions == 1) {
                                campaign_type = <span>Conversions</span>;
                              } else if (app_installs == 1) {
                                campaign_type = <span>App Installs</span>;
                              } else if (engagement == 1) {
                                campaign_type = <span>Engagement</span>;
                              } else if (sales == 1) {
                                campaign_type = <span>Sales</span>;
                              } else if (reach == 1) {
                                campaign_type = <span>Reach</span>;
                              } else if (target == 1) {
                                campaign_type = <span>Traffic</span>;
                              }

                              let status = "";
                              if (approved == 1) {
                                status = "Approved";
                              } else {
                                status = "Not Approved";
                              }

                              arr.map(({ id, title }) => {
                                const newArray = publisherAds.filter(
                                  (item) => item.advert_id == id
                                );

                                newArray.forEach(
                                  ({ advert_id, impressions, clicks }) => {
                                    // console.log(id)
                                    console.log(target_id, advert_id);
                                    if (advert_id == target_id) {
                                      totalImpressions = totalImpressions +=
                                        impressions;
                                      totalClicks = totalClicks += clicks;
                                    }
                                  }
                                );
                              });
                              return (
                                <tr key={id} id={id}>
                                  <th scope="row text-left">
                                    <input type="checkbox" name="" id="" />
                                  </th>
                                  <td>{title}</td>
                                  <td>{content}</td>
                                  <td>{campaign_type}</td>
                                  <td>{location}</td>
                                  <td>{price}</td>
                                  <td className="text-center">
                                    {totalImpressions}
                                  </td>
                                  <td>{totalClicks}</td>
                                  <td>{phone}</td>
                                  <td>{status}</td>
                                </tr>
                              );
                            }
                          )

                        /* {
                                                userScript.map(({id, user_id, impressions, clicks, banner_id, publisher_id,advert_id}) => {
                                                    const ads_id = advert_id
                                                    const targetBanner = banner.filter(item => item.user_id == user_id)
                                                    const newPublisher = val.filter(item => item.id == publisher_id)
                                                    
                                                    let publisherName = "";
                                                    newPublisher.map(({company}) => {
                                                        publisherName = company
                                                    })
                                                    console.log(newPublisher);
                                                    let title = '';
                                                    let content_data = "";
                                                    let location_data = "";
                                                    let budget_data = "";
                                                    let status = ""
                                                    targetBanner.map(({id, name, advert_id}) => {
                                                        if(ads_id == advert_id){
                                                            title = name;
                                                        }  
                                                    })
                                                    adsList.map(({id, title, content, location, budget_id, active, approved}) => {
                                                        if(ads_id == id){
                                                            content_data = content;
                                                            location_data = location;
                                                            if(budget_id == 1){
                                                                budget_data = "#10,000"
                                                            }else if(budget_id == 2){
                                                                budget_data = "#50,000"
                                                            }else if(budget_id = 3){
                                                                budget_data = "#100,000"
                                                            }
                                                            if(approved == 1){
                                                                status = "Approved"
                                                            }else{
                                                                status = "Not Approved"
                                                            }
                                                        }
                                                    })
                                                    return(
                                                        <tr key={id} id={id}>
                                                        <th scope="row text-left">
                                                            <input type="checkbox" name="" id="" />
                                                        </th>
                                                        <td>{title}</td>
                                                
                                                        <td>{content_data}</td>
                                                        <td>{location_data}</td>
                                                        <td>{budget_data}</td>
                                                        <td className="text-center">{impressions}</td>
                                                        <td>{clicks}</td>
                                                        <td>{publisherName}</td>
                                                        <td>{status}</td>
                                                    </tr>
                                                    )
                                                })
                                            } */
                      }
                    </tbody>
                  </table>
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

export default MarketerActivity;
