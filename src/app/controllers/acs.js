const { isEmpty, map, castArray } = require('lodash')

const config = require('../../../config')
const backendService = require('../lib/backend-service')
const getCacheTime = require('../lib/get-cache-time')
const logger = require('../lib/logger')

const {
  selectCheckboxFilter,
  sanitizeKeyValuePair,
  transformPageToOffset,
  transformQueryToDoubleFilter,
  transformQueryToEvidenceFilter,
  transformQueryToTurnoverFilter,
  transformStringToOption,
  transformToLowerTrimStart,
} = require('../transformers')
const { buildPagination } = require('../lib/pagination')

async function buildFilters (req, res, next) {
  res.locals.query = {
    filters: {
      ...sanitizeKeyValuePair('company_name', req.query['company-name'], transformToLowerTrimStart),
      ...sanitizeKeyValuePair('export_propensity', req.query['export-potential'], castArray),
      ...transformQueryToDoubleFilter('export_codes', req.query['export-codes']),
      ...transformQueryToEvidenceFilter('last_export_evidence', req.query['export-evidence-start-date'], req.query['export-evidence-end-date']),
      ...transformQueryToDoubleFilter('sic_codes', req.query['sic-codes']),
      ...transformQueryToTurnoverFilter('turnover', req.query['turnover-minimum'], req.query['turnover-maximum']),
      ...sanitizeKeyValuePair('market_of_interest', req.query['market-of-interest'], castArray),
      ...sanitizeKeyValuePair('market_exported', req.query['market-exported-to'], castArray),
      ...sanitizeKeyValuePair('service_usage', req.query['service-used'], castArray),
      ...sanitizeKeyValuePair('region', req.query['uk-regions'], castArray),
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
    const page = req.query.page || 1
    const offset = transformPageToOffset(page)
    const query = isEmpty(res.locals.query.filters) ? {} : res.locals.query

    return await backendService.searchForCompanies(offset, config.paginationOffset, query)
  } catch (err) {
    logger.error(err)
  }
}

async function internalCompanyIdEvents (req, res) {
  const data = await backendService.getEventsByInternalCompanyId(req.params.id)

  res.json(data.body)
}

async function getMarketExportedMetadata (req, res) {
  const data = await getCheckboxFilter(req, 'market_exported', 'market-exported-to')

  console.log(data)

  res.send(JSON.stringify(data))
}

async function getMarketOfInterestMetadata (req, res) {
  const data = await getCheckboxFilter(req, 'market_exported', 'market-exported-to')

  console.log(data)

  res.send(JSON.stringify(data))
}

async function getCheckboxFilter (req, apiParam, queryParam) {
  const list = await backendService.getDataByType(apiParam)

  return selectCheckboxFilter(req.query[queryParam], map(list.body.result, transformStringToOption))
}

function getIndexData (req, res) {
  return getData(req, res, req.body).then((response) => {
    const result = response.body.result || {}
    const count = response.body.count || 0

    return {
      ...response,
      result,
      count,
      page: 1,
      limit: 20,
      pagination: buildPagination(req.query, { count, page: 1, result }),
    }
  })
}

async function renderIndex (req, res) {
  const data = await getIndexData(req, res)
  const ukRegions = await getCheckboxFilter(req, 'region', 'uk-regions')
  const exportPotential = await getCheckboxFilter(req, 'export_propensity', 'export-potential')
  const marketOfInterest = await getCheckboxFilter(req, 'market_of_interest', 'market-of-interest')
  const serviceUsed = await getCheckboxFilter(req, 'service_usage', 'service-used')
  const marketExportedTo = await getCheckboxFilter(req, 'market_exported', 'market-exported-to')

  const companyName = req.query['company-name']
  const commodityCode = req.query['export-codes']
  const sicCodes = req.query['sic-codes']
  const turnover = {
    min: req.query['turnover-minimum'],
    max: req.query['turnover-maximum'],
  }
  const latestExport = {
    startDate: req.query['export-evidence-start-date'],
    endDate: req.query['export-evidence-end-date'],
  }

  return res.render('index', {
    result: data,
    filters: {
      companyName,
      exportPotential,
      commodityCode,
      latestExport,
      sicCodes,
      turnover,
      marketOfInterest,
      marketExportedTo,
      serviceUsed,
      ukRegions,
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
  getMarketExportedMetadata,
  getMarketOfInterestMetadata,
  internalCompanyIdEvents,
  renderIndex,
  search,
  searchBySicCode,
  searchByExportCode,
}
