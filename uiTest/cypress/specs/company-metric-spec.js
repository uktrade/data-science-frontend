import selectors from '../selectors';

describe('Company metrics', function() {
    beforeEach(() => {
        cy.server();
        cy.visit('/acs');
    });

    it('displays company metrics', () => {
        cy.route('companySearch/*', 'fixtures:single-company').as('companySearch');
        cy.wait('@companySearch');

        cy.get(selectors.company.companyContent)
          .should('contain', 'Pelical Tech Ltd.')
          .and('contain', 'Very low')
          .and('contain', 'August 2018')
          .and('contain', '5777')
          .and('contain', '5664')
          .and('contain', '£1,194,675')
          .and('contain', '5533')
          .and('contain', '432432')
          .and('contain', '50 to 249')
          .and('contain', '£34,655,709');
    });

    it('ommits labels when company metrics values are not present', () => {
        cy.route('companySearch/*', 'fixtures:single-company-no-metrics').as('companySearch');
        cy.wait('@companySearch');

        cy.get(selectors.company.companyContent)
          .should('contain', 'Pelical Tech Ltd.')
          .and('not.contain', 'Last export evidence')
          .and('not.contain', 'DIT export wins')
          .and('not.contain', 'DIT export opportunities')
          .and('not.contain', 'Cash in the bank')
          .and('not.contain', 'HMRC export of goods')
          .and('not.contain', 'HMRC import of goods')
          .and('not.contain', 'Employee range')
          .and('not.contain', 'Turnover');
    });

    it('view data hub profile redirects to the correct page', () => {
        cy.route('companySearch/*', 'fixtures:single-company').as('companySearch');
        cy.wait('@companySearch');

        cy.get(selectors.company.dataHub).then( $a => {
            const href = $a.prop('href');
            cy.request(href)
              .its('body')
              .should('include', 'GOV.UK – DIT system access');
        });
    });
});