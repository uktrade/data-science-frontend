const ssoController = require('./controllers/sso')

const { renderIndex } = require('./controllers/acs')
const { renderCompanyTimeline } = require('./controllers/company-timeline')

const {
  getMarketExportedMetadata,
  getMarketOfInterestMetadata,
  getSectorsMetadata,
} = require('./repos')

const {
  buildFilters,
  buildHeader,
} = require('./builders')

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

  app.get('/dit-sectors',
    getSectorsMetadata,
  )

  app.get('/company-profile/:company_id',
    buildHeader,
    renderCompanyTimeline,
  )
}
