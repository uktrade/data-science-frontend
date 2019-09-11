const clientMatrix = require('@uktrade/client-matrix-js')
const browserstack = require('browserstack-local')

const IMPLICIT_TIMEOUT = process.env.WDIO_IMPLICIT_TIMEOUT || 90000
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080'

const browserStackUser = process.env.BROWSERSTACK_USERNAME || ''
const browserStackKey = process.env.BROWSERSTACK_ACCESS_KEY || ''
const isRemote = process.env.IS_REMOTE || false
const clients = process.env.CLIENTS
  ? process.env.CLIENTS.split(',').map(client => client.trim())
  : ['chrome_latest', 'ie11']
const clientMatrixList = clientMatrix.requestedClients(clients)

const remoteConfig = {
  services: ['browserstack'],
  user: browserStackUser,
  key: browserStackKey,
  browserstackLocal: true,
  // Code to start browserstack local before start of test
  onPrepare: function () {
    console.log('Connecting local')
    return new Promise(function(resolve, reject){
      exports.bs_local = new browserstack.Local()
      exports.bs_local.start({'key': exports.config.key }, function(error) {
        if (error) return reject(error)
        console.log('Connected. Now testing...')
        resolve()
      })
    })
  },
  // Code to stop browserstack local after end of test
  onComplete: function () {
    exports.bs_local.stop(function() {})
  },
  capabilities: [...clientMatrixList]
}

const defaultConfig = {
  specs: [
    './uiTest/end-to-end/src/specs/**/*.js'
  ],
  maxInstances: 10,
  capabilities: [{ browser: 'Chrome' }],
  logLevel: 'error',
  deprecationWarnings: true,
  bail: 0,
  baseUrl: BASE_URL,
  waitforTimeout: 180000,
  connectionRetryTimeout: 180000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    timeout: 60000,
    require: ['@babel/register'],
    retries: 3
  },
  before: function () {
    browser.setTimeout({ 'implicit': IMPLICIT_TIMEOUT })
    browser.url('')
  },
}

exports.config = defaultConfig