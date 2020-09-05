import moment from "moment";

export const calculateTimer = () => {
  var time = new Date();
  var mins = time.getMinutes();
  var diff = mins % 30;
  time.setMinutes(mins - diff);
  time.setSeconds(0);

  return moment(time).add(30, "m").format("YYYY-MM-DD HH:mm:ss");
};
