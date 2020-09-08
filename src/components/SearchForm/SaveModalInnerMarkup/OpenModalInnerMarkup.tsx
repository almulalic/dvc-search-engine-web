import React from "react";
import { Typography, List, Collapse } from "antd";
import {
  BrokerTypes,
  ResortTypes,
  UseYearTypes,
  StatusTypes,
} from "../../../shared/Types";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export const OpenModalInnerMarkup = ({ savedFilters } = this.props) => {
  const listMarkup = (save) => {
    const { name, filters } = save;
    return (
      <List bordered>
        <List.Item>
          <Text strong>Brokers:</Text>
          <Text>
            {filters.broker.length === 0
              ? "None."
              : filters.broker.map((x, id) => {
                  if (id != filters.broker.length - 1)
                    return BrokerTypes[x] + ", ";
                  else return BrokerTypes[x];
                })}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Resorts:</Text>
          <Text>
            {filters.resort.length === 0
              ? "None."
              : filters.resort.map((x, id) => {
                  if (id != filters.resort.length - 1)
                    return ResortTypes[x] + ", ";
                  else return ResortTypes[x];
                })}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Use Years:</Text>
          <Text>
            {filters.useYear.length === 0
              ? "None."
              : filters.useYear.map((x, id) => {
                  if (id != filters.useYear.length - 1)
                    return UseYearTypes[x] + ", ";
                  else return UseYearTypes[x];
                })}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Statuses:</Text>
          <Text>
            {filters.status.length === 0
              ? "None."
              : filters.status.map((x, id) => {
                  if (id != filters.broker.length - 1)
                    return StatusTypes[x] + ",";
                  else return StatusTypes[x];
                })}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Points:</Text>
          <Text>
            From {filters.pointsRange[0]} to {filters.pointsRange[1]}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>Price Per Point:</Text>
          <Text>
            From {filters.pricePerPointRange[0]} to{" "}
            {filters.pricePerPointRange[1]}
          </Text>
        </List.Item>
        <List.Item>
          <Text strong>ID:</Text>
          <Text>{filters.idInput.length === 0 ? "-" : filters.id}</Text>
        </List.Item>
        <List.Item>
          <Text strong>Sort By:</Text>
          <Text>{filters.sidx}</Text>
        </List.Item>
        <List.Item>
          <Text strong>Order:</Text>
          <Text>{filters.sord}</Text>
        </List.Item>
        <List.Item>
          <Text strong>Items Per Page:</Text>
          <Text>{filters.itemsPerPage}</Text>
        </List.Item>
        <List.Item>
          <Text strong>Include Defective Data:</Text>
          <Text>{filters.includeDefectiveData ? "Yes." : "No."}</Text>
        </List.Item>
        <List.Item>
          <Text strong>Submit On Change:</Text>
          <Text> {filters.submitOnChange ? "Yes." : "No."}</Text>
        </List.Item>
      </List>
    );
  };

  return (
    <div>
      <Title level={5}>Filter Overview </Title>
      <Collapse accordion>
        {savedFilters?.map((save, key) => {
          return (
            <Panel header={save.name} key={key}>
              {listMarkup(save)}
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};
