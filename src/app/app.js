const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const morganLogger = require('morgan')
const compression = require('compression')

const routes = require('./routes')
const config = require('../../config')

const reporter = require('./lib/reporter')
const staticGlobals = require('./lib/static-globals')
const nunjucksFilters = require('./lib/nunjucks-filters')

const ping = require('./middleware/ping')
const forceHttps = require('./middleware/force-https')
const headers = require('./middleware/headers')
const locals = require('./middleware/locals')
const errors = require('./middleware/errors')
const sessionStore = require('./middleware/session-store')
const auth = require('./middleware/auth')
const ssoBypass = require('./middleware/sso-bypass')
require('dotenv').config()

module.exports = {

  create: (testApp = undefined, testConfig = undefined) => {
    const appConfig = testConfig || config
    const app = testApp || express()
    const isDev = appConfig.isDev
    const pathToPublic = path.resolve(__dirname, '../public')
    const pathToNodeModules = path.resolve(__dirname, (isDev ? '../../' : '../../../deps/0') + '/node_modules')
    const staticMaxAge = (isDev ? 0 : '2y')
    const nunjucksEnv = nunjucks.configure([
      `${pathToNodeModules}/govuk-frontend/components`,
      `${pathToNodeModules}/@uktrade`,
      `${__dirname}/views`,
      `${__dirname}/components`,
    ],
    {
      autoescape: true,
      watch: isDev,
      noCache: !appConfig.views.cache,
      express: app,
    })

    app.set('view engine', 'njk')
    app.set('view cache', appConfig.views.cache)
    app.disable('x-powered-by')

    staticGlobals(nunjucksEnv)
    nunjucksFilters(nunjucksEnv)
    reporter.setup(app)

    if (!isDev) { app.use(compression()) }
    app.use(forceHttps(isDev))

    app.use('/public', express.static(pathToPublic, { maxAge: staticMaxAge }))
    app.use('/assets', express.static(`${pathToNodeModules}/govuk-frontend/assets`))

    app.use('/js', express.static(path.join(config.buildDir, 'js')))
    app.use('/css', express.static(path.join(config.buildDir, 'css')))

    app.use(morganLogger((isDev ? 'dev' : 'combined')))
    app.use(locals)
    app.use(headers(isDev))
    app.use(ping)

    app.use(sessionStore.create())
    if (isDev) { app.use(ssoBypass) }
    app.use(auth)
    routes(express, app)

    app.use(errors.handle404)

    reporter.handleErrors(app)

    app.use(errors.catchAll)

    return app
  },
}
