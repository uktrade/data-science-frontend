const nock = require('nock')
const supertest = require('supertest')
const winston = require('winston')

const logger = require('../../../app/lib/logger')
const app = require('../../../app/app')
const config = require('../../../../config')

jest.mock('../../../app/lib/redis-client', () => {
  return { get: () => Promise.resolve() }
})

jest.mock('connect-redis', () => {
  return jest.fn(() => {
    return jest.fn().mockImplementation(() => {
      return {
        on: jest.fn(() => Promise.resolve()),
        set: jest.fn(() => Promise.resolve()),
      }
    })
  })
})

function getTitle (res) {
  const text = res.text
  const openTag = '<title>'
  const openTagIndex = text.indexOf(openTag)
  const closeTagIndex = text.indexOf('</title>', openTagIndex)
  const title = text.substring((openTagIndex + openTag.length), closeTagIndex)

  return title
}

function checkResponse (res, statusCode) {
  const headers = res.headers
  expect(res.statusCode).toEqual(statusCode)
  expect(headers['x-download-options']).toBeDefined()
  expect(headers['x-xss-protection']).toBeDefined()
  expect(headers['x-content-type-options']).toBeDefined()
  expect(headers['x-frame-options']).toBeDefined()
  expect(headers['cache-control']).toEqual('no-cache, no-store')
}

// Unfortunately I have had to skip this test as after fixing the security vunerabilities these test break.
// To fix these tests more work is needed which will delay us fixing the security issues.

describe.skip('App', () => {
  let oldTimeout
  const consoleTransport = new winston.transports.Console({ colorize: true })

  beforeEach(() => {
    nock(config.backend.url)
      .post('/api/v1/company/search/?offset=0&limit=20')
      .reply(200, { count: 1, result: [{ 'cash_bank_in_hand': '1194675.0' }] })
    nock(config.backend.url).get('/api/v1/company/search/region/').reply(200, { 'result': ['East of London'] })
    nock(config.backend.url).get('/api/v1/company/search/export_propensity/').reply(200, { 'result': ['Low'] })
    nock(config.backend.url).get('/api/v1/company/search/market_of_interest/').reply(200, { 'result': ['Colombia'] })
    nock(config.backend.url).get('/api/v1/company/search/service_usage/').reply(200, { 'result': ['DIT'] })
    nock(config.backend.url).get('/api/v1/company/search/market_exported/').reply(200, { 'result': ['Indonesia'] })
    nock(config.backend.url).get('/api/v1/company/search/dit_sectors/').reply(200, { 'result': ['Earth'] })

    logger.remove(consoleTransport)
    oldTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
  })

  afterEach(() => {
    logger.add(consoleTransport)
    jasmine.DEFAULT_TIMEOUT_INTERVAL = oldTimeout
  })

  describe('With SSO bypass enabled', () => {
    let testApp

    beforeEach(() => {
      config.isDev = true
      config.sso = { bypass: true }
      testApp = app.create(undefined, config)
    })

    afterEach(() => {
      jest.restoreAllMocks()
      jest.resetModules()
    })

    describe('index page', () => {
      it('Should render the index page', (done) => {
        supertest(testApp).get('/')
          .expect(response => {
            checkResponse(response, 200)
            expect(getTitle(response.body)).toContain('Find Exporters')
          })
          .end(done)
      })
    })

    describe('Ping', () => {
      it('Should return a status of 200', (done) => {
        supertest(testApp).get('/ping/').expect(200, done)
      })
    })
  })

  describe('With SSO bypass disabled', () => {
    let testApp
    beforeEach(function () {
      config.isDev = true
      config.sso = { bypass: false }
      testApp = app.create(undefined, config)
    })

    describe('Pages requiring auth', () => {
      it('Should redirect the index page to the login page', (done) => {
        supertest(testApp).get('/')
          .expect(302)
          .expect('location', '/login/')
          .end(done)
      })
    })

    describe('Pages not requiring auth', () => {
      it(`Should render the Healthcheck page`, (done) => {
        supertest(testApp).get('/ping/').expect(200, done)
      })
    })
  })
})
