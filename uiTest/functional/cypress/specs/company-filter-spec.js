import selectors from '../../../selectors'

describe('Company filters', () => {
  beforeEach(() => {
    cy.server()
    cy.route('/?sort*').as('filterResults')
    cy.visit('/')
    cy.get(selectors.company.companyList).children().should('have.length', 20)
  })

  describe('Export Potential', () => {
    it('Filters by selecting a single export potential', () => {
      cy.get(`${selectors.filters.exportPotential}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&export-potential=Low')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })

    it('Filters by selecting multiple export potential', () => {
      const mediumExportPotential = 2

      cy.get(`${selectors.filters.exportPotential}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&export-potential=Low')

      cy.get(`${selectors.filters.exportPotential}${mediumExportPotential}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&export-potential=Low&export-potential=Medium')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })
  })

  describe('Commodity Code', () => {
    it('Filters by single commodity code', () => {
      cy.get(selectors.filters.commodityCode)
        .should('not.be.disabled')
        .type('12345')
        .type('{enter}')

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&export-codes=12345')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })
  })

  // Disabled until story DST-1220 is fixed
  describe('Latest Export Evidence', () => {
    it('Filters by start date only', () => {
      cy.get(selectors.filters.exportEvidenceStartDate)
        .should('not.be.disabled')
        .type('2000-10')
        .type('{enter}')

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&export-evidence-start-date=2000-10')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })

    it('Filters by end date only', () => {
      cy.get(selectors.filters.exportEvidenceEndDate)
        .should('not.be.disabled')
        .type('2000-10')
        .type('{enter}')

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&export-evidence-end-date=2000-10')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })

    it('Filters by start and end date', () => {
      cy.get(selectors.filters.exportEvidenceStartDate)
        .should('not.be.disabled')
        .type('2000-10')
        .type('{enter}')

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&export-evidence-start-date=2000-10')

      cy.get(selectors.filters.exportEvidenceEndDate)
        .should('not.be.disabled')
        .type('2018-10')
        .type('{enter}')

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&export-evidence-start-date=2000-10&export-evidence-end-date=2018-10')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })

    it('Handles an invalid date format', () => {
      cy.get(selectors.filters.exportEvidenceStartDate)
        .should('not.be.disabled')
        .type('invalid')
        .type('{enter}')

      cy.get(selectors.company.companyEmptyContent).should('contain',
        'Oh no, there are no results for your search')
    })
  })

  describe('Sic Codes', () => {
    it('Filters by a sic code', () => {
      cy.get(selectors.filters.sicCodes)
        .should('not.be.disabled')
        .type('12345')
        .type('{enter}')

      cy.wait('@filterResults').then((xhr) => {
        expect(xhr.url).to.contain('?sort=export_propensity:desc&sic-codes=12345')
      })

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })
  })

  describe('Turnover', () => {
    it('Filters by minimum only', () => {
      cy.get(selectors.filters.turnOverMin)
        .should('not.be.disabled')
        .type('100')
        .type('{enter}')

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&turnover-minimum=100')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })

    it('Filters by maximum only', () => {
      cy.get(selectors.filters.turnOverMax)
        .should('not.be.disabled')
        .type('1')
        .type('{enter}')

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&turnover-maximum=1')

      cy.get(selectors.company.companyEmptyContent).should('contain',
        'Oh no, there are no results for your search')
    })

    it('Filters by minimum and maximum', () => {
      cy.get(selectors.filters.turnOverMin)
        .should('not.be.disabled')
        .type('100')
        .type('{enter}')

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&turnover-minimum=100')

      cy.get(selectors.filters.turnOverMax)
        .should('not.be.disabled')
        .type('1000')
        .type('{enter}')

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&turnover-minimum=100&turnover-maximum=1000')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })

    it('Handles non numeric values', () => {
      cy.get(selectors.filters.turnOverMin)
        .should('not.be.disabled')
        .type('not4number')
        .type('{enter}')

      cy.get(selectors.company.companyEmptyContent).should('contain',
        'Oh no, there are no results for your search')
    })
  })

  describe('Market of Interest', () => {
    it('Filters by selecting a single market of interest', () => {
      cy.get(`${selectors.filters.marketOfInterest}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&market-of-interest=Colombia')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })

    it('Filters by selecting multiple market of interest', () => {
      const usMarketOfInterest = 2

      cy.get(`${selectors.filters.marketOfInterest}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&market-of-interest=Colombia')

      cy.get(`${selectors.filters.marketOfInterest}${usMarketOfInterest}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&market-of-interest=Colombia&market-of-interest=US')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })
  })

  describe('Market Exported to', () => {
    it('Filters by selecting a single market exported to', () => {
      const latviaMarketExportedTo = 2
      cy.get(`${selectors.filters.marketExportedTo}${latviaMarketExportedTo}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&market-exported-to=Latvia')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })

    it('Filters by selecting multiple market exported to', () => {
      const latviaMarketExportedTo = 2
      const polandMarketExportedTo = 3

      cy.get(`${selectors.filters.marketExportedTo}${latviaMarketExportedTo}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&market-exported-to=Latvia')

      cy.get(`${selectors.filters.marketExportedTo}${polandMarketExportedTo}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&market-exported-to=Latvia&market-exported-to=Poland')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })
  })

  describe('Service Used', () => {
    it('Filters by selecting a single service used', () => {
      cy.get(`${selectors.filters.serviceUsed}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&service-used=DIT')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })

    it('Filters by selecting multiple service used', () => {
      const tbdServiceUsed = 3

      cy.get(`${selectors.filters.serviceUsed}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&service-used=DIT')

      cy.get(`${selectors.filters.serviceUsed}${tbdServiceUsed}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&service-used=DIT&service-used=TBD')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })
  })

  describe('Uk Regions', () => {
    it('Filters by selecting a single market exported to', () => {
      cy.get(`${selectors.filters.ukRegion}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&uk-regions=East of London')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })

    it('Filters by selecting multiple market exported to', () => {
      const london = 2

      cy.get(`${selectors.filters.ukRegion}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&uk-regions=East of London')

      cy.get(`${selectors.filters.ukRegion}${london}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&uk-regions=East of London&uk-regions=London')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })
  })

  describe('Multiple filters', () => {
    it('Filters by selecting a export potential and company name', () => {
      cy.get(`${selectors.filters.exportPotential}`)
        .should('not.be.disabled')
        .click()

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&export-potential=Low')

      cy.get(selectors.filters.companyName).type('single company').type('{enter}')

      cy.wait('@filterResults').its('url').should('contain',
        '?sort=export_propensity:desc&company-name=single company&export-potential=Low')

      cy.get(selectors.company.companyList).children().should('have.length', 1)
    })
  })
})
