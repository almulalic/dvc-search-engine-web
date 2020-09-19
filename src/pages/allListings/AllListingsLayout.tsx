import React, { useEffect, useState } from "react";
import { SearchForm } from "../../components";

import axios from "axios";

import "./AllListingsStyle.scss";
import { baseAuthURL } from "../../shared/Shared";
import { Table, Empty, message } from "antd";
import { EmptyData, TableColumns } from "../../shared/TableUtils";

export const AllListingsLayout = () => {
  const [emptyData, setEmptyData] = useState([]);

  const [body, setBody] = useState({
    broker: [],
    resort: [],
    useYear: [],
    status: [],
    pointsRange: [null, null],
    priceRange: [null, null],
    pricePerPointRange: [null, null],
    idInput: "",
    sidx: "Broker",
    sord: "Ascending",
    itemsPerPage: 10,
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
            pricePerPoint: record.pricePerPoint,
            pointAvailability: record.pointAvailability,
            useYear: record.useYear,
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
  }, [body]);

  const noUrlMessage = () => {
    message.info(
      "Unfortunatley, there is no URL link available for this property."
    );
  };

  return (
    <div className="AllListings">
      <div className="AllListings--SearchForm">
        <SearchForm setExternalFilters={setBody} />
      </div>
      <div className="AllListings--Table">
        <Table
          bordered
          showHeader
          dataSource={isFetchingData ? emptyData : listingsData}
          pagination={{ position: ["bottomCenter"] }}
          columns={TableColumns}
          loading={isFetchingData}
          className="AllListings--Table"
          rowClassName="AllListings--Table-Row"
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                return record.href
                  ? window.open(record.href, "_blank")
                  : noUrlMessage();
              },
            };
          }}
        />
      </div>
    </div>
  );
};
