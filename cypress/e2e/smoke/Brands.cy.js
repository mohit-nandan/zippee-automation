const BrandsPage = require("../../support/pages/Brands/BrandsPage");

describe("Brands", () => {
    beforeEach(() => {
        cy.loginSession();
        cy.visit("/");
        cy.contains("Introducing Q-Commerce Fulfillment by Zippee", { timeout: 10000 })
            .should("be.visible");
    });


    it(" verify brand page and other functionality", () => {
        BrandsPage.clickBrandsTab();
        BrandsPage.searchandVerifyBrand();
        BrandsPage.verifyBrandOverview();
        BrandsPage.clickCommercialsTab();
        BrandsPage.clickGstDetailsTab();
        BrandsPage.clickWarehousesTab();
        BrandsPage.clickWebhooksTab();
        BrandsPage.clickSquishedRulesTab();
        BrandsPage.clickShipmentCommsTab();
        BrandsPage.clickBrandConfigurationsTab();
    });

});