import React, { useState, useEffect } from "react";
import "../../dashboard/dashboard.scss";
import axios from "axios";
// import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PuffLoader from "react-spinners/PuffLoader";
import "../../admin/admin.scss";
import "../allAdvertisers/advertiser.scss";
import { Link } from "react-router-dom";
import AdminTags from "../../../components/adminTags/adminTags";
import logo from "../../../assets/image 1.png";

const Advertisers = () => {
  const [notification, setNotification] = useState([]);
  const [adsCount, setAdscount] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const [state, setState] = useState({
    search: [],
    searchField: "",
  });

  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
    // baseURL: "https://test.canyousing.com.ng",
    baseURL: "https://moovitapi.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "applciation/json",
    },
  });
  const handleClick = (e) => {
    // e.preventDefault();
    const targetId = e.target.id;
    localStorage.setItem("tg_id", targetId);
  };
  const handleSearch = (e) => {
    e.persist();
    setState({ searchField: e.target.value });
  };
  useEffect(() => {
    const fetching = async () => {
      const allNotifications = await authAxios.get("/api/admin/notifications");
      const notification_array = allNotifications;
      setNotification(notification_array);

      authAxios
        .get("/api/admin/advertiser")
        .then((res) => {
          const result = res.data.data;
          console.log(result);
          setAdscount(result.data);
        })
        .catch((err) => console.log(err));
    };
    fetching().then(() => {
      setLoading(false);
    });
  }, []);

  let valuesArray = Object.values(adsCount);

  // const { search, searchField} = state;
  const searchedArray = valuesArray.filter((item) =>
    item.firstName.toLowerCase().includes(state.searchField.toLowerCase())
  );
  console.log(adsCount);

  return (
    <div className="dashboard preview">
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
                <div className="main-heading mb-4">
                  <div className="welcome">
                    <h4>Advertisers List</h4>
                  </div>
                  <div className="smm">
                    <input
                      type="text"
                      onChange={handleSearch}
                      placeholder="search advertiser"
                    />
                  </div>
                </div>
                <div className="history-table">
                  <table className="table admin-view">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Business Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Business Bio</th>
                        <th scope="col">Business Turnover</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedArray.map(
                        ({
                          id,
                          firstName,
                          lastName,
                          email,
                          phone,
                          business_bio,
                          company,
                          turnover,
                        }) => {
                          return (
                            <tr key={id}>
                              <th scope="row">
                                <input type="checkbox" name="" id="" />
                              </th>
                              <td className="text-left">{`${firstName} ${lastName}`}</td>
                              <td className="text-left">{company}</td>
                              <td className="text-left">{email}</td>
                              <td className="text-left">{phone}</td>
                              <td className="text-left">{business_bio}</td>
                              <td className="text-left">{turnover}</td>
                              <td>
                                <Link
                                  to="/admin/advertiser/preview"
                                  id={id}
                                  onClick={handleClick}
                                >
                                  Preview
                                </Link>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisers;
