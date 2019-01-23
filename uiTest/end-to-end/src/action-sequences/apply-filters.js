import userActions from '../action/user-actions'
import selectors from '../../../selectors'

const applyFilters = (filters) => {
  const entries = Object.entries(filters)

  entries.forEach(filter => {
    const filterName = filter[0]
    const filterValue = filter[1]

    switch (filterName) {
      case 'companyName':
        companyName(filterValue)
        break
      case 'turnOverMin':
        turnOverMin(filterValue)
        break
    }
  })
}

const companyName = value => {
  userActions.enterText(selectors.filters.companyName, value.toLowerCase())
  userActions.clickOn(selectors.filters.commodityCode)
  waitForContentToLoad(value)
}

const turnOverMin = value => {
  userActions.enterText(selectors.filters.turnOverMin, value)
  userActions.clickOn(selectors.filters.turnOverMax)
  waitForContentToLoad(value)
}

const waitForContentToLoad = (value) => {
  browser.waitUntil(() => {
    if (userActions.getElement(selectors.company.pagination).getAttribute('href')) {
      return userActions.getElement(selectors.company.pagination).getAttribute('href').includes(value)
    } else {
      return false
    }
  }, 20000)
}

export default applyFilters
