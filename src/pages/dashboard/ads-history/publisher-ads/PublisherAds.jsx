import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../dashboard/dashboard.scss";
import "../../../dashboard/ads-history/ads-history.scss";
import Tags from "../../../../components/Tags/Tags";
import hamburger from "../../../../assets/hamburger.png";
import logo from "../../../../assets/image 1.png";
import MobileTags from "../../../../components/MobileTags/mobileTags";
import RequestForm from "../../../../components/RequestForm/RequestForm";
import close from "../../../../assets/close2.png";

const PublisherAds = () => {
  let impressionCount = 0;
  let clickCount = 0;
  const [ham, setHam] = useState(false);
  const current_id = localStorage.getItem("auth_id");
  const token = localStorage.getItem("auth_token");
  const [adsList, setAdsList] = useState([]);
  const [banner, setBanner] = useState([]);
  const [publisherAds, setPublisherAds] = useState([]);
  const [isLoading] = useState(false);
  const [contactAgent, setContactAgent] = useState(false);
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
        const adsListData = response.data.data;
        const newArray = adsListData.filter((ele) => {
          return ele.createdBy == current_id;
        });
        setAdsList(newArray);

        const publisherads = await authAxios.get("api/user/script/users");
        const pub_res = publisherads.data;
        setPublisherAds(pub_res.data);

        const banners = await authAxios.get("/api/user/all-banners");
        const res = banners.data;
        setBanner(res.data);
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
  console.log(publisherAds);
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
                  <h4>Publisher Ads</h4>
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
                          <th scope="col">Impressions</th>
                          <th scope="col">Clicks</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {publisherAds.map(
                          ({
                            id,
                            user_id,
                            impressions,
                            clicks,
                            banner_id,
                            advert_id,
                          }) => {
                            const ads_id = advert_id;
                            const ban_id = banner_id;

                            const targetBanner = banner.filter(
                              (item) => item.user_id == user_id
                            );
                            // const filteredScript = publisherAds.filter(item => item.advert_id == ads_id )
                            // console.log(filteredScript)
                            // filteredScript.forEach(({impressions, clicks}) => {
                            //     console.log(impressions)
                            //     impressionCount = impressionCount += impressions
                            //     clickCount += clicks
                            // })
                            // console.log(clickCount)
                            console.log(impressionCount);

                            let title = "";
                            let content_data = "";
                            let location_data = "";
                            let budget_data = "";
                            let budget_val = 0;
                            let status = "";
                            targetBanner.map(({ id, name }) => {
                              if (id == ban_id) {
                                title = name;
                              }
                            });
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
                                const parentid = id;
                                publisherAds.map((item) => {
                                  if (item.advert_id == parentid) {
                                    const newArray = [
                                      {
                                        ...item,
                                        content: content,
                                        title: title,
                                        budget_id: budget_id,
                                        approved: approved,
                                      },
                                    ];
                                    console.log(newArray);
                                  }
                                });

                                if (ads_id == id) {
                                  content_data = content;
                                  location_data = location;
                                  if (budget_id == 1) {
                                    budget_data = "#10,000";
                                  } else if (budget_id == 2) {
                                    budget_data = "#50,000";
                                  } else if (budget_id == 3) {
                                    budget_data = "#100,000";
                                  }
                                  if (approved == 1) {
                                    status = "Approved";
                                  } else {
                                    status = "Not Approved";
                                  }
                                }
                                if (budget_id == 1) {
                                  budget_val = 10000;
                                } else if (budget_id == 2) {
                                  budget_val = 50000;
                                } else if (budget_id == 3) {
                                  budget_val = 100000;
                                }
                                let amount = budget_val;
                                let newAmount = 0;
                                const budget_rate = 900;
                                if (impressionCount < 1000) {
                                  newAmount = amount;
                                } else if (impressionCount >= 1000) {
                                  const rate = impressionCount / 1000;
                                  const val = rate * budget_rate;
                                  newAmount = amount - val;
                                }
                                // console.log(newAmount)
                              }
                            );
                            return (
                              <tr key={id} id={id}>
                                <th scope="row text-left">
                                  <input type="checkbox" name="" id="" />
                                </th>
                                <td>{title}</td>
                                <td>Publisher</td>
                                <td>{content_data}</td>
                                <td>{location_data}</td>
                                <td>{budget_data}</td>
                                <td className="text-center">{impressions}</td>
                                <td>{clicks}</td>
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

export default PublisherAds;
