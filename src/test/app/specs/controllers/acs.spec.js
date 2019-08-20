xdescribe('The ACS controller', () => {
  it('ACS test', () => {
    expect('ACS').toEqual('ACS')
  })
})
const repos = require('../../../../app/repos')

const renderIndex = require('../../../../app/controllers/acs.js').renderIndex

jest.mock('../../../../app/repos', () => ({
  getCheckboxFilter: jest.fn(),
  getData: jest.fn(),
}))

describe('renderIndex', () => {
  let req
  let res
  let next
  let dateNowSpy
  beforeEach(() => {
    req = { query: {} }
    res = {
      setHeader: jest.fn(),
      render: jest.fn(),
      locals: { globalHeader: '', query: null },
    }
    next = jest.fn()
    const staticDate = new Date('2019-01-01 13:00:00Z')
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => staticDate)
  })
  afterEach(() => {
    dateNowSpy.mockRestore()
  })
  describe('Logic for dissolved Companies', () => {
    for (let [timeSinceRemoveRecorded, dissolvedDate, daysToDeletion] of [
      ['2019-01-01T00:00:00', '01/01/2019', 180],
      ['2018-12-31T23:59:59', '31/12/2018', 179],
      ['1901-01-01T00:00:00', '01/01/1901', -42919],
      ['2049-05-30T00:00:00', '30/05/2049', 11287],
      ['2019-06-30T00:00:00', '30/06/2019', 360],
      ['2018-07-05T00:00:00', '05/07/2018', 0],
    ]) {
      it(`Has correct logic for ${timeSinceRemoveRecorded}`, (done) => {
        repos.getData.mockReturnValueOnce(Promise.resolve({
          body: {
            result: [{
              time_since_remove_recorded: timeSinceRemoveRecorded,
            }],
          },
        }))
        return renderIndex(req, res, next).then(() => {
          expect(res.render.mock.calls.length).toBe(1)
          const renderContext = res.render.mock.calls[0][1]
          expect(renderContext.result.result[0].time_since_remove_recorded).toBe(timeSinceRemoveRecorded)
          expect(renderContext.result.result[0].dissolved_date).toBe(dissolvedDate)
          expect(renderContext.result.result[0].days_to_deletion).toBe(daysToDeletion)
          done()
        })
      })
    }
    for (let garbageDate of ['', undefined, null, '2019-02-29T00:00:00', 'asdfasdf']) {
      it(`Doesn't choke on date ${garbageDate}`, (done) => {
        repos.getData.mockReturnValueOnce(Promise.resolve({
          body: {
            result: [{
              time_since_remove_recorded: garbageDate,
            }],
          },
        }))
        return renderIndex(req, res, next).then(() => {
          expect(res.render.mock.calls.length).toBe(1)
          const renderContext = res.render.mock.calls[0][1]
          expect(renderContext.result.result[0].time_since_remove_recorded).toBeFalsy()
          expect(renderContext.result.result[0].dissolved_date).toBeFalsy()
          expect(renderContext.result.result[0].days_to_deletion).toBeFalsy()
          done()
        })
      })
    }
  })

  describe('Preparation of GREAT integration info', () => {
    it('Has correct URL if company is supplier and has id number', (done) => {
      repos.getData.mockReturnValueOnce(Promise.resolve({
        body: {
          result: [{
            is_published_find_a_supplier: true,
            national_identification_number: '1',
            national_identification_system_code: 'CRO',
          }],
        },
      }))
      return renderIndex(req, res, next).then(() => {
        expect(res.render.mock.calls.length).toBe(1)
        const renderContext = res.render.mock.calls[0][1]
        expect(renderContext.result.result[0].find_a_supplier_url).toEqual(`${config.findASupplierProfileUrlPrefix}00000001/`)
        done()
      })
    })
    it('No URL if company is not supplier', (done) => {
      repos.getData.mockReturnValueOnce(Promise.resolve({
        body: {
          result: [{
            is_published_find_a_supplier: false,
            national_identification_number: '1',
            national_identification_system_code: config.companiesHouseIdentificationSystemCode,
          }],
        },
      }))
      return renderIndex(req, res, next).then(() => {
        expect(res.render.mock.calls.length).toBe(1)
        const renderContext = res.render.mock.calls[0][1]
        expect(renderContext.result.result[0].find_a_supplier_url).toBe(null)
        done()
      })
    })
    it('No URL if company has no ID number', (done) => {
      repos.getData.mockReturnValueOnce(Promise.resolve({
        body: {
          result: [{
            is_published_find_a_supplier: true,
            national_identification_system_code: config.companiesHouseIdentificationSystemCode,
          }],
        },
      }))
      renderIndex(req, res, next).then(() => {
        expect(res.render.mock.calls.length).toBe(1)
        const renderContext = res.render.mock.calls[0][1]
        expect(renderContext.result.result[0].find_a_supplier_url).toBe(null)
        done()
      })
    })
    it('No URL if company ID number is not a Companies House number', (done) => {
      repos.getData.mockReturnValueOnce(Promise.resolve({
        body: {
          result: [{
            is_published_find_a_supplier: true,
            national_identification_number: '2',
            national_identification_system_code: ':Siris',
          }],
        },
      }))
      return renderIndex(req, res, next).then(() => {
        expect(res.render.mock.calls.length).toBe(1)
        const renderContext = res.render.mock.calls[0][1]
        expect(renderContext.result.result[0].find_a_supplier_url).toBe(null)
        done()
      })
    })
    it('No URL if national_identification_system_code missing', (done) => {
      repos.getData.mockReturnValueOnce(Promise.resolve({
        body: {
          result: [{
            is_published_find_a_supplier: true,
            national_identification_number: '2',
          }],
        },
      }))
      return renderIndex(req, res, next).then(() => {
        expect(res.render.mock.calls.length).toBe(1)
        const renderContext = res.render.mock.calls[0][1]
        expect(renderContext.result.result[0].find_a_supplier_url).toBe(null)
        done()
      })
    })
    it('Sets is_joined_find_a_supplier to true if service_usage indicates so', (done) => {
      repos.getData.mockReturnValueOnce(Promise.resolve({
        body: {
          result: [{
            service_usage: 'asda;skfpoawkerfdit.find-a-buyer.supplierskjnawefliajnef',
          }],
        },
      }))
      return renderIndex(req, res, next).then(() => {
        expect(res.render.mock.calls.length).toBe(1)
        const renderContext = res.render.mock.calls[0][1]
        expect(renderContext.result.result[0].is_joined_find_a_supplier).toBe(true)
        done()
      })
    })
    it('Sets is_joined_find_a_supplier to false if service_usage indicates so', (done) => {
      repos.getData.mockReturnValueOnce(Promise.resolve({
        body: {
          result: [{
            service_usage: 'something else',
          }],
        },
      }))
      return renderIndex(req, res, next).then(() => {
        expect(res.render.mock.calls.length).toBe(1)
        const renderContext = res.render.mock.calls[0][1]
        expect(renderContext.result.result[0].is_joined_find_a_supplier).toBe(false)
        done()
      })
    })
    it('Doesnt die if service_usage not there', (done) => {
      repos.getData.mockReturnValueOnce(Promise.resolve({
        body: {
          result: [{
            national_identification_number: '1',
          }],
        },
      }))
      return renderIndex(req, res, next).then(() => {
        expect(res.render.mock.calls.length).toBe(1)
        const renderContext = res.render.mock.calls[0][1]
        expect(renderContext.result.result[0].is_joined_find_a_supplier).toBe(false)
        done()
      })
    })
  })
})
