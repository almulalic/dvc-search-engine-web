import React from "react";

import "./CustomCard.scss";

export const CustomCard = (
  { title, img, height, width, description, url } = this.props
) => {
  return (
    <div className={`artboard ${img}`}>
      <div className="card" style={{ height: height, width: width }}>
        <div className="card__side card__side--back">
          <div className="card__cover">
            <h4 className="card__heading">
              <span className="card__heading-span">{title}</span>
            </h4>
          </div>
          <div className="card__details">
            <div className="card__details__header">{description}</div>
            <a href={url}> Visit page </a>
          </div>
        </div>
        <div className="card__side card__side--front">
          <div className="card__theme">
            <div className="card__theme-box">
              <p className="card__subject">Broker</p>
              <p className="card__title">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
