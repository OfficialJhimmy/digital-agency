import React from "react";
import "../footer/footer.scss";
import { Link } from "react-router-dom";
import fb from "../../assets/facebook/active.svg";
import youtube from "../../assets/youtube.png";
import instagram from "../../assets/InstagramLogo.svg";
import Linkedin from "../../assets/linkedin.png";
import image from "../../assets/image 1.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="content">
          <div className="about_">
            <img src={image} alt="moovit-digital-logo" className="mb-4" />
            <p>info@moovitdigital.com </p>

            <div className="social">
              <a href="https://www.facebook.com/moovitdigital">
                <img src={fb} alt="facebook-logo" />
              </a>
              <a href="https://www.linkedin.com/company/moovitdigital/">
                <img src={Linkedin} alt="linkedin-logo" width="20px" />
              </a>
              <a href="https://instagram.com/moovitdigital">
                <img src={instagram} alt="instagram-logo" />
              </a>
              <a href="https://www.youtube.com/channel/UCfTya7OzM-_D95sxNTVqfcw">
                <img
                  src={youtube}
                  width="24px"
                  height="24px"
                  alt="instagram-logo"
                />
              </a>
            </div>
          </div>
          <div className="item">
            <h4>Know Us</h4>
            <span>
              {" "}
              <Link to="/about">About us</Link>
            </span>
            <span>
              <Link to="/">Privacy Policy</Link>
            </span>
            <span>
              <Link to="/">Terms of Use</Link>
            </span>
          </div>
          <div className="item">
            <h4>Services</h4>
            <span>
              <Link to="/">Digital advertising</Link>
            </span>
            <span>
              <Link to="/">Business Advisory</Link>
            </span>
            <span>
              <Link to="/">Strategy Mapping</Link>
            </span>
            <span>
              <Link to="/">Social Media Management</Link>
            </span>
          </div>
          <div className="item">
            <h4>Help</h4>
            <span>
              <Link to="/contact">Contact us</Link>
            </span>
            <span>
              <Link to="/">Privacy Policy</Link>
            </span>
          </div>

          <div className="item">
            <form action="">
              <h4>Subscribe to our newsletters</h4>
              <input type="text" placeholder="enter your email address" />
              <button>Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
