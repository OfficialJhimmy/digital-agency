import React from "react";
import "./Error404.scss";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";

const Error404 = ({ navBackground }) => {
  return (
    <div className="error404">
      <Header navBackground={navBackground} />
      <div className="error404__container">
        <h3>Opps! An error occured</h3>
        <p>
          While you are still here, Check out the amazing packages currently on
          offer. <Link to="/packages">Our Packages</Link>
        </p>
      </div>
    </div>
  );
};

export default Error404;
