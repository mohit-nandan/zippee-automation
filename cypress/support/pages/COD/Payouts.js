const BasePage = require("../Common/BasePage");
const CODRoutes = require("../../api/CODRoutes");

class Payouts extends BasePage {
    constructor() {
        super();
        this.PayoutsTab = 'a[href="/payoutConsole"]';
    }

    validatePayouts() {
        cy.intercept({
            method: 'GET',
            url: CODRoutes.Payouts
        }).as("RiderPayouts");

        cy.contains("a", "COD").realHover();
        cy.contains("Payouts").click();
        cy.url().should('include', 'payoutConsole');

        cy.wait('@RiderPayouts', { timeout: 30000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
}

module.exports = new Payouts();