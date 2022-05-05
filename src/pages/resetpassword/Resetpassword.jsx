import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import "../resetpassword/reset.scss";
import Loader from "react-loader-spinner";
import Header from "../../components/header/header";
import logo from "../../assets/image 1.png";

const ResetPassword = ({ navBackground }) => {
  const search = useLocation().search;
  const history = useHistory();
  const url_token = new URLSearchParams(search).get("token");

  const [error, setError] = useState([]);
  const [data, setData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    token: url_token,
    loading: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setData({ loading: true });
    if (data.password !== data.password_confirmation) {
      swal("Ooops!", "Password confirmation does not match", "warning");
    }
    if (
      data.email !== "" &&
      data.password !== "" &&
      data.password_confirmation !== "" &&
      data.token !== ""
    ) {
      const newData = new FormData();
      newData.append("password", data.password);
      newData.append("password_confirmation", data.password_confirmation);
      newData.append("token", data.token);
      newData.append("email", data.email);
      axios({
        url: "https://moovitapi.com/api/reset-password",
        method: "POST",
        data: newData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((res) => {
          console.log(res.data);
          swal("Great!", "Password Reset successfully", "success").then(() => {
            history.push("/login");
          });
        })
        .catch((err) => {
          setError(err.response.data.error);
          setData({ loading: false });
        });
    }
    if (data.token === "" || data.token === undefined) {
      swal("Ooops!", "Something went wrong. Try again", "warning");
      setData({ laoding: false });
    }
  };
  const handleChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  let password_error = "";
  if (error.password) {
    let newArray = error.password;
    password_error = newArray;
  }
  let btnText = "";
  if (data.loading === true) {
    btnText = (
      <div
        className="spier"
        style={{ display: data.loading ? "block" : "none" }}
      >
        <Loader type="TailSpin" color="#ffffff" height={20} width={20} />
      </div>
    );
  } else if (data.loading === false) {
    btnText = <span>Submit</span>;
  }

  return (
    <div className="reset_pass">
      <Header navBackground={navBackground} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <img src={logo} alt="" />
              <h3>Password Reset</h3>
              <div className="form-group">
                <label>Enter Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Enter New Password</label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  required
                  onChange={handleChange}
                />
                {password_error !== ""
                  ? password_error.map((item, index) => {
                      return (
                        <p
                          key={index}
                          style={{ height: "-10px", color: "red" }}
                        >
                          {item}
                        </p>
                      );
                    })
                  : ""}
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  required
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: data.loading ? "#333333" : "#EE315D",
                }}
              >
                {btnText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
