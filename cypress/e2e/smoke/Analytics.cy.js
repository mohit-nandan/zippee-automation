import AnalyticsPage from "../../support/pages/Analytics/Analytics";

describe("Analytics", { tags: '@smoke' }, () => {
    beforeEach(() => {
        cy.setupAndNavigate();
        AnalyticsPage.clickAnalyticsTab();
    });

    it("Verify Analytics Tab and other functionality", () => {
        AnalyticsPage.clickOperationTab();
        AnalyticsPage.clickBusinessTab();
        AnalyticsPage.clickBrandsTab();
    });
});