import React, { useState } from "react";
import { Layout } from "antd";

import { LandingCarousel, SearchForm } from "../../components";

import "./LandingStyle.scss";
import { Footer } from "../../components/Footer/Footer";

export const LandingLayout = () => {
  const [body, setBody] = useState({
    broker: [],
    resort: [],
    useYear: [],
    status: [],
    pointsRange: [null, null],
    priceRange: [null, null],
    pricePerPointRange: [null, null],
    idInput: "",
    sidx: "Broker",
    sord: "Ascending",
    itemsPerPage: 10,
    includeDefectiveData: true,
    submitOnChange: false,
    multipleSorterEnabled: false,
    currentPage: 1,
  });

  return (
    <div className="LandingPage">
      <Layout>
        <div className="LandingPage--Carousel">
          <LandingCarousel />
        </div>
        <div className="LandingPage--SearchForm">
          <SearchForm externalFilters={body} setExternalFilters={setBody} />
        </div>
        {/* <div className="LandingPage--SupportedMarkets">
          <SupportedMarkets />
        </div> */}
        <Footer />
      </Layout>
    </div>
  );
};
