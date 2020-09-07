import moment from "moment";
import { message } from "antd";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const calculateTimer = () => {
  var time = new Date();
  var mins = time.getMinutes();
  var diff = mins % 30;
  time.setMinutes(mins - diff);
  time.setSeconds(0);

  return moment(time).add(30, "m").format("YYYY-MM-DD HH:mm:ss");
};

export const validateAndSave = (value, saveInput, _savedFilters, _filters) => {
  if (value.length <= 0 || value.length >= 11) {
    message.error("Save name must be between 1 and 10 charachters long!");
    return false;
  }

  let flag = false;
  _savedFilters &&
    _savedFilters.forEach((save) => {
      if (save.name === saveInput) {
        message.error(
          "'" + saveInput + "' is already in use. Please input unique name!"
        );
        flag = true;
        return false;
      }
    });

  if (flag) return false;

  _savedFilters.push({ name: saveInput, filters: _filters });

  cookies.set("filters", JSON.stringify(_savedFilters));
  message.success(
    "You have successfully saved " + saveInput + " filter layout!"
  );

  return true;
};
