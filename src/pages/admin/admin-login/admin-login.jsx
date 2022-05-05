import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import "../../Login/Login.scss";
import axios from "axios";
import image from "../../../assets/image 1.png";
import Header from "../../../components/header/header";
import { omit } from "lodash";
import usePasswordToggle from "../../../hooks/usePasswordToggle";

const AdminLogin = ({ navBackground }) => {
  const history = useHistory();
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [error_msg, setError_msg] = useState([]);
  const [errors, setErrors] = useState({});

  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {
      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;

      case "password":
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password: "Password should contain at least 8 characters",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  const handleChange = (e) => {
    e.persist();
    let name = e.target.name;
    let val = e.target.value;
    validate(e, name, val);
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setLogin({ loading: true });
    const data = {
      email: login.email,
      password: login.password,
    };
    const newData = new FormData();
    newData.append("email", data.email);
    newData.append("password", data.password);

    axios({
      // url: "https://test.canyousing.com.ng/api/admin/login",
      url: "https://moovitapi.com/api/admin/login",
      method: "POST",
      data: newData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.firstName);
          localStorage.setItem("auth_id", res.data.id);
          const userRole = res.data.role;
          if (userRole === "marketer") {
            history.push("/marketer/dashboard");
          } else if (userRole === "admin") {
            history.push("/admin");
          }
        }
      })
      .catch((err) => {
        setError_msg(err.response.data.error);
        setLogin({ loading: false, email: login.email });
      });
  };
  let error_text = "";
  if (error_msg !== undefined) {
    error_msg.map((res) => {
      return (error_text = <p>{res}</p>);
    });
  }

  let btnText = "";
  if (login.loading === true) {
    btnText = (
      <div
        className="spier"
        style={{ display: login.loading ? "block" : "none" }}
      >
        <Loader type="TailSpin" color="#ffffff" height={20} width={20} />
      </div>
    );
  } else if (login.loading === false) {
    btnText = <span>Continue</span>;
  }
  return (
    <div className="sign-up">
      <Header navBackground={navBackground} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <form onSubmit={formSubmit}>
              <img src={image} alt="moovit-digital-logo" />
              <h4>Welcome Back</h4>
              <p>Fill in your login details</p>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="joe@gmail.com"
                  name="email"
                  onChange={handleChange}
                  value={login.email}
                />
                {/* {error_text} */}
                {errors.email && (
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: "300",
                      marginTop: "10px",
                      color: "#f16868",
                    }}
                  >
                    {errors.email}
                  </h3>
                )}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type={PasswordInputType}
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChange}
                  value={login.password}
                  required
                />
                <span className="password-toogle-icon">{ToggleIcon}</span>
                {errors.password && (
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: "300",
                      marginTop: "10px",
                      color: "#f16868",
                    }}
                  >
                    {errors.password}
                  </h3>
                )}
              </div>
              <div className="forget-password">
                <Link>Forgot Password?</Link>
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: login.loading ? "#333333" : "#EE315D",
                }}
              >
                {btnText}
              </button>
            </form>
            <div className="signup">
              <p>
                Don’t have an account?{" "}
                <Link to="/admin-registration">Sign up</Link>
              </p>
            </div>
            <div className="policy">
              <div className="tnc">
                <Link>Terms and Conditions</Link>
              </div>
              <div className="tnc">
                <Link>Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{api-version}'
//     });

//     FB.AppEvents.logPageView();

//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>

// app id : 410776757185843
// app secret : 34fed8516bdfc5d08fbde9ffb60e8850

// url : https%3A%2F%2Fmoovitdigital.com%2F
// https://facebook.com/v6.0/dialog/oauth?client_id=410776757185843&redirect_url=https%3A%2F%2Fmoovitdigital.com%2F&state=08169114
