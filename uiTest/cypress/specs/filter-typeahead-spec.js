import selectors from '../selectors'

describe('Filters typeahead', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/')
  })

  describe('Market of Interest', () => {
    it('Filters country list', () => {
      cy.get(selectors.filters.marketOfInterestTypeahead)
        .should('not.be.disabled')
        .type('Col')
        
      cy.get(`${selectors.filters.marketOfInterest}1`).should('be.visible')
      cy.get(`${selectors.filters.marketOfInterest}2`).should('not.be.visible')
      cy.get(`${selectors.filters.marketOfInterest}3`).should('not.be.visible')
      cy.get(`${selectors.filters.marketOfInterest}4`).should('not.be.visible')
    })

    it('Does not filter country list when only 2 letters are typed in', () => {
      cy.get(selectors.filters.marketOfInterestTypeahead)
        .should('not.be.disabled')
        .type('Co')

      cy.get(`${selectors.filters.marketOfInterest}1`).should('be.visible')
      cy.get(`${selectors.filters.marketOfInterest}2`).should('be.visible')
      cy.get(`${selectors.filters.marketOfInterest}3`).should('be.visible')
    })
  })

  describe('Market Exported to', () => {
    it('Filters country list', () => {
      cy.get(selectors.filters.marketOfInterestTypeahead)
        .should('not.be.disabled')
        .type('Ind')
        
      cy.get(`${selectors.filters.marketExportedTo}1`).should('be.visible')
      cy.get(`${selectors.filters.marketExportedTo}2`).should('not.be.visible')
      cy.get(`${selectors.filters.marketExportedTo}3`).should('not.be.visible')
      cy.get(`${selectors.filters.marketExportedTo}4`).should('not.be.visible')
    })

    it('Does not filter country list when only 2 letters are typed in', () => {
      cy.get(selectors.filters.marketOfInterestTypeahead)
        .should('not.be.disabled')
        .type('In')

      cy.get(`${selectors.filters.marketExportedTo}1`).should('be.visible')
      cy.get(`${selectors.filters.marketExportedTo}2`).should('be.visible')
      cy.get(`${selectors.filters.marketExportedTo}3`).should('be.visible')
    })
  })
})
