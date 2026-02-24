const SettlementsPage = require("../../support/pages/COD/Settlements");

describe("Settlements Smoke", () => {
    beforeEach(() => {
        cy.loginSession();
        cy.visit("/");
        cy.intercept('https://desk.zoho.in/**', { statusCode: 200, body: {} })
    });

    it("Verify Settlements Tab and other functionality", () => {
        SettlementsPage.ValidateRidersKPI();
        SettlementsPage.validateDarkstoresKPI();
        SettlementsPage.validateCompanyKPI();
        SettlementsPage.validateBrandsKPI();
    });
});

