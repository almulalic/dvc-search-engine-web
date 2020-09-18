import React from "react";
import { useHistory } from "react-router-dom";

import { Carousel, Image, Button, Typography } from "antd";

import Banner1 from "../../assets/images/DVC-Banner/Banner1.jpg";
import Banner2 from "../../assets/images/DVC-Banner/Banner2.jpg";
import Banner3 from "../../assets/images/DVC-Banner/Banner3.jpg";

import "./LandingCarouselStyle.scss";

const { Title } = Typography;

export const LandingCarouselLayout = () => {
  let history = useHistory();

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
          <Title level={1}>DVC RESALE SEARCH ENIGNE</Title>
          <hr />
          <Title level={3}>
            The only DVC Resale Search Engine that you will ever need
          </Title>
        </div>
        <Button
          className="Carousel--ViewListingsButton"
          shape="round"
          onClick={() => history.push("/allListings")}
        >
          View Listings
        </Button>
      </div>
    </div>
  );
};
