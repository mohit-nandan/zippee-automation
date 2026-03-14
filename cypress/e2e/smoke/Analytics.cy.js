import AnalyticsPage from "../../support/pages/Analytics/Analytics";

describe("Analytics", { tags: '@smoke' }, () => {
    beforeEach(() => {
        cy.setupAndNavigate();
        AnalyticsPage.clickAnalyticsTab();
    });

    it("Verify Analytics KPI dashboards for Operations, Business, and Brands", () => {
        AnalyticsPage.clickOperationTab();
        AnalyticsPage.clickBusinessTab();
        AnalyticsPage.clickBrandsTab();
    });
});