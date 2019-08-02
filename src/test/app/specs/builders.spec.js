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
    expect(res.locals.query.filters.postcode).toEqual(['W1', 'W2', 'W3'])
  })
  it('Combines cases and removes duplicates', async () => {
    req.query = { postcode: 'w1, w1, w2, W2, abc, abC, aBc, aBC, Abc, AbC, ABc, ABC' }
    await buildFilters(req, res, next)
    expect(res.locals.query.filters.postcode).toEqual(['W1', 'W2', 'ABC'])
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
