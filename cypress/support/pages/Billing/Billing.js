const BasePage = require("../Common/BasePage");
const BillingRoutes = require("../../api/BillingRoutes");

class BillingPage extends BasePage {

    constructor() {
        super();
        this.billingTab = 'a[href*="billing"]';
    }
    clickBillingTab() {
        cy.intercept("POST", BillingRoutes.GetBillingDetails).as("transactionHome");

        cy.contains("a", "Billing", { timeout: 15000 })
            .should("be.visible")
            .click();

        cy.wait("@transactionHome", { timeout: 20000 })
            .its("response.statusCode")
            .should("eq", 200);
    }

    clickDatepicker() {
        cy.intercept("POST", BillingRoutes.GetBillingHeader).as("billingHeader");

        cy.get(".relative.inline-block").click();

        cy.get(".rdrDefinedRangesWrapper")
            .contains("Last Month")
            .should("be.visible")
            .click();

        cy.wait("@billingHeader", { timeout: 20000 })
            .its("response.statusCode")
            .should("eq", 200);

        cy.contains("p", "Total Usage")
            .parent()
            .prev()
            .find("p.text-2xl")
            .invoke("text")
            .then((text) => {
                const cleaned = text.replace(/[₹,]/g, "").trim();
                const value = parseInt(cleaned);
                expect(value).to.be.greaterThan(0);
            });
    }

    clickDeductionsDetailsTab() {

        cy.intercept("POST", BillingRoutes.GetTransactionHistory).as("transactionHistory");

        cy.contains("Deduction View")
            .should("be.visible")
            .click();

        cy.wait("@transactionHistory", { timeout: 20000 })
            .its("response.statusCode")
            .should("eq", 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }


    clickInvoiceHistoryTab() {

        cy.intercept("POST", BillingRoutes.GetInoviceHistory).as("invoiceHistory");

        cy.contains("li", "Invoices")
            .should("be.visible")
            .click();

        cy.wait("@invoiceHistory", { timeout: 20000 })
            .its("response.statusCode")
            .should("eq", 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0);
    }
}

module.exports = new BillingPage();