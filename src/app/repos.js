const { isEmpty, map } = require('lodash')

const config = require('../../config')
const backendService = require('./lib/backend-service')
const logger = require('./lib/logger')

const {
  selectCheckboxFilter,
  transformPageToOffset,
  transformStringToOption,
} = require('./transformers')

async function getData (req, res, query = {}) {
  try {
    const page = req.query.page || 1
    const offset = transformPageToOffset(page)
    const query = isEmpty(res.locals.query.filters) ? { sort: res.locals.query.sort } : res.locals.query
    return await backendService.searchForCompanies(offset, config.paginationOffset, query)
  } catch (err) {
    logger.error(err)
  }
}

async function getMarketExportedMetadata (req, res) {
  const data = await getCheckboxFilter(req, 'market_exported', 'market-exported-to')

  res.send(JSON.stringify(data))
}

async function getMarketOfInterestMetadata (req, res) {
  const data = await getCheckboxFilter(req, 'market_of_interest', 'market-of-interest')

  res.send(JSON.stringify(data))
}

async function getSectorsMetadata (req, res) {
  const data = await getCheckboxFilter(req, 'dit_sectors', 'dit-sectors')

  res.send(JSON.stringify(data))
}

async function getCompanyActivities (req, res) {
  const data = await backendService.getEventsByInternalCompanyId(req.params.company_id)

  res.send(data.body)
}

async function getCheckboxFilter (req, apiParam, queryParam) {
  const list = await backendService.getDataByType(apiParam)

  return selectCheckboxFilter(req.query[queryParam], map(list.body.result, transformStringToOption))
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
  getCheckboxFilter,
  getCompanyActivities,
  getData,
  getMarketExportedMetadata,
  getMarketOfInterestMetadata,
  getSectorsMetadata,
  search,
  searchBySicCode,
  searchByExportCode,
}
