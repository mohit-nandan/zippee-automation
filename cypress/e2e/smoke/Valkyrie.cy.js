const ShipmentPage = require("../../support/pages/Valkyrie/Shipment");
const TripsPage = require("../../support/pages/Valkyrie/Trips");
const WaybillsPage = require("../../support/pages/Valkyrie/Waybills");
const ExpressHubPage = require("../../support/pages/Valkyrie/ExpressHub");


describe("Valkyrie Smoke", () => {
    beforeEach(() => {

        cy.loginSession();

        cy.visit("/");

        cy.get('aside', { timeout: 30000 }).should('be.visible');

        cy.contains('a', 'Valkyrie', { timeout: 20000 })
            .should('be.visible');

        cy.intercept('https://desk.zoho.in/**', { statusCode: 200, body: {} });

    });

    it("Verify Shipments Tab and other functionality", () => {
        ShipmentPage.createShipmentViaAPI()
        ShipmentPage.validateShipments();
        ShipmentPage.checkWhatsappMessaged()
        ShipmentPage.checkwehbookHistorylogs()
    });

    // it("Verify Trips Tab and other functionality", () => {
    //     TripsPage.validateTrips();
    // });

    // it("Verify Waybills Tab and other functionality", () => {
    //     WaybillsPage.validateWaybills();
    // });

    // it("Verify Express Hub Tab and other functionality", () => {
    //     ExpressHubPage.validateExpressHub();
    // });
});
