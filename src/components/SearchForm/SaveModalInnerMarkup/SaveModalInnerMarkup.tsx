import React, { useState } from "react";
import { Space, Typography, Input, List, Collapse } from "antd";
import {
  BrokerTypes,
  ResortTypes,
  UseYearTypes,
  StatusTypes,
} from "../../../shared/Types";

const { Title, Text } = Typography;

export const SaveModalInnerMarkup = ({ filters, setSaveInput }) => {
  const listMarkup = (
    <List header={<Title level={5}>Filter overview</Title>} bordered>
      <List.Item>
        <Text strong>ID:</Text>
        <Text>{filters.idInput.length === 0 ? "-" : filters.idInput}</Text>
      </List.Item>
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
          From {filters.pointsRange[0]} P to {filters.pointsRange[1]} P
        </Text>
      </List.Item>
      <List.Item>
        <Text strong>Price:</Text>
        <Text>
          From {filters.priceRange[0]} $ to {filters.priceRange[1]} $
        </Text>
      </List.Item>
      <List.Item>
        <Text strong>Price Per Point:</Text>
        <Text>
          From {filters.pricePerPointRange[0]} P/$ to
          {filters.pricePerPointRange[1]} P/$
        </Text>
      </List.Item>

      <List.Item>
        <Text strong>Sort By:</Text>
        <Text>{filters.sidx}</Text>
      </List.Item>
      <List.Item>
        <Text strong>Order:</Text>
        <Text>{filters.sord}</Text>
      </List.Item>
      {/* <List.Item>
        <Text strong>Items Per Page:</Text>
        <Text>{filters.itemsPerPage}</Text>
      </List.Item> */}
      <List.Item>
        <Text strong>Include Defective Data:</Text>
        <Text>{filters.includeDefectiveData ? "Yes." : "No."}</Text>
      </List.Item>
      <List.Item>
        <Text strong>Submit On Change:</Text>
        <Text> {filters.submitOnChange ? "Yes." : "No."}</Text>
      </List.Item>
      <List.Item>
        <Text strong>Multiple Column Filter:</Text>
        <Text> {filters.multipleColumnFilter ? "Yes." : "No."}</Text>
      </List.Item>
    </List>
  );
  return (
    <Space direction="vertical" size="large">
      {listMarkup}

      <div>
        <Title level={5}>Save name</Title>
        <Input
          placeholder="Enter new save name"
          onChange={(e) => setSaveInput(e.target.value)}
        />
      </div>
      <Text type="secondary">
        Note that this engine uses local storage to store personal data. If you
        delete or clear local data you won't be able to access these save files!
      </Text>
    </Space>
  );
};
