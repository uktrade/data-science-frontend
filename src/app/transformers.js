const { castArray, isFunction, map, toLower, toNumber, startCase } = require('lodash')

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

function sanitizeKeyValuePair (key, value, utility = {}) {
  if (isFunction(utility)) {
    return ((value && value.length) && { [key]: utility(value) })
  } else {
    return ((value && value.length) && { [key]: value })
  }
}

function transformQueryToTurnoverFilter (key, min, max) {
  return (((min && min.length) && (max && max.length)) && { [key]: {
    'min': toNumber(min),
    'max': toNumber(max),
  } })
}

function transformQueryToEvidenceFilter (key, min, max) {
  return (((min && min.length) && (max && max.length)) && { [key]: {
    'min': new Date(min),
    'max': new Date(max),
  } })
}

function tranformQueryToDoubleFilter (key, value) {
  return ((value && value.length) && { [key]: {
    'code_match': ['48000000', '48116000'],
    'keyword_search': 'fabric',
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
  tranformQueryToDoubleFilter,
  transformQueryToEvidenceFilter,
  transformQueryToTurnoverFilter,
  transformStringToOption,
}
