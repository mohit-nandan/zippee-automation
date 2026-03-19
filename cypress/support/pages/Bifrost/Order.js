const BasePage = require("../Common/BasePage");
const BifrostRoutes = require("../../api/BifrostRoutes");

class OrderPage extends BasePage {
    constructor() {
        super();
        this.orderTab = 'a[href*="order"]';
    }

    clickOrderTab() {
        cy.intercept("GET", BifrostRoutes.Order).as("order");

        cy.get(".sidebar").realHover("left").then(() => {
            cy.contains("span", "Middleware")
                .should("be.visible")
                .realHover().click();
        })

        cy.contains("Order")
            .should("be.visible")
            .click();

        cy.wait("@order", { timeout: 20000 })
            .its("response.statusCode")
            .should("eq", 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
}

module.exports = new OrderPage();