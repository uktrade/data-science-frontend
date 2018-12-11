import selectors from '../selectors';

describe('Company filters', () => {
    beforeEach(() => {
        cy.server();
        cy.route('/?sort*').as('filterResults');
        cy.visit('/');
    });

    describe('Export Potential', () => {
        it('Filters by low export potential', () => {
            const lowExportPotential = 1;
            cy.get(`${selectors.filters.exportPotential}${lowExportPotential}`).click();
            
            cy.wait('@filterResults').then((xhr) => {
                expect(xhr.url).to.contain('?sort=export_propensity:desc&export-potential=Low');
            });
    
            cy.get(selectors.company.companyList).children().should('have.length', 20);
        });
    });
    describe('Commodity code', () => {
        it('Filters by single commodity code', () => {
            cy.get(selectors.filters.commodityCode).type('12345').type('{enter}');
            
            cy.wait('@filterResults').then((xhr) => {
                expect(xhr.url).to.contain('?sort=export_propensity:desc&export-codes=12345');
            });
    
            cy.get(selectors.company.companyList).children().should('have.length', 20);
        });
    })
});
