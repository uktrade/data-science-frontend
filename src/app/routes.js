const ssoController = require('./controllers/sso')

const {
  buildFilters,
  buildHeader,
  getMarketExportedMetadata,
  getMarketOfInterestMetadata,
  renderIndex,
} = require('./controllers/acs')

module.exports = function (express, app) {
  app.get('/login/', ssoController.authRedirect)
  app.get('/login/callback/', ssoController.callback)
  app.get('/sign-out/', ssoController.signOutOAuth)
  app.get('/',
    buildHeader,
    buildFilters,
    renderIndex
  )

  app.get('/market-of-interest',
    getMarketOfInterestMetadata,
  )

  app.get('/market-exported-to',
    getMarketExportedMetadata,
  )
}
