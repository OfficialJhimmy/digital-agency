import React from "react";
import { Link } from "react-router-dom";
import "../../components/heroScreen/heroscreen.scss";
import logo from "../../assets/LOGO 1.svg";
// import image from '../../assets/image 1.png';
import shape1 from "../../assets/Group 5.svg";
import shape2 from "../../assets/Group 9.svg";
import shape3 from "../../assets/shape1.svg";
import shape4 from "../../assets/Group 4.svg";
import shape5 from "../../assets/Group 2.svg";
// import shape6 from '../../assets/LOGO 2.svg';
// import smile from '../../assets/smile.svg';
// import stand from '../../assets/stand.svg';
// import wink from '../../assets/wing.svg';
// import icon from '../../assets/icon.svg';
// import icon2 from '../../assets/icon2.svg';
// import icon3 from '../../assets/icon4.svg';
// import icon4 from '../../assets/icon3.svg';
// import icon5 from '../../assets/icon5.svg';
// import shap from '../../assets/shap.svg';
// import shap2 from '../../assets/shap2.svg';
// import shap3 from '../../assets/shap3.svg';
// import shap4 from '../../assets/shap4.svg';
// import shap5 from '../../assets/shap5.svg';
// import shap6 from '../../assets/shap6.svg';

const Heroscreen = () => {
  const token = localStorage.getItem("auth_token");
  const role = localStorage.getItem("auth_role");
  //   let loginBtn = "";

  //   function LoginBtn() {
  //     if (token && role === "advertiser") {
  //       <>
  //         <button>
  //           <Link to="/dashboard/advertiser" className="login">
  //             Login
  //           </Link>
  //         </button>
  //       </>;
  //     } else if (token && role === "publisher") {
  //       <>
  //         <button>
  //           <Link to="/dashboard/publisher" className="login">
  //             Login
  //           </Link>
  //         </button>
  //       </>;
  //     } else {
  //       <>
  //         <button>
  //           <Link to="/login" className="login">
  //             Login
  //           </Link>
  //         </button>
  //       </>;
  //     }
  //   }
  // if(token && role === 'advertiser'){
  //     loginBtn = (
  //         <Link to='/dashboard/advertiser' className="login">
  //             Login
  //         </Link>
  //     )
  // }else if(token && role === 'publisher'){
  //     loginBtn = (
  //         <Link to='/dashboard/publisher' className="login">
  //             Login
  //         </Link>
  //     )
  // }else{
  //     loginBtn = (
  //         <Link to='/login' className="login">
  //             Login
  //         </Link>
  //     )
  // }
  return (
    <div className="heroscreen">
      <div className="hero-content">
        <img src={logo} alt="" className="logo" width="500px" height="84px" />
        <div className="big-text">
          <p>
            Your advert on social media and top websites, discovered by
            consumers just waiting to engage with you.
          </p>
        </div>
      </div>

      <div className="shapes">
        <img src={shape2} alt="" className="icon1" />
        <img src={shape1} alt="" className="icon2" />
        <img src={shape5} alt="" className="icon3" />
        <img src={shape3} alt="" className="icon4" />
        <img src={shape4} alt="" className="icon5" />
        {/* <div className="lower-icons">
                    <img src={smile} alt="" className="icon6"/>
                    <div className="user">
                        <img src={stand} alt="" className="icon7"/> 
                        <img src={wink} alt="" className="icon8"/>
                    </div>
                    
                    <img src={icon4} alt="" className="icon13"/>
                    <div className="step2">
                        <img src={icon2} alt="" className="icon10"/>            
                        <img src={shape3} alt="" className="icon12"/>
                    </div>
                    <div className="step3">
                        <img src={shap2} alt="" className=""/>
                        <img src={icon2} alt="" className="icon10"/>
                        <img src={shape3} alt="" className="icon14"/>
                    </div>
                    <div className="step4">
                        <img src={icon4} alt="" className="icon121"/>
                        <img src={shap3} alt="" className="icon15" width="100px"/>
                        <img src={icon2} alt="" className="icon10"/>
                        <img src={shap2} alt="" className=""/>
                    </div>
                    <div className="step5">
                        <img src={shap3} alt="" className="icon15" width="100px"/>
                        <img src={icon2} alt="" className="icon10"/>
                        <img src={shape3} alt="" className="icon14"/>
                        <img src={icon2} alt="" className="icon10"/>
                        <img src={shape3} alt="" className="icon12"/>
                        <img src={shap4} alt="" className="shap4"/>
                    </div>
                    <div className="step6">
                        <img src={icon3} alt="" className="icon11"/>
                        <img src={shap} alt="" className=""/>
                        <img src={shape4} alt="" className=""/>
                        <img src={shap5} alt="" className=""/>
                        <img src={shap6} alt="" className=""/>
                        <img src={shap} alt="" className=""/>
                        <img src={shap6} alt="" className=""/>
                    </div>
                     */}
        {/* <img src={shape1} alt="" className=""/> */}

        {/* </div> */}
        {/* <img src={smile} alt="" className="icon6"/>
                    <img src={stand} alt="" className="icon7"/> 
                    <img src={wink} alt="" className="icon8"/> */}

        {/* <img src={icon2} alt="" className="icon10"/>
                    
                    
                    <img src={icon5} alt="" className="icon13"/>
                    <img src={icon2} alt="" className="icon10"/>
                    <img src={icon3} alt="" className="icon11"/> */}
        {/* <img src={icon4} alt="" className="icon12"/>
                    <img src={icon5} alt="" className="icon13"/>
                    <img src={icon3} alt="" className="icon11"/>
                    <img src={icon4} alt="" className="icon12"/>
                    <img src={icon5} alt="" className="icon13"/>
                    <img src={icon3} alt="" className="icon11"/>
                    <img src={icon4} alt="" className="icon12"/>
                    <img src={icon5} alt="" className="icon13"/>
                    <img src={icon3} alt="" className="icon11"/>
                    <img src={icon4} alt="" className="icon12"/>
                    <img src={icon5} alt="" className="icon13"/> */}
      </div>

      <div className="hero-btns">
        <button>
          {/* <Link
            to={
              token && role === "advertiser"
                ? "/dashboard/advertiser"
                : token && role === "publisher"
                ? "/dashboard/publisher"
                : "/login"
            }
            className="login"
          >
            Login
          </Link> */}
          {token && role === "advertiser" ? (
            <Link to="/dashboard/advertiser" className="login">
              My Account
            </Link>
          ) : token && role === "publisher" ? (
            <Link to="/dashboard/publisher" className="login">
              My Account
            </Link>
          ) : (
            <Link to="/login" className="login">
              Login
            </Link>
          )}
        </button>

        <button>
          <Link to="/register" className="register">
            Get Started
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Heroscreen;
