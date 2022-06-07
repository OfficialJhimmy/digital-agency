import React, { useState, useEffect } from "react";
import "../../dashboard/dashboard.scss";
import axios from "axios";
import "../../admin/admin.scss";
import { Link } from "react-router-dom";
// import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PuffLoader from "react-spinners/PuffLoader";
import AdminTags from "../../../components/adminTags/adminTags";
import "../allAdvertisers/advertiser.scss";
import logo from "../../../assets/image 1.png";
import ReactPaginate from "react-paginate";

const AllPublishers = () => {
  const [notification, setNotification] = useState([]);
  const [adsCount, setAdscount] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState({
    search: [],
    searchField: "",
  });
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
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  useEffect(() => {
    const fetching = async () => {
      const allNotifications = await authAxios.get("/api/admin/notifications");
      const notification_array = allNotifications;
      console.log(notification_array);
      setNotification(notification_array);

      authAxios
        .get("/api/admin/publisher")
        .then((res) => {
          const result = res.data.data;
          setAdscount(result.data);
        })
        .catch((err) => console.log(err));
    };
    fetching().then(() => {
      setLoading(false);
    });
  }, []);
  const handleClick = (e) => {
    const targetId = e.target.id;
    localStorage.setItem("tg_id", targetId);
  };

  const handleSearch = (e) => {
    e.persist();
    setState({ searchField: e.target.value });
  };
  let valuesArray = Object.values(adsCount);
  const searchedArray = valuesArray.filter((item) =>
    item.company.toLowerCase().includes(state.searchField.toLowerCase())
  );
  console.log(searchedArray);

  const handlePageClick = (data) => {
    console.log(data.selected);
  };

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
                    <h4>Publishers List</h4>
                  </div>
                  <div className="smm">
                    <input
                      type="text"
                      onChange={handleSearch}
                      placeholder="search by company name"
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
                        <th scope="col">Website Timeline</th>
                        <th scope="col">Created At</th>
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
                          website_timeline,
                          company,
                          created_at,
                        }) => {
                          const newArray = created_at.split("T");
                          const newDate = newArray[0];

                          const newTime = newArray[1].split(".");
                          const new_time = newTime[0];
                          return (
                            <tr key={id}>
                              <th scope="row">
                                <input type="checkbox" name="" id="" />
                              </th>
                              <td className="text-left">{`${firstName} ${lastName}`}</td>
                              <td className="text-left">{company}</td>
                              <td className="text-left">{email}</td>
                              <td className="text-left">{phone}</td>
                              <td className="text-left">{website_timeline}</td>
                              <td className="text-left">{`${newDate} | ${new_time}`}</td>
                              <td>
                                <Link
                                  to="/admin/publisher/preview"
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
                  <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    pageCount={4}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPublishers;
