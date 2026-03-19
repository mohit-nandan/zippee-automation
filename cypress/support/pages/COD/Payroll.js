const BasePage = require("../Common/BasePage");
const CODRoutes = require("../../api/CODRoutes");

class Payroll extends BasePage {
    constructor() {
        super();
        this.PayrollTab = 'a[href="/riderPayroll"]';
    }

    validatePayroll() {
        cy.intercept({
            method: 'GET',
            url: CODRoutes.Payrolls
        }).as("Payroll");

        cy.get(".sidebar").realHover("left").then(() => {
            cy.contains("span", "COD")
                .should("be.visible")
                .realHover().click();
        })
        cy.contains("Rider Payroll").click();
        cy.url().should('include', 'riderPayroll');

        cy.wait('@Payroll', { timeout: 30000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
}

module.exports = new Payroll();