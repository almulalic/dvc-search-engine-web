import { Tag } from "antd";
import React from "react";
import { BrokerTypes, ResortTypes, StatusTypes, UseYearTypes } from "./Types";

const getStatusColor = (status) => {
  if (status === undefined || status === null) return "status-nostatus";
  else if (status.toLowerCase().includes("expires")) return "status-expieres";
  else if (status.toLowerCase().includes("extended")) return "status-extended";
  else
    return "status-" + status.toLowerCase().replace(" ", "").replace(" ", "");
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
    title: "Id",
    align: "center" as AlignType,
    dataIndex: "id",
    render: (text, column) => {
      return (
        <a style={{ fontWeight: "bold" }} target="_blank" href={column.href}>
          {text}
        </a>
      );
    },
  },
  {
    id: 1,
    title: "Broker",
    dataIndex: "broker",
    render: (val) => <span>{BrokerTypes[val]}</span>,
    sorter: {
      compare: (a, b) => a.broker - b.broker,
      multiple: 1,
    },
  },
  {
    id: 2,
    title: "Resort",
    dataIndex: "resort",
    render: (val) => <span>{ResortTypes[val]}</span>,
    sorter: {
      compare: (a, b) => a.resort - b.resort,
      multiple: 1,
    },
  },
  {
    id: 3,
    title: "Price",
    dataIndex: "price",
    render: (text) => (
      <span style={{ display: "flex" }}>
        {text} <span style={{ fontWeight: "bold" }}>$</span>
      </span>
    ),
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 1,
    },
  },
  {
    id: 4,
    title: "Points",
    dataIndex: "points",
    render: (text) => <span>{text} P</span>,
    sorter: {
      compare: (a, b) => a.points - b.points,
      multiple: 1,
    },
  },
  {
    id: 5,
    title: "Price Per Point",
    dataIndex: "pricePerPoint",
    render: (text) => <span>{text} P/$</span>,
    sorter: {
      compare: (a, b) => a.pricePerPoint - b.pricePerPoint,
      multiple: 1,
    },
  },
  {
    id: 6,
    title: "Point Availability",
    dataIndex: "pointAvailability",
    ellipsis: true,
    render: (text) => (
      <span className="AllListings--PointAvailablity">{text}</span>
    ),
  },
  {
    id: 7,
    title: "Use Year",
    dataIndex: "useYear",
    render: (val) => <span>{UseYearTypes[val]}</span>,
    sorter: {
      compare: (a, b) => a.useYear - b.useYear,
      multiple: 1,
    },
  },
  {
    id: 8,
    title: "Status",
    dataIndex: "status",
    render: (val) => <Tag color={StatusColors[val]}>{StatusTypes[val]}</Tag>,
    sorter: {
      compare: (a, b) => a.status - b.status,
      multiple: 1,
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
