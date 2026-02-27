const BasePage = require("../Common/BasePage");
const CODRoutes = require("../../api/CODRoutes");

class RedoLogs extends BasePage {
    constructor() {
        super();
        this.RedoLogsTab = 'a[href="/redoLogs"]';
    }

    validateRedoLogs() {
        cy.intercept({
            method: 'GET',
            url: CODRoutes.RedoLogs
        }).as("RedoLogs");

        cy.contains("a", "COD").realHover();
        cy.contains("Redo Logs").click();
        cy.url().should('include', 'redoLogs');

        cy.wait('@RedoLogs', { timeout: 30000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
}

module.exports = new RedoLogs();