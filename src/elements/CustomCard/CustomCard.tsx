import React from "react";

import "./CustomCard.scss";

export const CustomCard = ({ title, img, height, width } = this.props) => {
  return (
    <div className="artboard">
      <div className={`card ${img}`} style={{ height: height, width: width }}>
        <div className="card__side card__side--back">
          <div className="card__cover">
            <h4 className="card__heading">
              <span className="card__heading-span">Skill Set</span>
            </h4>
          </div>
          <div className="card__details">
            <ul>
              <li>Advanced JS and CSS</li>
              <li>JS/CSS Preprocessors</li>
              <li>JS Frameworks</li>
              <li>Advanced Animations</li>
              <li>Deployment Pipelines</li>
              <li>Large Apps Architectures</li>
              <li>Naming Conventions</li>
            </ul>
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
