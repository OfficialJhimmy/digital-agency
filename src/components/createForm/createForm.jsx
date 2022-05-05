import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../components/createForm/createform.scss";
import axios from "axios";
import swal from "sweetalert";
import caretRight from "../../assets/CaretRight.svg";
import ellipse1 from "../../assets/Ellipse 27.svg";
import ellipse2 from "../../assets/Ellipse 28.svg";
import tick from "../../assets/Frame 338.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";
import ReactSlider from "react-slider";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const CreateForm = ({
  createAds,
  setCreateAds,
  setShowNext,
  state,
  setState,
  start,
  setStart,
  file,
  setFile,
  showNext2,
  setShowNext2,
  setShowNext3,
  handleChange,
}) => {
  const [newPhone, setPhone] = useState(false);
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const [allArea, setAllArea] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current
      // { types: ["geocode"] }
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    const alteredString = query + "=";
    setAllArea((prevState) => [...prevState, alteredString]);
    setQuery("");
  };

  const [value, setValue] = useState([16, 60]);
  const handleValue = (values) => {
    setValue(values);
  };
  const [interest, setInterest] = useState({
    music: "",
    travel: "",
    movies: "",
    education: "",
    information: "",
    technology: "",
    vacation: "",
  });
  const [demograph, setDemograph] = useState({
    under_12_years: "",
    high_school: "",
    employ_under_12_years: "",
    under_50000: "",
    age_13_21: "",
    bachelor_degree: "",
    employ_13_21_years: "",
    income_50000_200000: "",
    age_21_40: "",
    master_degree: "",
    employ_21_40_years: "",
    income_200000_1000000: "",
    age_41_60: "",
    post_graduate: "",
    employ_41_60years: "",
    income_1000000_10000000: "",
    above_60years: "",
    professional: "",
    employ_above_60years: "",
    above_10000000: "",
  });
  const __handleChange3 = (e) => {
    const targetValue = e.target.value + "=";
    if (e.target.checked === true) {
      setInterest({ ...interest, [e.target.name]: targetValue });
    } else if (e.target.checked === false) {
      setInterest({ ...interest, [e.target.name]: "" });
    }
  };
  const __handleChange4 = (e) => {
    const targetValue = e.target.value + "=";
    if (e.target.checked === true) {
      setDemograph({ ...demograph, [e.target.name]: targetValue });
    } else if (e.target.checked === false) {
      setDemograph({ ...demograph, [e.target.name]: "" });
    }
  };

  const [value_, setValue_] = useState({
    locate: "",
    region: "",
  });
  const [locations, setLocation] = useState([]);
  const [option, setOption] = useState({
    gender: "",
    show: false,
  });
  const handleBack = (e) => {
    e.preventDefault();
    setShowNext2("none");
    setShowNext("block");
  };
  const handlePop = (e) => {
    e.preventDefault();
    const preferedLocation = e.target.value;
    setQuery(preferedLocation);
  };
  const closePop = (e) => {
    e.preventDefault();
    let { id } = e.currentTarget;
    const newArray = allArea.filter((item, index) => index != id);
    setAllArea(newArray);
  };
  const handleChange_1 = (e) => {
    e.persist();
    setOption({ gender: e.target.value });
    setCreateAds({ ...createAds, gender: e.target.value });
  };

  const __handleChange = (e) => {
    e.persist();
    const targetLocation = e.target.value;
    setValue_({ locate: targetLocation });
    setCreateAds({ ...createAds, location: e.target.value });
  };
  const scrollToTop3 = () => {
    document.getElementById("temp").scrollIntoView(0, 0);
  };
  const handleSave = (e) => {
    e.preventDefault();
    const newArray = Object.values(interest);
    const finalArray = newArray.filter((item) => item !== "");
    const demoArray = Object.values(demograph);
    const finalDemo = demoArray.filter((item) => item !== "");
    setCreateAds({
      ...createAds,
      area: allArea,
      [state.selectedOption]: "1",
      ageRange: value,
      interests: finalArray,
      demographics: finalDemo,
    });
    setShowNext2("none");
    setShowNext3("block");
    scrollToTop3();
    // if(newPhone !== true){

    // }else{
    //     swal("enter valid phone number")
    // }
  };

  let anyRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const result = response.data;
        setLocation(result);
      })
      .catch((error) => console.log(error));
  }, []);

  const valueChange = (e) => {
    setState({ selectedOption: e.target.value });
  };

  //usedropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  console.log(file);

  // const onDrop = useCallback((acceptedFiles) => {});

  const dragImages = file.map((fil) => (
    <img
      src={fil.preview}
      alt="uploaded"
      key={fil.name}
      style={{ width: "50px", height: "50px", marginRight: "10px" }}
    />
  ));

  return (
    <div style={{ display: showNext2 }} ref={anyRef} id="wrapper">
      <div className="pages-link">
        <Link to="#">Home</Link>
        <img src={caretRight} alt="caret right" />
        <Link to="#">Create an Ad</Link>
      </div>
      <div className="page-progress">
        <div className="item first">
          <img src={tick} alt="ellipse1" />
          <p>Select a budget</p>
        </div>
        <div className="item">
          <img src={ellipse1} alt="ellipse1" />
          <p>Ads details</p>
        </div>
        <div className="item">
          <img src={ellipse2} alt="ellipse1" />
          <p>Pick a template</p>
        </div>
        <div className="item ">
          <img src={ellipse2} alt="ellipse1" />
          <p>Make payment</p>
        </div>
        <div className="item last">
          <img src={ellipse2} alt="ellipse1" />
          <p>Have a call</p>
        </div>
      </div>
      <div className="content-form">
        <div className="row">
          {/* <form onSubmit={handleSubmit}> */}
          <h5>Ads details</h5>
          <div className="form-wrapper">
            <div className="form-group mb-2">
              <label htmlFor="">Campaign Name</label>
              <br></br>
              <input
                type="text"
                placeholder="The Brand Hub"
                required
                name="title"
                onChange={handleChange}
                value={createAds.title}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="">Description</label>
              <br></br>
              <textarea
                name=""
                id=""
                cols="10"
                rows="4"
                required
                placeholder="Type text here"
                name="description"
                value={createAds.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div
              // className="form-group mb-4 droparea__container"
              className="droparea__container"
              {...getRootProps()}
            >
              {/* File Upload*/}
              {/* <label htmlFor="">Upload banner</label>
              <br></br>
              <input
                type="file"
                name="image"
                required
                onChange={(e) => setFile(e.target.files[0])}
                onClick={(event) => {
                  event.target.value = null;
                }}
                

              /> */}
              <div className="droparea" {...getRootProps}>
                <input {...getInputProps} />
                <div>
                  <AiOutlineCloudUpload className="upload-icon" />
                </div>
                <p className="image__upload-text">Drag and drop a file here</p>
              </div>

              <div>{dragImages}</div>
            </div>
            <div className="row dates mb-4">
              <div className="col">
                <div
                  className="form-group start mr-3"
                  style={{ zIndex: "100000" }}
                >
                  <label htmlFor="">Start date</label>
                  <br></br>
                  <DatePicker
                    selected={createAds.start}
                    onChange={(date) =>
                      setCreateAds({ ...createAds, start: date })
                    }
                    minDate={subDays(new Date(), 0)}
                    placeholderText="Select a day"
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group end" style={{ zIndex: "100000" }}>
                  <label htmlFor="">End date</label>
                  <br></br>
                  <DatePicker
                    selected={createAds.end}
                    onChange={(date) =>
                      setCreateAds({ ...createAds, end: date })
                    }
                    minDate={subDays(new Date(), 0)}
                    placeholderText="Select a day"
                    required
                  />
                </div>
              </div>
              <div className="row dates mb-3">
                <div className="col">
                  <div className="form-group mr-3 start">
                    <label htmlFor="">Gender</label>
                    <br></br>
                    <select
                      name="gender"
                      value={option.gender}
                      id=""
                      onChange={handleChange_1}
                      required
                    >
                      <option value="" selected disabled>
                        select gender
                      </option>
                      <option value="all">All</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group end">
                    <label htmlFor="">Phone</label>
                    <br></br>
                    <IntlTelInput
                      containerClassName="intl-tel-input"
                      inputClassName="form-control"
                      preferredCountries={["ng"]}
                      format
                      onPhoneNumberChange={(
                        status,
                        value,
                        countryData,
                        number,
                        disabled
                      ) => {
                        console.log(status);
                        const formatedNumber = value.replace(/\D+/g, "");
                        if (status === true) {
                          setCreateAds({ ...createAds, phone: formatedNumber });
                          setPhone(false);
                        } else if (value.length > 13) {
                          swal("wrong number");
                          setPhone(true);
                        }
                      }}
                      onPhoneNumberBlur={(
                        status,
                        value,
                        countryData,
                        number
                      ) => {
                        console.log("onPhoneNumberBlur value", value);
                        console.log("onPhoneNumberBlur number", status);
                      }}
                      // value={state}
                      fieldName="phone"
                      // onPhoneNumberBlur={onBlur()}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row dates">
                <div className="col-lg-6">
                  <div className="form-group start">
                    <label htmlFor="">Facebook Business Page</label>
                    <br></br>
                    <input
                      type="text"
                      placeholder="www.facebook.com/brandhub"
                      name="fbPage"
                      onChange={handleChange}
                      value={createAds.fbPage}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group end">
                    <label htmlFor="">Instagram Account</label>
                    <br></br>
                    <input
                      type="text"
                      placeholder="www.instagram.com/brandhub"
                      name="instagram"
                      onChange={handleChange}
                      value={createAds.instagram}
                    />
                  </div>
                </div>
              </div>
              <div className="row dates">
                <div className="col-lg-6">
                  <div className="form-group start">
                    <label htmlFor="">Linkedin Business Page</label>
                    <br></br>
                    <input
                      type="text"
                      placeholder="www.linkedin.com/brandhub"
                      name="linkedin"
                      onChange={handleChange}
                      value={createAds.linkedin}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-4 mb-5">
                <div className="col-lg-8">
                  <label htmlFor="" className="mb-3">
                    Age range
                  </label>
                  <br></br>
                  <ReactSlider
                    value={value}
                    min={16}
                    max={100}
                    minDistance={10}
                    onChange={handleValue}
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    renderThumb={(props, state) => (
                      <div {...props}>{state.valueNow}</div>
                    )}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8">
                  <div className="inner-content">
                    <h4>Campaign Type</h4>
                    <p>Tick all that apply*</p>
                    <div className="campagin">
                      <div className="form-group">
                        <input
                          type="radio"
                          value="awareness"
                          name="type"
                          checked={state.selectedOption === "awareness"}
                          id=""
                          onChange={valueChange}
                        />
                        <span>Awareness</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          value="traffic"
                          name="type"
                          checked={state.selectedOption === "traffic"}
                          onChange={valueChange}
                        />
                        <span>Traffic</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          value="engagement"
                          name="type"
                          checked={state.selectedOption === "engagement"}
                          onChange={valueChange}
                        />
                        <span>Enagagement</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          value="conversions"
                          name="type"
                          checked={state.selectedOption === "conversions"}
                          onChange={valueChange}
                        />
                        <span>Conversions</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          value="sales"
                          id=""
                          name="type"
                          checked={state.selectedOption === "sales"}
                          onChange={valueChange}
                        />
                        <span>Sales</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          value="apps"
                          id=""
                          name="type"
                          checked={state.selectedOption === "apps"}
                          onChange={valueChange}
                        />
                        <span>App installs</span>
                      </div>
                      <div className="form-group">
                        <input
                          type="radio"
                          value="reach"
                          name="type"
                          checked={state.selectedOption === "reach"}
                          onChange={valueChange}
                        />
                        <span>Reach</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row dates">
              <div className="col-lg-7">
                <div className="form-group">
                  <label htmlFor="">Select Target Country</label>
                  <br></br>
                  <input
                    list="data"
                    value={value_.locate}
                    onChange={__handleChange}
                    required
                  />
                  <datalist id="data">
                    {locations.map(({ name, index }) => (
                      <option value={name.common} id={index}>
                        {name.common}
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-7">
                <div className="search-location-input">
                  <label htmlFor="">Select Target Areas</label>
                  <input
                    ref={autoCompleteRef}
                    onChange={handlePop}
                    placeholder="Enter target location"
                    value={query}
                  />
                </div>
              </div>
            </div>
            <div className="target-area">
              <div className="target-form">
                <div className="picked-locations">
                  <h5>Picked Locations</h5>
                  <div className="location-list">
                    {allArea.map((location, index) => {
                      return (
                        <div className="picked d-flex align-item-center justify-content-between">
                          <p>{location}</p>
                          <p className="close" id={index} onClick={closePop}>
                            x
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row demographic">
            <div className="col">
              <h4>Demographics</h4>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Relationship</th>
                      <th scope="col">Education</th>
                      <th scope="col">Work(Industry)</th>
                      <th scope="col">Income(Naira)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="engaged"
                            value="engaged"
                            onClick={__handleChange4}
                          />
                          <span>Engaged</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="high_school"
                            value="high school"
                            onClick={__handleChange4}
                          />
                          <span>High School</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="adminstrative_services"
                            value="Adminstrative services"
                            onClick={__handleChange4}
                          />
                          <span>Adminstrative services</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="under_50000"
                            value="under 50,000"
                            onClick={__handleChange4}
                          />
                          <span>Under 50,000</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="complicated"
                            value="complicated"
                            onClick={__handleChange4}
                          />
                          <span>Complicated</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="bachelor_degree"
                            value="bachelor's degree"
                            onClick={__handleChange4}
                          />
                          <span> High school leaver </span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="Business_and_Finance"
                            value="Business and Finance"
                            onClick={__handleChange4}
                          />
                          <span>Business and Finance</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="income_50000_200000"
                            value="50,000 - 200,000"
                            onClick={__handleChange4}
                          />
                          <span>50,000 - 200,000</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="divorced"
                            value="divorced"
                            onClick={__handleChange4}
                          />
                          <span>Divorced</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="university"
                            value="university"
                            onClick={__handleChange4}
                          />
                          <span>University</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="Enigneering"
                            value="Enigneering"
                            onClick={__handleChange4}
                          />
                          <span>Engineering</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="income_200000_500000"
                            value="200,000 - 500,000"
                            onClick={__handleChange4}
                          />
                          <span>200,000-500,000</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="married"
                            value="married"
                            onClick={__handleChange4}
                          />
                          <span>Married</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="university_graduate"
                            value="university graduate"
                            onClick={__handleChange4}
                          />
                          <span>University(Postgraduate)</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="Food_and_Restaurants"
                            value="Food and Restaurants"
                            onClick={__handleChange4}
                          />
                          <span>Food and Restaurants</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="income_500000_1000000"
                            value="500,000 - 1,000,000"
                            onClick={__handleChange4}
                          />
                          <span>500,000 - 1,000,000</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="in_a_relationship"
                            value="In a relationship"
                            onClick={__handleChange4}
                          />
                          <span>In a relationship</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="master_degree"
                            value="Master's degree"
                            onClick={__handleChange4}
                          />
                          <span>Master's Degree</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="medical"
                            value="medical/healthcare"
                            onClick={__handleChange4}
                          />
                          <span>Medical/Healthcare</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="income_1000000-5000000"
                            value="1,000,000 - 5,000,000"
                            onClick={__handleChange4}
                          />
                          <span>1,000,000 - 5,000,000</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="open_relationship"
                            value="Open Relationship"
                            onClick={__handleChange4}
                          />
                          <span>Open Relationship</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="doctorate"
                            value="doctorate"
                            onClick={__handleChange4}
                          />
                          <span>Doctorate</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="legal"
                            value="legal services"
                            onClick={__handleChange4}
                          />
                          <span>Legal Services</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="5000000-10000000"
                            value="5,000,000 - 10,000,000"
                            onClick={__handleChange4}
                          />
                          <span>5,000,000 - 10,000,000</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="public_realtionship"
                            value="Public Partnenship"
                            onClick={__handleChange4}
                          />
                          <span>Public Partnership</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="professional"
                            value="Professional degree"
                            onClick={__handleChange4}
                          />
                          <span>Professional Degree</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="transportation"
                            value="transportation"
                            onClick={__handleChange4}
                          />
                          <span>Transportation</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="above_10000000"
                            value="above 10,000,000"
                            onClick={__handleChange4}
                          />
                          <span>Above 10,000,000</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="form-group-2">
              <label htmlFor=""> More Options(for demographic)</label>
              <br></br>
              <span>Seperate every keyword with a comma</span>
              <input
                type="text"
                name="demo_others"
                value={createAds.demo_others}
                placeholder="divorced, gaming, tech, clothing, trading"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row demographic">
            <div className="col">
              <h4>Interest</h4>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Business and Industry</th>
                      <th scope="col">Entertainment</th>
                      <th scope="col">Family and Relationship</th>
                      <th scope="col">Food and Drink</th>
                      <th scope="col">Hobbies and Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="advertising"
                            value="advertising"
                            onClick={__handleChange3}
                          />
                          <span>Advertising</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="films"
                            value="films"
                            onClick={__handleChange3}
                          />
                          <span>Films</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="dating"
                            value="dating"
                            onClick={__handleChange3}
                          />
                          <span>Dating</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="alcoholic_drink"
                            value="alcoholic drink"
                            onClick={__handleChange3}
                          />
                          <span>Alcoholic Drink</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="art_and_music"
                            value="art and music"
                            onClick={__handleChange3}
                          />
                          <span>Art and Music</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="agriculture"
                            value="agriculture"
                            onClick={__handleChange3}
                          />
                          <span>Agriculture</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="video"
                            value="video"
                            onClick={__handleChange3}
                          />
                          <span> Videos </span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="family"
                            value="family"
                            onClick={__handleChange3}
                          />
                          <span>Family</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="cooking"
                            value="cooking"
                            onClick={__handleChange3}
                          />
                          <span>Cooking</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="home_and_gardent"
                            value="home and garden"
                            onClick={__handleChange3}
                          />
                          <span>Home and Garden</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="aviation"
                            value="avaition"
                            onClick={__handleChange3}
                          />
                          <span>Aviation</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="games"
                            value="games"
                            onClick={__handleChange3}
                          />
                          <span>Games</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="friendship"
                            value="friendship"
                            onClick={__handleChange3}
                          />
                          <span>Friendship</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="food"
                            value="food"
                            onClick={__handleChange3}
                          />
                          <span>Food</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="pet"
                            value="pet"
                            onClick={__handleChange3}
                          />
                          <span>Pets</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="business"
                            value="business"
                            onClick={__handleChange3}
                          />
                          <span>Business</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="live_event"
                            value="live event"
                            onClick={__handleChange3}
                          />
                          <span>Live events</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="fatherhood"
                            value="fatherhood"
                            onClick={__handleChange3}
                          />
                          <span>Fatherhood</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="cuisine"
                            value="cuisine"
                            onClick={__handleChange3}
                          />
                          <span>Cuisine</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="politics"
                            value="Politics and Social issues"
                            onClick={__handleChange3}
                          />
                          <span>Politics/Social issues</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="marketing"
                            value="marketing"
                            onClick={__handleChange3}
                          />
                          <span>Marketing</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="music"
                            value="music"
                            onClick={__handleChange3}
                          />
                          <span>Music</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="motherhood"
                            value="motherhood"
                            onClick={__handleChange3}
                          />
                          <span>Motherhood</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="fitness"
                            value="fitness"
                            onClick={__handleChange3}
                          />
                          <span>Fitness/Wellness</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="travel"
                            value="travel"
                            onClick={__handleChange3}
                          />
                          <span>Travel</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="property"
                            value="property"
                            onClick={__handleChange3}
                          />
                          <span>Property</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="reading"
                            value="reading"
                            onClick={__handleChange3}
                          />
                          <span>Reading</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="parenting"
                            value="parenting"
                            onClick={__handleChange3}
                          />
                          <span>Parenting</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="drink"
                            value="drink"
                            onClick={__handleChange3}
                          />
                          <span>Drink</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="vechile"
                            value="vechile"
                            onClick={__handleChange3}
                          />
                          <span>Vehicle</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="enigneeirng"
                            value="engineering"
                            onClick={__handleChange3}
                          />
                          <span>Engineering</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="television"
                            value="television"
                            onClick={__handleChange3}
                          />
                          <span>Television Programme</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="wedding"
                            value="wedding"
                            onClick={__handleChange3}
                          />
                          <span>Wedding</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="resturants"
                            value="resturant"
                            onClick={__handleChange3}
                          />
                          <span>Resturants</span>
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="checkbox"
                            name="shopping"
                            value="Shopping and Fashion"
                            onClick={__handleChange3}
                          />
                          <span>Shopping/Fashion</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="form-group-2">
              <label htmlFor="">More Options(for Interest)</label>
              <br></br>
              <span>Seperate every keyword with a comma</span>
              <input
                type="text"
                name="interest_others"
                value={createAds.interest_others}
                placeholder="divorced, gaming, tech, clothing, trading"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <div className="interest">
                            <h4>Interest</h4>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-group">
                                                <input type="checkbox" name="music" value="music" onChange={__handleChange3} />
                                                <span>Music</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <input type="checkbox" name="travel" value="travel" id="" onChange={__handleChange3}/>
                                                <span>Travel</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <input type="checkbox" name="education" value="education" onClick={__handleChange3} id=""/>
                                                <span>Education</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-group">
                                                <input type="checkbox" name="technology" value="technology" onClick={() => {setInterest({...interest, technology : "technology"})}} id=""/>
                                                <span>Technology</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <input type="checkbox" name="movies" value="movies" onClick={__handleChange3} id=""/>
                                                <span>Movies</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <input type="checkbox" name="vacation" value="vacation" onClick={__handleChange3} id=""/>
                                                <span>Vacation</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                        <div className="form-group">
                                                <input type="checkbox" name="information" value="information" onClick={__handleChange3} id=""/>
                                                <span>Information</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
          <div className="lower-btn">
            <p className="" onClick={handleBack}>
              Back
            </p>
            <button onClick={handleSave}>Save and continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
