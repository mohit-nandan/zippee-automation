import AnalyticsPage from "../../support/pages/Analytics/Analytics";

describe("Analytics", () => {
    beforeEach(() => {
        cy.loginSession();
        cy.visit("/");
        AnalyticsPage.clickAnalyticsTab();
    });

    it("Operation Tab", () => {
        AnalyticsPage.clickOperationTab();
    });

    it("Business Tab", () => {
        AnalyticsPage.clickBusinessTab();
    });

    it("Brands Tab", () => {
        AnalyticsPage.clickBrandsTab();
    });
});