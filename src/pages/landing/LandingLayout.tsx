import React from "react";

import {
  LandingCarousel,
  SearchForm,
  SupportedMarkets,
} from "../../components";

import "./LandingStyle.scss";

export const LandingLayout = () => {
  return (
    <div className="LandingPage">
      <div className="LandingPage--Carousel">
        <LandingCarousel />
      </div>
      <div className="LandingPage--SearchForm">
        <SearchForm />
      </div>
      <div className="LandingPage--SupportedMarkets">
        <SupportedMarkets />
      </div>
    </div>
  );
};
