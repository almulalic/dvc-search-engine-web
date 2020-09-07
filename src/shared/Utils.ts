export const decodeCamelCase = (label) => {
  let _decodedString;

  _decodedString = label.split(/(?=[A-Z])/).join(" ");

  return _decodedString.charAt(0).toUpperCase() + _decodedString.slice(1);
};
