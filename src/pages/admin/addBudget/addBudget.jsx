import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../dashboard/dashboard.scss";
import "../../dashboard/ads-history/ads-history.scss";
import "../../admin/admin.scss";
import axios from "axios";
import logo from "../../../assets/image 1.png";
import AdminTags from "../../../components/adminTags/adminTags";
import swal from "sweetalert";

const AddBudget = () => {
  const token = localStorage.getItem("auth_token");
  const [notification, setNotification] = useState([]);
  const [budget, setBudget] = useState({
    name: "",
    description: "",
    budget: "",
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
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    newForm.append("name", budget.name);
    newForm.append("description", budget.description);
    newForm.append("budget", budget.budget);

    authAxios
      .post("/api/admin/create-budget", newForm)
      .then((res) => {
        if (res.status == 200) {
          const result = res.data;
          swal("Great!", "New budget successfully added!", "success");
          console.log(result);
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
                <h4>Add a new Budget</h4>
              </div>
              <div className="support">
                <div className="row">
                  <div className="col-lg-5">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="">Enter budget name</label>
                        <input
                          type="text"
                          placeholder="Tier 3"
                          name="name"
                          onChange={handleChange}
                          value={budget.name}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Description</label>
                        <input
                          type="text"
                          name="description"
                          onChange={handleChange}
                          value={budget.description}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Budget</label>
                        <input
                          type="budget"
                          name="budget"
                          onChange={handleChange}
                          value={budget.budget}
                        />
                      </div>
                      <button type="submit">Send invite</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Alert alert={alert}/> */}
      </div>
    </div>
  );
};

export default AddBudget;
