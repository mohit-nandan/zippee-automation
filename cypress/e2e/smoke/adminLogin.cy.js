const adminLoginPage = require("../../support/pages/Auth/adminLoginPage");

describe("Admin Login Smoke", { tags: '@smoke' }, () => {

    it("Verify successful Admin login and landing page visibility", () => {
        cy.visit("/");
        adminLoginPage.login(
            Cypress.env("adminUser"),
            Cypress.env("adminPass")
        );

        cy.contains("Introducing Q-Commerce Fulfillment by Zippee").should("be.visible");

    });

});
