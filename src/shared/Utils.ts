import { URLAlias } from "./Types";
import { useLocation } from "react-router-dom";

export const decodeCamelCase = (label) => {
  let _decodedString;

  _decodedString = label.split(/(?=[A-Z])/).join(" ");

  return _decodedString.charAt(0).toUpperCase() + _decodedString.slice(1);
};

export const serializeURL = (filters) => {
  return Object.entries(filters)
    .map(([key, val]) => `${URLAlias.get(key)}=${val}`)
    .join("&");
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const DefaultFilterState = (overview) => {
  return {
    broker: [],
    resort: [],
    useYear: [],
    status: [],
    pointsRange: [overview.points[0], overview.points[1]],
    priceRange: [overview.price[0], overview.price[1]],
    pricePerPointRange: [overview.pricePerPoint[0], overview.pricePerPoint[1]],
    idInput: "",
    sidx: "Broker",
    sord: "Ascending",
    itemsPerPage: 100000,
    includeDefectiveData: true,
    submitOnChange: true,
    multipleSorterEnabled: false,
    currentPage: 1,
  };
};
