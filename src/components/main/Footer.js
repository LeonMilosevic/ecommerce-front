import React from "react";
// import helpers
import { Link } from "react-router-dom";
// import icons
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row flex-row text-center">
          <div className="col-2">
            <ul className="footer-list pt-4">
              Contact us
              <li className="footer-list-item">+37064303114</li>
              <li className="footer-list-item">
                <span style={{ textTransform: "none" }}>
                  clothifyservice@gmail.com
                </span>
              </li>
            </ul>
          </div>
          <div className="col-2">
            <ul className="footer-list pt-4">
              Services
              <li className="footer-list-item">
                <Link className="footer-link" to="/about">
                  Contact us
                </Link>
              </li>
              <li className="footer-list-item">
                <Link className="footer-link" to="/about">
                  Ordering &amp; Payment
                </Link>
              </li>
              <li className="footer-list-item">
                <Link className="footer-link" to="/about">
                  Shipping
                </Link>
              </li>
              <li className="footer-list-item">
                <Link className="footer-link" to="/about">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-2">
            <ul className="footer-list pt-4">
              <span>information</span>
              <li className="footer-list-item">
                <Link className="footer-link" to="/about">
                  Privacy Policy
                </Link>
              </li>
              <li className="footer-list-item">
                <Link className="footer-link" to="/about">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-2">
            <ul className="footer-list pt-4">
              <span>work with us</span>
              <li className="footer-list-item">
                <Link className="footer-link" to="/about">
                  Join our team
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-2">
            <div className="footer-social">
              <span>
                <FaFacebook className="footer-social-icons footer-social-icons--facebook pr-1" />
              </span>
              <span className="footer-social-icons footer-social-icons--instagram pl-2 ">
                <img
                  className="instagram-image"
                  alt="instagram icon"
                  src={require("../../images/instagram.svg")}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
