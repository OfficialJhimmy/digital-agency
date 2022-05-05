import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../forgotPassword/forgetpassword.scss";
import Loader from "react-loader-spinner";
import Header from "../../components/header/header";
// import logo from '../../assets/image 1.png';

const ForgetPassword = ({ navBackground }) => {
  const [data, setData] = useState({
    email: "",
    loading: false,
  });
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({ ...data, loading: true });
    setDisabled(true);
    const newData = new FormData();
    newData.append("email", data.email);
    axios({
      // url : 'https://test.canyousing.com.ng/api/forgot-password',
      url: "https://moovitapi.com/api/forgot-password",
      method: "POST",
      data: newData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        console.log(res.data);
        swal("Success!", "Reset link sent to your email", "success");
        setData({ ...data, loading: false });
      })
      .catch((err) => {
        console.log(err);
        setData({ ...data, loading: false });
        swal("Ooops!", "Something went wrong, try Again", "warning");
        setDisabled(false);
      });
  };
  const handleChange = (e) => {
    e.persist();
    setData({ ...data, email: e.target.value });
  };
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
  console.log(data);
  return (
    <div className="forget_password">
      <Header navBackground={navBackground} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <form onSubmit={handleSubmit}>
              <h3>Password Reset</h3>
              <div className="form-group">
                <label>Please Enter Email Address below</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="john@doe.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <button
                disabled={disabled}
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

export default ForgetPassword;
