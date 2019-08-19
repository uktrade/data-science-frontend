const nock = require('nock')
const supertest = require('supertest')
const winston = require('winston')

const logger = require('../../../app/lib/logger')
const app = require('../../../app/app')
const config = require('../../../../config')

const companySearch = {
  "count": 1,
    "result": [{
                "cash_bank_in_hand": "1194675.0",
                "commodity_codes": "01012990",
                "company_classification": "Classified",
                "company_id": 63643,
                "company_name": "single company",
                "datahub_company_id": "123",
                "line_of_business": "Services",
                "dit_sectors": "Heart",
                "employee_range": "50 to 249",
                "export_propensity": "Very low",
                "headquarter_type": "Building",
                "last_export_evidence": "2018-08",
                "last_interaction_date": "2018-09-01",
                "latitude": 53.6345435,
                "longitude": -2.634534534634,
                "market_exported": "10",
                "market_of_interest": "High",
                "num_export_opp_enquiries": "5664",
                "num_export_wins": 5777,
                "num_hmrc_export_goods_outside_eu": 5533,
                "num_hmrc_import_goods_outside_eu": "432432",
                "postcode": "LY85AQ",
                "region": "North West",
                "shareholder_funds": 1000,
                "sic_codes": "25620,71129",
                "turnover": "34655709.0",
                "current_assets": 1000000,
                "incorporation_month": "November 2000"}]
}

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

describe('App', () => {
  let oldTimeout

  beforeEach(() => {
    nock(config.backend.url)
      .post('/api/v1/company/search/?offset=0&limit=20')
      .reply(200, companySearch)
    nock(config.backend.url).get('/api/v1/company/search/region/').reply(200, { 'result': ['East of London'] })
    nock(config.backend.url).get('/api/v1/company/search/export_propensity/').reply(200, { "result": ["Low"] })
    nock(config.backend.url).get('/api/v1/company/search/market_of_interest/').reply(200, { "result": ["Colombia"] })
    nock(config.backend.url).get('/api/v1/company/search/service_usage/').reply(200, { "result": ["DIT"] })
    nock(config.backend.url).get('/api/v1/company/search/market_exported/').reply(200, { "result": ["Indonesia"] })
    nock(config.backend.url).get('/api/v1/company/search/dit_sectors/').reply(200, { "result": ["Earth"] })

    logger.remove(winston.transports.Console)
    oldTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
  })

  afterEach(() => {
    logger.add(winston.transports.Console)
    jasmine.DEFAULT_TIMEOUT_INTERVAL = oldTimeout
  })

  describe('With SSO bypass enabled', () => {
    let testApp

    beforeEach(() => {
      testApp = app.create(undefined, config)
      config.isDev = true
      config.sso = { bypass: true }
    })

    afterEach(() => {
      jest.restoreAllMocks()
      jest.resetModules()
    })

    describe('index page', () => {
      it('Should render the index page', async () => {
        const response = await supertest(testApp).get('/')
        checkResponse(response, 200)
        expect(getTitle(response)).toContain('Find Exporters')
      })
    })

    describe('Ping', () => {
      it('Should return a status of 200', async () => {
        const response = await supertest(testApp).get('/ping/')
        expect(response.statusCode).toEqual(200)
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

    describe('Pages requiring auth', function () {
      it(`Should redirect the index page to the login page`, async () => {
        const response = await supertest(testApp).get('/')
        checkResponse(response, 302)
        expect(response.headers.location).toEqual('/login/')
      })
    })

    describe('Pages not requiring auth', () => {
      it(`Should render the Healthcheck page`, async () => {
        const response = await supertest(testApp).get('/ping/')
        expect(response.statusCode).toEqual(200)
      })
    })
  })
})
