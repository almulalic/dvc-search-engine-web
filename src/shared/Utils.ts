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
