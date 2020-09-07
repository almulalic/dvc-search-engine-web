import React, { useState, useEffect } from "react";
import {
  SearchOutlined,
  SaveOutlined,
  CopyOutlined,
  SaveTwoTone,
  CopyTwoTone,
} from "@ant-design/icons";

import {
  Card,
  Statistic,
  Space,
  Select,
  Row,
  Col,
  Checkbox,
  Tooltip,
  Button,
  message,
  Modal,
  Slider,
} from "antd";

import "./SearchFormStyle.scss";
import { calculateTimer } from "./SearchForm";
import {
  BrokerAlias,
  ResortAlias,
  UseYearAlias,
  StatusAlias,
} from "../../shared/Types";

export const SearchFormLayout = () => {
  //#region Counter

  const { Countdown } = Statistic;

  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    setDeadline(calculateTimer());
  }, []);

  //#endregion

  //#region Header

  const copyFiltersToClipboard = () => {
    message.success("Successfully copied to clipboard!");
  };

  const [savedFilters, setSavedFilters] = useState([]);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const saveToCookies = () => {
    console.log("now");
  };

  useEffect(() => {
    setSavedFilters([
      {
        name: "Filter One",
        value: { meh: 0 },
      },
    ]);
  }, []);

  const searchFormHeaderMarkup = (
    <div className="SearchForm--Header">
      <Row gutter={24} align="middle" justify="space-between">
        <Col span={18}>
          <span className="SearchForm--HeaderTitle">Search</span>
        </Col>
        <Col span={5}>
          <span className="SearchForm--HeaderSubtitle">Time Left</span>
        </Col>
        <Col span={1}>
          <Tooltip title="Copy search form to clipboard.">
            <Button
              type="primary"
              icon={<CopyOutlined />}
              size="middle"
              onClick={() => {
                copyFiltersToClipboard();
              }}
            />
          </Tooltip>
        </Col>
      </Row>
      <Row gutter={24} align="middle" justify="space-between">
        <Col span={18}>
          <span className="SearchForm--CounterTitle">
            1093 properties available!
          </span>
        </Col>
        <Col span={5}>
          <span className="SearchForm--Counter">
            <Countdown
              value={deadline}
              onFinish={() => setDeadline(calculateTimer())}
              format="HH:mm:ss"
            />
          </span>
        </Col>
        <Col span={1}>
          <Tooltip title="Save search for yourself." placement="bottom">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              size="middle"
              onClick={() => setSaveModalVisible(true)}
            />
          </Tooltip>
        </Col>
      </Row>
      <Modal
        visible={saveModalVisible}
        title="Save Filter"
        onOk={() => {
          saveToCookies();
        }}
        onCancel={() => setSaveModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setSaveModalVisible(false)}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={() => saveToCookies()}>
            Save
          </Button>,
        ]}
      >
        <h3>Saved Data</h3>
        {savedFilters.map((value, key) => {
          return <div key={key}>{value.name}</div>;
        })}

        <p className="SearchForm--OptionComment">
          Note that this engine uses cookies to store personal data. If you
          delete cookies or prevent them from loading you won't be able to
          access these files !
        </p>
      </Modal>
    </div>
  );

  //#endregion

  //#region Dropdowns

  const { Option } = Select;

  const [filters, setFilters] = useState({
    broker: [],
    resort: [],
    useYear: [],
    status: [],
    sidx: "Broker",
    sord: "Ascending",
    itemsPerPage: 5,
    currentPage: 1,
    includeDefectiveData: false,
  });

  const handleDropdownChange = (key, value) => {
    if (key === "broker")
      setFilters({
        ...filters,
        broker: value,
      });
    else if (key === "resort")
      setFilters({
        ...filters,
        resort: value,
      });
    else if (key === "useYear")
      setFilters({
        ...filters,
        useYear: value,
      });
    else if (key === "status")
      setFilters({
        ...filters,
        status: value,
      });
    else if (key === "sidx")
      setFilters({
        ...filters,
        sidx: value,
      });
    else if (key === "sord")
      setFilters({
        ...filters,
        sord: value,
      });
    else if (key === "ipp")
      setFilters({
        ...filters,
        itemsPerPage: value,
      });
    else if (key === "cp")
      setFilters({
        ...filters,
        currentPage: value,
      });
    else if (key === "idd")
      setFilters({
        ...filters,
        includeDefectiveData: value,
      });
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);
  // const [brokerDropdownValues,setBrokerDropdownValues] = useState([]);

  const allDropdownOptions = [
    {
      label: "Brokers",
      id: "broker",
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
      id: "resort",
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
      id: "useYear",
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
      id: "status",
      dropdown: StatusAlias.map(([key, value]) => {
        return (
          <Option key={key} value={value}>
            {key}
          </Option>
        );
      }),
    },
  ];

  const dropdownsMarkup = (
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
              onChange={(value) => handleDropdownChange(x.id, value)}
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
  );

  //#endregion

  //#region

  const slidersMarkup = (
    <Space>
      <div>
        <h3>Points ($)</h3>
        <Slider range defaultValue={[20, 50]} />
      </div>
      <div>
        <h3>Price per Point ($)</h3>
        <Slider range defaultValue={[20, 50]} />
      </div>
    </Space>
  );

  //#endregion

  //#region Order

  const orderMarkup = (
    <Space direction="horizontal" size="middle">
      <div>
        <h3>Sort By</h3>
        <Select
          defaultValue="broker"
          style={{ width: 120 }}
          onChange={(value) => {
            handleDropdownChange("sidx", value);
          }}
        >
          <Option value="id">Id</Option>
          <Option value="broker">Broker</Option>
          <Option value="resort">Resort</Option>
          <Option value="points">Points</Option>
          <Option value="useYear">Use Year</Option>
          <Option value="price">Price</Option>
        </Select>
      </div>
      <div>
        <h3>Order</h3>
        <Select
          defaultValue="ASC"
          style={{ width: 120 }}
          onChange={(value) => {
            handleDropdownChange("sord", value);
          }}
        >
          <Option value="ASC">Ascending</Option>
          <Option value="DESC">Descending</Option>
        </Select>
      </div>
    </Space>
  );

  //#endregion

  //#region Pagination

  const paginationOptionsMarkup = (
    <Space direction="horizontal" size="middle">
      <div>
        <h3>Items per page</h3>
        <Select
          defaultValue="broker"
          style={{ width: 120 }}
          onChange={(value) => {
            handleDropdownChange("ipp", value);
          }}
        >
          <Option value="5">5</Option>
          <Option value="10">10</Option>
          <Option value="15">15</Option>
          <Option value="20">20</Option>
          <Option value="30">30</Option>
          <Option value="50">50</Option>
        </Select>
      </div>
    </Space>
  );

  //#endregion

  //#region More Options

  const moreOptionsMarkup = (
    <Space direction="vertical" size="middle">
      <div>
        <Checkbox
          onChange={(value) => {
            handleDropdownChange("idd", value);
          }}
        >
          Include defective data
        </Checkbox>
        <p className="SearchForm--OptionComment">
          Includes data that has some information missing or undefined.
        </p>
      </div>
      <div>
        <Checkbox
          onChange={(value) => {
            console.log(value);
          }}
        >
          Submit on change
        </Checkbox>
        <p className="SearchForm--OptionComment">
          If selected search will occur every time one of the fields is changed.
        </p>
      </div>
    </Space>
  );

  //#endregion

  //#region

  //#endregion
  return (
    <div className="SearchForm">
      <Card
        className="SearchForm--Card"
        title={searchFormHeaderMarkup}
        hoverable
        bordered={false}
      >
        <Row gutter={24} align="middle">
          <Col span={12}>{dropdownsMarkup}</Col>
          <Col span={12}>
            <Space direction="vertical" size="middle">
              {orderMarkup}
              {paginationOptionsMarkup}
              {slidersMarkup}
              {moreOptionsMarkup}
              <Button
                type="primary"
                icon={<SearchOutlined />}
                size="middle"
                block
              >
                Search
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
