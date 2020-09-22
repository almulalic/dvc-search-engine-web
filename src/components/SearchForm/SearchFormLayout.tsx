import React, { useState, useEffect, useCallback } from "react";
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
import { decodeCamelCase, serializeURL, useQuery } from "../../shared/Utils";
import { BrokerTypes } from "./../../shared/Types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { OpenModalInnerMarkup } from "./SaveModalInnerMarkup/OpenModalInnerMarkup";
import axios from "axios";
import { useHistory } from "react-router-dom";

const { Countdown } = Statistic;
const { Text, Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const cookies = new Cookies();

export const SearchFormLayout = ({ externalFilters, setExternalFilters }) => {
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
      .get(process.env.BASE_API_URL + "/search/overview")
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

  const [filters, setFilters] = useState(externalFilters);

  useEffect(() => {
    if (isAllListings && filters.submitOnChange) setExternalFilters(filters);
  }, [filters]);

  const searchWithFilters = (filters) => {
    setExternalFilters(filters);
  };

  //#region Counter

  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    setDeadline(calculateTimer());
  }, []);

  //#endregion

  //#region Header

  //#region Save

  const [saveInput, setSaveInput] = useState("");
  const [savedFilters, setSavedFilters] = useState([]);
  const [saveModalVisible, setSaveModalVisible] = useState(false);

  useEffect(() => {
    let rawFilters = localStorage.getItem("filters");

    if (rawFilters !== null) setSavedFilters(JSON.parse(rawFilters));
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

  //#endregion

  //#region Open

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
      ]}
    >
      <OpenModalInnerMarkup
        savedFilters={savedFilters}
        setOpenModalVisible={setOpenModalVisible}
      />
    </Modal>
  );

  //#endregion

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
            text={
              process.env.BASE_SEARCH_URL + "?" + new URLSearchParams(filters)
            }
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
        <Tooltip
          title={
            localStorage.getItem("filters") === null
              ? "No saved available."
              : "Open saved filters."
          }
          placement="bottom"
        >
          <Button
            type="primary"
            icon={<FolderOpenOutlined />}
            size="middle"
            disabled={localStorage.getItem("filters") === null}
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
    else if (key === "soc")
      setFilters({
        ...filters,
        submitOnChange: value,
      });
    else if (key === "mcse")
      setFilters({
        ...filters,
        multipleSorterEnabled: value,
      });
  };

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
                defaultValue={externalFilters[x.id]}
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
              defaultValue={
                externalFilters.pointsRange[0] === null &&
                externalFilters.pointsRange[1] === null
                  ? [overview.points[0], overview.points[1]]
                  : externalFilters.pointsRange
              }
              min={overview.points[0]}
              max={overview.points[1]}
              tipFormatter={(value) => {
                return `${value} P`;
              }}
              onAfterChange={(value) => handleFilterChange("points", value)}
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
              defaultValue={
                externalFilters.priceRange[0] === null &&
                externalFilters.priceRange[1] === null
                  ? [overview.price[0], overview.price[1]]
                  : externalFilters.priceRange
              }
              min={overview.price[0]}
              max={overview.price[1]}
              tipFormatter={(value) => {
                return `${value} $`;
              }}
              onAfterChange={(value) => handleFilterChange("price", value)}
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
              defaultValue={
                externalFilters.pricePerPointRange[0] === null &&
                externalFilters.pricePerPointRange[1] === null
                  ? [overview.pricePerPoint[0], overview.pricePerPoint[1]]
                  : externalFilters.pricePerPointRange
              }
              min={overview.pricePerPoint[0]}
              max={overview.pricePerPoint[1]}
              tipFormatter={(value) => {
                return `${value} P/$`;
              }}
              onAfterChange={(value) => handleFilterChange("ppp", value)}
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
        defaultValue={externalFilters.idInput}
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
            style={{ width: 120 }}
            onChange={(value) => {
              handleFilterChange("sidx", value);
            }}
            defaultValue={externalFilters.sidx}
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
            style={{ width: 120 }}
            defaultValue={externalFilters.sord}
            onChange={(value) => {
              handleFilterChange("sord", value);
            }}
          >
            <Option value="ASC">Ascending</Option>
            <Option value="DESC">Descending</Option>
          </Select>
        </div>
      </Col>
      {/* <Col xs={24} sm={24} md={12} lg={12} xl={24} xxl={12}>
        <div className="SearchForm--SelectContainer">
          <Title level={5}>Items per page</Title>
          <Select
            style={{ width: 120 }}
            defaultValue={externalFilters.itemsPerPage}
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
      </Col> */}
    </Row>
  );

  //#endregion

  //#region Search Button

  const handleUrlSearch = (fil) => {
    window.location.href =
      process.env.BASE_SEARCH_URL + "?" + new URLSearchParams(fil);
  };

  const searchButtonMarkup = (
    <Button
      type="primary"
      icon={<SearchOutlined />}
      size="middle"
      disabled={isAllListings && filters.submitOnChange}
      onClick={() =>
        isAllListings ? searchWithFilters(filters) : handleUrlSearch(filters)
      }
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
            handleFilterChange("idd", e.target.checked);
          }}
          defaultChecked={externalFilters.includeDefectiveData}
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
              handleFilterChange("soc", e.target.checked);
            }}
            defaultChecked={true}
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

      <div className="SearchForm--Checkbox">
        {!isAllListings ? (
          <Tooltip title="Only available on all listings page!">
            <Checkbox defaultChecked={false} disabled={!isAllListings}>
              Multiple Column Sorter
            </Checkbox>
          </Tooltip>
        ) : (
          <Checkbox
            onChange={(e) => {
              handleFilterChange("mcse", e.target.checked);
            }}
            defaultChecked={false}
            disabled={!isAllListings}
          >
            Multiple Column Sorter
          </Checkbox>
        )}
        <p className="SearchForm--OptionComment">
          If selected, column sort will persist and combine with next selected
          sort/s.
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
        <Row gutter={24} justify="center" align="top">
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
