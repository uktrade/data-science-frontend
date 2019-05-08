const { isEmpty, map } = require('lodash')

const config = require('../../config')
const backendService = require('./lib/backend-service')
const logger = require('./lib/logger')

const {
  selectCheckboxFilter,
  transformPageToOffset,
  transformStringToOption,
  transformStringToOptionUnformatted,
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
  const data = await getSectorsFilter(req, 'dit_sectors', 'dit-sectors')

  res.send(JSON.stringify(data))
}

async function getCheckboxFilter (req, apiParam, queryParam) {
  const list = await backendService.getDataByType(apiParam)

  return selectCheckboxFilter(req.query[queryParam], map(list.body.result, transformStringToOption))
}

async function getSectorsFilter (req, apiParam, queryParam) {
  const list = [
    'Advanced Engineering',
    'Aerospace',
    'Agriculture, Horticulture and Fisheries',
    'Airports',
    'Automotive',
    'Biotechnology and Pharmaceuticals',
    'Business (and Consumer) Services',
    'Chemicals',
    'Clothing, Footwear and Fashion',
    'Communications',
    'Construction',
    'Creative and Media',
    'Defence',
    'Defence and Security',
    'Education and Training',
    'Electronics and IT Hardware',
    'Energy',
    'Environment',
    'Financial Services (including Professional Services)',
    'Food and Drink',
    'Giftware, Jewellery and Tableware',
    'Global Sports Projects',
    'Healthcare and Medical',
    'Household Goods, Furniture and Furnishings',
    'ICT',
    'Leisure and Tourism',
    'Life Sciences',
    'Marine',
    'Mass Transport',
    'Mechanical Electrical and Process Engineering',
    'Metallurgical Process Plant',
    'Metals, Minerals and Materials',
    'Mining',
    'Oil and Gas',
    'Ports and Logistics',
    'Power',
    'Railways',
    'Renewable Energy',
    'Retail',
    'Security',
    'Software and Computer Services Business to Business (B2B)',
    'Textiles, Interior Textiles and Carpets',
    'Water',
  ]

  return selectCheckboxFilter(req.query[queryParam], map(list, transformStringToOptionUnformatted))
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
  getData,
  getMarketExportedMetadata,
  getMarketOfInterestMetadata,
  getSectorsFilter,
  getSectorsMetadata,
  search,
  searchBySicCode,
  searchByExportCode,
}
