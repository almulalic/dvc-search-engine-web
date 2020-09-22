import React, { useEffect, useState } from "react";
import { SearchForm } from "../../components";

import axios from "axios";

import "./AllListingsStyle.scss";
import { Table, Empty, message, PageHeader } from "antd";
import {
  EmptyData,
  TableColumns,
  TableColumnsMultiples,
} from "../../shared/TableUtils";
import { Footer } from "../../components/Footer/Footer";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

export const AllListingsLayout = (props) => {
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
    itemsPerPage: 100000,
    includeDefectiveData: true,
    submitOnChange: false,
    multipleSorterEnabled: false,
    currentPage: 1,
  });

  const [listingsData, setListingsData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true);

  const [isFirstRender, setIsFirstRender] = useState(true);

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

  const [isBodyUpdating, setIsBodyUpdating] = useState(true);

  const parseURLParams = async () => {
    if (Object.keys(props.location.search).length !== 0) {
      const searchBody = queryString.parse(props.location.search);

      if (Object.keys(searchBody).length !== Object.keys(body).length) {
        setIsBodyUpdating(false);
        setIsFetchingData(true);
        fetchListings(body);
        return;
      }

      if (searchBody) {
        const points = searchBody.pointsRange.toString().split(",");
        const price = searchBody.priceRange.toString().split(",");
        const ppp = searchBody.pricePerPointRange.toString().split(",");
        console.log(searchBody.broker.toString() != "");
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
          pointsRange: [
            points[0] ? Number(points[0]) : null,
            points[1] ? Number(points[1]) : null,
          ],
          priceRange: [
            price[0] ? Number(price[0]) : null,
            price[1] ? Number(price[1]) : null,
          ],
          pricePerPointRange: [
            ppp[0] ? Number(ppp[0]) : null,
            ppp[1] ? Number(ppp[1]) : null,
          ],
          idInput: searchBody.idInput.toString(),
          sidx: searchBody.sidx.toString(),
          sord: searchBody.sord.toString(),
          itemsPerPage: 100000,
          includeDefectiveData: Boolean(searchBody.includeDefectiveData),
          submitOnChange: Boolean(searchBody.submitOnChange),
          multipleSorterEnabled: Boolean(searchBody.multipleSorterEnabled),
          currentPage: 1,
        };

        setIsBodyUpdating(false);
        setBody(parsedValues);
      }
    } else {
      setIsBodyUpdating(false);
      setIsFetchingData(false);
      setIsFetchingData(true);
      fetchListings(body);
    }
    setIsFirstRender(false);
  };

  useEffect(() => {
    setIsBodyUpdating(true);
    parseURLParams();
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      setIsFetchingData(true);
      fetchListings(body);
    } else {
      setIsBodyUpdating(false);
    }
  }, [body]);

  const noUrlMessage = () => {
    message.info(
      "Unfortunatley, there is no URL link available for this property."
    );
  };

  const history = useHistory();

  return (
    <div className="AllListings">
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => history.push("/landing")}
          title="All Listtings"
        />
      </div>
      <div className="AllListings--SearchForm" style={{ paddingTop: "5rem" }}>
        {isBodyUpdating ? (
          <div>load</div>
        ) : (
          <SearchForm externalFilters={body} setExternalFilters={setBody} />
        )}
      </div>
      <div className="AllListings--Table">
        <div className="AllListings--TableListingText">
          Showing: {listingsData.length} listings.
        </div>
        <Table
          scroll={{ x: 200, y: 600 }}
          bordered
          showHeader
          dataSource={isFetchingData ? emptyData : listingsData}
          pagination={{ position: ["bottomCenter"] }}
          columns={
            body.multipleSorterEnabled ? TableColumnsMultiples : TableColumns
          }
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
      <Footer />
    </div>
  );
};
