import React from "react";

import "./LandingStyle.scss";
import { LandingCarousel, SearchForm } from "../../components";

export const LandingLayout = () => {
  return (
    <div className="LandingPage">
      <LandingCarousel />
      <SearchForm />
    </div>
  );
};
