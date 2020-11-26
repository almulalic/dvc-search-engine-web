import React, { useEffect, useState } from "react";
import { SearchForm } from "../../components";

import axios from "axios";

import "./AllListingsStyle.scss";
import { Table, Empty, message, PageHeader, Card, Skeleton } from "antd";
import { EmptyData, TableColumns, TableColumnsMultiples } from "../../shared/TableUtils";
import { Footer } from "../../components/Footer/Footer";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { DefaultFilterState } from "../../shared/Utils";

export const AllListingsLayout = (props) => {
  const [emptyData, setEmptyData] = useState([]);

  const defaultState = DefaultFilterState({
    price: [null, null],
    points: [null, null],
    pricePerPoint: [null, null],
  });

  const parseBody = () => {
    if (Object.keys(props.location.search).length !== 0) {
      const searchBody = queryString.parse(props.location.search);

      if (Object.keys(searchBody).length !== Object.keys(defaultState).length) return defaultState;

      if (searchBody) {
        const points = searchBody.pointsRange.toString().split(",");
        const price = searchBody.priceRange.toString().split(",");
        const ppp = searchBody.pricePerPointRange.toString().split(",");

        let parsedValues = {
          broker:
            searchBody.broker.toString() == ""
              ? []
              : searchBody.broker
                  .toString()
                  .split(",")
                  .map((x) => Number(x)),
          resort:
            searchBody.resort.toString() == ""
              ? []
              : searchBody.resort
                  .toString()
                  .split(",")
                  .map((x) => Number(x)),
          useYear:
            searchBody.useYear.toString() == ""
              ? []
              : searchBody.useYear
                  .toString()
                  .split(",")
                  .map((x) => Number(x)),
          status:
            searchBody.status.toString() == ""
              ? []
              : searchBody.status
                  .toString()
                  .split(",")
                  .map((x) => Number(x)),
          pointsRange: [points[0] ? Number(points[0]) : null, points[1] ? Number(points[1]) : null],
          priceRange: [price[0] ? Number(price[0]) : null, price[1] ? Number(price[1]) : null],
          pricePerPointRange: [ppp[0] ? Number(ppp[0]) : null, ppp[1] ? Number(ppp[1]) : null],
          idInput: searchBody.idInput.toString(),
          sidx: searchBody.sidx.toString(),
          sord: searchBody.sord.toString(),
          itemsPerPage: 100000,
          includeDefectiveData: searchBody.includeDefectiveData === "true",
          submitOnChange: searchBody.submitOnChange === "true",
          multipleSorterEnabled: searchBody.multipleSorterEnabled === "true",
          currentPage: 1,
        };

        return parsedValues;
      } else return defaultState;
    } else return defaultState;
  };

  const [body, setBody] = useState(parseBody());

  const [listingsData, setListingsData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true);

  const fetchListings = (body) => {
    axios
      .post(process.env.REACT_APP_BASE_API_URL + "/search/FilterData", body)
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
    message.info("Unfortunatley, there is no URL link available for this property.");
  };

  return (
    <div className="AllListings">
      <div className="AllListings--SearchForm" style={{ paddingTop: "5rem" }}>
        <SearchForm externalFilters={body} setExternalFilters={setBody} />
      </div>
      <div className="AllListings--Table">
        <div className="AllListings--TableListingText">Showing: {listingsData.length} listings</div>
        <Table
          scroll={{ x: 200, y: 600 }}
          bordered
          showHeader
          dataSource={isFetchingData ? emptyData : listingsData}
          pagination={{ position: ["bottomCenter"] }}
          columns={body?.multipleSorterEnabled ? TableColumnsMultiples : TableColumns}
          loading={isFetchingData}
          className="AllListings--Table"
          rowClassName="AllListings--Table-Row"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                return record.href ? window.open(record.href, "_blank") : noUrlMessage();
              },
            };
          }}
        />
      </div>
      <Footer />
    </div>
  );
};
