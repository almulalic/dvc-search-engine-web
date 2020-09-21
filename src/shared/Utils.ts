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
