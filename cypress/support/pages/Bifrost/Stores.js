const BasePage = require("../Common/BasePage");
const BifrostRoutes = require("../../api/BifrostRoutes");

class StoresPage extends BasePage {
    constructor() {
        super();
        this.storesTab = 'a[href*="stores"]';
    }

    clickStoresTab() {
        cy.intercept("GET", BifrostRoutes.Stores).as("stores");

        cy.contains("a", "Bifrost")
            .should("be.visible")
            .realHover();

        cy.contains("Stores")
            .should("be.visible")
            .click();

        cy.wait("@stores", { timeout: 20000 })
            .its("response.statusCode")
            .should("eq", 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
}

module.exports = new StoresPage();