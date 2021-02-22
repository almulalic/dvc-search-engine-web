import { Tag, Typography } from "antd";
import React from "react";
import { BrokerTypes, ResortTypes, StatusTypes, UseYearTypes } from "./Types";
import numeral from "numeral";
const { Title } = Typography;

const getStatusColor = (status) => {
  if (status === undefined || status === null) return "status-nostatus";
  else if (status.toLowerCase().includes("expires")) return "status-expieres";
  else if (status.toLowerCase().includes("extended")) return "status-extended";
  else return "status-" + status.toLowerCase().replace(" ", "").replace(" ", "");
};

export const StatusColors = {
  0: "gray",
  1: "blue",
  2: "lime",
  3: "green",
  4: "gold",
  5: "red",
  6: "volcano",
  7: "magenta",
  8: "blue",
  9: "cyan",
  10: "geekblue",
  11: "#ff00aa",
};

export type AlignType = "left" | "center" | "right";

export const TableColumns = [
  {
    id: 0,
    title: <span className="TableHeader">ID</span>,
    align: "center" as AlignType,
    dataIndex: "id",
    width: 125,
    render: (val, column) => {
      return (
        <a style={{ fontWeight: "bold" }} target="_blank" href={column.href}>
          {val == null || val == undefined || val == NaN ? "Not avaiable" : val}
        </a>
      );
    },
    sorter: (a, b) => ("" + a.id).localeCompare(b.id),
  },
  {
    id: 1,
    title: <span className="TableHeader">BROKER</span>,
    dataIndex: "broker",
    align: "center" as AlignType,
    width: 200,
    render: (val) => (
      <Title level={5}>
        {val == null || val == undefined || val == NaN ? "Not avaiable" : BrokerTypes[val]}
      </Title>
    ),
    sorter: (a, b) => a.broker - b.broker,
  },
  {
    id: 2,
    title: <span className="TableHeader">RESORT</span>,
    dataIndex: "resort",
    align: "center" as AlignType,
    width: 200,
    render: (val) => (
      <Title level={5}>
        {val == null || val == undefined || val == NaN ? "Not avaiable" : ResortTypes[val]}
      </Title>
    ),
    sorter: (a, b) => a.resort - b.resort,
  },
  {
    id: 3,
    title: <span className="TableHeader">PRICE</span>,
    dataIndex: "price",
    align: "center" as AlignType,
    render: (val) => (
      <Title level={5}>
        {val == null || val == undefined || val == NaN ? "Not avaiable" : numeral(val).format("0,0[.]00 $")}
      </Title>
    ),
    sorter: (a, b) => a.price - b.price,
  },
  {
    id: 4,
    title: <span className="TableHeader">POINTS</span>,
    dataIndex: "points",
    align: "center" as AlignType,
    render: (val) => (
      <Title level={5}>
        {val == null || val == undefined || val == NaN
          ? "Not avaiable"
          : `${numeral(val).format("0,0[.]00")} P`}
      </Title>
    ),
    sorter: (a, b) => a.points - b.points,
  },
  {
    id: 5,
    title: <span className="TableHeader">PRICE PER POINT</span>,
    dataIndex: "pricePerPoint",
    width: 175,
    align: "center" as AlignType,
    render: (val) => (
      <Title level={5}>
        {val == null || val == undefined || val == NaN
          ? "Not avaiable"
          : `${numeral(val).format("0,0[.]00")} P/$`}
      </Title>
    ),
    sorter: (a, b) => a.pricePerPoint - b.pricePerPoint,
  },
  {
    id: 6,
    title: <span className="TableHeader">POINT AVAILABLITY</span>,
    dataIndex: "pointAvailability",
    ellipsis: true,
    width: 200,
    align: "center" as AlignType,
    render: (val) => (
      <Title level={5} ellipsis>
        {val == null || val == undefined || val == NaN ? "Not avaiable" : val}
      </Title>
    ),
  },
  {
    id: 7,
    title: <span className="TableHeader">USE YEAR</span>,
    dataIndex: "useYear",
    width: 125,
    align: "center" as AlignType,
    render: (val) => (
      <Title level={5}>
        {val == null || val == undefined || val == NaN ? "Not avaiable" : UseYearTypes[val]}
      </Title>
    ),
    sorter: (a, b) => a.useYear - b.useYear,
  },
  {
    id: 8,
    title: <span className="TableHeader">STATUS</span>,
    dataIndex: "status",
    align: "center" as AlignType,
    render: (val) => (
      <Tag color={StatusColors[val]}>
        {val == null || val == undefined || val == NaN ? "Not avaiable" : StatusTypes[val].toUpperCase()}
      </Tag>
    ),
    sorter: (a, b) => a.status - b.status,
  },
];

