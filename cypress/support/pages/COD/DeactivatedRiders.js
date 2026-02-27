const BasePage = require("../Common/BasePage");
const CODRoutes = require("../../api/CODRoutes");

class DeactivatedRiders extends BasePage {
    constructor() {
        super();
        this.DeactivatedRidersTab = 'a[href="/deactivatedRider"]';
    }

    validateDeactivatedRiders() {
        cy.intercept({
            method: 'GET',
            url: CODRoutes.DeactivateRider
        }).as("DeactivatedRiders");

        cy.contains("a", "COD").realHover();
        cy.contains("Deactivated Riders").click();
        cy.url().should('include', 'deactivatedRider');

        cy.wait('@DeactivatedRiders', { timeout: 30000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
}

module.exports = new DeactivatedRiders();