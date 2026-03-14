const BrandsPage = require("../../support/pages/Brands/BrandsPage");

describe("Brands", { tags: '@smoke' }, () => {
    beforeEach(() => {
        cy.setupAndNavigate();
    });


    it("Verify Brand details, tab navigation (GST, Commercials, etc.), and Rule priority management", () => {
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