export const TableColumnsMultiples = [
  {
    id: 0,
    title: <span className="TableHeader">ID</span>,
    align: "center" as AlignType,
    dataIndex: "id",
    render: (text, column) => {
      return (
        <a style={{ fontWeight: "bold" }} target="_blank" href={column.href}>
          {text}
        </a>
      );
    },
    sorter: {
      compare: (a, b) => ("" + a.id).localeCompare(b.id),
      multiple: 0,
    },
  },
  {
    id: 1,
    title: <span className="TableHeader">BROKER</span>,
    dataIndex: "broker",
    align: "center" as AlignType,
    width: 200,
    render: (val) => <Title level={5}>{BrokerTypes[val]}</Title>,
    sorter: {
      compare: (a, b) => a.broker - b.broker,
      multiple: 0,
    },
  },
  {
    id: 2,
    title: <span className="TableHeader">RESORT</span>,
    dataIndex: "resort",
    align: "center" as AlignType,
    width: 200,
    render: (val) => <Title level={5}>{ResortTypes[val]}</Title>,
    sorter: {
      compare: (a, b) => a.resort - b.resort,
      multiple: 0,
    },
  },
  {
    id: 3,
    title: <span className="TableHeader">PRICE</span>,
    dataIndex: "price",
    align: "center" as AlignType,

    render: (text) => <Title level={5}>{text} $</Title>,
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 0,
    },
  },
  {
    id: 4,
    title: <span className="TableHeader">POINTS</span>,
    dataIndex: "points",
    align: "center" as AlignType,
    width: 100,
    render: (text) => <Title level={5}>{text} P</Title>,
    sorter: {
      compare: (a, b) => a.points - b.points,
      multiple: 0,
    },
  },
  {
    id: 5,
    title: <span className="TableHeader">PRICE PER POINT</span>,
    dataIndex: "pricePerPoint",
    width: 175,
    align: "center" as AlignType,
    render: (text) => <Title level={5}>{text} P/$</Title>,
    sorter: {
      compare: (a, b) => a.pricePerPoint - b.pricePerPoint,
      multiple: 0,
    },
  },
  {
    id: 6,
    title: <span className="TableHeader">POINT AVAILABLITY</span>,
    dataIndex: "pointAvailability",
    ellipsis: true,
    width: 200,
    align: "center" as AlignType,
    render: (text) => (
      <Title level={5} ellipsis>
        {text}
      </Title>
    ),
    sorter: {
      compare: (a, b) => ("" + a.id).localeCompare(b.id),
      multiple: 0,
    },
  },
  {
    id: 7,
    title: <span className="TableHeader">USE YEAR</span>,
    dataIndex: "useYear",
    width: 125,
    align: "center" as AlignType,
    render: (val) => <Title level={5}>{UseYearTypes[val]}</Title>,

    sorter: {
      compare: (a, b) => a.useYear - b.useYear,
      multiple: 0,
    },
  },
  {
    id: 8,
    title: <span className="TableHeader">STATUS</span>,
    dataIndex: "status",
    align: "center" as AlignType,
    width: 100,
    render: (val) => <Tag color={StatusColors[val]}>{StatusTypes[val].toUpperCase()}</Tag>,
    sorter: {
      compare: (a, b) => a.status - b.status,
      multiple: 0,
    },
  },
];

export const EmptyData = (rows) => {
  let temp = [];
  for (let i = 0; i < rows; ++i) {
    temp.push({
      broker: "-",
      href: "-",
      id: "-",
      pointAvailability: "-",
      points: "-",
      price: "-",
      pricePerPoint: "-",
      resort: "-",
      status: "-",
      useYear: "-",
    });
  }

  return temp;
};
