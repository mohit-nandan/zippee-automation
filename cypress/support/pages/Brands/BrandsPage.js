const BasePage = require("../Common/BasePage");
const BrandRoutes = require("../../api/brandRoutes");
import "cypress-real-events/support";

class BrandsPage extends BasePage {

    constructor() {
        super();
        this.brandsTab = 'a[href*="brand"]';
    }

    clickBrandsTab() {
        cy.get(".sidebar").realHover("left").then(() => {
            cy.contains("a", "Brands", { timeout: 10000 })
                .should("be.visible")
                .click();
        })
    }

    searchandVerifyBrand() {
        const env = Cypress.env('environment') || 'staging';
        cy.fixture(`${env}/testData`).then((data) => {
            const searchName = data.brands.searchName;

            cy.get('input[placeholder="Search..."]:visible')
                .first()
                .scrollIntoView()
                .clear()
                .type(searchName);

            cy.get("tbody tr")
                .first()
                .find("td")
                .first()
                .should("contain.text", searchName).find('a').click();
        });
    }



    verifyBrandOverview() {
        cy.intercept("GET", BrandRoutes.overview).as("brandsoverview");
        cy.wait("@brandsoverview")
        cy.url().should("include", "/brand-details");
        cy.contains("Brand Details").should("be.visible");
    }

    switchTab(tabName, route, expectedText) {
        const alias = `brand${tabName.replace(/\s/g, '')}`;
        cy.intercept("GET", route).as(alias);
        cy.contains("li", tabName).should("be.visible").click();
        cy.wait(`@${alias}`);
        cy.contains(expectedText).should("be.visible");
    }

    clickCommercialsTab() {
        this.switchTab("Commercials", BrandRoutes.commercials, "Commercials");
    }

    clickGstDetailsTab() {
        this.switchTab("GST Details", BrandRoutes.gstDetails, "GST Details");
    }

    clickWarehousesTab() {
        this.switchTab("Warehouses", BrandRoutes.warehouses, "Warehouses");
    }

    clickWebhooksTab() {
        this.switchTab("Webhooks", BrandRoutes.webhooks, "Webhooks");
    }

    clickShipmentCommsTab() {
        this.switchTab("Comms", BrandRoutes.shipmentComms, "WhatsApp Communications");
    }

    clickBrandConfigurationsTab() {
        this.switchTab("Configuration", BrandRoutes.configurations, "Standard Delivery");
    }

    clickSquishedRulesTab() {
        cy.intercept("GET", BrandRoutes.squishedRules).as("brandSquishedRules");
        cy.intercept("GET", BrandRoutes.brandRules).as("brandRules");

        cy.contains("li", "Rules")
            .should("be.visible")
            .click();

        cy.wait("@brandSquishedRules");
        cy.contains("Brand Rules").should("be.visible");
        cy.wait("@brandRules").then(({ request, response }) => {
            const env = Cypress.env('environment') || 'staging';
            cy.fixture(`${env}/testData`).then((data) => {
                const geofenceRule = data.brands.geofenceRule;

                let found = false;

                response.body.data.forEach(element => {
                    if (element.darkstore_profile_name == geofenceRule) {
                        found = true;
                    }
                })

                if (!found) {

                    cy.log(`${geofenceRule} not found`);

                    cy.contains('button', 'Edit').click();

                    cy.get('.css-19bb58m')
                        .find('input')
                        .type(`${geofenceRule}{enter}`);

                    cy.contains('button', 'Preview').click();
                    cy.contains('button', 'Add').click();

                    cy.get('tbody tr:last-child .cursor-move')
                        .scrollIntoView()
                        .realMouseDown();

                    cy.get('table tbody').first()
                        .realMouseMove(0, 0, { position: "topLeft" })
                        .wait(200)
                        .realMouseUp();

                    cy.contains('button', 'Save').click();
                    cy.contains('button', 'Apply').click();

                } else {
                    cy.contains('button', 'Edit').click();
                    cy.contains('tbody tr', geofenceRule)
                        .find('.cursor-move')
                        .scrollIntoView()
                        .realMouseDown();

                    cy.get('table tbody').first()
                        .realMouseMove(0, 0, { position: "topLeft" })
                        .wait(200)
                        .realMouseUp();

                    cy.contains('button', 'Save').click();
                    cy.contains('button', 'Apply').click();
                }
            });
        })
    }
}

module.exports = new BrandsPage();