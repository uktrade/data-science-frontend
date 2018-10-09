const { isEmpty, map, castArray } = require('lodash')

const config = require('../config')
const backendService = require('../lib/backend-service')
const getCacheTime = require('../lib/get-cache-time')
const logger = require('../lib/logger')

const {
  selectCheckboxFilter,
  sanitizeKeyValuePair,
  tranformQueryToDoubleFilter,
  transformQueryToTurnoverFilter,
  transformStringToOption,
} = require('../transformers')
const { buildPagination } = require('../lib/pagination')

async function buildFilters (req, res, next) {
  res.locals.query = {
    filters: {
      ...sanitizeKeyValuePair('company_name', req.query['company-name']),
      ...sanitizeKeyValuePair('export_propensity', req.query['export-potential']),
      ...transformQueryToTurnoverFilter('turnover', req.query['turnover-minimum'], req.query['turnover-maximum']),
      // ...tranformQueryToDoubleFilter('export_codes', req.query['commodity-code']),
      ...sanitizeKeyValuePair('region', req.query['uk-regions'], castArray),
      ...sanitizeKeyValuePair('market_of_interest', req.query['market-of-interest'], castArray),
      ...sanitizeKeyValuePair('service_usage', req.query['service-used'], castArray),
      ...sanitizeKeyValuePair('market_exported', req.query['market-exported-to'], castArray),
    },
  }

  next()
}

async function dataByType (req, res) {
  const data = await backendService.getDataByType(req.params.type)

  if (!config.isDev) {
    const cacheTime = getCacheTime()

    res.setHeader('Cache-Control', 'public, max-age=' + cacheTime.seconds)
    res.setHeader('Expires', cacheTime.utc)
  }

  res.json(data.body)
}

async function getData (req, res, query = {}) {
  try {
    const page = req.query.page || 0
    const offset = page === 0 ? page : page * 20
    const query = isEmpty(res.locals.query.filters) ? {} : res.locals.query
    // TODO(jf): store the default offset and limit vals

    return await backendService.searchForCompanies(offset, 20, query)
  } catch (err) {
    logger.error(err)
  }
}

async function internalCompanyIdEvents (req, res) {
  const data = await backendService.getEventsByInternalCompanyId(req.params.id)

  res.json(data.body)
}

async function renderIndex (req, res) {
  const marketOfInterestList = await backendService.getDataByType('market_of_interest')
  const serviceUsed = await backendService.getDataByType('service_usage')
  const marketExportedTo = await backendService.getDataByType('market_exported')
  // const ukRegions = await backendService.getDataByType('region')
  const data = await getData(req, res, req.body).then((response) => {
    const result = response.body.result || {}

    return {
      ...response,
      page: 1,
      limit: 20,
      pagination: buildPagination(req.query, { count: config.paginationMaxResults, page: 1, result }),
      result,
    }
  })

  return res.render('acs/index', {
    result: data,
    filters: {
      companyName: res.locals.query.filters.company_name,
      exportPotential: selectCheckboxFilter(req.query['export-potential'], [
        {
          value: 'very-high',
          text: 'Very high',
        }, {
          value: 'high',
          text: 'High',
        }, {
          value: 'medium',
          text: 'Medium',
        }, {
          value: 'low',
          text: 'Low',
        }, {
          value: 'very-low',
          text: 'Very low',
        },
      ]),
      turnover: res.locals.query.filters.turnover,

      /**
       * Not working!!
       [ 'INVEST NORTHERN IRELAND',
       'ISLE OF MAN',
       'NORTH EAST REGIONAL INTERNATIONAL TRADE OFFICE',
       'NORTH WEST INTERNATIONAL TRADE CENTRE',
       'SCOTTISH DEVELOPMENT INTERNATIONAL',
       'UKTI EAST MIDLANDS',
       'UKTI EAST OF ENGLAND',
       'UKTI INTERNATIONAL BUSINESS WALES',
       'UKTI SOUTH EAST',
       'UKTI YORKSHIRE',
       'UK TRADE & INVESTMENT LONDON INTERNATIONAL TRADE TEAM',
       'UK TRADE & INVESTMENT SOUTH WEST',
       'WEST MIDLANDS CHAMBERS OF COMMERCE LLP CENTRAL SERVICES TEAM' ]
       */

      ukRegions: selectCheckboxFilter(req.query['uk-regions'], [
        {
          value: 'East of England',
          text: 'East of England',
        }, {
          value: 'East Midlands',
          text: 'East Midlands',
        }, {
          value: 'London',
          text: 'London',
        }, {
          value: 'North East',
          text: 'North East',
        }, {
          value: 'North West',
          text: 'North West',
        }, {
          value: 'South East',
          text: 'South East',
        }, {
          value: 'South West',
          text: 'South West',
        }, {
          value: 'West Midlands',
          text: 'West Midlands',
        }, {
          value: 'Yorkshire and Humber',
          text: 'Yorkshire and Humber',
        },
      ]),
      marketOfInterest: selectCheckboxFilter(req.query['market-of-interest'], map(marketOfInterestList.body.result, transformStringToOption)),
      serviceUsed: selectCheckboxFilter(req.query['service-used'], map(serviceUsed.body.result, transformStringToOption)),
      marketExportedTo: selectCheckboxFilter(req.query['market-exported-to'], map(marketExportedTo.body.result, transformStringToOption)),
    },
  })
}

async function search (req, res) {
  const offset = req.query.offset
  const limit = req.query.limit
  const postData = req.body
  const data = await backendService.searchForCompanies(offset, limit, postData)

  res.json(data.body)
}

async function searchBySicCode (req, res) {
  const data = await backendService.searchBySicCode(req.params.code)

  res.json(data.body)
}

async function searchByExportCode (req, res) {
  const data = await backendService.searchByExportCode(req.params.code)

  res.json(data.body)
}

module.exports = {
  buildFilters,
  dataByType,
  internalCompanyIdEvents,
  renderIndex,
  search,
  searchBySicCode,
  searchByExportCode,
}
