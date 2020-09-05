import React, { useState, useEffect } from "react";

import { Card, Statistic, Space, Select, Row, Col } from "antd";

import "./SearchFormStyle.scss";
import { calculateTimer } from "./SearchForm";
import {
  BrokerAlias,
  ResortAlias,
  UseYearAlias,
  StatusAlias,
} from "../../shared/Types";

export const SearchFormLayout = () => {
  const { Countdown } = Statistic;
  const { Option } = Select;

  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    setDeadline(calculateTimer());
  }, []);

  const [allDropdownOptions, setAllDropdownOptions] = useState([]);

  useEffect(() => {
    setAllDropdownOptions([
      {
        label: "Brokers",
        dropdown: BrokerAlias.map(([key, value]) => {
          return (
            <Option key={key} value={value}>
              {key}
            </Option>
          );
        }),
      },
      {
        label: "Resorts",
        dropdown: ResortAlias.map(([key, value]) => {
          return (
            <Option key={key} value={value}>
              {key}
            </Option>
          );
        }),
      },
      {
        label: "Use Year",
        dropdown: UseYearAlias.map(([key, value]) => {
          return (
            <Option key={key} value={value}>
              {key}
            </Option>
          );
        }),
      },
      {
        label: "Status",
        dropdown: StatusAlias.map(([key, value]) => {
          return (
            <Option key={key} value={value}>
              {key}
            </Option>
          );
        }),
      },
    ]);
  }, []);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <div className="SearchForm">
      <Card
        className="SearchForm--CardHeader"
        title="Search"
        hoverable
        bordered={false}
        extra={
          <Countdown
            title="Next Update"
            value={deadline}
            onFinish={() => setDeadline(calculateTimer())}
            format="HH:mm:ss"
          />
        }
      >
        <Row>
          <Col span={12}>
            <Space direction="vertical" size="middle">
              {allDropdownOptions.map((x, i) => {
                return (
                  <div className="SearchForm--SelectContainer" key={i}>
                    <h3>{x.label}</h3>
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Select or Input"
                      optionLabelProp="key"
                      optionFilterProp="key"
                      onChange={handleChange}
                      tokenSeparators={[","]}
                      allowClear
                      bordered
                      showArrow
                    >
                      {x.dropdown}
                    </Select>
                  </div>
                );
              })}
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" size="middle">
              <Space direction="horizontal" size="middle">
                <div>
                  <h3>Sort By</h3>
                  <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    onChange={handleChange}
                  ></Select>
                </div>
                <div>
                  <h3>Order</h3>
                  <Select
                    defaultValue="ASC"
                    style={{ width: 120 }}
                    onChange={handleChange}
                  >
                    <Option value="ASC">Ascending</Option>
                    <Option value="DESC">Descending</Option>
                  </Select>
                </div>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
