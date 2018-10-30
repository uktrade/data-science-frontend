const ssoController = require('./controllers/sso')

const {
  buildFilters,
  renderIndex,
} = require('./controllers/acs')

module.exports = function (express, app) {
  app.get('/login/', ssoController.authRedirect)
  app.get('/login/callback/', ssoController.callback) 
  app.get('/',
    buildFilters,
    renderIndex
  )
}
