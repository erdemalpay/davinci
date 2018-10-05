const moment = require('moment');

const getStartEndofDateString = (dateString) => {
  const startDate = moment(dateString, 'YYYY-MM-DD').toDate();
  startDate.setHours(0, 0, 0, 0);

  const endDate = moment(dateString, 'YYYY-MM-DD').toDate();
  endDate.setHours(23, 59, 59, 999);
  return {
    startDate, 
    endDate,
  };
};

module.exports = {
  getStartEndofDateString,
};

