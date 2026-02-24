const adminLoginPage = require("../../support/pages/Auth/adminLoginPage");

describe("Admin Login Smoke", () => {

    it("should login successfully", () => {
        cy.visit("/");
        adminLoginPage.login(
            Cypress.env("adminUser"),
            Cypress.env("adminPass")
        );

        cy.contains("Introducing Q-Commerce Fulfillment by Zippee").should("be.visible");

    });

});
