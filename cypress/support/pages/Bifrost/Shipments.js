const BasePage = require("../Common/BasePage");
const BifrostRoutes = require("../../api/BifrostRoutes");

class ShipmentsPage extends BasePage {
    constructor() {
        super();
        this.shipmentsTab = 'a[href*="shipments"]';
    }

    clickShipmentsTab() {
        cy.intercept("GET", BifrostRoutes.Shipments).as("shipments");

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
    }
}

module.exports = new ShipmentsPage();