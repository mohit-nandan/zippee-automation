const basePage = require("../Common/BasePage");
const ValkyrieRoutes = require("../../api/Valkyrie");

class Waybills extends basePage {
    constructor() {
        super();
    }

    validateWaybills() {
        cy.intercept({
            method: 'POST',
            url: ValkyrieRoutes.waybillsView
        }).as('waybillsView');

        cy.contains("a", "Valkyrie").realHover();
        cy.contains("Print Waybills").click();
        cy.url().should("include", "/print-waybills");
        cy.wait('@waybillsView').then(({ response }) => {
            expect(response.statusCode).to.eq(200);
        });
    }
}

module.exports = new Waybills();