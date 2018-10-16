const { castArray, isFunction, map, toLower, toNumber, startCase, trimStart } = require('lodash')

const config = require('./config')

function selectCheckboxFilter (query, filter) {
  return map(filter, (item) => {
    map(castArray(query), (element) => {
      if (element === item.value) {
        item.checked = true
      }
    })

    return item
  })
}

/**
 * @param key = company_name
 * @param value = req.query['company-name']
 * @param utility = utility function e.g. for transforming string to array,
 */

function sanitizeKeyValuePair (key, value = '', utility = {}) {
  if (isFunction(utility)) {
    return (value.length && { [key]: utility(value) })
  } else {
    return (value.length && { [key]: value })
  }
}

function transformPageToOffset (page) {
  if (page === 1) {
    return 0
  } else {
    return (page * config.paginationOffset) - config.paginationOffset
  }
}

function transformQueryToTurnoverFilter (key, min = '', max = '') {
  return ((min.length && max.length) && { [key]: {
    'min': toNumber(min),
    'max': toNumber(max),
  } })
}

function transformToLowerTrimStart (value) {
  return trimStart(toLower(value))
}

function transformQueryToEvidenceFilter (key, min, max) {
  return (((min && min.length) && (max && max.length)) && { [key]: {
    'min': new Date(min),
    'max': new Date(max),
  } })
}

function transformQueryToDoubleFilter (key, value = '') {
  return (value.length && { [key]: {
    'code_match': value,
  } })
}

function transformStringToOption (string) {
  return {
    value: string,
    text: startCase(toLower(string)),
  }
}

module.exports = {
  selectCheckboxFilter,
  sanitizeKeyValuePair,
  transformPageToOffset,
  transformQueryToDoubleFilter,
  transformQueryToEvidenceFilter,
  transformQueryToTurnoverFilter,
  transformStringToOption,
  transformToLowerTrimStart,
}
