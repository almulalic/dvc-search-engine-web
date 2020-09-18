import React, { useState, useEffect } from "react";
import numeral from "numeral";

import {
  SearchOutlined,
  SaveOutlined,
  CopyOutlined,
  SaveTwoTone,
  CopyTwoTone,
  RightOutlined,
  FolderOpenOutlined,
  DollarCircleOutlined,
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
  Input,
  Steps,
  List,
  Collapse,
} from "antd";

import Skeleton from "react-loading-skeleton";

import "./SearchFormStyle.scss";
import { calculateTimer, validateAndSave } from "./SearchForm";
import {
  BrokerAlias,
  ResortAlias,
  UseYearAlias,
  StatusAlias,
  ResortTypes,
  UseYearTypes,
  StatusTypes,
} from "../../shared/Types";
import Cookies from "universal-cookie";
import { SaveModalInnerMarkup } from "./SaveModalInnerMarkup/SaveModalInnerMarkup";
import { decodeCamelCase, serializeURL } from "../../shared/Utils";
import { BrokerTypes } from "./../../shared/Types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { OpenModalInnerMarkup } from "./SaveModalInnerMarkup/OpenModalInnerMarkup";
import { baseSearchURL, baseAuthURL } from "../../shared/Shared";
import axios from "axios";

