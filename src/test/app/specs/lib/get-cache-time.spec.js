const mockdate = require('mockdate')
const getCacheTime = require('../../../../app/lib/get-cache-time')

describe('getCacheTime', () => {
  afterEach(() => {
    mockdate.reset()
  })

  describe('In BST (GMT -1)', () => {
    describe('Before 8am UTC (7am GMT)', () => {
      describe('At 4am', () => {
        it('Should return 5 mins time', () => {
          mockdate.set('Mon, 30 Apr 2018 04:00:01 GMT')
          const time = getCacheTime()
          expect(time.seconds).toEqual(1525061101)
          expect(time.utc).toEqual('Mon, 30 Apr 2018 04:05:01 GMT')
        })
      })

      describe('At 5am', () => {
        it('Should return 5 mins time', () => {
          mockdate.set('Mon, 30 Apr 2018 05:28:01 GMT')
          const time = getCacheTime()
          expect(time.seconds).toEqual(1525066381)
          expect(time.utc).toEqual('Mon, 30 Apr 2018 05:33:01 GMT')
        })
      })

      describe('At 6:59am', () => {
        it('Should return 5 mins time', () => {
          mockdate.set('Mon, 30 Apr 2018 06:59:00 GMT')
          const time = getCacheTime()
          expect(time.seconds).toEqual(1525071840)
          expect(time.utc).toEqual('Mon, 30 Apr 2018 07:04:00 GMT')
        })
      })
    })

    describe('After 8am UTC (7am GMT)', () => {
      describe('At 7:59am', () => {
        it('Should return time just before midnight', () => {
          mockdate.set('Mon, 30 Apr 2018 7:59:00 GMT')
          const time = getCacheTime()

          expect(time.seconds).toEqual(1525129199)
          expect(time.utc).toEqual('Mon, 30 Apr 2018 22:59:59 GMT')
        })
      })

      describe('At 8:01am', () => {
        it('Should return time just before midnight', () => {
          mockdate.set('Mon, 30 Apr 2018 08:01:01 GMT')
          const time = getCacheTime()

          expect(time.seconds).toEqual(1525129199)
          expect(time.utc).toEqual('Mon, 30 Apr 2018 22:59:59 GMT')
        })
      })

      describe('At 11am', () => {
        it('Should return time just before midnight', () => {
          mockdate.set('Mon, 30 Apr 2018 11:00:01 GMT')
          const time = getCacheTime()

          expect(time.seconds).toEqual(1525129199)
          expect(time.utc).toEqual('Mon, 30 Apr 2018 22:59:59 GMT')
        })
      })
    })
  })

  describe('Out of BST', () => {
    describe('Before 8am', () => {
      describe('At 7:59am', () => {
        it('Should return 5 mins time', () => {
          mockdate.set('Tue, 02 Jan 2018 07:59:00 GMT')
          const time = getCacheTime()
          expect(time.seconds).toEqual(1514880240)
          expect(time.utc).toEqual('Tue, 02 Jan 2018 08:04:00 GMT')
        })
      })
    })

    describe('After 8am', () => {
      describe('At 8:01am', () => {
        it('Should return time just before midnight', () => {
          mockdate.set('Tue, 02 Jan 2018 08:01:01 GMT')
          const time = getCacheTime()

          expect(time.seconds).toEqual(1514937599)
          expect(time.utc).toEqual('Tue, 02 Jan 2018 23:59:59 GMT')
        })
      })
    })
  })
})
