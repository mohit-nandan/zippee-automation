const EmergencyCommsPage = require("../../support/pages/Emergency Comms/EmergencyComms");

describe("Emergency Comms", () => {
    beforeEach(() => {
        cy.loginSession();
        cy.visit("/");
        EmergencyCommsPage.clickEmergencyCommsTab();
    });

    it("Verify Emergency Comms Tab and other functionality", () => {
        EmergencyCommsPage.clickCommsLogsTab();
    });
});
