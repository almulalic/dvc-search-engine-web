import React from "react";
import "./Footer.scss";
import { useHistory } from "react-router-dom";

export const Footer = () => {
  let history = useHistory();

  return (
    <footer className="page-footer font-small indigo">
      <div className="container">
        <div className="row text-center d-flex justify-content-center pt-5 mb-3">
          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase font-weight-bold">
              <a className="Footer-Link" href="#!">
                About
              </a>
            </h6>
          </div>

          <div
            className="col-md-2 mb-3"
            onClick={() => {
              history.push("/allListings");
            }}
          >
            <h6 className="text-uppercase font-weight-bold">
              <a className="Footer-Link" href="#!">
                All Listings
              </a>
            </h6>
          </div>

          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase font-weight-bold">
              <a className="Footer-Link" href="#!">
                Guide
              </a>
            </h6>
          </div>

          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase font-weight-bold">
              <a className="Footer-Link" href="#!">
                Contact
              </a>
            </h6>
          </div>
        </div>
        <hr className="rgba-white-light" style={{ margin: "0 10%" }} />

        <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
          <div className="col-md-8 col-12 mt-5">
            <p style={{ lineHeight: "1.8rem", margin: 0, padding: 0 }}>
              DVC Resales Search Engine is a search engine that collects data
              from different DVC realested listings websites, and to this day 3
              different listing websites are supported with over 1000 listings.
              This engine does not add any additional content it's used only for
              gathering data. Every listing that you see is linked to an
              external listing on the source website. If you want to go and see
              more details of the listing you can click the view listing button.
            </p>
          </div>
        </div>

        <hr className="clearfix d-md-none rgba-white-light" />
      </div>

      <div className="footer-copyright text-center py-3 Footer-Credits">
        © 2020 Copyright:
        <a href="https://mdbootstrap.com/"> Mulalić Almir</a>
        Implemented with help of:
        <a href="https://ant.design.com">ANTD Design</a>
      </div>
    </footer>
  );
};
