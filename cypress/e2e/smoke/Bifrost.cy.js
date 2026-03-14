const RulesPage = require("../../support/pages/Bifrost/Rules");
const StoresPage = require("../../support/pages/Bifrost/Stores");
const DsProfilePage = require("../../support/pages/Bifrost/Ds Profile");
const ShipmentsPage = require("../../support/pages/Bifrost/Shipments");
const OrderPage = require("../../support/pages/Bifrost/Order");
describe("Bifrost", { tags: '@smoke' }, () => {

    beforeEach(() => {
        cy.setupAndNavigate();
    });

    it("Rules", () => {
        RulesPage.clickRulesTab();
    });

    it("Stores", () => {
        StoresPage.clickStoresTab();
    });

    it("DS Profile", () => {
        DsProfilePage.clickDsProfileTab();
    });

    it("Shipments", () => {
        ShipmentsPage.clickShipmentsTab();
    });

    it("Order", () => {
        OrderPage.clickOrderTab();
    });
});
