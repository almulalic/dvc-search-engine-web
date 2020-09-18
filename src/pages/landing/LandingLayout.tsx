import React, { useState } from "react";
import { Layout } from "antd";

import {
  LandingCarousel,
  SearchForm,
  SupportedMarkets,
} from "../../components";

import "./LandingStyle.scss";
import { CookiesNotificationLayout } from "../../components/CookiesNotification/CookiesNotificationLayout";

export const LandingLayout = () => {
  const { Header, Footer, Sider, Content } = Layout;

  const [body, setBody] = useState({
    broker: [],
    resort: [],
    useYear: [],
    status: [],
    pointsRange: [0, 100],
    priceRange: [0, 100],
    pricePerPointRange: [0, 100],
    idInput: "",
    sidx: "Broker",
    sord: "Ascending",
    itemsPerPage: 5,
    includeDefectiveData: false,
    submitOnChange: false,
    currentPage: 1,
  });

  return (
    <div className="LandingPage">
      <Layout>
        <div className="LandingPage--Carousel">
          <LandingCarousel />
        </div>
        <div className="LandingPage--SearchForm">
          <SearchForm setBody={setBody} />
        </div>
        {/* <div className="LandingPage--SupportedMarkets">
          <SupportedMarkets />
        </div> */}
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
};
