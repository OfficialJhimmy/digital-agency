import React, { useState } from "react";
import axios from "axios";
import "../header/header.scss";
import { Link, useHistory } from "react-router-dom";
import smile from "../../assets/smile.svg";
import hamburger from "../../assets/hamburger.png";
import close from "../../assets/close.png";
import Hamburger from "../Hamburger/hamburgerMenu";

const Header = ({ navBackground }) => {
  const history = useHistory();
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    setName: "Menu",
  });

  const [disabled, setDisabled] = useState(false);

  let LoginBtns = "";

  const handleClick = () => {
    disabledMenu();
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        setName: "Close",
      });
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        setName: "Menu",
      });
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        setName: "Close",
      });
    }
  };
  if (state.clicked === null || state.clicked === false) {
    LoginBtns = (
      <img src={hamburger} alt="hamburger-icon" width="40px" height="40px" />
    );
  } else if (state.clicked === true) {
    LoginBtns = <img src={close} alt="close-icon" width="30px" height="40px" />;
  }

  // if(!token){
  //     LoginBtns = (
  //         <div className="navbar">
  //             <li className="nav-item">
  //                 <Link className="nav-link" to="/login">Sign in</Link>
  //             </li>
  //             <li className="nav-item">
  //                 <Link className="start-btn" to="/register">Get Started</Link>
  //             </li>
  //         </div>
  //     )
  // }else{
  //     LoginBtns = (
  //         <li className="nav-item">
  //             <button className="btn btn-danger btn-bg" onClick={handleLogout}>Logout</button>
  //         </li>

  //     )
  // }

  const disabledMenu = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };
  return (
    <div className="header" style={{ background: navBackground }}>
      <div className="container">
        <div className="logo">
          <Link to="/home" rel="canonical">
            <img src={smile} alt="moovit-smile-logo" />
          </Link>
          <button disabled={disabled} onClick={handleClick}>
            {LoginBtns}
          </button>
        </div>
      </div>
      <Hamburger state={state} setState={setState} />
    </div>
  );
};

export default Header;
