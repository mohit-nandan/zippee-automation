const ShipmentPage = require("../../support/pages/Valkyrie/Shipment");
const TripsPage = require("../../support/pages/Valkyrie/Trips");
const WaybillsPage = require("../../support/pages/Valkyrie/Waybills");
const ExpressHubPage = require("../../support/pages/Valkyrie/ExpressHub");
const BifrostShipmentsPage = require("../../support/pages/Bifrost/Shipments");



describe("Valkyrie Smoke", { tags: '@smoke' }, () => {
    beforeEach(() => {
        cy.setupAndNavigate();
    });

    it("Verify Shipments Tab and other functionality", () => {
        ShipmentPage.createShipmentViaAPI()
        ShipmentPage.validateShipments();
        ShipmentPage.checkWhatsappMessaged()
        ShipmentPage.checkwehbookHistorylogs()
        BifrostShipmentsPage.clickShipmentsTab();
    });

    it("Verify Trips Tab and other functionality", () => {
        TripsPage.validateTrips();
    });

    it("Verify Waybills Tab and other functionality", () => {
        WaybillsPage.validateWaybills();
    });

    it("Verify Express Hub Tab and other functionality", () => {
        ExpressHubPage.validateExpressHub();
    });
});
