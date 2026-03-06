const BasePage = require("../Common/BasePage");
const BrandRoutes = require("../../api/brandRoutes");
import "cypress-real-events/support";

class BrandsPage extends BasePage {

    constructor() {
        super();
        this.brandsTab = 'a[href*="brand"]';
    }

    clickBrandsTab() {
        cy.contains("a", "Brands", { timeout: 10000 })
            .should("be.visible")
            .click();
    }

    searchandVerifyBrand() {
        cy.get('input[placeholder="Search..."]:visible')
            .first()
            .scrollIntoView()
            .clear()
            .type("testing_f");

        cy.get("tbody tr")
            .first()
            .find("td")
            .first()
            .should("contain.text", "testing_f").find('a').click();
    }



    verifyBrandOverview() {
        cy.intercept("GET", BrandRoutes.overview).as("brandsoverview");
        cy.wait("@brandsoverview")
        cy.url().should("include", "/brand-details");
        cy.contains("Brand Details").should("be.visible");
    }

    clickCommercialsTab() {
        cy.intercept("GET", BrandRoutes.commercials).as("brandCommercials");

        cy.contains("li", "Commercials")
            .should("be.visible")
            .click();

        cy.wait("@brandCommercials");
        cy.contains("Commercials").should("be.visible");
    }

    clickGstDetailsTab() {
        cy.intercept("GET", BrandRoutes.gstDetails).as("brandGstDetails");

        cy.contains("li", "GST Details")
            .should("be.visible")
            .click();

        cy.wait("@brandGstDetails");
        cy.contains("GST Details").should("be.visible");
    }

    clickWarehousesTab() {
        cy.intercept("GET", BrandRoutes.warehouses).as("brandWarehouses");

        cy.contains("li", "Warehouses")
            .should("be.visible")
            .click();

        cy.wait("@brandWarehouses");
        cy.contains("Warehouses").should("be.visible");
    }

    clickWebhooksTab() {
        cy.intercept("GET", BrandRoutes.webhooks).as("brandWebhooks");

        cy.contains("li", "Webhooks")
            .should("be.visible")
            .click();

        cy.wait("@brandWebhooks");
        cy.contains("Webhooks").should("be.visible");
    }

    clickShipmentCommsTab() {
        cy.intercept("GET", BrandRoutes.shipmentComms).as("brandShipmentComms");

        cy.contains("li", "Comms")
            .should("be.visible")
            .click();

        cy.wait("@brandShipmentComms");
        cy.contains("WhatsApp Communications").should("be.visible");
    }

    clickBrandConfigurationsTab() {
        cy.intercept("GET", BrandRoutes.configurations).as("brandConfigurations");

        cy.contains("li", "Configuration")
            .should("be.visible")
            .click();

        cy.wait("@brandConfigurations");
        cy.contains("Standard Delivery").should("be.visible");
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

            let found = false;

            response.body.data.forEach(element => {
                if (element.darkstore_profile_name == 'geofence_1500') {
                    found = true;
                }
            })

            if (!found) {

                cy.log("geofence_1500 not found");

                cy.contains('button', 'Edit').click();

                cy.get('.css-19bb58m')
                    .find('input')
                    .type('geofence_1500{enter}');

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
                cy.contains('tbody tr', 'geofence_1500')
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

        })
    }
}

module.exports = new BrandsPage();