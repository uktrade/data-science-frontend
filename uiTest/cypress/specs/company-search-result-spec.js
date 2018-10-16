import selectors from '../selectors';

describe('Company search result', function() {
    beforeEach(() => {
        cy.server();
        cy.visit('/acs');
    });

    it('displays empty company result page', () => {
        cy.route('companySearch/*', 'fixtures:empty-result').as('companySearch');
        cy.wait('@companySearch');

        cy.get(selectors.company.companyList).children().should('have.length', 0);
    });

    it('displays a single company result page', () => {
        cy.route('companySearch/*', 'fixtures:single-company').as('companySearch');
        cy.wait('@companySearch');

        cy.get(selectors.company.companyList).children().should('have.length', 1);
    });

    it('displays multiple company result page', () => {
        cy.route('companySearch/*', 'fixtures:multiple-companies').as('companySearch');
        cy.wait('@companySearch');

        cy.get(selectors.company.companyList).children().should('have.length', 10);
    });
});