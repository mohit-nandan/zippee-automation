const RulesPage = require("../../support/pages/Bifrost/Rules");
const StoresPage = require("../../support/pages/Bifrost/Stores");
const DsProfilePage = require("../../support/pages/Bifrost/DS Profile");
const ShipmentsPage = require("../../support/pages/Bifrost/Shipments");
const OrderPage = require("../../support/pages/Bifrost/Order");
describe("Bifrost", { tags: '@smoke' }, () => {

    beforeEach(() => {
        cy.setupAndNavigate();
    });

    it("Verify accessibility and data loading in Bifrost Rules table", () => {
        RulesPage.clickRulesTab();
    });

    it("Verify accessibility and data loading in Bifrost Stores table", () => {
        StoresPage.clickStoresTab();
    });

    it("Verify accessibility and data loading in Bifrost DS Profile table", () => {
        DsProfilePage.clickDsProfileTab();
    });

    it("Verify tracking events, AWB search, and last mile logs in Bifrost Shipments", () => {
        ShipmentsPage.clickShipmentsTab();
    });

    it("Verify accessibility and data loading in Bifrost Orders table", () => {
        OrderPage.clickOrderTab();
    });
});
