const BillingPage = require("../../support/pages/Billing/Billing");

describe("Billing Smoke", { tags: '@smoke' }, () => {
    beforeEach(() => {
        cy.setupAndNavigate();
        BillingPage.clickBillingTab();
    });

    it("Verify Billing overview, date filters, and CSV report download with brand filtering", () => {
        BillingPage.clickDatepicker();
        BillingPage.clickDeductionsDetailsTab();
        BillingPage.clickInvoiceHistoryTab();
        BillingPage.downloadInvoice();
    });
});
