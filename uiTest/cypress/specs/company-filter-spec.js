import selectors from '../selectors';

describe('Company filters', () => {
    beforeEach(() => {
        cy.server();
        cy.route('/?sort*').as('filterResults');
        cy.visit('/');
        cy.get(selectors.company.companyList).children().should('have.length', 20);
    });

    describe('Export Potential', () => {
        it('Filters by low export potential', () => {
            const lowExportPotential = 1;
            cy.get(`${selectors.filters.exportPotential}${lowExportPotential}`)
                .should('not.be.disabled')
                .click();
            
            cy.wait('@filterResults').then((xhr) => {
                expect(xhr.url).to.contain('?sort=export_propensity:desc&export-potential=Low');
            });
    
            cy.get(selectors.company.companyList).children().should('have.length', 1);
        });
    });

    describe('Commodity code', () => {
        it('Filters by single commodity code', () => {
            cy.get(selectors.filters.commodityCode)
                .should('not.be.disabled')
                .type('12345')
                .type('{enter}');

            cy.wait('@filterResults').then((xhr) => {
                expect(xhr.url).to.contain('?sort=export_propensity:desc&export-codes=12345');
            });
    
            cy.get(selectors.company.companyList).children().should('have.length', 1);
        });
    })

    // Disabled until story DST-1220 is fixed
    xdescribe('Latest export evidence', () => {
        it('Filters by start date only', () => {
            cy.get(selectors.filters.exportEvidenceStartDate)
                .should('not.be.disabled')
                .type('2000-10')
                .type('{enter}');

            cy.wait('@filterResults').its('url').should('contain',
                '?sort=export_propensity:desc&export-evidence-start-date=2000-10')
    
            cy.get(selectors.company.companyEmptyContent).should('contain',
            'Oh no, there are no results for your search');
        });

        it('Filters by end date only', () => {
            cy.get(selectors.filters.exportEvidenceEndDate)
                .should('not.be.disabled')
                .type('2000-10')
                .type('{enter}');

            cy.wait('@filterResults').its('url').should('contain',
                '?sort=export_propensity:desc&export-evidence-end-date=2000-10')
    
            cy.get(selectors.company.companyEmptyContent).should('contain',
            'Oh no, there are no results for your search');
        });

        it('Filters by start and end date', () => {
            cy.get(selectors.filters.exportEvidenceStartDate)
                .should('not.be.disabled')
                .type('2000-10')
                .type('{enter}');
                
            cy.wait('@filterResults').its('url').should('contain',
                '?sort=export_propensity:desc&export-evidence-start-date=2000-10')

            cy.get(selectors.filters.exportEvidenceEndDate)
                .should('not.be.disabled')
                .type('2018-10')
                .type('{enter}');

            cy.wait('@filterResults').its('url').should('contain',
                '?sort=export_propensity:desc&export-evidence-start-date=2000-10&export-evidence-end-date=2018-10');
    
            cy.get(selectors.company.companyList).children().should('have.length', 1);
        });

        it('Handles an invalid date format', () => {
            cy.get(selectors.filters.exportEvidenceStartDate)
                .should('not.be.disabled')
                .type('invalid')
                .type('{enter}');
    
            cy.get(selectors.company.companyEmptyContent).should('contain',
            'Oh no, there are no results for your search');
        });
    });

    describe('Sic code', () => {
        it('Filters by sic code', () => {
            cy.get(selectors.filters.sicCodes)
                .should('not.be.disabled')
                .type('12345')
                .type('{enter}');

            cy.wait('@filterResults').then((xhr) => {
                expect(xhr.url).to.contain('?sort=export_propensity:desc&sic-codes=12345');
            });
    
            cy.get(selectors.company.companyList).children().should('have.length', 1);
        });
    });

    describe('Turnover', () => {
        it('Filters by minimum only', () => {
            cy.get(selectors.filters.turnOverMin)
                .should('not.be.disabled')
                .type('100')
                .type('{enter}');

            cy.wait('@filterResults').its('url').should('contain',
                '?sort=export_propensity:desc&turnover-minimum=100')
    
            cy.get(selectors.company.companyList).children().should('have.length', 1);
        });

        it('Filters by maximum only', () => {
            cy.get(selectors.filters.turnOverMax)
                .should('not.be.disabled')
                .type('1')
                .type('{enter}');

            cy.wait('@filterResults').its('url').should('contain',
                '?sort=export_propensity:desc&turnover-maximum=1')
    
            cy.get(selectors.company.companyEmptyContent).should('contain',
            'Oh no, there are no results for your search');
        });

        it('Filters by minimum and maximum', () => {
            cy.get(selectors.filters.turnOverMin)
                .should('not.be.disabled')
                .type('100')
                .type('{enter}');
                
            cy.wait('@filterResults').its('url').should('contain',
                '?sort=export_propensity:desc&turnover-minimum=100')

            cy.get(selectors.filters.turnOverMax)
                .should('not.be.disabled')
                .type('1000')
                .type('{enter}');

            cy.wait('@filterResults').its('url').should('contain',
                '?sort=export_propensity:desc&turnover-minimum=100&turnover-maximum=1000')
    
            cy.get(selectors.company.companyList).children().should('have.length', 1);
        });

        it('Handles non numeric values', () => {
            cy.get(selectors.filters.turnOverMin)
                .should('not.be.disabled')
                .type('not4number')
                .type('{enter}');
    
            cy.get(selectors.company.companyEmptyContent).should('contain',
            'Oh no, there are no results for your search');
        });
    });
});
