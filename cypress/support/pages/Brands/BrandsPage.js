const BasePage = require("../Common/BasePage");
const BrandRoutes = require("../../api/brandRoutes");

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

    clickSquishedRulesTab() {
        cy.intercept("GET", BrandRoutes.squishedRules).as("brandSquishedRules");

        cy.contains("li", "Rules")
            .should("be.visible")
            .click();

        cy.wait("@brandSquishedRules");
        cy.contains("Brand Rules").should("be.visible");
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
}

module.exports = new BrandsPage();