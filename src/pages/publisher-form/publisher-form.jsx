import React, { useState, useEffect } from "react";
import "../publisher-form/publisher.form.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import Header from "../../components/header/header";
import swal from "sweetalert";

const PublisherForm = ({ navBackground }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [state1, setState1] = useState({
    selectedOption1: "",
  });
  const [state2, setState2] = useState({
    selectedOption2: "",
  });
  const [locations, setLocation] = useState([]);
  const id = localStorage.getItem("auth_id");

  const [value, setValue] = useState({
    industry: "",
    country: "",
  });
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    country: "Nigeria",
    company_name: "",
    business_bio: "",
    email: "",
    domain: "",
    industry: "",
    phone: "",
    duration_time: "",
    visit: "",
    role: "publisher",
    agree: "",
  });

  const handleChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // const handleClick = (e) => {
  //     e.preventDefault();
  //    setData({...data, duration_time : e.target.value});
  // }
  const handleChange2 = (e) => {
    e.persist();
    setValue(e.target.value);
    setData({ ...data, industry: e.target.value });
  };
  const handleClick2 = (e) => {
    setState2({ selectedOption2: e.target.value });
    setData({ ...data, visit: e.target.value });
  };
  const __handleChange = (e) => {
    e.persist();
    const targetLocation = e.target.value;
    setValue({ country: targetLocation });
    setData({ ...data, country: e.target.value });
  };
  const valueChange = (e) => {
    setState1({ selectedOption1: e.target.value });
    setData({ ...data, duration_time: e.target.value });
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const result = response.data;
        setLocation(result);
      })
      .catch((error) => console.log(error));
  }, []);
  const formSubmit = (e) => {
    e.preventDefault();
    if (
      data.duration_time !== "" &&
      data.visit !== "" &&
      data.agree !== "" &&
      data.country !== ""
    ) {
      setLoading(true);
      const newForm = new FormData();
      newForm.append("firstName", data.firstName);
      newForm.append("lastName", data.lastName);
      newForm.append("email", data.email);
      newForm.append("phone", data.phone);
      newForm.append("company", data.company_name);
      newForm.append("country", data.country);
      newForm.append("industry", data.industry);
      newForm.append("website", data.domain);
      newForm.append("average_visit", data.visit);
      newForm.append("busainess_bio", data.business_bio);
      newForm.append("website_timeline", data.duration_time);
      newForm.append("role", data.role);
      newForm.append("agree", data.agree);
      axios({
        url: `https://moovitapi.com/api/user/publisher/${id}?firstName=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}&country=${data.country}&company=${data.company_name}&industry=${data.industry}&role=${data.role}&agree=1&average_visit=${data.visit}&business_bio=${data.business_bio}&website_timeline=${data.duration_time}&website=${data.domain}&email=${data.email}`,
        method: "PUT",
        data: newForm,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setLoading(false);
            swal(
              "Great!",
              "Request has been sent successfully. One of our representative will contact you shortly via email",
              "success"
            ).then(() => {
              history.push("/home");
            });
          }
        })
        .catch((error) => console.log(error));
    } else if (
      data.duration_time === "" ||
      data.visit === "" ||
      data.agree === ""
    ) {
      swal("Ooops!", "Please select all fields", "warning");
    } else if (data.country === "") {
      swal("Ooops!", "Please select Country field", "warning");
    }
  };
  console.log(data);
  return (
    <div className="publisher-form">
      <Header navBackground={navBackground} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-sm-10">
            <div className="heading">
              <h4>Publisher request form</h4>
            </div>
            <form onSubmit={formSubmit}>
              <h5>1. Personal Details</h5>
              <div className="row justify-content-between">
                <div className="col-lg-6 col-sm-12">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    placeholder="Joe"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    placeholder="Bullion"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                {/* <div className="col-6">
                                    <label htmlFor="">State</label>
                                    <input type="text" placeholder="Lagos" name="state" value={data.state} onChange={handleChange}/>
                                </div> */}
                <div className="col-lg-6 col-sm-12">
                  <label htmlFor="">Country</label>
                  <select
                    value={value.country}
                    onChange={__handleChange}
                    required
                  >
                    {locations.map(({ name, index }) => (
                      <option value={name.common} key={index}>
                        {name.common}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <h5 className="mt-4">2. Company Details</h5>
              <div className="row">
                <div className="col-lg-6 col-sm-12">
                  <label htmlFor="">Name of company/organisation</label>
                  <input
                    type="text"
                    placeholder="The Brand Hub"
                    name="company_name"
                    value={data.company_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <label htmlFor="">Email</label>
                  <br></br>
                  <input
                    type="email"
                    placeholder="jonbellion@gmail.com"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-sm-12">
                  <label htmlFor="">Domain name</label>
                  <input
                    type="text"
                    placeholder="www.name.com"
                    name="domain"
                    value={data.domain}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <div className="form-group star">
                    <label htmlFor="">Business Type</label>
                    <select
                      name=""
                      id=""
                      value={value.industry}
                      onChange={handleChange2}
                      required
                    >
                      <option value="" className="first">
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
                <div className="col-lg-6 col-sm-12">
                  <label htmlFor="">Phone Number</label>
                  <input
                    type="text"
                    placeholder="0912 342 3452"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    required
                  />
                  {/* <input type="tel" name="phone" onChange={handleChange} value={data.phone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"required></input> */}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-sm-12">
                  <label htmlFor="">Company Bio</label>
                  <br></br>
                  <textarea
                    cols="30"
                    rows="5"
                    placeholder="about company"
                    name="business_bio"
                    value={data.business_bio}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="duration mt-4">
                <h5>How long have you used this domain?</h5>
                <div className="row">
                  <div className="col-lg-8 col-sm-12">
                    <div className="duration-frame">
                      <div className="form-group">
                        <input
                          type="radio"
                          name="duration_frame"
                          value="less than 6 months"
                          checked={
                            state1.selectedOption1 === "less than 6 months"
                          }
                          onChange={valueChange}
                        />
                        <span>Less than 6 months</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          name="duration_frame"
                          value="6 months - 1year"
                          checked={
                            state1.selectedOption1 === "6 months - 1year"
                          }
                          onChange={valueChange}
                        />
                        <span>6 months - 1 Year</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          name="duration_frame"
                          value="1 - 5years"
                          checked={state1.selectedOption1 === "1 - 5years"}
                          onChange={valueChange}
                        />
                        <span>1 - 5 years</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 col-sm-12">
                    <div className="duration-frame">
                      <div className="form-group">
                        <input
                          type="radio"
                          name="duration_frame"
                          value="5 - 10 years"
                          checked={state1.selectedOption1 === "5 - 10 years"}
                          onChange={valueChange}
                        />
                        <span>5 -10 years</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          name="duration_frame"
                          value="10 - 15years"
                          checked={state1.selectedOption1 === "10 - 15years"}
                          onChange={valueChange}
                        />
                        <span>10-15 years</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          name="duration_frame"
                          value="over 15years"
                          checked={state1.selectedOption1 === "over 15years"}
                          onChange={valueChange}
                        />
                        <span>Over 15 years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="duration mt-4">
                <h5>What is the average visit your domain recieves monthly?</h5>
                <div className="row">
                  <div className="col-lg-8 col-sm-12">
                    <div className="duration-frame">
                      <div className="form-group">
                        <input
                          type="radio"
                          name="visit"
                          value="less than 10000"
                          checked={state2.selectedOption2 === "less than 10000"}
                          onChange={handleClick2}
                        />
                        <span>Less than 10,000</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          name="visit"
                          value="10000-50000"
                          checked={state2.selectedOption2 === "10000-50000"}
                          onChange={handleClick2}
                        />
                        <span>10,000-50,000</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          name="visit"
                          value="50000-100000"
                          checked={state2.selectedOption2 === "50000-100000"}
                          onChange={handleClick2}
                        />
                        <span>50,000-100,000</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 col-sm-12">
                    <div className="duration-frame">
                      <div className="form-group">
                        <input
                          type="radio"
                          name="visit"
                          value="100000 - 500000"
                          checked={state2.selectedOption2 === "100000 - 500000"}
                          onChange={handleClick2}
                        />
                        <span>100,000-500,000</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          name="visit"
                          value="500000 - 1000000"
                          checked={
                            state2.selectedOption2 === "500000 - 1000000"
                          }
                          onChange={handleClick2}
                        />
                        <span>500,000 - 1,000,000</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          name="visit"
                          value="above 1000000"
                          checked={state2.selectedOption2 === "above 1000000"}
                          onChange={handleClick2}
                        />
                        <span>above 1,000,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="agree-policy">
                <div className="row">
                  <div className="col-lg-6 col-sm-12">
                    <input
                      type="checkbox"
                      onClick={() => setData({ ...data, agree: 1 })}
                    />
                    <p>
                      By continuing, you’re agreeing to our Customer Terms of
                      Service, Privacy Policy, and Cookie Policy.
                    </p>
                  </div>
                </div>
              </div>
              <button>Send Request</button>
            </form>
          </div>
        </div>
      </div>
      <div className="overlay" style={{ display: loading ? "block" : "none" }}>
        <div className="spinner mb-4">
          <Loader type="Oval" color="#EE315D" height={60} width={70} />
        </div>
      </div>
    </div>
  );
};

export default PublisherForm;
