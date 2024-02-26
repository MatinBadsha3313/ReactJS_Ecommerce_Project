import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaSquareXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <hr />
      <footer className="bg-white p-4 py-6">
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="my-3 mx-auto">
            <Link to="/" className="d-flex fs-4 fw-medium">
              E-Commerce
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-lg-3 m-0">
            <div className="text-center">
              <h4 className="mb-2 text-uppercase">Resources</h4>
              <ul className="text-dark-emphasis">
                <li className="mb-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-danger" : "text-black"
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="mb-3">
                  <NavLink
                    to="/wishlist"
                    className={({ isActive }) =>
                      isActive ? "text-danger" : "text-black"
                    }
                  >
                    Wishlist
                  </NavLink>
                </li>
                <li className="mb-3">
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive ? "text-danger" : "text-black"
                    }
                  >
                    Cart
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="mb-2 text-uppercase">Follow me</h4>
              <ul className="text-dark-emphasis">
                <li className="mb-3">
                  <a
                    href="https://github.com/MatinBadsha3313?tab=repositories"
                    target="_blank"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <Link to="#">Linkedin</Link>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="mb-2 text-uppercase">Legal</h4>
              <ul className="text-dark-emphasis">
                <li className="mb-3">
                  <Link to="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="#">Terms &amp; Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="row row-cols-1 row-cols-lg-2 g-3 my-1">
          <div className="text-dark-emphasis">
            ©2024BadshaKhan . All Rights Reserved.
          </div>
          <div className=" d-flex justify-content-between ">
            <a to="#" className="fs-3">
              <FaFacebook className="footer_icons" />
            </a>
            <a to="#" className="fs-3">
              <FaLinkedin className="footer_icons" />
            </a>
            <a
              to="https://github.com/MatinBadsha3313?tab=repositories"
              target="_blank"
              className="fs-3"
            >
              <FaGithub className="footer_icons" />
            </a>
            <a to="#" className="fs-3">
              <FaSquareXTwitter className="footer_icons" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
