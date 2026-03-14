const EmergencyCommsPage = require("../../support/pages/Emergency Comms/EmergencyComms");

describe("Emergency Comms", { tags: '@smoke' }, () => {
    beforeEach(() => {
        cy.setupAndNavigate();
        EmergencyCommsPage.clickEmergencyCommsTab();
    });

    it("Verify Emergency Comms Tab and other functionality", () => {
        EmergencyCommsPage.clickCommsLogsTab();
    });
});
