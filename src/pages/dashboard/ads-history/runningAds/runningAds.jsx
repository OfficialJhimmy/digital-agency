import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../../../dashboard/dashboard.scss";
import "../../../dashboard/ads-history/ads-history.scss";
import Tags from "../../../../components/Tags/Tags";
import ReportModal from "../../Report-Modal/report-modal";
import hamburger from "../../../../assets/hamburger.png";
import logo from "../../../../assets/image 1.png";
import MobileTags from "../../../../components/MobileTags/mobileTags";
import RequestForm from "../../../../components/RequestForm/RequestForm";
import close from "../../../../assets/close2.png";

const RunningAds = (props) => {
  const [ham, setHam] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fbData, setfbData] = useState([]);
  const [linkedinData, setLinkedinData] = useState([]);
  const [contactAgent, setContactAgent] = useState(false);
  const [show, setShow] = useState("none");
  const [style, setStyle] = useState({
    hide: false,
    transformArrow: false,
  });

  const FB_AdsList = props.adsList;
  let insightData = [];
  FB_AdsList.map((item) => {
    if (item.insights) {
      const ADinsights = item;
      insightData.push(ADinsights);
    }
  });

  const handleClick = (e) => {
    e.preventDefault();
    setStyle({ hide: !style.hide, transformArrow: !style.transformArrow });
  };
  const modalClick = (e) => {
    e.preventDefault();
    setShow("block");
    const targetId = e.target.id;
    let single_Ads = insightData.filter((item) => item.id === targetId);
    setfbData(single_Ads);
  };

  const token = localStorage.getItem("auth_token");
  useEffect(() => {
    const authAxios = axios.create({
      // baseURL : "https://test.canyousing.com.ng",
      baseURL: "https://moovitapi.com",
      headers: {
        "Content-Type": "applciation/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const fetchingData = async () => {
      const linkedinAds = await authAxios.get("/api/linkedin");
      const res = linkedinAds.data;
      console.log(res);
      setLinkedinData(res.elements);
    };
    fetchingData();
  }, []);

  const toggler = (e) => {
    e.preventDefault();
    setHam(!ham);
  };
  const exportPdf = (e) => {
    var doc = new jsPDF();
    doc.autoTable({ html: "#table-fb" });
    doc.save("facebook.pdf");
  };
  const exportPdf_2 = (e) => {
    var doc = new jsPDF();
    doc.autoTable({ html: "#table-linkedin" });
    doc.save("linkedin.pdf");
  };
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
                  <h4>Social Media Ads</h4>
                </div>
                <div className="history-wrapper">
                  <div className="text-right">
                    <button className="hide-btn">
                      <Link to="/create-ads">
                        + <span>Create Ads</span>
                      </Link>
                    </button>
                  </div>
                  <div className="text-left">
                    <input type="text" placeholder="search" />
                  </div>
                </div>
                <div className="history-table social">
                  <h4 className="text-linkedin">Facebook Ads</h4>
                  <table className="table table-striped" id="table-fb">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Campaign</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Impressions</th>
                        <th scope="col">Clicks</th>
                        <th scope="col">Spent</th>
                        <th scope="col">Post Engagement</th>
                        <th scope="col">Video View</th>
                        <th scope="col">Page Engagement</th>
                        <th scope="col">Post Reaction</th>
                        {/* <th scope="col">Start Date</th> */}
                        <th scope="col">Status</th>
                        {/* <th scope="col">End Date</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {insightData.map((item) => {
                        const itemData = item.insights.data;
                        let clickAction = "";
                        let likeAction = "";
                        let videoView = "";
                        let engagementAction = "";
                        let postReaction = "";
                        let pageAction = "";

                        itemData.map(({ actions }) => {
                          actions.map((item) => {
                            if (item.action_type == "link_click") {
                              clickAction = item;
                            } else if (item.action_type == "like") {
                              likeAction = item;
                            } else if (item.action_type == "video_view") {
                              videoView = item;
                            } else if (item.action_type == "post_reaction") {
                              postReaction = item;
                            } else if (item.action_type == "post_engagement") {
                              engagementAction = item;
                            } else if (item.action_type == "page_engagement") {
                              pageAction = item;
                            }
                          });
                        });

                        const TotalpostReaction = Number(postReaction.value);
                        const TotalengagementAction = Number(
                          engagementAction.value
                        );
                        const TotalpageAction = Number(pageAction.value);
                        const TotalvideoView = Number(videoView.value);
                        const TotalClicks = Number(clickAction.value);
                        const TotalLikes = Number(likeAction.value);

                        return (
                          <tr key={item.id} id={item.id}>
                            <th scope="row text-left">
                              <input type="checkbox" name="" id="" />
                            </th>
                            <td>{item.name}</td>
                            <td>{!TotalLikes ? "-" : TotalLikes}</td>
                            <td className="text-center">
                              {itemData[0].impressions}
                            </td>
                            <td>{!TotalClicks ? "-" : TotalClicks}</td>
                            <td>{itemData[0].spend}</td>
                            <td className="text-center">
                              {!TotalengagementAction
                                ? "-"
                                : TotalengagementAction}
                            </td>
                            <td className="text-center">
                              {!TotalvideoView ? "-" : TotalvideoView}
                            </td>
                            <td className="text-center">{TotalpageAction}</td>
                            <td className="text-center">{TotalpostReaction}</td>
                            {/* <td>{itemData[0].date_start}</td> */}
                            <td>Running</td>
                            {/* <td>{itemData[0].date_stop}</td> */}
                            {/* <td><p className="view-detail" onClick={modalClick} id={item.id}>view details</p></td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="row justify-content-center">
                    <div className="col-lg-4 export">
                      <button
                        style={{
                          padding: "7px 20px",
                          width: "100%",
                          borderRadius: "5px",
                          marginBottom: "2rem",
                          marginTop: "3rem",
                        }}
                        onClick={exportPdf}
                      >
                        Export Pdf
                      </button>
                    </div>
                  </div>
                </div>
                <h4 className="text-linkedin">LinkedIn Ads</h4>
                <div className="history-table">
                  <table className="table table-striped" id="table-linkedin">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Campaign</th>
                        <th scope="col">Campaign Type</th>
                        <th scope="col">Impressions</th>
                        <th scope="col">Click</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {linkedinData.map((item, index) => {
                        const array_list = item.variables.data;
                        const newItem = Object.values(array_list);
                        console.log(newItem);
                        let titleText = "";
                        let textVal = "";
                        newItem.map(({ title, text }) => {
                          titleText = title;
                          textVal = text;
                        });
                        console.log(titleText);
                        return (
                          <tr key={index}>
                            <th scope="row text-left">
                              <input type="checkbox" name="" id="" />
                            </th>
                            <td>{titleText}</td>
                            <td>{textVal}</td>
                            <td className="text-center">0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>-</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="row justify-content-center">
                    <div className="col-lg-4 export">
                      <button
                        style={{
                          padding: "7px 20px",
                          width: "100%",
                          borderRadius: "5px",
                          marginBottom: "2rem",
                          marginTop: "3rem",
                        }}
                        onClick={exportPdf_2}
                      >
                        Export Pdf
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ReportModal
        show={show}
        setShow={setShow}
        fbData={fbData}
        modalClick={modalClick}
      />
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

const mapStateToProps = (state) => {
  return {
    adsList: state.ads,
  };
};
export default connect(mapStateToProps)(RunningAds);
