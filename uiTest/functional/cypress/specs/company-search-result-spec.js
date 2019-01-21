import selectors from '../../../selectors'

describe('Company search result', function () {
  beforeEach(() => {
    cy.server()
    cy.route('/?sort*').as('filterResults')
    cy.visit('/')
  })

  it('displays empty company result page', () => {
    cy.get(selectors.filters.companyName).type('invalid company').type('{enter}')
    cy.wait('@filterResults')

    cy.get(selectors.company.companyEmptyContent).should('contain',
      'Oh no, there are no results for your search')
  })

  it('displays a single company result page', () => {
    cy.get(selectors.filters.companyName).type('single company').type('{enter}')
    cy.wait('@filterResults')

    cy.get(selectors.company.companyList).children().should('have.length', 1)
  })

  it('displays multiple company result page', () => {
    cy.get(selectors.filters.companyName).type('multiple company').type('{enter}')
    cy.wait('@filterResults')

    cy.get(selectors.company.companyList).children().should('have.length', 20)
  })
})
