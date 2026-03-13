const BasePage = require("../Common/BasePage");
const BifrostRoutes = require("../../api/BifrostRoutes");

class ShipmentsPage extends BasePage {
    constructor() {
        super();
        this.shipmentsTab = 'a[href*="shipments"]';
    }

    clickShipmentsTab() {
        cy.intercept("GET", BifrostRoutes.Shipments).as("shipments");
        cy.intercept("GET", BifrostRoutes.tracking).as("tracking");

        cy.contains("a", "Bifrost")
            .should("be.visible")
            .realHover();

        cy.contains("Shipments")
            .should("be.visible")
            .click();

        cy.wait("@shipments", { timeout: 20000 })
            .its("response.statusCode")
            .should("eq", 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);

        cy.then(() => {
            const awb = Cypress.env('awb');
            if (awb) {
                cy.get('input[type="search"]').first().scrollIntoView().type(awb, { force: true }).type('{enter}', { force: true });
                cy.wait('@shipments', { timeout: 20000 })
                    .its('response.statusCode')
                    .should('eq', 200);
                cy.get("table tbody tr").find("td").eq(0).should("have.text", awb).click();
                cy.wait('@shipments', { timeout: 20000 })
                    .its('response.statusCode')
                    .should('eq', 200);
                cy.get("table tbody tr").find("td").eq(0).find('a').click();

                cy.wait('@tracking', { timeout: 20000 })
                    .its('response')
                    .then((response) => {
                        expect(response.statusCode).to.eq(200);
                        expect(response.body.data.dis_events).to.have.lengthOf(6);
                    })
                cy.contains("Last Mile Logs").click();
            } else {
                cy.log('No AWB found in environment');
            }
        });
    }
}

module.exports = new ShipmentsPage();