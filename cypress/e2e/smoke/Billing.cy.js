const BillingPage = require("../../support/pages/Billing/Billing");

describe("Billing Smoke", { tags: '@smoke' }, () => {
    beforeEach(() => {
        cy.setupAndNavigate();
        BillingPage.clickBillingTab();
    });

    it("Verify Billing Tab and other functionality", () => {
        BillingPage.clickDatepicker();
        BillingPage.clickDeductionsDetailsTab();
        BillingPage.clickInvoiceHistoryTab();
        BillingPage.downloadInvoice();
    });
});
