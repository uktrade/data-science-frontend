const config = require( '../config' )
const backendService = require( '../lib/backend-service' )
const getCacheTime = require( '../lib/get-cache-time' )
const logger = require('../lib/logger')

function buildPagination (req, res, next) {
  next()
}

async function dataByType ( req, res ) {
  const data = await backendService.getDataByType( req.params.type )

  if ( !config.isDev ) {
    const cacheTime = getCacheTime()

    res.setHeader( 'Cache-Control', 'public, max-age=' + cacheTime.seconds )
    res.setHeader( 'Expires', cacheTime.utc )
  }

  res.json( data.body )
}

async function getData() {
  try {
    //TODO(jf): store the default offset and limit vals
    return await backendService.searchForCompanies(3, 10, {})
  } catch (err) {
    logger.error(err)
  }
}

async function internalCompanyIdEvents ( req, res ) {
  const data = await backendService.getEventsByInternalCompanyId( req.params.id )

  res.json( data.body )
}

function renderIndex( req, res ) {
  getData().then(function(response) {
    try {
      const result = response.body.result || {}
      res.render( 'acs/index', { result })
    } catch (err) {
      logger.error(err)
    }
  })
}

async function search ( req, res ) {
  const offset = req.query.offset
  const limit = req.query.limit
  const postData = req.body
  const data = await backendService.searchForCompanies( offset, limit, postData )

  res.json( data.body )
}

async function searchBySicCode ( req, res ) {
  const data = await backendService.searchBySicCode( req.params.code )

  res.json( data.body )
}

async function searchByExportCode ( req, res ) {
  const data = await backendService.searchByExportCode( req.params.code )

  res.json( data.body )
}



module.exports = {
  buildPagination,
  dataByType,
  internalCompanyIdEvents,
  renderIndex,
  search,
  searchBySicCode,
  searchByExportCode,
}
