import React from "react";
import { BrokerTypes, ResortTypes, StatusTypes, UseYearTypes } from "./Types";

export const TableColumns = (setBody) => {
  return [
    {
      title: "Id",
      dataIndex: "id",
      render: (text) => <span style={{ fontWeight: "bold" }}> {text}</span>,
    },
    {
      title: "Broker",
      dataIndex: "broker",
      render: (val) => <span>{BrokerTypes[val]}</span>,
    },
    {
      title: "Resort",
      dataIndex: "resort",
      render: (val) => <span>{ResortTypes[val]}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => (
        <span style={{ display: "flex" }}>
          {text} <span style={{ fontWeight: "bold" }}> $</span>
        </span>
      ),
    },
    {
      title: "Points",
      dataIndex: "points",
      render: (text) => <span>{text} P</span>,
    },
    {
      title: "Price Per Point",
      dataIndex: "pricePerPoint",
      render: (text) => <span>{text} P/$</span>,
      onHeaderCell: (column) => {
        return {
          onClick: () => {
            setBody((prevState) => ({
              ...prevState,
              sort: "Broker",
              order: "ASC",
            }));
          },
        };
      },
    },
    {
      title: "Point Availability",
      dataIndex: "pointAvailability",
      ellipsis: true,
      render: (text) => (
        <span className="AllListings--PointAvailablity">{text}</span>
      ),
    },
    {
      title: "Use Year",
      dataIndex: "useYear",
      render: (val) => <span>{UseYearTypes[val]}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (val) => <span>{StatusTypes[val]}</span>,
    },
  ];
};

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
