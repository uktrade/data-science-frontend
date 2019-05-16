const dateFns = require('date-fns')
const { some, toUpper, startCase } = require('lodash')

function formatNumberWithCommas (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function formatDate (value, format = 'MMMM YYYY') {
  if (!value) {
    return value
  }
  const parsedDate = dateFns.parse(value)

  if (!dateFns.isValid(parsedDate)) { return value }
  return dateFns.format(parsedDate, format)
}

function formatWithPoundSign (x) {
  if (x > 0) {
    return `\u00A3${formatNumberWithCommas(Math.round(x))}`
  } else {
    return `-\u00A3${formatNumberWithCommas(Math.abs(Math.round((x))))}`
  }
}

function formatAddress (unformattedAddress = '') {
  const postcodeList = unformattedAddress.split(',').map(s => s.trim().match(/([A-Za-z]{1,2}\d{1,2})(\s?(\d?\w{2}))?/)).filter(e => e)
  const postcode = postcodeList[0] ? postcodeList[0][0] : ''
  const address = startCase(unformattedAddress)

  return address.replace(startCase(postcode), toUpper(postcode))
}

/**
 * logs an object in the template to the console on the client.
 * @param  {*} a any type
 * @return {String}   a script tag with a console.log call.
 * @example {{ "hello world" | log }}
 * @example {{ "hello world" | log | safe }}  [for environments with autoescaping turned on]
 */

function log (a) {
  return '<script>console.log(' + JSON.stringify(a, null, '\t') + ');</script>'
}

module.exports = function (env) {
  env.addFilter('formatDate', formatDate)
  env.addFilter('formatNumberWithCommas', formatNumberWithCommas)
  env.addFilter('formatAddress', formatAddress)
  env.addFilter('formatToUpper', require('lodash/toUpper'))
  env.addFilter('formatWithPoundSign', formatWithPoundSign)
  env.addFilter('dateOnly', require('./date-only'))
  env.addFilter('isArray', require('lodash/isArray'))
  env.addFilter('lowerCase', require('lodash/lowerCase'))
  env.addFilter('startCase', require('lodash/startCase'))
  env.addFilter('isString', (obj) => typeof obj === 'string')
  env.addFilter('isSelected', (list) => some(list, { checked: true }))
  env.addFilter('log', log)
}
