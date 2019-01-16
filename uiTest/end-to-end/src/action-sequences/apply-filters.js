import userActions from '../action/user-actions'
import selectors from '../../../selectors'

const applyFilters = (filters) => {
  const entries = Object.entries(filters)

  entries.forEach(filter => {
    const filterName = filter[0]
    const filterValue = filter[1]

    switch (filterName) {
      case "companyName": companyName(filterValue); break;
      case "turnOverMin": turnOverMin(filterValue); break;
    }
  })
}

const companyName = value => {
  userActions.enterText(selectors.filters.companyName, value)
}

const turnOverMin = value => {
  userActions.enterText(selectors.filters.turnOverMin, value)
}

export default applyFilters