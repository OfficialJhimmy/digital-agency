import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../pages/userReg/userReg.scss";
import axios from "axios";
import Header from "../../components/header/header";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

const UserRegistration = ({ navBackground }) => {
  const history = useHistory();
  const [personal, setPersonal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locations, setLocation] = useState([]);
  //    const [value_, setValue] = useState("");
  const [value, setValue] = useState({
    type: "",
    overturn: "",
    size: "",
    duration: "",
    role: "",
    country: "",
    style: false,
  });
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
    country: "",
    company: "",
    business_type: "",
    business_size: "",
    business_duration: "",
    overturn: "",
    bio: "",
    role: "",
    other: "nil",
    agree: 1,
  });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const result = response.data;
        setLocation(result);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setPersonal(!personal);
  };

  const handleChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const _handleChange = (e) => {
    e.persist();
    setValue({ type: e.target.value });
    if (e.target.value === "others") {
      setValue({ style: true });
    }
    setUser({ ...user, business_type: e.target.value });
  };
  const _handleChange2 = (e) => {
    e.persist();
    setValue({ overturn: e.target.value });
    setUser({ ...user, overturn: e.target.value });
  };
  const _handleChange3 = (e) => {
    e.persist();
    setValue({ size: e.target.value });
    setUser({ ...user, business_size: e.target.value });
  };
  const _handleChange4 = (e) => {
    e.persist();
    setValue({ duration: e.target.value });
    setUser({ ...user, business_duration: e.target.value });
  };
  const _handleChange5 = (e) => {
    e.persist();
    setValue({ role: e.target.value });
    setUser({ ...user, role: e.target.value });
  };

  const __handleChange = (e) => {
    e.persist();
    const targetLocation = e.target.value;
    setValue({ country: targetLocation });
    setUser({ ...user, country: e.target.value });
    // setAllArea(prevState => [...prevState, targetLocation])
  };
  const auth_id = localStorage.getItem("auth_id");
  const profileSubmit = (e) => {
    e.preventDefault();
    if (
      user.phone !== "" &&
      user.agree !== "" &&
      user.overturn !== "" &&
      user.dob !== "" &&
      user.company !== "" &&
      user.business_duration !== "" &&
      user.business_size !== "" &&
      user.business_type !== ""
    ) {
      setLoading(true);
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        company: user.company,
        country: user.country,
        dob: user.dob,
        business_type: user.business_type,
        business_duration: user.business_duration,
        business_size: user.business_size,
        bio: user.bio,
        overturn: user.overturn,
        agree: user.agree,
        other: user.other,
      };
      const newForm = new FormData();
      newForm.append("firstName", data.firstName);
      newForm.append("lastName", data.lastName);
      newForm.append("phone", data.phone);
      newForm.append("role", data.role);
      newForm.append("country", data.country);
      newForm.append("company", data.company);
      newForm.append("business_type", data.business_type);
      newForm.append("business_duration", data.business_duration);
      newForm.append("business_size", data.business_size);
      newForm.append("turnover", data.overturn);
      newForm.append("business_bio", data.bio);
      newForm.append("dob", data.dob);
      newForm.append("other", data.other);
      newForm.append("agree", data.agree);
      axios({
        url: `https://moovitapi.com/api/user/update/${auth_id}?firstName=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}&dob=${data.dob}&country=${data.country}&company=${data.company}&business_type=${data.business_type}&role=${data.role}&agree=1&business_type=${data.business_size}&business_duration=${data.business_duration}&turnover=${data.overturn}&business_bio=${data.bio}&other=${data.other}`,
        method: "PUT",
        data: newForm,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            localStorage.setItem("auth_name", user.firstName);
            history.push("/dashboard/advertiser");
          } else {
            console.log(res.data.message);
          }
        })
        .catch((error) => console.log(error));
    } else if (
      user.phone !== "" ||
      user.agree !== "" ||
      user.overturn !== "" ||
      user.dob !== "" ||
      user.company !== "" ||
      user.business_duration !== "" ||
      user.business_size !== "" ||
      user.business_type !== ""
    ) {
      swal("Ooops!", "Please select all fields", "warning");
    }
  };

  return (
    <div className="user-registration">
      <Header navBackground={navBackground} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col__">
            <div className="form-wrapper">
              <div className="form-heading">
                <h5 style={{ color: personal ? "grey" : "blue" }}>
                  1. Personal Details
                </h5>
                <h5 style={{ color: personal ? "blue" : "grey" }}>
                  2. Business Details
                </h5>
                <span
                  className="indicator"
                  style={{
                    transform: personal ? "translateX(140px)" : "initial",
                  }}
                ></span>
              </div>
              <form
                onSubmit={profileSubmit}
                style={{ height: personal ? "620px" : "370px" }}
              >
                <div
                  className="personal-detail"
                  style={{
                    transform: personal ? "translateX(-630px)" : "initial",
                  }}
                >
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="">First Name</label>
                        <input
                          type="text"
                          placeholder="John"
                          required
                          name="firstName"
                          onChange={handleChange}
                          value={user.firstName}
                        />
                      </div>
                    </div>
                    <div className="col end">
                      <div className="form-group">
                        <label htmlFor="">Last Name</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          name="lastName"
                          required
                          onChange={handleChange}
                          value={user.lastName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="">Date of Birth</label>
                        <input
                          type="date"
                          placeholder="DD/MM/YY"
                          name="dob"
                          required
                          onChange={handleChange}
                          value={user.dob}
                        />
                      </div>
                    </div>
                    <div className="col end">
                      <div className="form-group">
                        <label htmlFor="">Phone Number</label>
                        <input
                          type="text"
                          placeholder="+234 814 555 345 33"
                          required
                          name="phone"
                          onChange={handleChange}
                          value={user.phone}
                        />
                        {/* <input type="tel" name="phone" onChange={handleChange} value={user.phone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"required></input> */}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Country</label>
                        <input
                          list="data"
                          value={value.country}
                          onChange={__handleChange}
                          required
                        />
                        <datalist id="data">
                          {locations.map(({ name, index }) => (
                            <option key={index} value={name.common} id={index}>
                              {name.common}
                            </option>
                          ))}
                        </datalist>
                        {/* <input list="data" value={value.country} onChange={__handleChange} required />
                                                <datalist id="data">
                                                    {allCountries.map(({name, isoCode}) =>
                                                        <option value={name} id={isoCode}>{name}</option>
                                                    )}
                                                </datalist> */}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label>Role</label>
                        <select
                          name=""
                          value={value.role}
                          onChange={_handleChange5}
                          required
                        >
                          <option value="" disabled className="disabled">
                            Select Role
                          </option>
                          <option value="advertiser">Advertiser</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="buttons">
                    <button>
                      <Link to="/account-type">Back</Link>
                    </button>
                    <button onClick={handleClick}>Continue</button>
                  </div>
                </div>
                <div
                  className="business-detail"
                  style={{
                    transform: personal ? "translateX(-620px)" : "initial",
                  }}
                >
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <label htmlFor="" className="title">
                        Account Type
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="">Company Name</label>
                        <input
                          type="text"
                          placeholder="The Punch"
                          name="company"
                          required
                          onChange={handleChange}
                          value={user.company}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group start">
                        <label htmlFor="">Business Type</label>
                        <select
                          name=""
                          id=""
                          value={value.type}
                          required
                          onChange={_handleChange}
                        >
                          <option value="" className="first" disabled>
                            Select Business Type
                          </option>
                          <option value="media">Media and Communication</option>
                          <option value="hospitality">Hospitality </option>
                          <option value="photography">Photography</option>
                          <option value="technology">Technology</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="agriculture">Agriculture</option>
                          <option value="logistics">Logistics</option>
                          <option value="construction">Construction</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="banking">Banking and Finance</option>
                          <option value="others">Others</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-6"
                      style={{ display: value.style ? "block" : "none" }}
                    >
                      <div className="form-group">
                        <label htmlFor="">Other</label>
                        <input
                          type="text"
                          placeholder="Enter other business type"
                          name="other"
                          value={user.other}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group start">
                        <label htmlFor="">What is your yearly overturn</label>
                        <select
                          name=""
                          id=""
                          value={value.overturn}
                          required
                          onChange={_handleChange2}
                        >
                          <option value="" disabled className="first">
                            Select yearly overturn
                          </option>
                          <option value="500,000 - 1 million">
                            500,000 - 1 million
                          </option>
                          <option value="1.5 million - 3 million">
                            1.5 million - 3 million
                          </option>
                          <option value="3 million - 10 million">
                            3 million - 10 million
                          </option>
                          <option value="15 million - 100 million">
                            15 million - 100 million
                          </option>
                          <option value="Over 150 million">
                            Over 150 million
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group start">
                        <label htmlFor="">Business Size</label>
                        <select
                          name=""
                          id=""
                          value={value.size}
                          required
                          onChange={_handleChange3}
                        >
                          <option value="" disabled className="first">
                            Select Business size
                          </option>
                          <option value="1-10">1-10</option>
                          <option value="10-20">10-20 </option>
                          <option value="20 - 50">20 - 50</option>
                          <option value="50 - 100">50 - 100</option>
                          <option value="100 Above">100 Above</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group start">
                        <label htmlFor="">Business Duration</label>
                        <select
                          name=""
                          id=""
                          value={value.duration}
                          required
                          onChange={_handleChange4}
                        >
                          <option value="" disabled className="first">
                            Select Business duration
                          </option>
                          <option value="500,000 - 1 million">
                            6 months - 1 year
                          </option>
                          <option value="1.5 million - 3 million">
                            1 year - 5 years
                          </option>
                          <option value="3 million - 10 million">
                            5 years - 10 years
                          </option>
                          <option value="15 million - 100 million">
                            10 years ago
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label htmlFor="">Business Bio</label>
                        <textarea
                          type="text"
                          required
                          placeholder="Tell us about your business"
                          name="bio"
                          value={user.bio}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-lg-7 agreement">
                      <input type="checkbox" required name="" />
                      <p>
                        By continuing, you’re agreeing to our Customer Terms of
                        Service, Privacy Policy, and Cookie Policy.
                      </p>
                    </div>
                  </div>

                  <div className="buttons">
                    <button onClick={handleClick}>Back</button>
                    <button type="submit">Finish</button>
                  </div>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
