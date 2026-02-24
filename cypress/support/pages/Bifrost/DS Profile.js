const BasePage = require("../Common/BasePage");
const BifrostRoutes = require("../../api/BifrostRoutes");

class DsProfilePage extends BasePage {
    constructor() {
        super();
        this.dsProfileTab = 'a[href*="ds-profile"]';
    }

    clickDsProfileTab() {
        cy.intercept("GET", BifrostRoutes.DSProfile).as("dsProfile");

        cy.contains("a", "Bifrost")
            .should("be.visible")
            .realHover();

        cy.contains("DS Profile")
            .should("be.visible")
            .click();

        cy.wait("@dsProfile", { timeout: 20000 })
            .its("response.statusCode")
            .should("eq", 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
}

module.exports = new DsProfilePage();