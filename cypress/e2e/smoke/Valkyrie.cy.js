const ShipmentPage = require("../../support/pages/Valkyrie/Shipment");
const TripsPage = require("../../support/pages/Valkyrie/Trips");
const WaybillsPage = require("../../support/pages/Valkyrie/Waybills");
const ExpressHubPage = require("../../support/pages/Valkyrie/ExpressHub");
const BifrostShipmentsPage = require("../../support/pages/Bifrost/Shipments");



describe("Valkyrie Smoke", { tags: '@smoke' }, () => {
    beforeEach(() => {
        cy.setupAndNavigate();
    });

    it("Verify full Shipment lifecycle: API creation, filter navigation, status overrides, and log verification", () => {
        ShipmentPage.createShipmentViaAPI()
        ShipmentPage.validateShipments();
        ShipmentPage.checkWhatsappMessaged()
        ShipmentPage.checkwehbookHistorylogs()
        BifrostShipmentsPage.clickShipmentsTab();
    });

    it("Verify Trips module navigation and status filtering (Created, Ongoing, Completed)", () => {
        TripsPage.validateTrips();
    });

    it("Verify access and data loading in the Print Waybills module", () => {
        WaybillsPage.validateWaybills();
    });

    it("Verify Express Hub module location search and status filtering", () => {
        ExpressHubPage.validateExpressHub();
    });
});
