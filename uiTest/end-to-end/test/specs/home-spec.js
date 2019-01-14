const assert = require('assert');

describe('Find Exporter', () => {
    it('should have the right title', () => {
        const title = browser.getTitle()
        assert.equal(title, 'GOV.UK – DIT system access')
    })
})
