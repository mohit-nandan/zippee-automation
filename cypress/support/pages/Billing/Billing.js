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

    downloadInvoice() {
        cy.contains('Deductions').click();
        cy.intercept("POST", BillingRoutes.GetTransactionHistory).as("transactionHistory");

        cy.contains("Deduction View")
            .should("be.visible")
            .click();

        cy.wait("@transactionHistory", { timeout: 20000 })
            .its("response.statusCode")
            .should("eq", 200);

        cy.get("table tbody tr")
            .should("have.length.greaterThan", 0).then(() => {
                // validate the entire tabl data
                cy.get('.flex.gap-4.items-center').find('button').find('svg').eq(1).click();

                cy.task('waitForFileStable', 'transaction_history.csv');

                cy.task('readExcel', 'cypress/downloads/transaction_history.csv').then((data) => {
                    expect(data).to.not.be.empty;
                })

                // validate only particular brand data
                cy.get('.css-19bb58m').find('input').eq(0).type('testing_fabbox').type('{enter}');
                cy.wait('@transactionHistory');
                cy.task('deleteFile', 'transaction_history.csv');
                cy.get('.flex.gap-4.items-center').find('button').find('svg').eq(1).click();

                cy.task('waitForFileStable', 'transaction_history.csv');

                cy.task('readExcel', 'cypress/downloads/transaction_history.csv').then((data) => {
                    expect(data, 'Downloaded file is empty').to.not.be.empty;

                    const invalidBrands = data
                        .map(row => row.Brand?.trim())
                        .filter(brand => brand !== 'testing_fabbox');

                    expect(
                        invalidBrands,
                        `Unexpected brands present in report: ${invalidBrands.join(', ')}`
                    ).to.be.empty;
                })

            })
    }
}

module.exports = new BillingPage();