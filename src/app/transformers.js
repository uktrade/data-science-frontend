const { castArray, isFunction, map, toLower, toNumber, trimStart } = require('lodash')
const moment = require('moment')
const config = require('../../config')

function selectCheckboxFilter (query, filter) {
  const data = map(filter, (item) => {
    map(castArray(query), (element) => {
      if (element === item.value) {
        item.checked = true
      }
    })
    return item
  })
  return data
}

/**
 * @param key = company_name
 * @param value = req.query['company-name']
 * @param utility = utility function e.g. for transforming string to array,
 */

function sanitizeKeyValuePair (key, value = '', utility = {}) {
  if (isFunction(utility)) {
    const transformedValue = utility(value)
    return (value.length && transformedValue.length && { [key]: utility(value) })
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
  return ((min.length || max.length) && {
    [key]: {
      'min': getNumber(min),
      'max': getNumber(max),
    },
  })
}

function transformToLowerTrimStart (value) {
  return trimStart(toLower(value))
}

function formatMonthString (date) {
  if (date < 10) {
    return `0${date}`
  } else {
    return date
  }
}

function transformQueryToEvidenceFilter (key, min = '', max = '') {
  const inputMin = min
  const inputMax = max

  if (!min.length) {
    min = '1970-01' // epoch time
  }

  if (!max.length) {
    const date = new Date()
    max = `${date.getFullYear()}-${formatMonthString(date.getMonth() + 1)}`
  }

  return ((inputMin.length || inputMax.length) && {
    [key]: {
      'min': getCappedDate(min, 'startDate'),
      'max': getCappedDate(max, 'endDate'),
    },
  })
}

function getCappedDate (element, cap) {
  if (element.length) {
    return element
  } else if (cap === 'startDate') {
    return new Date(0)
  } else if (cap === 'endDate') {
    return new Date()
  }
}

/**
 * value = last_export_evidence:desc
 */
function getSortValues (value = '') {
  const list = value.split(/:| /)

  return {
    field: list[0],
    ascending: list[1] === 'asc',
  }
}

function getNumber (element) {
  if (element.length) {
    return toNumber(element)
  }
}

function transformQueryToDoubleFilter (key, value = '') {
  return (value.length && {
    [key]: {
      'code_match': value,
    },
  })
}

function transformQueryToSortFilter (value = '') {
  const values = getSortValues(value) || value
  const field = values.field || 'export_propensity'
  const ascending = values.ascending || false

  return {
    field,
    ascending,
  }
}

function transformStringToOption (string) {
  return {
    value: string,
    text: string,
  }
}

/**
 * transformPostcodeFilter
 * Will split string on commas to an array, trim whitespace off each resulting
 * element, and finally filter out any empty string elements.
 */

function transformPostcodeFilter (string) {
  const arr = string.split(',')
  const normalized = arr.map(s => s.replace(/\s/g, '').toUpperCase())
  const emptyRemoved = normalized.filter(s => s)
  return [...new Set(emptyRemoved)]
}

/**
 * prepareCompany
 * prepares a company as returned from the dt07 backend, for use
 * in the nunjucks template frontend.
 * Transformations applied:
 *  1. If company.time_since_remove_recorded is present and valid,
 *      a) this is formated to DD/MM/YYYY and saved to company.dissolved_date
 *      b) the number of days until the company will dissappear is calculated
 *         and saved to company.days_to_deletion.
 *     OTOH if company.time_since_remove_recorded is not valid,
 *     it is set to null.
 */

function prepareCompany (company) {
  if (company.time_since_remove_recorded) {
    const dt = moment(company.time_since_remove_recorded)
    if (dt.isValid()) {
      company.dissolved_date = dt.format('DD/MM/YYYY')
      company.days_to_deletion = config.daysUntilDissolvedCompaniesDeleted - (
        moment().startOf('day').diff(dt.startOf('day'), 'days'))
    } else {
      company.time_since_remove_recorded = null
    }
  }
  return company
}

module.exports = {
  prepareCompany,
  selectCheckboxFilter,
  sanitizeKeyValuePair,
  transformPageToOffset,
  transformQueryToDoubleFilter,
  transformQueryToEvidenceFilter,
  transformQueryToSortFilter,
  transformQueryToTurnoverFilter,
  transformStringToOption,
  transformPostcodeFilter,
  transformToLowerTrimStart,
}
