const BasePage = require("../Common/BasePage");
const CODRoutes = require("../../api/CODRoutes");

class Riders extends BasePage {
    constructor() {
        super();
        this.RidersKYCTab = 'a[href="/kyc"]';
    }

    validateRidersKYC() {
        cy.intercept({
            method: 'GET',
            url: CODRoutes.RidersKYC
        }).as("RidersKYC");

        cy.get(".sidebar").realHover("left").then(() => {
            cy.contains("span", "COD")
                .should("be.visible")
                .realHover().click();
        })
        cy.contains('a', /^Riders$/).click();
        cy.url().should('include', 'kyc');

        cy.wait('@RidersKYC', { timeout: 30000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
}

module.exports = new Riders();