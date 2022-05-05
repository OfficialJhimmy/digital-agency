import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../dashboard/dashboard.scss";
import Loader from "react-loader-spinner";
import Tags from "../../../components/Tags/Tags";
import "../../dashboard/ads-history/ads-history.scss";
import logo from "../../../assets/image 1.png";
import axios from "axios";
import swal from "sweetalert";
import MobileTags from "../../../components/MobileTags/mobileTags";
import hamburger from "../../../assets/hamburger.png";

const Support = () => {
  const [ham, setHam] = useState(false);
  const [loading, setLoading] = useState(false);
  const [support, setSupport] = useState({
    name: "",
    email: "",
    description: "",
    subject: "",
  });

  const toggler = (e) => {
    e.preventDefault();
    setHam(!ham);
  };
  const handleChange = (e) => {
    e.persist();
    setSupport({ ...support, [e.target.name]: e.target.value });
  };
  const [style, setStyle] = useState({
    hide: false,
    transformArrow: false,
  });
  const handleClick = (e) => {
    e.preventDefault();
    setStyle({ hide: !style.hide, transformArrow: !style.transformArrow });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: support.name,
      email: support.email,
      description: support.description,
      subject: support.subject,
    };

    const newData = new FormData();
    newData.append("name", data.name);
    newData.append("email", data.email);
    newData.append("subject", data.subject);
    newData.append("message", data.description);

    axios({
      // url : 'https://test.canyousing.com.ng/api/contact',
      url: "https://moovitapi.com/api/contact",
      method: "POST",
      data: newData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        if (res.status == 200) {
          setLoading(false);
          swal("Great!", "Message sent successfully!", "success");
          setSupport({ name: "", email: "", description: "", subject: "" });
        } else if (res.status !== 200) {
          swal("Oops!", "Something went wrong!", "warning");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        swal("Failed!", "Please try again!", "warning");
        setSupport({ name: "", email: "", description: "", subject: "" });
        setLoading(false);
      });
  };
  let btnText = "";
  if (loading === true) {
    btnText = (
      <div className="spier" style={{ display: loading ? "block" : "none" }}>
        <Loader type="TailSpin" color="#ffffff" height={20} width={20} />
      </div>
    );
  } else if (loading === false) {
    btnText = <span className="text-white">Submit</span>;
  }
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
              <img src={logo} alt="moovit-logo" />
            </Link>
          </div>
          <div className="text d-flex align center"></div>
        </div>
        <div className="dashboard-main-wrapper">
          <div className="tabs">
            <Tags style={style} handleClick={handleClick} />
          </div>
          <div className="mobile-tag">
            <MobileTags style={style} handleClick={handleClick} ham={ham} />
          </div>
          <div className="dashboard-main support-wrapper">
            <div className="ads-wrapper mt-3">
              <div className="ads-heading">
                <h4>Support</h4>
              </div>
              <div className="support">
                <h3>Create a ticket</h3>
                <p>Having an issues using our services? We are all ears.</p>
                <div className="row">
                  <div className="col-lg-5">
                    <form onSubmit={formSubmit}>
                      <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={support.name}
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={support.email}
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={support.subject}
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">Description</label>
                        <textarea
                          name="description"
                          id=""
                          cols="10"
                          rows="3"
                          required
                          placeholder="enter message here"
                          value={support.description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        style={{ width: "180px", borderRadius: "3px" }}
                      >
                        {btnText}
                      </button>
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

export default Support;
