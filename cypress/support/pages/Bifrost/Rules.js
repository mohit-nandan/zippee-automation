const BasePage = require("../Common/BasePage");
const BifrostRoutes = require("../../api/BifrostRoutes");

class RulesPage extends BasePage {
    constructor() {
        super();
        this.rulesTab = 'a[href*="rules"]';
    }

    clickRulesTab() {
        cy.intercept("GET", BifrostRoutes.Rules).as("rules");

        cy.get(".sidebar").realHover("left").then(() => {
            cy.contains("span", "Middleware")
                .should("be.visible")
                .realHover().click();
        })

        cy.contains("Rules")
            .should("be.visible")
            .click();

        cy.wait("@rules", { timeout: 20000 })
            .its("response.statusCode")
            .should("eq", 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
}

module.exports = new RulesPage();