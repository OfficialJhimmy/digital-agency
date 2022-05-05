import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../dashboard/dashboard.scss";
import "../../admin/admin.scss";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-loader-spinner";
import logo from "../../../assets/image 1.png";
import AdminTags from "../../../components/adminTags/adminTags";

const AddGraphic = () => {
  const token = localStorage.getItem("auth_token");
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file_, setFile_] = useState(null);
  const [graphic, setGraphic] = useState({
    name: "",
  });

  const authAxios = axios.create({
    // baseURL : "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  useEffect(() => {
    const fetching = async () => {
      const allNotifications = await authAxios.get("/api/admin/notifications");
      const notification_array = allNotifications.data;
      setNotification(notification_array.data);
    };
    fetching();
  }, []);
  const handleChange = (e) => {
    e.persist();
    setGraphic({ ...graphic, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newForm = new FormData();
    newForm.append("name", graphic.name);
    newForm.append("image", file_);

    authAxios
      .post("/api/admin/create-graphic", newForm)
      .then((res) => {
        if (res.status == 200) {
          const result = res.data;
          setLoading(false);
          swal("Great!", "New graphic template successfully added!", "success");
        }
      })
      .catch((err) => console.log(err));
  };
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
            <div className="ads-wrapper mt-3">
              <div className="ads-heading">
                <h4>Add a new Template</h4>
              </div>
              <div className="support">
                <div className="row">
                  <div className="col-lg-5">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="">Enter Graphic name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          value={graphic.name}
                        />
                      </div>
                      {/* <div className="form-group">
                                                <label htmlFor="">Enter Image Url</label>
                                                <input type="text" name="image" onChange={handleChange} value={graphic.image}/>
                                            </div> */}
                      <div className="form-group">
                        <label htmlFor="">Upload Template</label>
                        <input
                          type="file"
                          name="image"
                          onChange={(e) => setFile_(e.target.files[0])}
                          onClick={(event) => {
                            event.target.value = null;
                          }}
                        />
                      </div>
                      <button type="submit">Create Budget</button>
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

export default AddGraphic;
