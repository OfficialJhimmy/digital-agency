import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../forgotPassword/forgetpassword.scss";
import Header from "../../components/header/header";
// import logo from '../../assets/image 1.png';

const ResendVerification = ({ navBackground }) => {
  const [data, setData] = useState({
    email: "",
    code: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = new FormData();
    newData.append("email", data.email);
    axios({
      url: "https://moovitapi.com/api/email/resend",
      method: "POST",
      data: newData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        setData({ code: res.status });
        if (res.status === 200) {
          swal("Great!", "Mail sent successfully", "success");
        }

        console.log(res.data);
      })
      .catch((err) => {
        // setData({...data, code : res.status})
        console.log(err.response.status);
      });
  };
  const handleChange = (e) => {
    e.persist();
    setData({ ...data, email: e.target.value });
  };
  console.log(data);
  return (
    <div className="forget_password">
      <Header navBackground={navBackground} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <form onSubmit={handleSubmit}>
              <h3>Resend verification mail</h3>
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
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendVerification;