const { Countdown } = Statistic;
const { Text, Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const cookies = new Cookies();

export const SearchFormLayout = ({ setBody }) => {
  //#region Overview

  const isAllListings = window.location.href.includes("allListings");

  const [overview, setOverview] = useState({
    total: 0,
    valid: 0,
    points: [0, 0],
    price: [0, 0],
    pricePerPoint: [0, 0],
  });

  const [isFetchingOverview, setIsFetchingOverview] = useState(true);

  const fetchOverview = () => {
    axios
      .get(baseAuthURL + "/search/overview")
      .then((res) => {
        setOverview(res.data);
        setIsFetchingOverview(false);
      })
      .catch((err) => {
        console.log(err);
        setIsFetchingOverview(false);
      });
  };

  useEffect(() => {
    setIsFetchingOverview(true);
    fetchOverview();
  }, []);

  //#endregion

  const [filters, setFilters] = useState({
    broker: [],
    resort: [],
    useYear: [],
    status: [],
    pointsRange: [0, 100],
    priceRange: [0, 100],
    pricePerPointRange: [0, 100],
    idInput: "",
    sidx: "Broker",
    sord: "Ascending",
    itemsPerPage: 10,
    includeDefectiveData: false,
    submitOnChange: false,
    currentPage: 1,
  });

  useEffect(() => {
    setBody(filters);
  }, [filters]);

  //#region Counter

  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    setDeadline(calculateTimer());
  }, []);

  //#endregion

  //#region Header

  // Save

  const [saveInput, setSaveInput] = useState("");
  const [savedFilters, setSavedFilters] = useState([]);
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  useEffect(() => {
    let rawFilters = cookies.get("filters");

    if (rawFilters) setSavedFilters(rawFilters);
    else cookies.set("filters", JSON.stringify([]));
  }, []);

  const saveFilterModalMarkup = (
    <Modal
      visible={saveModalVisible}
      title="Save Filters"
      width="50%"
      onCancel={() => setSaveModalVisible(false)}
      footer={[
        <Button key="back" onClick={() => setSaveModalVisible(false)}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            if (validateAndSave(saveInput, saveInput, savedFilters, filters))
              setSaveModalVisible(false);
          }}
        >
          Save
        </Button>,
      ]}
    >
      <SaveModalInnerMarkup filters={filters} setSaveInput={setSaveInput} />
    </Modal>
  );

  // Open

  const [openModalVisible, setOpenModalVisible] = useState(false);

  const openFilterModalMarkup = (
    <Modal
      visible={openModalVisible}
      title="Open Filters"
      onCancel={() => setOpenModalVisible(false)}
      footer={[
        <Button key="back" onClick={() => setOpenModalVisible(false)}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            if (validateAndSave(saveInput, saveInput, savedFilters, filters))
              setOpenModalVisible(false);
          }}
        >
          Open
        </Button>,
      ]}
    >
      <OpenModalInnerMarkup savedFilters={savedFilters} />
    </Modal>
  );

  const searchFormHeaderMarkup = (
    <div className="SearchForm--Header">
      <div className="SearchForm--HeaderBlock SearchForm--HeaderCaption">
        <Title className="SearchForm--HeaderTitle " level={3}>
          Search
        </Title>

        <Text className="SearchForm--HeaderSubtitle" type="secondary">
          {isFetchingOverview ? (
            <Skeleton />
          ) : (
            `${overview.total} (${overview.valid} valid) properties available!  `
          )}
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
          <CopyToClipboard
            text={baseSearchURL + serializeURL(filters)}
            onCopy={() => message.success("Successfully copied to clipboard!")}
          >
            <Button type="primary" icon={<CopyOutlined />} size="middle" />
          </CopyToClipboard>
        </Tooltip>
        <Tooltip title="Save filters for yourself." placement="bottom">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            size="middle"
            onClick={() => setSaveModalVisible(true)}
          />
        </Tooltip>
        <Tooltip title="Open saved filters." placement="bottom">
          <Button
            type="primary"
            icon={<FolderOpenOutlined />}
            size="middle"
            onClick={() => setOpenModalVisible(true)}
          />
        </Tooltip>
        {/* <Button
          type="primary"
          icon={<SettingOutlined />}
          size="middle"
          onClick={() => setOpenModalVisible(true)}
        /> */}
      </div>

      {saveFilterModalMarkup}
      {openFilterModalMarkup}
    </div>
  );

  //#endregion

  //#region Dropdowns

  const handleFilterChange = (key, value) => {
    if (key === "id")
      setFilters({
        ...filters,
        idInput: value,
      });
    else if (key === "broker")
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
    else if (key === "points")
      setFilters({
        ...filters,
        pointsRange: value,
      });
    else if (key === "price")
      setFilters({
        ...filters,
        priceRange: value,
      });
    else if (key === "ppp")
      setFilters({
        ...filters,
        pricePerPointRange: value,
      });
    else if (key === "sord")
      setFilters({
        ...filters,
        sord: value,
      });
    else if (key === "sidx")
      setFilters({
        ...filters,
        sidx: value,
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
                onChange={(value) => handleFilterChange(x.id, value)}
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
          <Title level={5}>
            Points [
            <span className="SearchForm--RangeLables">
              {numeral(overview.price[0]).format("0,0[.]00")} {" P - "}
              {numeral(overview.price[1]).format("0,0[.]00")} P
            </span>
            ]
          </Title>
          {isFetchingOverview ? (
            <Skeleton />
          ) : (
            <Slider
              className="SearchForm--Slider"
              range
              defaultValue={[overview.points[1] / 3, overview.points[1] / 1.5]}
              min={overview.points[0]}
              max={overview.points[1]}
              tipFormatter={(value) => {
                return `${value} P`;
              }}
              onChange={(value) => handleFilterChange("points", value)}
            />
          )}
        </div>
      </Col>
      <Col span={24}>
        <div className="SearchForm--SelectContainer">
          <Title level={5}>
            Price [
            <span className="SearchForm--RangeLables">
              {numeral(overview.price[0]).format("0,0[.]00 $")} {" - "}
              {numeral(overview.price[1]).format("0,0[.]00 $")}
            </span>
            ]
          </Title>
          {isFetchingOverview ? (
            <Skeleton />
          ) : (
            <Slider
              className="SearchForm--Slider"
              range
              defaultValue={[overview.price[1] / 3, overview.price[1] / 1.5]}
              min={overview.price[0]}
              max={overview.price[1]}
              tipFormatter={(value) => {
                return `${value} $`;
              }}
              onChange={(value) => handleFilterChange("price", value)}
            />
          )}
        </div>
      </Col>
      <Col span={24}>
        <div className="SearchForm--SelectContainer">
          <Title level={5}>
            Price per Point [
            <span className="SearchForm--RangeLables">
              {numeral(overview.pricePerPoint[0]).format("0,0[.]00 ")} {"P - "}
              {numeral(overview.pricePerPoint[1]).format("0,0[.]00 $")}
            </span>
            ]
          </Title>
          {isFetchingOverview ? (
            <Skeleton />
          ) : (
            <Slider
              className="SearchForm--Slider"
              range
              defaultValue={[
                overview.pricePerPoint[1] / 3,
                overview.pricePerPoint[1] / 1.5,
              ]}
              min={overview.pricePerPoint[0]}
              max={overview.pricePerPoint[1]}
              tipFormatter={(value) => {
                return `${value} P/$`;
              }}
              onChange={(value) => handleFilterChange("ppp", value)}
            />
          )}
        </div>
      </Col>
    </Row>
  );

  //#endregion

  //#region Id Input

  const idSearchFieldMarkup = (
    <div className="SearchForm--SelectContainer">
      <Title level={5}>ID</Title>
      <Input
        placeholder="Input ID"
        size="large"
        onChange={(e) => handleFilterChange("id", e.target.value)}
      />
    </div>
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
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
        <div className="SearchForm--SelectContainer">
          <Title level={5}>Sort By</Title>
          <Select
            defaultValue="broker"
            style={{ width: 120 }}
            onChange={(value) => {
              handleFilterChange("sidx", value);
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
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
        <div className="SearchForm--SelectContainer">
          <Title level={5}>Order</Title>
          <Select
            defaultValue="ASC"
            style={{ width: 120 }}
            onChange={(value) => {
              handleFilterChange("sord", value);
            }}
          >
            <Option value="ASC">Ascending</Option>
            <Option value="DESC">Descending</Option>
          </Select>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={24} xxl={12}>
        <div className="SearchForm--SelectContainer">
          <Title level={5}>Items per page</Title>
          <Select
            defaultValue="10"
            style={{ width: 120 }}
            onChange={(value) => {
              handleFilterChange("ipp", value);
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

  //#region Search Button
  const [submitOnChange, setSubmitOnChange] = useState(false);

  const searchButtonMarkup = (
    <Button
      type="primary"
      icon={<SearchOutlined />}
      size="middle"
      disabled={isAllListings && submitOnChange}
      block
    >
      Search
    </Button>
  );

  //#endregion

  //#region More Options

  const moreOptionsMarkup = (
    <Space
      className="SearchForm--MoreOptions"
      direction="vertical"
      size="middle"
    >
      <div className="SearchForm--Checkbox">
        <Checkbox
          onChange={(e) => {
            console.log(e);
            handleFilterChange("idd", e.target.checked);
          }}
          defaultChecked
        >
          Include defective data
        </Checkbox>
        <p className="SearchForm--OptionComment">
          Includes data that has some information missing or undefined.
        </p>
      </div>
      <div className="SearchForm--Checkbox">
        {!isAllListings ? (
          <Tooltip title="Only available on all listings page!">
            <Checkbox defaultChecked={!isAllListings} disabled={!isAllListings}>
              Submit on change
            </Checkbox>
          </Tooltip>
        ) : (
          <Checkbox
            onChange={(e) => {
              setSubmitOnChange(e.target.checked);
            }}
            defaultChecked={!isAllListings}
            disabled={!isAllListings}
          >
            Submit on change
          </Checkbox>
        )}
        <p className="SearchForm--OptionComment">
          If selected, search will occur every time one of the fields is
          changed.
        </p>
      </div>
      <div>{searchButtonMarkup}</div>
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
            {idSearchFieldMarkup}
            {dropdownsMarkup}
          </Col>
          <Col lg={24} xl={12} xxl={12}>
            {slidersMarkup}
            {outputSettingsMarkup}
            {moreOptionsMarkup}
          </Col>
        </Row>
      </Card>
    </div>
  );
};
