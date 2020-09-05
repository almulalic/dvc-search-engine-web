import React from "react";

import { Carousel, Image, Button } from "antd";

import Banner1 from "../../assets/images/DVC-Banner/Banner1.jpg";
import Banner2 from "../../assets/images/DVC-Banner/Banner2.jpg";
import Banner3 from "../../assets/images/DVC-Banner/Banner3.jpg";

import "./LandingCarouselStyle.scss";

export const LandingCarouselLayout = () => {
  return (
    <div className="Carousel">
      <Carousel dotPosition="top" effect="scrollx" autoplay>
        <div className="Carousel--BannerImage">
          <Image src={Banner1} preview={false} />
        </div>
        <div className="Carousel--BannerImage">
          <Image src={Banner2} preview={false} />
        </div>
        <div className="Carousel--BannerImage">
          <Image src={Banner3} preview={false} />
        </div>
      </Carousel>
      <div className="Carousel--OverlayCaption">
        <div className="Carousel--Logo" />

        <div className="Carousel--Caption">
          <hr />
          <h1>DVC RESALE SEARCH ENIGNE</h1>
          <hr />
          <h3>The only DVC Resale Search Engine that you will ever need</h3>
        </div>
        <Button className="Carousel--ViewListingsButton" shape="round">
          View Listings
        </Button>
      </div>
    </div>
  );
};
