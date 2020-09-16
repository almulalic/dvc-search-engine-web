import React, { useEffect, useState } from "react";
import { SearchForm } from "../../components";

import axios from "axios";

import "./AllListingsStyle.scss";
import { baseAuthURL } from "../../shared/Shared";
import { Table, Empty } from "antd";
import { TableColumns, EmptyData } from "../../shared/TableUtils";

export const AllListingsLayout = () => {
  const [emptyData, setEmptyData] = useState([]);

  const [body, setBody] = useState({
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
    itemsPerPage: 5,
    includeDefectiveData: false,
    submitOnChange: false,
    currentPage: 1,
  });

  const [listingsData, setListingsData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true);

  const fetchListings = (body) => {
    axios
      .post(baseAuthURL + "/search/FilterData", body)
      .then((res) => {
        let adaptedData = [];

        res.data.records.forEach((record, i) => {
          adaptedData.push({
            id: record.id,
            resort: record.resort,
            price: record.price,
            points: record.points,
            pricePerPoint: record.priceperpoint,
            pointAvailability: record.pointavailability,
            useYear: record.useyear,
            status: record.status,
            href: record.href,
            broker: record.broker,
          });
        });

        setListingsData(adaptedData);

        setIsFetchingData(false);
      })
      .catch((err) => {
        console.log(err);
        setIsFetchingData(false);
      });
  };

  useEffect(() => {
    setIsFetchingData(true);
    fetchListings(body);
    setEmptyData(EmptyData(body.itemsPerPage));
  }, [body]);

  return (
    <div className="AllListings">
      <div className="AllListings--SearchForm">
        <SearchForm setBody={setBody} />
      </div>
      <div className="AllListings--Table">
        <Table
          bordered
          showHeader
          dataSource={isFetchingData ? emptyData : listingsData}
          pagination={{ position: ["bottomCenter"] }}
          columns={TableColumns}
          loading={isFetchingData}
        />
      </div>
    </div>
  );
};
