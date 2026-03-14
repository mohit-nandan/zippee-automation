const BrandsPage = require("../../support/pages/Brands/BrandsPage");

describe("Brands", { tags: '@smoke' }, () => {
    beforeEach(() => {
        cy.setupAndNavigate();
    });


    it(" verify brand page and other functionality", () => {
        BrandsPage.clickBrandsTab();
        BrandsPage.searchandVerifyBrand();
        BrandsPage.verifyBrandOverview();
        BrandsPage.clickCommercialsTab();
        BrandsPage.clickGstDetailsTab();
        BrandsPage.clickWarehousesTab();
        BrandsPage.clickWebhooksTab();
        BrandsPage.clickShipmentCommsTab();
        BrandsPage.clickBrandConfigurationsTab();
        BrandsPage.clickSquishedRulesTab();
    });

});