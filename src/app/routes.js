const homeController = require('./controllers/home')
const ssoController = require('./controllers/sso')
const timelineController = require('./controllers/timeline')

const {
  buildFilters,
  dataByType,
  internalCompanyIdEvents,
  renderIndex,
  search,
  searchBySicCode,
  searchByExportCode,
} = require('./controllers/acs')

module.exports = function (express, app) {
  app.get('/', homeController)
  app.get('/login/', ssoController.authRedirect)
  app.get('/login/callback/', ssoController.callback)

  app.get('/timeline/', timelineController.index)
  app.get('/timeline/search/', timelineController.search)

  app.get('/acs/',
    buildFilters,
    renderIndex
  )

  app.get('/acs/api/timeline/events/:id', internalCompanyIdEvents)
  app.get('/acs/api/search/sic-code/:code', searchBySicCode)
  app.get('/acs/api/search/export-code/:code', searchByExportCode)
  app.get('/acs/api/data/:type', dataByType)
  app.post('/acs/api/search/', express.json(), search)
}
