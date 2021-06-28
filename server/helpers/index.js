const moment = require("moment");

const formatDate = (date) => {
  return moment(date).format("DD MMM YYYY");
};

module.exports = {
  formatDate
}