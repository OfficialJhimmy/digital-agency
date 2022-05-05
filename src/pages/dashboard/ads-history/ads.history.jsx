import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../dashboard/dashboard.scss";
import "../../dashboard/ads-history/ads-history.scss";
import Tags from "../../../components/Tags/Tags";
import hamburger from "../../../assets/hamburger.png";
import logo from "../../../assets/image 1.png";
import MobileTags from "../../../components/MobileTags/mobileTags";
import RequestForm from "../../../components/RequestForm/RequestForm";
import close from "../../../assets/close2.png";

const AdHistory = () => {
  let impressionCount = 0;
  let clickCount = 0;
  const [ham, setHam] = useState(false);
  const current_id = localStorage.getItem("auth_id");
  const token = localStorage.getItem("auth_token");
  const [paginate, setPaginate] = useState("");
  const [adsList, setAdsList] = useState([]);
  const [contactAgent, setContactAgent] = useState(false);
  const [publisherAds] = useState([]);
  const [isLoading] = useState(false);
  const [style, setStyle] = useState({
    hide: false,
    transformArrow: false,
  });
  const [state, setState] = useState({
    search: [],
    searchField: "",
  });

  const authAxios = axios.create({
    // baseURL : "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUserAds = await authAxios.get("/api/user/user-ads");
        const response = allUserAds.data;
        setPaginate(response.data);
        const adsListData = response.data.data;
        const newArray = adsListData.filter((ele) => {
          return ele.createdBy == current_id;
        });
        setAdsList(newArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setStyle({ hide: !style.hide, transformArrow: !style.transformArrow });
  };

  //calculating cost of impression
  publisherAds.forEach(({ impressions, clicks }) => {
    impressionCount = impressionCount += impressions;
    clickCount = clickCount += clicks;
  });

  const toggler = (e) => {
    e.preventDefault();
    setHam(!ham);
  };
  const exportPdf = (e) => {
    var doc = new jsPDF();
    doc.autoTable({ html: "#my-table" });
    doc.save("campaigns.pdf");
  };
  const handleSearch = (e) => {
    e.persist();
    setState({ searchField: e.target.value });
  };
  const searchedArray = adsList.filter((item) =>
    item.title.toLowerCase().includes(state.searchField.toLowerCase())
  );
  console.log(paginate);
  console.log(adsList);
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
              <div className="ads-wrapper">
                <div className="ads-heading">
                  <h4>Ads History</h4>
                </div>
                <div className="history-wrapper">
                  <div className="text-right">
                    <button>
                      <Link to="/create-ads">
                        + <span>Create Ads</span>
                      </Link>
                    </button>
                    <button className="export_btn" onClick={exportPdf}>
                      Generate Pdf
                    </button>
                  </div>
                  <div className="text-left">
                    <input
                      type="text"
                      onChange={handleSearch}
                      placeholder="search Ads"
                    />
                  </div>
                </div>
                <div className="history-table">
                  <div className="table-responsive">
                    <table
                      className="table table-striped table-hover table-condensed"
                      id="my-table"
                    >
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Campaign</th>
                          <th scope="col">Type</th>
                          <th scope="col">Content</th>
                          <th scope="col">Location</th>
                          <th scope="col">Budget</th>
                          <th scope="col">Start</th>
                          <th scope="col">End</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adsList.map(
                          ({
                            id,
                            title,
                            content,
                            location,
                            start,
                            end,
                            Dimensions,
                            budget_id,
                            approved,
                            awareness,
                            app_installs,
                            engagement,
                            sales,
                            reach,
                            target,
                            conversions,
                          }) => {
                            let newStartDate = "";
                            const data_1 = start.split("00");
                            newStartDate = data_1[0];

                            let newEndDate = "";
                            const data_2 = end.split("00");
                            newEndDate = data_2[0];

                            //budget
                            let budget_data = "";
                            if (budget_id == 1) {
                              budget_data = "#20,000";
                            } else if (budget_id == 2) {
                              budget_data = "#50,000";
                            } else if (budget_id == 3) {
                              budget_data = "#150,000";
                            } else if (budget_id == 4) {
                              budget_data = "#200,000";
                            } else if (budget_id == 5) {
                              budget_data = "#500,000";
                            } else if (budget_id == 6) {
                              budget_data = "#1,000,000";
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

                            // adsList.map(({id, title, content, location, budget_id, active, approved}) => {

                            //     if(ads_id == id){
                            //         content_data = content;
                            //         location_data = location;
                            //         if(budget_id == 1){
                            //             budget_data = "#10,000"
                            //         }else if(budget_id == 2){
                            //             budget_data = "#50,000"
                            //         }else if(budget_id == 3){
                            //             budget_data = "#100,000"
                            //         }
                            //         if(approved == 1){
                            //             status = "Approved"
                            //         }else{
                            //             status = "Not Approved"
                            //         }
                            //     }
                            //     if(budget_id == 1){
                            //         budget_val = 10000
                            //     }else if(budget_id == 2){
                            //         budget_val = 50000
                            //     }else if(budget_id == 3){
                            //         budget_val = 100000
                            //     }
                            //     let amount = budget_val;
                            //     let newAmount = 0;
                            //     const budget_rate = 900;
                            //     if(impressionCount < 1000){
                            //         newAmount = amount
                            //     }else if(impressionCount >= 1000){
                            //         const rate = impressionCount / 1000;
                            //         const val  = rate * budget_rate;
                            //         newAmount = amount - val;
                            //     }
                            //     // console.log(newAmount)
                            // })
                            return (
                              <tr key={id} id={id}>
                                <th scope="row text-left">
                                  <input type="checkbox" name="" id="" />
                                </th>
                                <td>{title}</td>
                                <td>{campaign_type}</td>
                                <td>{content}</td>
                                <td>{location}</td>
                                <td>{budget_data}</td>
                                <td className="text-center">{newStartDate}</td>
                                <td>{newEndDate}</td>
                                <td>{status}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            <div className="pagination text d-flex align-items-center justify-content-center">
              <a href={paginate.first_page_url} className="text-black">
                Previous
              </a>
              <a href={paginate.next_page_url} className="text-black">
                Next
              </a>
            </div>
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

export default AdHistory;
