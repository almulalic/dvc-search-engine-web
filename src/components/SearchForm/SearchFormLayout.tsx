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
  DatePicker,
  Typography,
} from "antd";

import "./SearchFormStyle.scss";
import { calculateTimer } from "./SearchForm";
import {
  BrokerAlias,
  ResortAlias,
  UseYearAlias,
  StatusAlias,
} from "../../shared/Types";

const { Countdown } = Statistic;
const { Text, Title } = Typography;
const { Option } = Select;

export const SearchFormLayout = () => {
  //#region Counter

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

  const saveFilterModalMarkup = (
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
      <Title level={5}>Saved Data</Title>
      {savedFilters.map((value, key) => {
        return <div key={key}>{value.name}</div>;
      })}

      <p className="SearchForm--OptionComment">
        Note that this engine uses cookies to store personal data. If you delete
        cookies or prevent them from loading you won't be able to access these
        files !
      </p>
    </Modal>
  );

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
      <div className="SearchForm--HeaderBlock SearchForm--HeaderCaption">
        <Title className="SearchForm--HeaderTitle " level={3}>
          Search
        </Title>
        <Text className="SearchForm--HeaderSubtitle" type="secondary">
          1093 properties available!
        </Text>
      </div>
      <div className="SearchForm--HeaderBlock SearchForm--HeaderCountdown">
        <Text className="SearchForm--HeaderSubtitle" type="secondary">
          Time Left:
        </Text>
        <span className="SearchForm--Counter">
          <Countdown
            value={deadline}
            onFinish={() => setDeadline(calculateTimer())}
            format="HH:mm:ss"
          />
        </span>
      </div>
      <div className="SearchForm--HeaderBlock SearchForm--HeaderActions">
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
        <Tooltip title="Save search for yourself." placement="bottom">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            size="middle"
            onClick={() => setSaveModalVisible(true)}
          />
        </Tooltip>
      </div>

      {saveFilterModalMarkup}
    </div>
  );

  //#endregion

  //#region Dropdowns

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
    <Row gutter={24}>
      {allDropdownOptions.map((x, i) => {
        return (
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={24}>
            <div className="SearchForm--SelectContainer" key={i}>
              <Title level={5}>{x.label}</Title>
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
          </Col>
        );
      })}
    </Row>
  );

  //#endregion

  //#region Sliders

  const slidersMarkup = (
    <Row gutter={24}>
      <Col span={24}>
        <div className="SearchForm--SelectContainer">
          <Title level={5}>Points ($)</Title>
          <Slider range defaultValue={[20, 50]} />
        </div>
      </Col>
      <Col span={24}>
        <div className="SearchForm--SelectContainer">
          <Title level={5}>Price per Point ($)</Title>
          <Slider range defaultValue={[20, 50]} />
        </div>
      </Col>
    </Row>
  );

  //#endregion

  //#region Output settings

  const outputSettingsMarkup = (
    <Row
      gutter={24}
      justify="center"
      align="middle"
      className="SearchForm--OutputSettings"
    >
      <Col xs={24} sm={24} md={12} lg={8}>
        <div className="SearchForm--SelectContainer">
          <Title level={5}>Sort By</Title>
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
      </Col>
      <Col xs={24} sm={24} md={12} lg={8}>
        <div className="SearchForm--SelectContainer">
          <Title level={5}>Order</Title>
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
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={24} xxl={12}>
        <div className="SearchForm--SelectContainer">
          <Title level={5}>Items per page</Title>
          <Select
            defaultValue="10"
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
      </Col>
    </Row>
  );

  //#endregion

  //#region Search

  const searchButtonMarkup = (
    <Button type="primary" icon={<SearchOutlined />} size="middle" block>
      Search
    </Button>
  );

  //#endregion

  //#region More Options

  const moreOptionsMarkup = (
    <Space direction="vertical" size="middle">
      <div className="SearchForm--Checkbox">
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
      <div className="SearchForm--Checkbox">
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
      {searchButtonMarkup}
    </Space>
  );

  //#endregion

  return (
    <div className="SearchForm">
      <Card
        className="SearchForm--Card"
        title={searchFormHeaderMarkup}
        hoverable
        bordered={false}
      >
        <Row gutter={24} justify="center">
          <Col lg={24} xl={12} xxl={12}>
            {dropdownsMarkup}
            {slidersMarkup}
          </Col>
          <Col lg={24} xl={12} xxl={12}>
            {outputSettingsMarkup}
            {moreOptionsMarkup}
          </Col>
        </Row>
      </Card>
    </div>
  );
};
