const BasePage = require("../Common/BasePage");
const CODRoutes = require("../../api/CODRoutes");

class SettlementsPage extends BasePage {
    constructor() {
        super();
        this.settlementsTab = 'a[href*="settlement"]';
    }

    ValidateRidersKPI() {

        cy.intercept({
            method: 'GET',
            url: CODRoutes.RidersKPI
        }).as('RidersKPI');

        cy.get(".sidebar").realHover("left").then(() => {
            cy.contains("span", "COD")
                .should("be.visible")
                .realHover().click();
        })
        cy.contains("Settlements")
            .click({ force: true });

        cy.url().should('include', 'settlement');

        cy.wait('@RidersKPI', { timeout: 30000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
    validateDarkstoresKPI() {
        cy.intercept({
            method: 'GET',
            url: CODRoutes.DarkstoresKPI
        }).as('DarkstoresKPI');

        cy.contains('h2', 'Dark Store')
            .closest('button')
            .click();

        cy.wait('@DarkstoresKPI', { timeout: 30000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
    validateCompanyKPI() {
        cy.intercept({
            method: 'GET',
            url: CODRoutes.CompanyKPI
        }).as('CompanyKPI');

        cy.contains('h2', 'Company')
            .closest('button')
            .click();

        cy.wait('@CompanyKPI', { timeout: 30000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }

    validateBrandsKPI() {
        cy.intercept({
            method: 'GET',
            url: CODRoutes.BrandKPI
        }).as('BrandKPI');

        cy.contains('h2', 'Brand')
            .closest('button')
            .click();

        cy.wait('@BrandKPI', { timeout: 30000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }

}

module.exports = new SettlementsPage();