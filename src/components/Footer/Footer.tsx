import React, { useState } from "react";
import "./Footer.scss";
import { useHistory } from "react-router-dom";
import { Button, Form, Input, message, Modal, Space, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { baseAuthURL } from "../../shared/Shared";
import axios from "axios";
import { validateEmail } from "../../shared/Utils";

const { Title, Text } = Typography;

export const Footer = () => {
  let history = useHistory();

  const [body, setBody] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isContactModalVisible, setContactModalVisible] = useState(false);

  const sendContact = () => {
    if (body.name === "" || body.email === "" || body.message === "") {
      message.error(
        "You must fill out all fields before you can submit the form."
      );
      return;
    }

    if (!validateEmail(body.email)) {
      message.error("You must enter valid email adress.");
      return;
    }

    axios
      .post(baseAuthURL + "/contact/submit", body)
      .then((res) => {
        setContactModalVisible(false);
        message.success("Contact form submited successfully!");
      })
      .catch((err) => {
        console.log(err);
        setContactModalVisible(false);
        message.error("Failed to sent contact email, please try again!");
      });
  };

  const contactModalMarkup = (
    <Modal
      visible={isContactModalVisible}
      title="Contact us"
      onCancel={() => setContactModalVisible(false)}
      footer={[
        <Button key="back" onClick={() => setContactModalVisible(false)}>
          Return
        </Button>,
        <Button type="primary" key="submit" onClick={() => sendContact()}>
          Send
        </Button>,
      ]}
    >
      <Title level={5} style={{ textAlign: "center" }}>
        If you have any issues with this platform or if you want to report a bug
        you can contact us via email or in this text field.
      </Title>
      <hr />
      <div className="Footer-ContactModal">
        <div>
          <Input
            placeholder="Please input your name"
            size="middle"
            onChange={(e) => setBody({ ...body, name: e.target.value })}
          />
        </div>
        <div>
          <Input
            placeholder="Please input your nickname"
            size="middle"
            onChange={(e) => setBody({ ...body, email: e.target.value })}
          />
        </div>
        <div>
          <TextArea
            rows={6}
            placeholder="Enter your comment here..."
            onChange={(e) => setBody({ ...body, message: e.target.value })}
          />
        </div>
      </div>
      <hr />
      <Title level={5}>
        <Text mark>Contact Email:</Text> dvcsearchengine@enviorment.live
      </Title>
    </Modal>
  );

  return (
    <footer className="page-footer font-small indigo">
      <div className="container">
        <div className="row text-center d-flex justify-content-center pt-5 mb-3">
          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase font-weight-bold">
              <a className="Footer-Link">About</a>
            </h6>
          </div>

          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase font-weight-bold">
              <a
                className="Footer-Link"
                onClick={() => {
                  history.push("/allListings");
                }}
              >
                All Listings
              </a>
            </h6>
          </div>

          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase font-weight-bold">
              <a className="Footer-Link">Guide</a>
            </h6>
          </div>

          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase font-weight-bold">
              <a
                className="Footer-Link"
                onClick={() => setContactModalVisible(true)}
              >
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
              from different DVC realested listings websites, and to this day 5
              different listing websites are supported with over 1000 listings.
              This engine does not add any additional content it's used only for
              gathering data. Every listing that you see is linked to an
              external listing on the source website. If you want to go and see
              more details of the listing you can click the view listing button.
            </p>
          </div>
        </div>

        <hr className="rgba-white-light" style={{ margin: "10px 0 10px 0" }} />
      </div>

      <div className="footer-copyright text-center py-3 Footer-Credits">
        © 2020 Copyright:
        <a href="https://mdbootstrap.com/">Mulalić Almir</a>
        Idea from:
        <a href="https://mdbootstrap.com/">Andrea Snyder</a>
        Implemented with help of:
        <a href="https://ant.design.com">ANTD Design</a>
      </div>
      {contactModalMarkup}
    </footer>
  );
};
