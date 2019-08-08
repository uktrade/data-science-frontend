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
        renderIndex(req, res, next).then(() => {
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
      it(`Doesn't choke on date ${garbageDate}`, () => {
        repos.getData.mockReturnValueOnce(Promise.resolve({
          body: {
            result: [{
              time_since_remove_recorded: garbageDate,
            }],
          },
        }))
        renderIndex(req, res, next).then(() => {
          expect(res.render.mock.calls.length).toBe(1)
          const renderContext = res.render.mock.calls[0][1]
          expect(renderContext.result.result[0].time_since_remove_recorded).toBe(null)
          expect(renderContext.result.result[0].dissolved_date).toBe(null)
          expect(renderContext.result.result[0].days_to_deletion).toBe(null)
          done()
        })
      })
    }
  })
})
