import React, { useState } from "react";
import { Layout } from "antd";

import { LandingCarousel, SearchForm } from "../../components";

import "./LandingStyle.scss";
import { Footer } from "../../components/Footer/Footer";
import { DefaultFilterState } from "../../shared/Utils";

export const LandingLayout = () => {
  const [body, setBody] = useState(
    DefaultFilterState({
      price: [null, null],
      points: [null, null],
      pricePerPoint: [null, null],
    })
  );

  return (
    <div className="LandingPage">
      <Layout>
        <div className="LandingPage--Carousel">
          <LandingCarousel />
        </div>
        <div className="LandingPage--SearchForm">
          <SearchForm
            externalFilters={body}
            setExternalFilters={setBody}
            isBodyUpdating={false}
          />
        </div>
        {/* <div className="LandingPage--SupportedMarkets">
          <SupportedMarkets />
        </div> */}
        <Footer />
      </Layout>
    </div>
  );
};
