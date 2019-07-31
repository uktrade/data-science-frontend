const {
  buildFilters,
} = require('../../../app/builders')

describe('buildFilters', () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = { query: {} }
    res = {
      setHeader: jest.fn(),
      locals: {},
    }
    next = jest.fn()
  })
  it('Transforms the postcode filter correctly', async () => {
    req.query = { postcode: 'w1, w2, w3' }
    await buildFilters(req, res, next)
    expect(res.locals.query.filters.postcode).toEqual(['w1', 'w2', 'w3'])
  })
  it('Handles request with no query', async () => {
    await buildFilters(req, res, next)
    expect(res.locals.query.filters).toEqual({})
  })
  const emptyCases = ['', ' ', ',', ',,', ', ', ', ,', ' ,', ' , ', ' , , ,, , ']
  emptyCases.forEach(emptyCase => {
    it('Cleans invalid postcode searches', async () => {
      await buildFilters(req, res, next)
      expect(res.locals.query.filters).toEqual({})
    })
  })
})
