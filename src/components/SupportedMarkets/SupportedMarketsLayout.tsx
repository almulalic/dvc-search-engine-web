import React from "react";

import { CustomCard } from "./../../elements/CustomCard/CustomCard";
import { BrokerAlias, BrokerDescriptions, BrokerURL } from "../../shared/Types";

import "./SupportedMarketsStyle.scss";

export const SupportedMarketsLayout = () => {
  return (
    <div className="SupportedMarkets">
      {BrokerAlias.map((broker, id) => {
        return (
          <CustomCard
            title={broker[0]}
            img={`dvccard${id + 1}`}
            description={BrokerDescriptions[broker[1]]}
            url={BrokerURL[broker[1]]}
          />
        );
      })}
    </div>
  );
};
