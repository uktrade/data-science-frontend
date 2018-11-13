const dateFns = require('date-fns');

function formatNumberWithCommas (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatDate (value, format = 'MMMM YYYY') {
  if (!value) {
    return value;
  }
  const parsedDate = dateFns.parse(value);

  if (!dateFns.isValid(parsedDate)) { return value; }
  return dateFns.format(parsedDate, format);
}

module.exports = function (env) {
  env.addFilter('formatDate', formatDate);
  env.addFilter('formatNumberWithCommas', formatNumberWithCommas);
  env.addFilter('dateOnly', require('./date-only'));
  env.addFilter('isArray', require('lodash/isArray'));
  env.addFilter('lowerCase', require('lodash/lowerCase'));
  env.addFilter('startCase', require('lodash/startCase'));
  env.addFilter('isString', (obj) => typeof obj === 'string');
};
