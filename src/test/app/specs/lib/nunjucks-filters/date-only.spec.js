const dateOnly = require('../../../../../app/lib/nunjucks-filters/date-only')

describe('Date only filter', () => {
  describe('With a date string', () => {
    it('Should return just the date', () => {
      expect(dateOnly('2016-04-01')).toEqual('1 April 2016')
    })
  })

  describe('With a UTC timestamp', () => {
    it('Should return the correct date', () => {
      expect(dateOnly(1491004799 * 1000)).toEqual('31 March 2017')
    })
  })
})
