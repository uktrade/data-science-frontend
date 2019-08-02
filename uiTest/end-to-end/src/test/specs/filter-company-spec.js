import assert from 'assert'
import actionSequences from '../../action-sequences'
import selectors from '../../../../selectors'
import userActions from '../../action/user-actions'

const companyFilterName = 'Limited'

describe('Find Exporter', () => {
  it('should retrieve company list after applying filters', () => {
    actionSequences.applyFilters({
      companyName: companyFilterName,
      turnOverMin: '10000',
    })

    const listOfCompanies = userActions.getElements(selectors.company.companyContent)
    listOfCompanies.forEach((companyContent) => {
      const companyContentText = companyContent.getText()
      assert(companyContentText.includes(companyFilterName))
      assert(companyContentText.includes('Turnover'))
    })
  })
})
