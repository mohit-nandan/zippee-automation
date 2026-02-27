const BasePage = require("../Common/BasePage");
const CODRoutes = require("../../api/CODRoutes");

class Templates extends BasePage {
    constructor() {
        super();
        this.TemplatesTab = 'a[href="/createNewPayroll"]';
    }

    validateTemplates() {
        cy.intercept({
            method: 'GET',
            url: CODRoutes.Templates
        }).as("Templates");

        cy.contains("a", "COD").realHover();
        cy.contains("Create New Template").click();
        cy.url().should('include', 'createNewPayroll');

        cy.wait('@Templates', { timeout: 30000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
}

module.exports = new Templates();