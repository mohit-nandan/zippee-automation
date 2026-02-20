import AnalyticsPage from "../../support/pages/Analytics/Analytics";

describe("Analytics", () => {
    beforeEach(() => {
        cy.loginSession();
        cy.visit("/");
        AnalyticsPage.clickAnalyticsTab();
    });

    it("Verify Analytics Tab and other functionality", () => {
        AnalyticsPage.clickOperationTab();
        AnalyticsPage.clickBusinessTab();
        AnalyticsPage.clickBrandsTab();
    });
});