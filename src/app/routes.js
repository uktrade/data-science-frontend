const ssoController = require('./controllers/sso')

const {
  buildFilters,
  getMarketExportedMetadata,
  getMarketOfInterestMetadata,
  renderIndex,
} = require('./controllers/acs')

module.exports = function (express, app) {
  app.get('/login/', ssoController.authRedirect)
  app.get('/login/callback/', ssoController.callback)
  app.get('/',
    buildFilters,
    renderIndex
  )

  app.get('/market-of-interest',
    getMarketOfInterestMetadata,
  )

  app.get('/market-exported',
    getMarketExportedMetadata,
  )
}
