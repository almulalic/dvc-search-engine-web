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

  return (
    <div className="LandingPage">
      <Layout>
        <div className="LandingPage--Carousel">
          <LandingCarousel />
        </div>
        <div className="LandingPage--SearchForm">
          <SearchForm />
        </div>
        {/* <div className="LandingPage--SupportedMarkets">
          <SupportedMarkets />
        </div> */}
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
};
