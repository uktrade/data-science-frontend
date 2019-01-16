// const assert = require('assert');
import actionSequences from '../../action-sequences'

describe('Find Exporter', () => {
  it('should retrieve company list after applying filters', () => {
    actionSequences.applyFilters({
      companyName: 'Limited',
      turnOverMin: '10000'
    })
  })
})
