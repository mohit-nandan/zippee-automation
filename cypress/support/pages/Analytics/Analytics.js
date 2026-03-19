const Basepage = require("../Common/BasePage");
const AnalyticsRoutes = require("../../api/Analytics");

class AnalyticsPage extends Basepage {
    constructor() {
        super();
        this.analyticsTab = 'a[href*="analytics"]';
    }

    clickAnalyticsTab() {
        cy.get(".sidebar").realHover("left").then(() => {
            cy.contains("a", "Analytics", { timeout: 10000 })
                .should("be.visible")
                .click();
        })
    }

    clickOperationTab() {
        cy.contains("li:nth-child(1) button:nth-child(1)", "Operation")
            .should("be.visible")
            .click();
        cy.contains("Orders per Day").should("be.visible");
    }

    clickBusinessTab() {
        cy.contains("li:nth-child(2) button:nth-child(1)", "Business")
            .should("be.visible")
            .click();
        cy.contains("Top 5 Brands").should("be.visible");
    }

    clickBrandsTab() {
        cy.contains("li:nth-child(3) button:nth-child(1)", "Brands")
            .should("be.visible")
            .click();
        cy.contains("Revenue per order").should("be.visible");
    }
}

module.exports = new AnalyticsPage();