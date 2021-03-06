const config = require('../../../config')
const { buildPagination } = require('../lib/pagination')
const prepareCompany = require('../transformers').prepareCompany

const {
  getCheckboxFilter,
  getData,
} = require('../repos')

function getIndexData (req, res) {
  return getData(req, res, req.body).then((response) => {
    const rawResult = response.body.result || []
    const count = response.body.count || 0
    const result = rawResult.map(prepareCompany)

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
  const sectors = await getCheckboxFilter(req, 'dit_sectors', 'dit-sectors')
  const globalHeader = res.locals.globalHeader

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

  const sort = req.query.sort || config.defaultSortValue

  // Use the cleaned version of the postcode query to show on the frontend
  const postcode = res.locals.query &&
    res.locals.query.filters &&
    res.locals.query.filters.postcode &&
    res.locals.query.filters.postcode.length &&
    res.locals.query.filters.postcode.join(', ')

  return res.render('index', {
    result: data,
    globalHeader,
    filters: {
      companyName,
      exportPotential,
      commodityCode,
      latestExport,
      sicCodes,
      turnover,
      marketOfInterest,
      marketExportedTo,
      sectors,
      serviceUsed,
      ukRegions,
      postcode,
    },
    sort,
  })
}

module.exports = {
  renderIndex,
}
