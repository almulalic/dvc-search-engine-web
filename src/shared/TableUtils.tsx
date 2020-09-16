import React from "react";

export const TableColumns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Broker",
    dataIndex: "broker",
  },
  {
    title: "Resort",
    dataIndex: "resort",
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (text) => (
      <span style={{ display: "flex" }}>
        {text} <span style={{ fontWeight: "bold" }}>$</span>
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
  },
  {
    title: "Point Availability",
    dataIndex: "pointAvailability",
  },
  {
    title: "Use Year",
    dataIndex: "useYear",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Href",
    dataIndex: "href",
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
