const config = require('../../config')
const backendService = require('../../lib/backend-service')
const getCacheTime = require('../../lib/get-cache-time')
const logger = require('../../lib/logger')

const { buildPagination } = require('../../lib/pagination')

async function dataByType (req, res) {
  const data = await backendService.getDataByType(req.params.type)

  if (!config.isDev) {
    const cacheTime = getCacheTime()

    res.setHeader('Cache-Control', 'public, max-age=' + cacheTime.seconds)
    res.setHeader('Expires', cacheTime.utc)
  }

  res.json(data.body)
}

async function getData (req, res) {
  try {
    const page = req.query.page || 0
    const offset = page === 0 ? page : page * 20
    // TODO(jf): store the default offset and limit vals
    return await backendService.searchForCompanies(offset, 20, {})
  } catch (err) {
    logger.error(err)
  }
}

async function internalCompanyIdEvents (req, res) {
  const data = await backendService.getEventsByInternalCompanyId(req.params.id)

  res.json(data.body)
}

async function renderIndex (req, res) {
  const data = await getData(req, res).then((response) => {
    const result = response.body.result || {}
    return {
      ...response,
      page: 1,
      limit: 20,
      // @TODO(kg) send results count
      pagination: buildPagination(req.query, { count: config.paginationMaxResults, page: 1, result }),
      result,
    }
  })

  return res.render('acs/index', {
    result: data,
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
  dataByType,
  internalCompanyIdEvents,
  renderIndex,
  search,
  searchBySicCode,
  searchByExportCode,
}
