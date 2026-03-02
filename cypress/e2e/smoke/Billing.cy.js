const BillingPage = require("../../support/pages/Billing/Billing");

describe("Billing Smoke", () => {
    beforeEach(() => {
        cy.loginSession();
        cy.visit("/");
        cy.intercept('https://desk.zoho.in/**', { statusCode: 200, body: {} })
        BillingPage.clickBillingTab();
    });

    it("Verify Billing Tab and other functionality", () => {
        BillingPage.clickDatepicker();
        BillingPage.clickDeductionsDetailsTab();
        BillingPage.clickInvoiceHistoryTab();
        BillingPage.downloadInvoice();
    });
});
