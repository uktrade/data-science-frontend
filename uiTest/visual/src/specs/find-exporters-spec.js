const assert = require('assert')

describe('Find Exporters', () => {
  it('home page', async () => {
    await browser.url('')
    await browser.imageDiff.take()
    await browser.imageDiff.validate().then(result => {
      assert.equal(result, 0)
    })
  })
})
