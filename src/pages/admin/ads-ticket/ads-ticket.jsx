import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "../../dashboard/dashboard.scss";
import "../../admin/admin.scss";
import "../../admin/ads-ticket/ads-ticket.scss";
import paperclip from "../../../assets/Paperclip.svg";
import userP from "../../../assets/Ellipse 48.png";
import AdminTags from "../../../components/adminTags/adminTags";
import logo from "../../../assets/image 1.png";
import profileAvatar from "../../../assets/profile-avatar.png";
import "../../marketer/tickets/Tickets.scss";

const AdsTicket = () => {
  const [state, setState] = useState({
    show: true,
    show1: false,
    show2: false,
    show3: false,
  });
  const [hide, setHide] = useState("none");
  const [response, setResponse] = useState([]);
  const [adsList, setAdsList] = useState([]);
  const [staff, setStaff] = useState([]);
  const [assignedStaff, setAssignedStaff] = useState("");
  const [notification, setNotification] = useState([]);

  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
    // baseURL: "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allAds = await authAxios.get("/api/admin/ads");
        const response = allAds.data;
        const adsListData = response.data.data;
        setAdsList(adsListData);

        const allStaff = await authAxios.get("/api/admin/staff");
        const queryResponse = allStaff.data;
        const staffData = queryResponse.data.data;
        setStaff(staffData);

        const allNotifications = await authAxios.get(
          "/api/admin/notifications"
        );
        const notification_array = allNotifications.data;
        setNotification(notification_array.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //grabbing the ticket via the id
  const assignClick = (e) => {
    e.preventDefault();
    const { id } = e.currentTarget.parentElement.parentElement;
    console.log(id);
    setHide("block");
    setAssignedStaff(id);
  };

  const doneClick = (e) => {
    e.preventDefault();
    setHide("none");
    window.location.reload();
  };

  //handling the assign to marketer
  const handleClick = (e) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    document.getElementById(id).classList.add("selected");
    const data = {
      assigned: id,
    };
    const assignTask = async () => {
      const query = await authAxios.put(
        `/api/admin/assign-ads/${assignedStaff}`,
        data
      );
      const res = query.data;
      swal("Great!", "Assigned successfully!", "success");
      setResponse(res);
    };
    assignTask();
    // setAlert("block")
  };
  const allClick = (e) => {
    e.preventDefault();
    setState({ show: true, show1: false, show2: false, show3: false });
  };
  const unassignedClick = (e) => {
    e.preventDefault();
    setState({ show: false, show1: true, show2: false, show3: false });
  };
  const approvedClick = (e) => {
    e.preventDefault();
    setState({ show: false, show1: false, show2: true, show3: false });
  };
  const assignedClick = (e) => {
    e.preventDefault();
    setState({ show: false, show1: false, show2: false, show3: true });
  };

  const handleClick_ = (e) => {
    const targetId = e.target.id;
    const targetData = adsList.filter((ele) => {
      return ele.id == targetId;
    });
    localStorage.setItem("targetData", JSON.stringify(targetData));
    localStorage.setItem("targetId", targetId);
  };
  const newItems = adsList.filter((item) => item.assigned != null);
  const ApprovedList = adsList.filter((item) => item.approved == 1);
  const unassignedList = adsList.filter((item) => item.assigned === null);
  return (
    <div className="dashboard ads-ticket">
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
            <div className="ads-heading">
              <p
                onClick={allClick}
                style={{ color: state.show ? "#EE315D" : "#333333" }}
              >
                All
              </p>
              <p
                onClick={unassignedClick}
                style={{ color: state.show1 ? "#EE315D" : "#333333" }}
              >
                Unassigned
              </p>
              <p
                onClick={assignedClick}
                style={{ color: state.show3 ? "#EE315D" : "#333333" }}
              >
                Assigned
              </p>
              <p
                onClick={approvedClick}
                style={{ color: state.show2 ? "#EE315D" : "#333333" }}
              >
                Approved
              </p>
            </div>
            <div
              className="ads-wrapper"
              style={{ display: state.show ? "block" : "none" }}
            >
              <div className="ads-ticket-list">
                <div className="row">
                  {adsList.map(
                    ({
                      id,
                      title,
                      content,
                      image,
                      assigned,
                      createdBy,
                      budget_id,
                    }) => {
                      let actionBtn = "";
                      if (assigned === null) {
                        actionBtn = (
                          <button onClick={assignClick} id={id}>
                            Assign
                          </button>
                        );
                      } else {
                        actionBtn = (
                          <button className="btn-assigned">Assigned</button>
                        );
                      }
                      return (
                        <div className="col-lg-4" key={id}>
                          <div className="ads-card" id={id}>
                            <div className="card-title">
                              <h5>{title}</h5>
                              <div className="files">
                                {/* <img src={paperclip} alt="" />
                                <span>2 files</span> */}
                              </div>
                            </div>
                            <h6>
                              {budget_id === 0
                                ? "Pepper Jollof"
                                : budget_id === 1
                                ? "Sunday Jollof"
                                : budget_id === 2
                                ? "Local Jollof"
                                : budget_id === 3
                                ? "Owambe Jollof"
                                : budget_id === 4
                                ? "Jollof Jollof"
                                : "Pantry Jollof"}
                            </h6>
                            <p>{content}</p>
                            <div className="user-profile" id={createdBy}>
                              <img
                                src={profileAvatar}
                                alt="Profile Avatar"
                                className="marketer__avatar"
                              />{" "}
                              <p>Created by</p>
                            </div>
                            <div className="btn__wrapper--preview">
                              <div className="instruct-btns">
                                <Link
                                  to={`/admin/preview`}
                                  id={id}
                                  onClick={handleClick_}
                                >
                                  Preview
                                </Link>
                              </div>
                              <div className="instruct-btns">{actionBtn}</div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
            <div
              className="assigned-list"
              style={{ display: state.show3 ? "block" : "none" }}
            >
              <div className="ads-wrapper">
                <div className="row">
                  {newItems.map(
                    ({ id, title, content, image, createdBy, budget_id }) => {
                      return (
                        <div className="col-lg-4" key={id}>
                          <div className="ads-card" id={id}>
                            <div className="card-title">
                              <h5>{title}</h5>
                              <div className="files">
                                {/* <img src={paperclip} alt="" />
                                <span>2 files</span> */}
                              </div>
                            </div>
                            <h6>
                              {budget_id === 0
                                ? "Pepper Jollof"
                                : budget_id === 1
                                ? "Sunday Jollof"
                                : budget_id === 2
                                ? "Local Jollof"
                                : budget_id === 3
                                ? "Owambe Jollof"
                                : budget_id === 4
                                ? "Jollof Jollof"
                                : "Pantry Jollof"}
                            </h6>
                            <p>{content}</p>
                            <div className="user-profile" id={createdBy}>
                              <img
                                src={profileAvatar}
                                alt="Profile Avatar"
                                className="marketer__avatar"
                              />{" "}
                              <p>Created by</p>
                            </div>

                            {/* <div className="instruct-btns">
                                                            <a href='/#'>view details</a>
                                                            <button onClick={assignClick} id={id}>Assign</button>
                                                        </div> */}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
            <div
              className="approved-list"
              style={{ display: state.show2 ? "block" : "none" }}
            >
              <div className="ads-wrapper">
                <div className="row">
                  {ApprovedList.map(
                    ({ id, title, content, image, createdBy, budget_id }) => {
                      return (
                        <div className="col-lg-4" key={id}>
                          <div className="ads-card" id={id}>
                            <div className="card-title">
                              <h5>{title}</h5>
                              <div className="files">
                                {/* <img src={paperclip} alt="" />
                                <span>2 files</span> */}
                              </div>
                            </div>
                            <h6>
                              {budget_id === 0
                                ? "Pepper Jollof"
                                : budget_id === 1
                                ? "Sunday Jollof"
                                : budget_id === 2
                                ? "Local Jollof"
                                : budget_id === 3
                                ? "Owambe Jollof"
                                : budget_id === 4
                                ? "Jollof Jollof"
                                : "Pantry Jollof"}
                            </h6>
                            <p>{content}</p>
                            <div className="user-profile" id={createdBy}>
                              <img
                                src={profileAvatar}
                                alt="Profile Avatar"
                                className="marketer__avatar"
                              />{" "}
                              <p>
                                Created by <span>Jon Bellion</span>
                              </p>
                            </div>
                            {/* <div className="instruct-btns">
                                                            <a href='/#'>view details</a>
                                                            <button onClick={assignClick} id={id}>Assign</button>
                                                        </div> */}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
            <div
              className="unassigned"
              style={{ display: state.show1 ? "block" : "none" }}
            >
              <div className="ads-wrapper">
                <div className="row">
                  {unassignedList.map(
                    ({ id, title, content, image, createdBy, budget_id }) => {
                      return (
                        <div className="col-lg-4" key={id}>
                          <div className="ads-card" id={id}>
                            <div className="card-title">
                              <h5>{title}</h5>
                              <div className="files">
                                {/* <img src={paperclip} alt="" />
                                <span>2 files</span> */}
                              </div>
                            </div>
                            <h6>
                              {budget_id === 0
                                ? "Pepper Jollof"
                                : budget_id === 1
                                ? "Sunday Jollof"
                                : budget_id === 2
                                ? "Local Jollof"
                                : budget_id === 3
                                ? "Owambe Jollof"
                                : budget_id === 4
                                ? "Jollof Jollof"
                                : "Pantry Jollof"}
                            </h6>
                            <p>{content}</p>
                            <div className="user-profile" id={createdBy}>
                              <img
                                src={profileAvatar}
                                alt="Profile Avatar"
                                className="marketer__avatar"
                              />{" "}
                              <p>Created by</p>
                            </div>
                            <div className="btn__wrapper--preview">
                              <div className="instruct-btns">
                                <Link
                                  to={`/admin/preview`}
                                  id={id}
                                  onClick={handleClick_}
                                >
                                  Preview
                                </Link>
                              </div>
                              <div className="instruct-btns">
                                <a href="/#"></a>
                                <button onClick={assignClick} id={id}>
                                  Assign
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="assign-modal" style={{ display: hide }}>
        <div className="modal-wrapper">
          <h5>Assign a marketer</h5>
          <form action="">
            <label htmlFor="">Add name</label>
            <br></br>
            <input type="text" placeholder="Find a marketer" />
            <p>SUGGESTIONS</p>
            <div className="suggestions">
              {staff
                .filter((item) => item.role === "marketer")
                .map(({ firstName, lastName, id }) => {
                  return (
                    <div
                      className="user-profile"
                      key={id}
                      id={id}
                      onClick={handleClick}
                    >
                      <img src={userP} alt="" />
                      <div className="user-text">
                        <h6>{`${firstName} ${lastName}`}</h6>
                        <p>Available</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="done-btn">
              <p></p>
              <button onClick={doneClick}>Done</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdsTicket;
